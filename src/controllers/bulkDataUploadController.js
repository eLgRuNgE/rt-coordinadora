const axios = require('axios');
const bcrypt = require('bcrypt');
const pool = require('../config/db');
const XLSX = require('xlsx');
const { none } = require('../middleware/upload');

const saltRounds = 10;

// Calculo de longitud y latitud usando Mapbox y la localizacion del evento
async function getCoordinatesForLocation(location) {
    const mapboxAccessToken = process.env.MAPBOX_ACCESS_TOKEN;
    const geocodingResponse = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json`, {
        params: {
            access_token: mapboxAccessToken,
            limit: 1
        }
    });
    if (geocodingResponse.data.features && geocodingResponse.data.features.length > 0) {
        const [longitude, latitude] = geocodingResponse.data.features[0].center;
        return { longitude, latitude };
    } else {
        throw new Error('No se encontraron coordenadas para la ubicación proporcionada');
    }
}

// Funciones de ayuda para la validación
const validateEmail = (email) => {
    const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

function isValidExcelSerial(serial) {
    // Validaciones:
    // Es un número.
    // Es positivo.
    // Está en un rango razonable que represente fechas reales (por ejemplo, de 1 hasta 2958465, que cubriría hasta el 31 de diciembre de 9999).
    return typeof serial === 'number' && serial > 0 && serial < 2958466;
}

const validateDateFormat = (dateStr) => {
    const re = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
    return re.test(dateStr);
};

const checkUserExists = async (username) => {
    const result = await pool.query('SELECT user_id FROM users WHERE username = $1', [username]);
    return result.rows.length > 0;
};

// Clase error personalizada para las validaciones
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}

// Manejo de fechas con Excel y JS
function excelSerialDateToJSDate(serial) {
    const utc_days = Math.floor(serial - 25569);
    const utc_value = utc_days * 86400;  
    const date_info = new Date(utc_value * 1000);

    const fractional_day = serial - Math.floor(serial) + 0.0000001;
    let total_seconds = Math.floor(86400 * fractional_day);
    const seconds = total_seconds % 60;
    total_seconds -= seconds;
    const hours = Math.floor(total_seconds / (60 * 60));
    const minutes = Math.floor(total_seconds / 60) % 60;

    const date = new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
    return date;
}

// Formateo de la fecha para PostgreSQL
function formatDateToPostgres(date) {
    const pad = (num) => (num < 10 ? '0' + num : num);
    return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate()) + ' ' +
            pad(date.getHours()) + ':' + pad(date.getMinutes()) + ':' + pad(date.getSeconds());
}



const bulkDataUploadController = {
    uploadExcelData: async (req, res) => {
        if (!req.file) {
            return res.status(400).json({ error: 'No se recibió ningún archivo.' });
        }

        try {
            await pool.query('BEGIN');
            const workbook = XLSX.readFile(req.file.path);

            // Verifico que existan las hojas Usuarios y Eventos en la plantilla
            const usersSheet = workbook.Sheets['Usuarios'];
            const eventsSheet = workbook.Sheets['Eventos'];
            if (!usersSheet || !eventsSheet) {
                throw new ValidationError('Las hojas de Ususrios y/o Eventos requeridas no existen en la plantilla.');
            }

            // Inicializo un arreglo para los resultados
            let userUpdates = [];
            let eventUpdates = [];

            // Proceso la hoja de 'Usurios'
            const users = XLSX.utils.sheet_to_json(usersSheet);

            for (const user of users) {
                const username = user.Usuario__username.trim();
                const email = user.CorreoElectronico__email.trim();
                const password = user.Clave__password.trim();

                if (!username || !email || !password) {
                    throw new ValidationError('Los datos de usuario están incompletos o en un formato incorrecto.');
                }
                if (!validateEmail(email)) {
                    throw new ValidationError(`El correo electrónico es inválido: ${email}`);
                }

                // Verificar si el usuario existe
                const existingUser = await pool.query('SELECT user_id FROM users WHERE username = $1', [username]);

                if (existingUser.rows.length > 0) {
                    // Si el usuario ya existe, actualizamos
                    const hashedPassword = await bcrypt.hash(password, saltRounds);
                    const updateUser = await pool.query(
                        'UPDATE users SET email = $2, password_hash = $3 WHERE username = $1 RETURNING *',
                        [username, email, hashedPassword]
                    );
                    userUpdates.push(updateUser.rows[0]);
                } else {
                    // Si el usuario no existe, insertamos uno nuevo
                    const hashedPassword = await bcrypt.hash(password, saltRounds);
                    const newUser = await pool.query(
                        'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
                        [username, email, hashedPassword]
                    );
                    userUpdates.push(newUser.rows[0]);
                }
            }

            // Proceso la hoja de 'Eventos'
            const events = XLSX.utils.sheet_to_json(eventsSheet);
            // console.log(events);

            for (const event of events) {
                const title = event.Titulo__title.trim();
                const description = event.DescripcionEvento__description.trim();
                const rawStartTime = event.FechaHoraInicio__start_time;
                const rawEndTime = event.FechaHoraFinalizacion__end_time;
                const location = event.Ubicacion__location.trim();
                const organizer_username = event.Organizador__username.trim();

                if (!title || !rawStartTime || !rawEndTime || !location || !organizer_username) {
                    throw new ValidationError('Los datos del evento están incompletos o en un formato incorrecto.');
                }

                if (!isValidExcelSerial(rawStartTime) || !isValidExcelSerial(rawEndTime)) {
                    throw new ValidationError(`Uno o ambos valores de fecha y hora son inválidos para el Evento: ${title}, Inicio: ${rawStartTime}, Fin: ${rawEndTime}`);
                }

                // Convertir de serial de Excel a fecha de JavaScript
                const startDate = excelSerialDateToJSDate(rawStartTime);
                const endDate = excelSerialDateToJSDate(rawEndTime);

                // Formatear fecha para ser aceptada por PostgreSQL
                const formattedStartDate = formatDateToPostgres(startDate);
                const formattedEndDate = formatDateToPostgres(endDate);
                // console.log(`Fecha formateada para inicio: ${formattedStartDate}`);
                // console.log(`Fecha formateada para fin: ${formattedEndDate}`);

                if (!validateDateFormat(formattedStartDate) || !validateDateFormat(formattedEndDate))  {
                    throw new ValidationError(`Formato de fecha y hora inválido para el Evento: ${title}, Inicio: ${formattedStartDate}, Fin: ${formattedEndDate}`);
                }

                if (!(await checkUserExists(organizer_username))) {
                    throw new ValidationError(`El usuario organizador no existe: ${organizer_username}`);
                }

                const organizerRes = await pool.query('SELECT user_id FROM users WHERE username = $1', [organizer_username]);
                const organizer_id = organizerRes.rows[0].user_id;

                // Verificar si el evento existe y si la ubicación ha cambiado
                const existingEvent = await pool.query('SELECT event_id, location FROM events WHERE title = $1', [title]);

                if (existingEvent.rows.length > 0) {
                    // Si el evento ya existe, revisamos si cambia la ubicación y actualizamos
                    const eventToUpdate = existingEvent.rows[0];
                    if (eventToUpdate.location !== location) {
                        const coords = await getCoordinatesForLocation(location);
                        longitude = coords.longitude;
                        latitude = coords.latitude;

                        const updateEvent = await pool.query(
                            `UPDATE events 
                            SET description = $2, start_time = $3, end_time = $4, location = $5, latitude = $6, longitude = $7, organizer_id = $8 
                            WHERE event_id = $1 
                            RETURNING *`,
                            [existingEvent.rows[0].event_id, description, formattedStartDate, formattedEndDate, location, latitude, longitude, organizer_id]
                        );
                    } else {
                        const updateEvent = await pool.query(
                            `UPDATE events 
                            SET description = $2, start_time = $3, end_time = $4, organizer_id = $5 
                            WHERE event_id = $1 
                            RETURNING *`,
                            [existingEvent.rows[0].event_id, description, formattedStartDate, formattedEndDate, organizer_id]
                        );
                    }

                    
                    eventUpdates.push(updateEvent.rows[0]);
                } else {
                    // Si el evento no existe, calculamos la ubicación e insertamos uno nuevo
                    const coords = await getCoordinatesForLocation(location);
                    longitude = coords.longitude;
                    latitude = coords.latitude;
                    const newEvent = await pool.query(
                        'INSERT INTO events (title, description, start_time, end_time, location, latitude, longitude, organizer_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
                        [title, description, formattedStartDate, formattedEndDate, location, latitude, longitude, organizer_id]
                    );
                    eventUpdates.push(newEvent.rows[0]);
                }
            }
            await pool.query('COMMIT');
            
            res.status(200).json({ 
                message: 'Datos cargados correctamente.',
                userUpdates,
                eventUpdates
            });
        } catch (error) {
            await pool.query('ROLLBACK');
            if (error instanceof ValidationError) {
                return res.status(422).json({ error: error.message });
            }
            if (error.message === 'Estas intentando cargar un archivo y/o plantilla incorrecta.') {
                return res.status(400).json({ error: error.message });
            }
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = bulkDataUploadController;