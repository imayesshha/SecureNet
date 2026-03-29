// routes/tools.js — security tool routes (protected)
const express = require('express');
const router = express.Router();
const { checkPassword, checkUrl, getHistory } = require('../controllers/toolsController');
const { protect } = require('../middleware/authMiddleware');

// All routes below are protected — need JWT token
router.post('/check-password', protect, checkPassword);
router.post('/check-url', protect, checkUrl);
router.get('/history', protect, getHistory);

module.exports = router;