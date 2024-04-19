const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Ruta para obtener todos los eventos
router.get('/', eventController.getAllEvents);

// Ruta para obtener un evento específico por id
router.get('/:eventId', eventController.getEventById);

// Ruta para crear un nuevo evento
router.post('/', eventController.createEvent);

// Ruta para actualizar un evento existente
router.put('/:eventId', eventController.updateEvent);

// Ruta para eliminar un evento
router.delete('/:eventId', eventController.deleteEvent);

// Ruta para registrar un asistente a un evento
router.post('/:eventId/attendees', eventController.registerAttendee);

// Exporta el router para poder ser utilizado en otras partes de la aplicación
module.exports = router;
