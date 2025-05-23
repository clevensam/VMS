import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookingCard from './bookingCard';
import { FaCalendarAlt, FaSync } from 'react-icons/fa';

const BookingList = ({ refreshTrigger }) => {
  const [activeTab, setActiveTab] = useState('Pending');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const [bookings, setBookings] = useState({
    Pending: [],
    Approved: [],
    Conflict: []
  });

  // 📦 Fetch and group bookings
  const fetchBookings = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get('http://localhost:5000/api/bookings');

      const grouped = {
        Pending: [],
        Approved: [],
        Conflict: []
      };

      res.data.forEach((booking) => {
        const parseDate = (dateString) => {
          if (!dateString) return null;
          let date = new Date(dateString);
          if (!isNaN(date)) return date;

          // Try fallback format
          if (typeof dateString === 'string' && dateString.includes('T')) {
            date = new Date(dateString + ':00');
            return isNaN(date) ? null : date;
          }
          return null;
        };

        const normalizedBooking = {
          ...booking,
          startDate: parseDate(booking.startDate),
          endDate: parseDate(booking.endDate),
          duration:
            booking.duration ||
            (booking.startDate && booking.endDate
              ? Math.round((new Date(booking.endDate) - new Date(booking.startDate)) / 60000)
              : null)
        };

        const rawStatus = booking.status || 'Pending';
        const status = rawStatus.charAt(0).toUpperCase() + rawStatus.slice(1).toLowerCase();

      if (status === 'Cancelled') {
      // ❌ Exclude cancelled bookings from display
      return;
      }

    if (grouped[status]) {
    grouped[status].push(normalizedBooking);
    } else {
    grouped.Conflict.push(normalizedBooking);
    }

      });

      setBookings(grouped);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
      setError('Failed to load bookings. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [refreshTrigger]);

  const handleRefresh = () => fetchBookings();

  // ❌ Cancel Booking
  const handleCancelBooking = async (bookingId) => {
    if (!bookingId) return alert('Invalid booking ID.');
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;

    try {
      await axios.put(`http://localhost:5000/api/bookings/${bookingId}/cancel`);
      alert('Booking cancelled.');
      fetchBookings();
    } catch (err) {
      console.error('Cancel failed:', err);
      alert('Failed to cancel booking.');
    }
  };

  // 🔄 Reschedule Booking
  const handleRescheduleBooking = async (booking) => {
    if (!booking || !booking.id) return alert('Invalid booking data.');

    const defaultDate = booking.startDate?.toISOString().split('T')[0];
    const defaultTime = booking.startDate?.toTimeString().slice(0, 5);

    const newDate = prompt('Enter new date (YYYY-MM-DD):', defaultDate);
    const newTime = prompt('Enter new time (HH:MM):', defaultTime);
    const newDuration = prompt('Enter new duration (minutes):', booking.duration);

    if (!newDate || !newTime || !newDuration) return;

    const startDateTime = `${newDate}T${newTime}`;

    try {
      await axios.put(`http://localhost:5000/api/bookings/${booking.id}/reschedule`, {
        startDate: startDateTime,
        duration: newDuration
      });
      alert('Booking rescheduled.');
      fetchBookings();
    } catch (err) {
      console.error('Reschedule failed:', err);
      alert('Failed to reschedule booking.');
    }
  };

  return (
    <div className="container mx-auto p-6">
      {/* 📅 Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <FaCalendarAlt className="text-blue-600 mr-2 text-xl" />
          <h1 className="text-2xl font-bold text-gray-800">My Bookings</h1>
        </div>
        <button
          onClick={handleRefresh}
          className="flex items-center text-sm text-blue-600 hover:text-blue-800"
        >
          <FaSync className="mr-1" />
          Refresh
        </button>
      </div>

      {lastUpdated && (
        <p className="text-xs text-gray-500 mb-4">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </p>
      )}

      {/* 🔁 Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        {['Pending', 'Approved', 'Conflict'].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 text-sm font-medium relative ${
              activeTab === tab
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
            {bookings[tab].length > 0 && (
              <span className={`ml-1 text-xs px-2 py-0.5 rounded-full ${
                tab === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                tab === 'Approved' ? 'bg-green-100 text-green-800' :
                'bg-red-100 text-red-800'
              }`}>
                {bookings[tab].length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* 🪄 Bookings Display */}
      {isLoading ? (
        <div className="text-center py-10 text-gray-500">Loading bookings...</div>
      ) : error ? (
        <div className="text-center py-10 text-red-500">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {bookings[activeTab].length > 0 ? (
            bookings[activeTab].map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onCancel={() => handleCancelBooking(booking.id)}
                onReschedule={() => handleRescheduleBooking(booking)}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-gray-500">
              No {activeTab.toLowerCase()} bookings found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BookingList;
