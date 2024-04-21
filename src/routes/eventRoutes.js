const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');


router.get('/attendees_by_weekday', eventController.fetchAttendeesByWeekday);
router.get('/', eventController.getAllEvents);
router.get('/:eventId', eventController.getEventById);
router.post('/', eventController.createEvent);
router.put('/:eventId', eventController.updateEvent);
router.delete('/:eventId', eventController.deleteEvent);
router.get('/:eventId/attendees', eventController.getEventAttendees);
router.post('/:eventId/attendees', eventController.registerAttendee);
router.get('/:eventId/nearby_places', eventController.getNearbyPlaces);
module.exports = router;