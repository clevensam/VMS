// server.js - Main Server File
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');
const { registerUser, loginUser } = require('./controllers/authController');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic Route
app.get('/', (req, res) => {
  res.send('VMS Backend is running...');
});

// Authentication Routes
app.post('/api/auth/signup', registerUser);
app.post('/api/auth/login', loginUser);

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
