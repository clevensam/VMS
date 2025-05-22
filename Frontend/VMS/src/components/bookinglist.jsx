import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookingCard from './bookingcard';
import { FaCalendarAlt } from 'react-icons/fa';

const BookingList = () => {
  const [activeTab, setActiveTab] = useState('Pending');

  // Booking data grouped by status
  const [bookings, setBookings] = useState({
    Pending: [],
    Approved: [],
    Conflict: []
  });

  // Fetch and group bookings by status
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/bookings');
        console.log('Bookings from backend:', res.data); // ✅ Debug log

        const grouped = {
          Pending: [],
          Approved: [],
          Conflict: []
        };

        res.data.forEach(b => {
          // Normalize status (e.g., 'pending' → 'Pending')
          const rawStatus = b.status || 'Pending';
          const status = rawStatus.charAt(0).toUpperCase() + rawStatus.slice(1).toLowerCase();

          if (grouped[status]) {
            grouped[status].push(b);
          } else {
            grouped.Conflict.push(b); // Fallback bucket
          }
        });

        setBookings(grouped);
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="container mx-auto p-6 ml-2">
      {/* Header */}
      <div className="flex items-center mb-6">
        <FaCalendarAlt className="text-blue-600 mr-2 text-xl" />
        <h1 className="text-2xl font-bold text-gray-800">My Booking</h1>
      </div>

      {/* Tabs */}
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

      {/* Booking Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* ✅ Temporarily show all bookings for debugging */}
        {Object.values(bookings).flat().length > 0 ? (
          Object.values(bookings).flat().map((booking) => (
            <BookingCard key={booking.booking_id || booking.id} booking={booking} />
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500">No bookings found</p>
          </div>
        )}

        {/* 📝 To enable tab filtering again, just swap with this below:
        {bookings[activeTab].length > 0 ? (
          bookings[activeTab].map((booking) => (
            <BookingCard key={booking.booking_id || booking.id} booking={booking} />
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500">No {activeTab.toLowerCase()} bookings found</p>
          </div>
        )}
        */}
      </div>
    </div>
  );
};

export default BookingList;
