const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

/**
 * @openapi
 * /events:
 *   get:
 *     tags:
 *       - Consulta Eventos
 *     summary: Retrieves a list of events.
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
 *       - Consulta Eventos
 *     summary: Retrieves a specific event by ID.
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique identifier of the event to retrieve.
 *     responses:
 *       200:
 *         description: An event object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       404:
 *         description: Event not found.
 *       500:
 *         description: Server error.
 */
router.get('/:eventId', eventController.getEventById);


/**
 * @openapi
 * /events:
 *   post:
 *     tags:
 *       - Eventos
 *     summary: Creates a new event.
 *     description: This endpoint creates a new event with the data provided in the request body, including geocoding the location to latitude and longitude.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - start_time
 *               - end_time
 *               - location
 *               - organizer_id
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the event.
 *               description:
 *                 type: string
 *                 description: A detailed description of the event.
 *               start_time:
 *                 type: string
 *                 format: date-time
 *                 description: The start time of the event.
 *               end_time:
 *                 type: string
 *                 format: date-time
 *                 description: The end time of the event.
 *               location:
 *                 type: string
 *                 description: The textual location of the event, which will be geocoded to latitude and longitude.
 *               organizer_id:
 *                 type: integer
 *                 description: The ID of the user or organizer creating the event.
 *     responses:
 *       201:
 *         description: Event created successfully, including geocoded latitude and longitude.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       400:
 *         description: Invalid request body or parameters.
 *       500:
 *         description: Error creating the event or geocoding the location.
 */
router.post('/', eventController.createEvent);

/**
 * @openapi
 * /events/{eventId}:
 *   put:
 *     tags:
 *       - Eventos
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
 *       - Eventos
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
 * /events/{eventId}/attendees:
 *   get:
 *     tags:
 *       - Consulta Eventos
 *     summary: Retrieves all attendees of a specific event.
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the event to get attendees for.
 *     responses:
 *       200:
 *         description: A list of attendees.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       404:
 *         description: No attendees found or event not found.
 */
router.get('/:eventId/attendees', eventController.getEventAttendees);

/**
 * @openapi
 * /events/{eventId}/attendees:
 *   post:
 *     tags:
 *       - Eventos
 *     summary: Registers an attendee to an event.
 *     description: Adds a user as an attendee to the specified event by eventId.
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the event to which the attendee will be added.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: The ID of the user who is registering as an attendee.
 *     responses:
 *       201:
 *         description: Attendee registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Attendee registered successfully.
 *       400:
 *         description: Bad request, possibly due to missing userId or invalid eventId.
 *       404:
 *         description: Event not found.
 */
// Ruta para registrar un asistente a un evento
router.post('/:eventId/attendees', eventController.registerAttendee);

/**
 * @openapi
 * /events/{eventId}/places:
 *   get:
 *     tags:
 *       - Consulta Eventos
 *     summary: Retrieves places near the event location.
 *     description: This endpoint retrieves a list of places near the event's geolocation.
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the event.
 *     responses:
 *       200:
 *         description: A list of nearby places.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   type:
 *                     type: string
 *                   place_name:
 *                     type: string
 *                   geometry:
 *                     type: object
 *                     properties:
 *                       coordinates:
 *                         type: array
 *                         items:
 *                           type: number
 *       404:
 *         description: Event not found.
 */
router.get('/:eventId/places', eventController.getNearbyPlaces);


/**
 * @openapi
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       required:
 *         - title
 *         - start_time
 *         - end_time
 *         - location
 *         - organizer_id
 *       properties:
 *         event_id:
 *           type: integer
 *           description: The unique identifier for the event.
 *         title:
 *           type: string
 *           description: The title of the event.
 *         description:
 *           type: string
 *           description: A detailed description of the event.
 *         start_time:
 *           type: string
 *           format: date-time
 *           description: The start time of the event.
 *         end_time:
 *           type: string
 *           format: date-time
 *           description: The end time of the event.
 *         location:
 *           type: string
 *           description: The textual location of the event.
 *         latitude:
 *           type: number
 *           format: float
 *           description: The latitude of the event location.
 *         longitude:
 *           type: number
 *           format: float
 *           description: The longitude of the event location.
 *         organizer_id:
 *           type: integer
 *           description: The ID of the organizer of the event.
 */



// Exporta el router para poder ser utilizado en otras partes de la aplicación
module.exports = router;