import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FaBuilding,
  FaCalendarAlt,
  FaClock,
  FaUsers,
  FaClipboard,
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
  FaSync,
} from 'react-icons/fa';

const RecentlyBooked = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const statusIcons = {
    Approved: <FaCheckCircle className="text-green-500" />,
    Pending: <FaHourglassHalf className="text-yellow-500" />,
    Rejected: <FaTimesCircle className="text-red-500" />,
  };

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/bookings');

      const parseDate = (dateString) => {
        if (!dateString) return null;
        let date = new Date(dateString);
        if (!isNaN(date.getTime())) return date;

        if (typeof dateString === 'string' && dateString.includes('T')) {
          date = new Date(dateString + ':00');
          if (!isNaN(date.getTime())) return date;
        }
        return null;
      };

      const normalized = res.data.map((booking) => ({
        ...booking,
        startDate: parseDate(booking.startDate),
        endDate: parseDate(booking.endDate),
        duration:
          booking.duration ||
          (booking.startDate && booking.endDate
            ? Math.round(
                (new Date(booking.endDate) - new Date(booking.startDate)) /
                  (1000 * 60)
              )
            : null),
      }));

      const sorted = normalized.sort(
        (a, b) => new Date(b.startDate) - new Date(a.startDate)
      );

      setBookings(sorted);
      setError(null);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError('Failed to load bookings. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const formatDate = (date) =>
    date?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

  const formatTime = (date) =>
    date?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200 overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-800 flex items-center text-xl">
          <FaCalendarAlt className="mr-2 text-blue-500" />
          Recent Bookings
        </h3>
        <button
          onClick={fetchBookings}
          className="flex items-center text-sm text-blue-600 hover:text-blue-800"
        >
          <FaSync className="mr-1" /> Refresh
        </button>
      </div>

      {isLoading ? (
        <p className="text-sm text-gray-500">Loading bookings...</p>
      ) : error ? (
        <p className="text-sm text-red-500">{error}</p>
      ) : bookings.length === 0 ? (
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
              <tr
                key={booking.id || booking._id}
                className="border-t border-gray-100 hover:bg-gray-50"
              >
                <td className="py-3 px-4 font-medium text-gray-900">
                  {booking.venue}
                </td>
                <td className="py-3 px-4">{formatDate(booking.startDate)}</td>
                <td className="py-3 px-4">
                  {formatTime(booking.startDate)}{' '}
                  <span className="text-gray-400">•</span>{' '}
                  {booking.duration ?? '-'} mins
                </td>
                <td className="py-3 px-4">{booking.attendees}</td>
                <td
                  className="py-3 px-4 max-w-xs truncate"
                  title={booking.purpose}
                >
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
                    {statusIcons[booking.status] ?? <FaTimesCircle className="text-gray-400" />} {booking.status}
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
