console.log('✅ bookingRoutes.js is now loaded');
const express = require('express');
const router = express.Router();
const db = require('../db');

// ✅ Create a new booking
router.post('/', (req, res) => {
  const {
    venue,
    category,
    startDate,
    duration,
    attendees,
    purpose
  } = req.body;

  const sql = `
    INSERT INTO bookings 
    (venue_id, category, start_time, duration_minutes, attendees, purpose, status)
    VALUES (?, ?, ?, ?, ?, ?, 'Pending')
  `;

  db.query(sql, [venue, category, startDate, duration, attendees, purpose], (err, result) => {
    if (err) {
      console.error('Error inserting booking:', err);
      return res.status(500).json({ error: 'Booking failed' });
    }
    res.status(201).json({ message: 'Booking successful', bookingId: result.insertId });
  });
});

// ✅ Get all bookings
router.get('/', (req, res) => {
  const sql = `SELECT * FROM bookings ORDER BY start_time DESC`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching bookings:', err);
      return res.status(500).json({ error: 'Failed to fetch bookings' });
    }
    res.json(results);
  });
});

// ✅ Debug route to verify connection
router.get('/test', (req, res) => {
  console.log('✅ /api/bookings/test route hit');
  res.send('✅ bookingRoutes is working!');
});

module.exports = router;
