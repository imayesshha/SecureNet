// server.js — SecureNet Backend (Complete Express + Mongo + Vercel/Local Ready)

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

const apiRoutes = require('./routes');

// App setup
const app = express();
const PORT = process.env.PORT || 5000;

// === MIDDLEWARE ===
app.use(helmet()); // Security headers
app.use(cors()); // CORS for frontend
app.use(express.json({ limit: '10mb' })); // Parse JSON bodies

// Rate limiting (100 reqs/15min per IP)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { message: 'Too many requests, please try again later' }
});
app.use('/api/', limiter);

// Serve static frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/dist')));
} else {
  app.use(express.static(path.join(__dirname, 'public')));
}

// === ROUTES ===
app.use('/api', apiRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development'
  });
});

// Catch-all for frontend routes (Vercel SPA support)
    app.get(/.*/, (req, res) => {
if (process.env.NODE_ENV === 'production') {
  res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
} else {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
}
});

// === MONGO CONNECTION ===
mongoose.connection.once('open', () => {
  console.log('✅ MongoDB Connected');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB Error:', err);
});

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB Connection Failed:', error.message);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGTERM', () => {
  mongoose.connection.close(() => {
    console.log('MongoDB disconnected (SIGTERM)');
    process.exit(0);
  });
});

// === START SERVER ===
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📊 Health: http://localhost:${PORT}/api/health`);
      console.log(`🌐 Frontend: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Server failed to start:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app; // Vercel export
