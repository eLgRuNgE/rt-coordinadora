const XLSX = require('xlsx');
const bcrypt = require('bcrypt');
const pool = require('../config/db');

const saltRounds = 10;

// Funciones de ayuda para la validación
const validateEmail = (email) => {
    const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const validateDate = (dateStr) => {
    const re = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;
    return re.test(dateStr);
};

const checkUserExists = async (username) => {
    const result = await pool.query('SELECT user_id FROM users WHERE username = $1', [username]);
    return result.rows.length > 0;
};

const bulkDataUploadController = {
    uploadExcelData: async (req, res) => {
        if (!req.file) {
            return res.status(400).json({ error: 'No se recibió ningún archivo.' });
        }

        try {
            const workbook = XLSX.readFile(req.file.path);

            // Procesar la hoja de 'Usuarios'
            const usersSheet = workbook.Sheets['Usuarios'];
            const users = XLSX.utils.sheet_to_json(usersSheet);

            for (const user of users) {
                const { Usuario: username, CorreoElectronico: email, Contraseña: password } = user;

                if (!username || !email || !password) {
                    throw new Error('Los datos de usuario están incompletos o en un formato incorrecto.');
                }
                if (!validateEmail(email)) {
                    throw new Error(`El correo electrónico es inválido: ${email}`);
                }

                const hashedPassword = await bcrypt.hash(password, saltRounds);
                await pool.query('INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3)', [username, email, hashedPassword]);
            }

            // Procesar la hoja de 'Eventos'
            const eventsSheet = workbook.Sheets['Eventos'];
            const events = XLSX.utils.sheet_to_json(eventsSheet);

            for (const event of events) {
                const {
                    Titulo: title,
                    DescripciónEvento: description,
                    FechaHoraInicio: start_time,
                    FechaHoraFinalización: end_time,
                    Ubicación: location,
                    Organizador: organizer_username
                } = event;

                if (!title || !start_time || !end_time || !location || !organizer_username) {
                    throw new Error('Los datos del evento están incompletos o en un formato incorrecto.');
                }
                if (!validateDateFormat(start_time) || !validateDateFormat(end_time)) {
                    throw new Error(`Formato de fecha y hora inválido: ${start_time} - ${end_time}`);
                }
                if (!(await userExists(organizer_username))) {
                    throw new Error(`El usuario organizador no existe: ${organizer_username}`);
                }

                const organizerRes = await pool.query('SELECT user_id FROM users WHERE username = $1', [organizer_username]);
                const organizer_id = organizerRes.rows[0].user_id;

                await pool.query('INSERT INTO events (title, description, start_time, end_time, location, organizer_id) VALUES ($1, $2, $3, $4, $5, $6)', [title, description, start_time, end_time, location, organizer_id]);
            }

            res.status(200).json({ message: 'Datos cargados correctamente.' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = bulkDataUploadController;