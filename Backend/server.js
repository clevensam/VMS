// server.js - Main Server File
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');
const { registerUser, loginUser } = require('./controllers/authController');

const bookingRoutes = require('./routes/bookingRoutes'); // ✅ Import routes
console.log('✅ bookingRoutes module loaded'); // ✅ Confirm route file loaded

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic Route
app.get('/', (req, res) => {
  res.send('VMS Backend is running...');
});

// ✅ Fallback test route to verify base route is working
app.get('/api/bookings/test', (req, res) => {
  res.send('🧪 Direct test route from server.js works!');
});

// Authentication Routes
app.post('/api/auth/signup', registerUser);
app.post('/api/auth/login', loginUser);

// Booking Route
app.use('/api/bookings', bookingRoutes); // ✅ Mount the booking route
console.log('✅ /api/bookings route mounted');

// Start the Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
