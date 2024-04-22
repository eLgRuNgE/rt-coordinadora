const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const upload = require('../middleware/upload');
const bulkDataUploadController = require('../controllers/bulkDataUploadController');


router.post('/upload', authenticateToken, upload.single('file'), bulkDataUploadController.uploadExcelData);
module.exports = router;
