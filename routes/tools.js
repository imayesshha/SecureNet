// routes/tools.js — security tool routes
const express = require('express');
const router = express.Router();

// POST /api/check-password
router.post('/check-password', (req, res) => {
  res.json({ message: 'Password checker working ✅' });
});

// POST /api/check-url
router.post('/check-url', (req, res) => {
  res.json({ message: 'URL checker working ✅' });
});

// GET /api/history
router.get('/history', (req, res) => {
  res.json({ message: 'History route working ✅' });
});

module.exports = router;