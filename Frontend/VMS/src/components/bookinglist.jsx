import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookingCard from './BookingCard';
import { FaCalendarAlt, FaSync } from 'react-icons/fa';

const BookingList = ({ refreshTrigger }) => {
  const [activeTab, setActiveTab] = useState('Pending');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Booking data grouped by status
  const [bookings, setBookings] = useState({
    Pending: [],
    Approved: [],
    Conflict: []
  });

  // Fetch and group bookings by status
  const fetchBookings = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get('http://localhost:5000/api/bookings');
      
      const grouped = {
        Pending: [],
        Approved: [],
        Conflict: []
      };

    // In the fetchBookings function:
res.data.forEach(booking => {
  // Robust date parsing that handles both ISO strings and your form's format
  const parseDate = (dateString) => {
    if (!dateString) return null;
    // Try ISO format first
    let date = new Date(dateString);
    if (!isNaN(date.getTime())) return date;
    
    // Try your form's datetime-local format (YYYY-MM-DDTHH:MM)
    if (typeof dateString === 'string' && dateString.includes('T')) {
      date = new Date(dateString + ':00'); // Add seconds if missing
      if (!isNaN(date.getTime())) return date;
    }
    
    return null;
  };

  const normalizedBooking = {
    ...booking,
    startDate: parseDate(booking.startDate),
    endDate: parseDate(booking.endDate),
    // Calculate duration if not provided
    duration: booking.duration || (
      booking.startDate && booking.endDate 
        ? Math.round((new Date(booking.endDate) - new Date(booking.startDate)) / (1000 * 60))
        : null
    )
  };
  
  // ... rest

        // Normalize status
        const rawStatus = booking.status || 'Pending';
        const status = rawStatus.charAt(0).toUpperCase() + rawStatus.slice(1).toLowerCase();

        if (grouped[status]) {
          grouped[status].push(normalizedBooking);
        } else {
          grouped.Conflict.push(normalizedBooking);
        }
      });

      setBookings(grouped);
      setError(null);
      setLastUpdated(new Date());
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

  const handleRefresh = () => {
    fetchBookings();
  };

  return (
    <div className="container mx-auto p-6">
      {/* Header with refresh button */}
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

      {/* Last updated time */}
      {lastUpdated && (
        <p className="text-xs text-gray-500 mb-4">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </p>
      )}

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

      {/* Loading and Error States */}
      {isLoading ? (
        <div className="text-center py-10">
          <p className="text-gray-500">Loading bookings...</p>
        </div>
      ) : error ? (
        <div className="text-center py-10 text-red-500">
          <p>{error}</p>
        </div>
      ) : (
        /* Booking Cards Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {bookings[activeTab].length > 0 ? (
            bookings[activeTab]
              .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
              .map((booking) => (
                <BookingCard 
                  key={booking.id || booking._id} 
                  booking={booking} 
                  onStatusChange={fetchBookings}
                />
              ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-500">
                No {activeTab.toLowerCase()} bookings found
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BookingList;