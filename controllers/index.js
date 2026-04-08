// controllers/index.js — Exports all controllers for easy server.js import

const authController = require('./authController');
const toolsController = require('./toolsController');

module.exports = {
  authController,
  toolsController
};
