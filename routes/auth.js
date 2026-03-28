// routes/auth.js — authentication routes (register, login)
const express = require('express');
const router = express.Router();

// POST /api/register
router.post('/register', (req, res) => {
  res.json({ message: 'Register route working ✅' });
});

// POST /api/login
router.post('/login', (req, res) => {
  res.json({ message: 'Login route working ✅' });
});

module.exports = router;