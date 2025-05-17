import React from 'react';
import {
  FaBuilding,
  FaCalendarAlt,
  FaClock,
  FaUsers,
  FaClipboard,
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
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
    },
  ];

  const statusIcons = {
    Approved: <FaCheckCircle className="text-green-500" />,
    Pending: <FaHourglassHalf className="text-yellow-500" />,
    Rejected: <FaTimesCircle className="text-red-500" />,
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200 overflow-x-auto">
      <h3 className="font-bold text-gray-800 mb-4 flex items-center text-xl">
        <FaCalendarAlt className="mr-2 text-blue-500" />
        Recent Bookings
      </h3>

      {bookings.length === 0 ? (
        <p className="text-sm text-gray-500">No recent bookings available.</p>
      ) : (
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs uppercase text-gray-500 bg-gray-50">
            <tr>
              <th className="py-3 px-4">Venue</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Time & Duration</th>
              <th className="py-3 px-4">Attendees</th>
              <th className="py-3 px-4">Purpose</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 font-medium text-gray-900">{booking.venue}</td>
                <td className="py-3 px-4">{formatDate(booking.startDate)}</td>
                <td className="py-3 px-4">
                  {formatTime(booking.startDate)} <span className="text-gray-400">•</span> {booking.duration} mins
                </td>
                <td className="py-3 px-4">{booking.attendees}</td>
                <td className="py-3 px-4 max-w-xs truncate" title={booking.purpose}>
                  {booking.purpose}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full
                      ${
                        booking.status === 'Approved'
                          ? 'bg-green-100 text-green-700'
                          : booking.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                  >
                    {statusIcons[booking.status]} {booking.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RecentlyBooked;
