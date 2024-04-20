const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const upload = require('../middleware/upload');
const bulkDataUploadController = require('../controllers/bulkDataUploadController');

/**
 * @openapi
 * /bulk-upload/upload:
 *   post:
 *     tags:
 *       - Carga Masiva (Plantilla Excel)
 *     summary: Upload an Excel file for bulk event data upload.
 *     description: This endpoint allows users to upload Excel files containing event information for processing and storing in the database.
 *     security:
 *       - bearerAuth: [] # Ensure the securitySchemes component is already defined in your Swagger configuration
 *     requestBody:
 *       description: Excel file to upload
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The Excel file to upload.
 *     responses:
 *       200:
 *         description: Data uploaded successfully.
 *       401:
 *         description: Unauthorized, invalid or missing JWT token.
 *       500:
 *         description: Internal server error.
 */
router.post('/upload', authenticateToken, upload.single('file'), bulkDataUploadController.uploadExcelData);

module.exports = router;
