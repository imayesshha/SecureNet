const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const apiRoutes = require('./routes');

const app = express();

// === MIDDLEWARE ===
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { message: 'Too many requests, please try again later' }
});
app.use('/api/', limiter);

// === DB CONNECTION (lazy, serverless-safe) ===
let dbConnected = false;

const connectDB = async () => {
  if (dbConnected) return;
  if (!process.env.MONGO_URI) {
    console.warn('⚠️ No MONGO_URI set');
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    dbConnected = true;
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Connection Failed:', error.message);
    // ❌ REMOVED process.exit(1) — this was crashing Vercel!
  }
};

// === ROUTES ===
app.get('/api/health', async (req, res) => {
  await connectDB();
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development',
    db: dbConnected ? 'connected' : 'disconnected'
  });
});

app.use('/api', async (req, res, next) => {
  await connectDB();
  next();
});




// Catch-all (404 for unknown routes)
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Local dev only
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;