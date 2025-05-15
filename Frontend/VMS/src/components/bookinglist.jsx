import React, { useState } from 'react';
import BookingCard from './bookingcard';
import { FaCalendarAlt } from 'react-icons/fa';

const BookingList = () => {
  const [activeTab, setActiveTab] = useState('Pending');

  // Sample booking data categorized by status
  const bookings = {
    Pending: [
      {
        id: 1,
        venue: 'Hall A-12',
        category: 'Lecture',
        startDate: '2025-05-18T10:00:00',
        duration: 90,
        attendees: 40,
        purpose: 'Midterm exam preparation',
        status: 'Pending'
      },
      {
        id: 2,
        venue: 'Lab B-05',
        category: 'Exam',
        startDate: '2025-05-20T14:30:00',
        duration: 60,
        attendees: 20,
        purpose: 'Final CS practical',
        status: 'Pending'
      }
    ],
    Approved: [
      {
        id: 3,
        venue: 'Room C-33',
        category: 'Meeting',
        startDate: '2025-05-22T09:00:00',
        duration: 30,
        attendees: 10,
        purpose: 'Department meeting',
        status: 'Approved'
      },
      {
        id: 4,
        venue: 'Auditorium',
        category: 'Workshop',
        startDate: '2025-05-25T13:00:00',
        duration: 120,
        attendees: 100,
        purpose: 'Tech conference',
        status: 'Approved'
      }
    ],
    Conflict: [
      {
        id: 5,
        venue: 'Hall A-12',
        category: 'Lecture',
        startDate: '2025-05-18T10:30:00',
        duration: 120,
        attendees: 50,
        purpose: 'Guest speaker session',
        status: 'Conflict'
      }
    ]
  };

  return (
    <div className="container mx-auto p-6 ml-2">
      {/* Header */}
      <div className="flex items-center mb-6">
        <FaCalendarAlt className="text-blue-600 mr-2 text-xl" />
        <h1 className="text-2xl font-bold text-gray-800">My Booking </h1>
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
        {bookings[activeTab].length > 0 ? (
          bookings[activeTab].map(booking => (
            <BookingCard key={booking.id} booking={booking} />
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500">No {activeTab.toLowerCase()} bookings found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingList;