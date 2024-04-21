const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');


router.get('/attendees_by_weekday', authenticateToken, eventController.fetchAttendeesByWeekday);
router.get('/', eventController.getAllEvents);
router.get('/:eventId', authenticateToken, eventController.getEventById);
router.post('/', authenticateToken, eventController.createEvent);
router.put('/:eventId', authenticateToken, eventController.updateEvent);
router.delete('/:eventId', authenticateToken, eventController.deleteEvent);
router.get('/:eventId/attendees', authenticateToken, eventController.getEventAttendees);
router.post('/:eventId/attendees', authenticateToken, eventController.registerAttendee);
router.get('/:eventId/nearby_places', authenticateToken, eventController.getNearbyPlaces);
module.exports = router;