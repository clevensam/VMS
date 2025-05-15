import React from 'react';
import { 
  FaBuilding,
  FaCalendarAlt,
  FaClock,
  FaUsers,
  FaClipboard,
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle
} from 'react-icons/fa';

const RecentlyBooked = () => {
  const bookings = [
    {
      id: 1,
      venue: 'Hall A-12',
      startDate: '2025-05-18T10:00:00',
      duration: 90,
      attendees: 40,
      purpose: 'Midterm exam preparation',
      status: 'Approved',
    },
    {
      id: 2,
      venue: 'Lab B-05',
      startDate: '2025-05-20T14:30:00',
      duration: 60,
      attendees: 20,
      purpose: 'Final CS practical exam',
      status: 'Pending',
    },
    {
      id: 3,
      venue: 'Room C-33',
      startDate: '2025-05-22T09:00:00',
      duration: 30,
      attendees: 10,
      purpose: 'Department meeting',
      status: 'Approved',
    }
  ];

  const statusIcons = {
    Approved: <FaCheckCircle className="text-green-500" />,
    Pending: <FaHourglassHalf className="text-yellow-500" />,
    Rejected: <FaTimesCircle className="text-red-500" />
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      <h3 className="font-bold text-gray-800 mb-6 flex items-center text-xl">
        <FaCalendarAlt className="mr-2 text-blue-500" />
        Recent Bookings
      </h3>
      
      <ul className="space-y-4">
        {bookings.map(booking => (
          <li key={booking.id} className="pb-3 border-b border-gray-100 last:border-b-0">
            <div className="flex items-start">
              {/* Main content */}
              <div className="flex-1">
                <div className="flex items-center mb-1">
                  <FaBuilding className="text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                  <h4 className="font-medium text-gray-900">{booking.venue}</h4>
                </div>
                
                <div className="grid grid-cols-2 gap-2 ml-6 text-sm text-gray-600">
                  <div className="flex items-center">
                    <FaCalendarAlt className="mr-2 text-gray-400" />
                    <span>{formatDate(booking.startDate)}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <FaClock className="mr-2 text-gray-400" />
                    <span>{formatTime(booking.startDate)} • {booking.duration} mins</span>
                  </div>
                  
                  <div className="flex items-center">
                    <FaUsers className="mr-2 text-gray-400" />
                    <span>{booking.attendees} attendees</span>
                  </div>
                  
                  <div className="flex items-start">
                    <FaClipboard className="mr-2 mt-0.5 text-gray-400" />
                    <span className="line-clamp-1">{booking.purpose}</span>
                  </div>
                </div>
              </div>
              
              {/* Status indicator */}
              <div className="flex items-center ml-2">
                {statusIcons[booking.status]}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentlyBooked;