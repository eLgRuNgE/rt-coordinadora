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

        const hashedPassword = await bcrypt.hash(password, 10); // Hash de la contraseña con 10 rondas de sal

        try {
            const result = await pool.query(
                'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
                [username, email, hashedPassword]
            );
            res.status(201).json(result.rows[0]);
        } catch (error) {
            res.status(400).json({ error: error.message });
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
        // Implementar la obtención de datos del perfil del usuario aquí.
        try {
            res.json({ username: 'example_user', email: 'user@example.com' });
        } catch (error) {
            res.status(401).json({ error: 'Unauthorized' });
        }
    }
};

module.exports = userController;
