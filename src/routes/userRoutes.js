const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const userController = require('../controllers/userController');

/**
 * @openapi
 * /users/register:
 *   post:
 *     tags:
 *       - Usuarios
 *     summary: Register a new user.
 *     description: This endpoint registers a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *               - email
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully.
 *       400:
 *         description: Invalid input or user already exists.
 */

router.post('/register', authenticateToken, userController.registerUser);

/**
 * @openapi
 * /users/login:
 *   post:
 *     tags:
 *       - Usuarios
 *     summary: User login.
 *     description: This endpoint authenticates a user by username and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User authenticated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Authentication failed.
 */

router.post('/login', userController.loginUser);

/**
 * @openapi
 * /users/profile:
 *   get:
 *     tags:
 *       - Usuarios
 *     summary: Get user profile.
 *     description: This endpoint retrieves the user's profile details.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized.
 */
router.get('/profile', authenticateToken, userController.getUserProfile);

module.exports = router;
