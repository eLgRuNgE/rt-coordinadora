const pool = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


async function getUserFromDatabase(username, password) {
    try {
        const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (rows.length === 0) {
            return null;
        }
        const user = rows[0];

        const validPassword = await bcrypt.compare(password, user.password_hash);
        if (!validPassword) {
            return null;
        }

        return { user_id: user.user_id, username: user.username };
    } catch (error) {
        console.error('Error al obtener usuario de la base de datos:', error);
        throw error;
    }
}

const userController = {
    registerUser: async (req, res) => {
        const { username, email, password } = req.body;

        try {
            const userExistenceQuery = 'SELECT * FROM users WHERE username = $1 OR email = $2';
            const userExistenceResult = await pool.query(userExistenceQuery, [username, email]);

            if (userExistenceResult.rows.length > 0) {
                return res.status(400).json({ error: 'El nombre de usuario o correo electrónico ya está en uso.' });
            }

            // Hash de la contraseña con 10 rondas de sal
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insertar el nuevo usuario en la base de datos
            const insertUserQuery = 'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *';
            const insertUserResult = await pool.query(insertUserQuery, [username, email, hashedPassword]);

            // Devolver el nuevo usuario creado
            res.status(201).json(insertUserResult.rows[0]);
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            res.status(500).json({ error: 'Error interno del servidor al registrar usuario.' });
        }
    },

    loginUser: async (req, res) => {
        const { username, password } = req.body;

        const user = await getUserFromDatabase(username, password);
        if (!user) {
            return res.status(401).json({ message: "Autenticación fallida" });
        }

        const token = jwt.sign(
            { userId: user.user_id, username: user.username }, // Payload del token
            process.env.JWT_SECRET, // Secreto para firmar el token
            { expiresIn: '24h' } // Opciones del token, como expiración
        );

        res.json({ token });
    },

    getUserProfile: async (req, res) => {
        // Obtengo el ID del usuario viene del token JWT
        const userId = req.user.userId; 

        try {
            // Obtener la información básica del usuario excluyendo la contraseña
            const userResult = await pool.query(
                'SELECT username, email FROM users WHERE user_id = $1',
                [userId]
            );
            
            if (userResult.rows.length === 0) {
                return res.status(404).json({ message: "Usuario no encontrado." });
            }

            const userInfo = userResult.rows[0];

            // Obtengo los eventos organizados por el usuario
            const organizedEvents = await pool.query(
                'SELECT * FROM events WHERE organizer_id = $1',
                [userId]
            );

            // Obtengo los eventos a los que el usuario está registrado como asistente
            const attendingEvents = await pool.query(
                `SELECT e.* FROM events e
                JOIN attendees a ON e.event_id = a.event_id
                WHERE a.user_id = $1`,
                [userId]
            );

            // Devuelvo la información del perfil junto con los eventos organizados y a los que asiste
            res.json({
                user: userInfo,
                organizedEvents: organizedEvents.rows,
                attendingEvents: attendingEvents.rows
            });
        } catch (error) {
            console.error('Error al obtener el perfil del usuario:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

module.exports = userController;
