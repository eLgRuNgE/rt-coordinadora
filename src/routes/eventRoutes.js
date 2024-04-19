const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

/**
 * @openapi
 * /events:
 *   get:
 *     tags:
 *       - Events
 *     summary: Retrieves a list of events.
 *     description: This endpoint retrieves all the events stored in the database.
 *     responses:
 *       200:
 *         description: A list of events.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 */

router.get('/', eventController.getAllEvents);

/**
 * @openapi
 * /events/{eventId}:
 *   get:
 *     tags:
 *       - Events
 *     summary: Retrieves a specific event by ID.
 *     description: This endpoint retrieves a specific event using its ID.
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the event to get.
 *     responses:
 *       200:
 *         description: Event retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       404:
 *         description: Event not found.
 */

router.get('/:eventId', eventController.getEventById);

/**
 * @openapi
 * /events:
 *   post:
 *     tags:
 *       - Events
 *     summary: Creates a new event.
 *     description: This endpoint creates a new event with the data provided in the request body.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       201:
 *         description: Event created successfully.
 *       500:
 *         description: Error creating the event.
 */

router.post('/', eventController.createEvent);

/**
 * @openapi
 * /events/{eventId}:
 *   put:
 *     tags:
 *       - Events
 *     summary: Updates an existing event.
 *     description: This endpoint updates an existing event identified by its ID with the data provided in the request body.
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the event to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       200:
 *         description: Event updated successfully.
 *       404:
 *         description: Event not found.
 */

router.put('/:eventId', eventController.updateEvent);

/**
 * @openapi
 * /events/{eventId}:
 *   delete:
 *     tags:
 *       - Events
 *     summary: Deletes an event.
 *     description: This endpoint deletes an event identified by its ID.
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the event to delete.
 *     responses:
 *       200:
 *         description: Event deleted successfully.
 *       404:
 *         description: Event not found.
 */

router.delete('/:eventId', eventController.deleteEvent);

/**
 * @openapi
 * /events/{eventId}:
 *   delete:
 *     tags:
 *       - Events
 *     summary: Deletes an event.
 *     description: This endpoint deletes an event identified by its ID.
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the event to delete.
 *     responses:
 *       200:
 *         description: Event deleted successfully.
 *       404:
 *         description: Event not found.
 */


// Ruta para registrar un asistente a un evento
router.post('/:eventId/attendees', eventController.registerAttendee);

/**
 * @openapi
 * /events/{eventId}/attendees:
 *   post:
 *     tags:
 *       - Events
 *     summary: Registers an attendee for an event.
 *     description: This endpoint registers an attendee to a specific event by event ID.
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the event to register the attendee to.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: The ID of the user who is registering as an attendee.
 *             required:
 *               - userId
 *     responses:
 *       201:
 *         description: Attendee registered successfully.
 *       404:
 *         description: Event not found.
 *       400:
 *         description: Invalid input data.
 */

// Exporta el router para poder ser utilizado en otras partes de la aplicación
module.exports = router;