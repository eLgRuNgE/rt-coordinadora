const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const userController = require('../controllers/userController');


router.post('/login', userController.loginUser);
router.post('/register', userController.registerUser);
router.get('/profile', authenticateToken, userController.getUserProfile);
module.exports = router;
