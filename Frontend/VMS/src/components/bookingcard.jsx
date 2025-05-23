import React from 'react';
import {
  FaBuilding,
  FaCalendarAlt,
  FaClock,
  FaUsers,
  FaClipboardList,
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
  FaCalendarPlus,
  FaBan
} from 'react-icons/fa';

const BookingCard = ({ booking, onReschedule, onCancel }) => {
  const statusConfig = {
    Approved: {
      icon: <FaCheckCircle className="text-green-500" />,
      color: 'bg-green-100 text-green-800'
    },
    Pending: {
      icon: <FaHourglassHalf className="text-yellow-500" />,
      color: 'bg-yellow-100 text-yellow-800'
    },
    Conflict: {
      icon: <FaTimesCircle className="text-red-500" />,
      color: 'bg-red-100 text-red-800'
    },
    Rejected: {
      icon: <FaTimesCircle className="text-red-500" />,
      color: 'bg-red-100 text-red-800'
    }
  };

  const categoryConfig = {
    Lecture: 'bg-purple-100 text-purple-600',
    Exam: 'bg-red-100 text-red-600',
    Meeting: 'bg-green-100 text-green-600',
    Event: 'bg-blue-100 text-blue-600',
    default: 'bg-gray-100 text-gray-600'
  };

  const normalizedStatus = booking.status
    ? booking.status.charAt(0).toUpperCase() + booking.status.slice(1).toLowerCase()
    : 'Pending';

  const formatDate = (date) => {
    try {
      const d = new Date(date);
      return d.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'Not specified';
    }
  };

  const formatTime = (date) => {
    try {
      const d = new Date(date);
      return d.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Not specified';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-5 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <FaBuilding className="text-blue-500 mr-2" />
          {booking.venue?.name || booking.venue || 'Venue not specified'}
        </h3>
        <span className={`text-xs px-2 py-1 rounded-full ${
          categoryConfig[booking.category] || categoryConfig.default
        }`}>
          {booking.category || 'Uncategorized'}
        </span>
      </div>

      {/* Details */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <FaCalendarAlt className="text-blue-400 mr-2" />
          <span><strong>Date:</strong> {formatDate(booking.startDate)}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <FaClock className="text-blue-400 mr-2" />
          <span>
            <strong>Time:</strong> {formatTime(booking.startDate)}
            {booking.endDate && ` - ${formatTime(booking.endDate)}`}
          </span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <FaClock className="text-blue-400 mr-2" />
          <span><strong>Duration:</strong> {booking.duration || 'N/A'} minutes</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <FaUsers className="text-blue-400 mr-2" />
          <span><strong>Attendees:</strong> {booking.attendees || 'N/A'}</span>
        </div>
        <div className="flex items-start text-sm text-gray-600">
          <FaClipboardList className="text-blue-400 mr-2 mt-0.5" />
          <span><strong>Purpose:</strong> {booking.purpose || 'Not specified'}</span>
        </div>
        <div className="flex items-center text-sm">
          <span className="mr-2">{statusConfig[normalizedStatus]?.icon}</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            statusConfig[normalizedStatus]?.color || 'bg-gray-100 text-gray-800'
          }`}>
            {normalizedStatus}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 border-t pt-3">
        <button
          onClick={() => onCancel(booking.id)}
          className="flex items-center text-sm text-red-500 hover:text-red-700 transition-colors"
        >
          <FaBan className="mr-1" />
          Cancel Booking
        </button>
        <button
          onClick={() => onReschedule(booking)}
          className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
        >
          <FaCalendarPlus className="mr-1" />
          Reschedule
        </button>
      </div>
    </div>
  );
};

export default BookingCard;
