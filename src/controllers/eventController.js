const axios = require('axios');
const pool = require('../config/db');


const eventController = {
    // Controlador para obtener todos los eventos
    getAllEvents: async (req, res) => {
        try {
            const { rows } = await pool.query('SELECT * FROM events');
            res.json(rows);
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
        const { title, description, start_time, end_time, location, organizer_id } = req.body;
        const mapboxAccessToken = process.env.MAPBOX_ACCESS_TOKEN;

        try {
            // Geocodificar la dirección para obtener latitud y longitud
            const geocodingResponse = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json`, {
                params: {
                    access_token: mapboxAccessToken
                }
            });

            // Tomo las coordenadas del primer resultado
            const [longitude, latitude] = geocodingResponse.data.features[0].center;

            // Insertar el evento en la base de datos con latitud y longitud
            const { rows } = await pool.query(
                'INSERT INTO events (title, description, start_time, end_time, location, latitude, longitude, organizer_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
                [title, description, start_time, end_time, location, latitude, longitude, organizer_id]
            );

            // Devolver el evento creado
            res.status(201).json(rows[0]);
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // La solicitud fue hecha pero no se recibió respuesta
                console.log(error.request);
            } else {
                // Algo sucedió al configurar la solicitud que disparó un Error
                console.log('Error', error.message);
            }
            res.status(500).json({ error: error.message });
        }
    },

    // Controlador para actualizar un evento existente
    updateEvent: async (req, res) => {
        const { eventId } = req.params;
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
    },

    // Controlador para consultar los asistentes a un evento
    getEventAttendees: async (req, res) => {
        const { eventId } = req.params;
        try {
            const { rows } = await pool.query(
                'SELECT users.user_id, users.username, users.email FROM attendees JOIN users ON attendees.user_id = users.user_id WHERE attendees.event_id = $1',
                [eventId]
            );
            if (rows.length === 0) {
                return res.status(404).json({ message: "No se encontraron asistentes para este evento." });
            }
            res.json(rows);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Controlador para obtener los lugares cercanos
    getNearbyPlaces: async (req, res) => {
        const { eventId } = req.params;
        try {
            const eventLocalization = await pool.query('SELECT latitude, longitude FROM events WHERE event_id = $1', [eventId]);
            if (eventLocalization.rows.length === 0) {
                return res.status(404).json({ message: "Evento no encontrado." });
            }
            
            const { latitude, longitude } = eventLocalization.rows[0];

            // Primero verificamos si ya tenemos lugares guardados para este evento
            const cachedPlaces = await pool.query('SELECT * FROM nearby_places WHERE event_id = $1', [eventId]);
            if (cachedPlaces.rows.length > 0) {
                return res.json(cachedPlaces.rows.map(place => ({
                    name: place.name,
                    address: place.address,
                    latitude: place.latitude,
                    longitude: place.longitude
                })));
            }

            // Si no hay lugares en caché, hacemos una llamada a Mapbox
            const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json`, {
                params: {
                    access_token: process.env.MAPBOX_ACCESS_TOKEN,
                    limit: 5,
                    types: 'poi'
                }
            });

            // Guardamos los lugares en la base de datos para futuras consultas
            for (let feature of response.data.features) {
                const { text: name, place_name: address, geometry: { coordinates } } = feature;
                const [long, lat] = coordinates;
                await pool.query('INSERT INTO nearby_places (event_id, name, address, latitude, longitude) VALUES ($1, $2, $3, $4, $5)', [eventId, name, address, lat, long]);
            }

            // Consultamos de nuevo para obtener los lugares recién guardados
            const newPlaces = await pool.query('SELECT * FROM nearby_places WHERE event_id = $1', [eventId]);
            res.json(newPlaces.rows.map(place => ({
                name: place.name,
                address: place.address,
                latitude: place.latitude,
                longitude: place.longitude
            })));
        } catch (error) {
            console.error('Error al obtener lugares cercanos:', error);
            res.status(500).json({ error: error.message });
        }
    }

};

module.exports = eventController;
