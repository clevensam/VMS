console.log('✅ bookingRoutes.js is now loaded');
const express = require('express');
const router = express.Router();
const db = require('../db');

// ✅ Create a new booking
router.post('/', (req, res) => {
  const { venue, category, startDate, duration, attendees, purpose } = req.body;

  if (!venue || !category || !startDate || !duration || !attendees || !purpose) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const sql = `
    INSERT INTO bookings 
    (venue_id, category, start_time, duration_minutes, attendees, purpose, status)
    VALUES (?, ?, ?, ?, ?, ?, 'Pending')
  `;

  db.query(sql, [venue, category, startDate, duration, attendees, purpose], (err, result) => {
    if (err) {
      console.error('❌ Error inserting booking:', err);
      return res.status(500).json({ error: 'Booking failed' });
    }
    res.status(201).json({ message: 'Booking successful', bookingId: result.insertId });
  });
});

// ✅ Get all bookings
router.get('/', (req, res) => {
  const sql = `
    SELECT 
      booking_id AS id,
      venue_id AS venue,
      category,
      start_time AS startDate,
      duration_minutes AS duration,
      attendees,
      purpose,
      status
    FROM bookings
    ORDER BY start_time DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('❌ Error fetching bookings:', err);
      return res.status(500).json({ error: 'Failed to fetch bookings' });
    }
    res.json(results);
  });
});

// ✅ Cancel a booking
router.put('/:id/cancel', (req, res) => {
  const bookingId = req.params.id;
  const sql = `UPDATE bookings SET status = 'Cancelled' WHERE booking_id = ?`;

  db.query(sql, [bookingId], (err, result) => {
    if (err) {
      console.error('❌ Error cancelling booking:', err);
      return res.status(500).json({ error: 'Failed to cancel booking' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json({ message: 'Booking cancelled successfully' });
  });
});

// ✅ Reschedule a booking
router.put('/:id/reschedule', (req, res) => {
  const { startDate, duration } = req.body;
  const bookingId = req.params.id;

  if (!startDate || !duration) {
    return res.status(400).json({ error: 'Missing new date or duration' });
  }

  const sql = `
    UPDATE bookings 
    SET start_time = ?, duration_minutes = ?, status = 'Pending'
    WHERE booking_id = ?
  `;

  db.query(sql, [startDate, duration, bookingId], (err, result) => {
    if (err) {
      console.error('❌ Error rescheduling booking:', err);
      return res.status(500).json({ error: 'Failed to reschedule booking' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json({ message: 'Booking rescheduled successfully' });
  });
});

// ✅ Debug route to verify connection
router.get('/test', (req, res) => {
  console.log('✅ /api/bookings/test route hit');
  res.send('✅ bookingRoutes is working!');
});

module.exports = router;
