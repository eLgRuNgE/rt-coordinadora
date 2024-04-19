const pool = require('../config/db'); // Asumiendo que ya tienes configurado el pool de PostgreSQL

const eventController = {
    // Controlador para obtener todos los eventos
    getAllEvents: async (req, res) => {
        try {
            const { rows } = await pool.query('SELECT * FROM events');
            if (rows == []) {
                res.json(rows);
            } else {
                res.send('No se han encontrado eventos en base de datos.');
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Controlador para obtener un solo evento por ID
    getEventById: async (req, res) => {
        try {
            const { eventId } = req.params;
            const { rows } = await pool.query('SELECT * FROM events WHERE event_id = $1', [eventId]);
            
            if (rows.length === 0) {
                return res.status(404).json({ message: "Evento no encontrado." });
            }

            res.json(rows[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Controlador para crear un nuevo evento
    createEvent: async (req, res) => {
        // Debes extraer los datos necesarios del cuerpo de la solicitud (req.body)
        // Aquí un ejemplo simplificado con algunos campos
        const { title, description, start_time, end_time, location } = req.body;

        try {
            const { rows } = await pool.query(
                'INSERT INTO events (title, description, start_time, end_time, location) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [title, description, start_time, end_time, location]
            );
            res.status(201).json(rows[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Controlador para actualizar un evento existente
    updateEvent: async (req, res) => {
        const { eventId } = req.params;
        // Obtener los datos que se van a actualizar del cuerpo de la solicitud
        // De nuevo, este es un ejemplo simplificado
        const { title, description, start_time, end_time, location } = req.body;

        try {
            const { rows } = await pool.query(
                'UPDATE events SET title = $1, description = $2, start_time = $3, end_time = $4, location = $5 WHERE event_id = $6 RETURNING *',
                [title, description, start_time, end_time, location, eventId]
            );

            if (rows.length === 0) {
                return res.status(404).json({ message: "Evento no encontrado." });
            }

            res.json(rows[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Controlador para eliminar un evento
    deleteEvent: async (req, res) => {
        const { eventId } = req.params;

        try {
            const { rows } = await pool.query('DELETE FROM events WHERE event_id = $1 RETURNING *', [eventId]);

            if (rows.length === 0) {
                return res.status(404).json({ message: "Evento no encontrado." });
            }

            res.status(200).json({ message: "Evento eliminado." });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Controlador para registrar un asistente a un evento
    registerAttendee: async (req, res) => {
        const { eventId } = req.params;
        const { userId } = req.body; // Suponiendo que el ID del usuario viene en el cuerpo de la solicitud

        try {
            const { rows } = await pool.query(
                'INSERT INTO attendees (event_id, user_id) VALUES ($1, $2) RETURNING *',
                [eventId, userId]
            );
            res.status(201).json(rows[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = eventController;
