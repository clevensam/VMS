console.log('✅ bookingRoutes.js is now loaded');
const express = require('express');
const router = express.Router();
const db = require('../db');

// ✅ Create a new booking
router.post('/', (req, res) => {
  const {
    venue,
    category,
    start_time, // May come as `start_time` or `startDate`
    startDate,
    duration,
    attendees,
    purpose
  } = req.body;

  const unifiedStart = start_time || startDate;

  if (!venue || !category || !unifiedStart || !duration || !attendees || !purpose) {
    console.warn('⚠️ Missing required fields:', {
      venue,
      category,
      unifiedStart,
      duration,
      attendees,
      purpose
    });
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const [start_date, start_time_only] = unifiedStart.split('T');

  const sql = `
    INSERT INTO bookings 
    (venue_id, category, start_date, start_time, duration_minutes, attendees, purpose, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, 'Pending')
  `;

  db.query(
    sql,
    [venue, category, start_date, start_time_only, duration, attendees, purpose],
    (err, result) => {
      if (err) {
        console.error('❌ Error inserting booking into DB:', err.sqlMessage || err);
        return res.status(500).json({ error: 'Booking failed', details: err.sqlMessage });
      }

      res.status(201).json({ message: 'Booking successful', bookingId: result.insertId });
    }
  );
});

// ✅ Get all bookings (excluding cancelled)
router.get('/', (req, res) => {
  const sql = `
    SELECT 
      id,
      venue_id AS venue,
      category,
      start_date,
      start_time,
      duration_minutes AS duration,
      attendees,
      purpose,
      status
    FROM bookings
    WHERE status != 'Cancelled'
    ORDER BY start_date DESC, start_time DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('❌ Error fetching bookings:', err.sqlMessage || err);
      return res.status(500).json({ error: 'Failed to fetch bookings' });
    }

    res.json(results);
  });
});

// ✅ Cancel a booking
router.put('/:id/cancel', (req, res) => {
  const bookingId = req.params.id;
  const sql = `UPDATE bookings SET status = 'Cancelled' WHERE id = ?`;

  db.query(sql, [bookingId], (err, result) => {
    if (err) {
      console.error('❌ Error cancelling booking:', err.sqlMessage || err);
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
    return res.status(400).json({ error: 'Missing new start time or duration' });
  }

  const [start_date, start_time_only] = startDate.split('T');

  const sql = `
    UPDATE bookings 
    SET start_date = ?, start_time = ?, duration_minutes = ?, status = 'Pending'
    WHERE id = ?
  `;

  db.query(sql, [start_date, start_time_only, duration, bookingId], (err, result) => {
    if (err) {
      console.error('❌ Error rescheduling booking:', err.sqlMessage || err);
      return res.status(500).json({ error: 'Failed to reschedule booking' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json({ message: 'Booking rescheduled successfully' });
  });
});

// ✅ Debug route
router.get('/test', (req, res) => {
  res.send('✅ bookingRoutes is working!');
});

module.exports = router;
