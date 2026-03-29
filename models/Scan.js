// models/Scan.js — defines the shape of a scan in MongoDB
const mongoose = require('mongoose');

const scanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['password', 'url'],
    required: true
  },
  input: {
    type: String,
    required: true
  },
  result: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Scan', scanSchema);