// routes/index.js — Main API router (mounts all route modules)

const express = require('express');
const authRoutes = require('./auth');
const toolsRoutes = require('./tools');
const router = express.Router();

// Auth routes: /api/auth/register, /api/auth/login
router.use('/auth', authRoutes);

// Tools routes: /api/tools/check-password, /api/tools/check-url, /api/tools/history  
router.use('/tools', toolsRoutes);

module.exports = router;
