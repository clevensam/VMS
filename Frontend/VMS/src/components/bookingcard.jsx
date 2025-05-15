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
  FaEdit,
  FaTrashAlt
} from 'react-icons/fa';

const BookingCard = ({ booking }) => {
  // Status configuration
  const statusConfig = {
    Approved: {
      icon: <FaCheckCircle className="text-green-500" />,
      color: 'text-green-600'
    },
    Pending: {
      icon: <FaHourglassHalf className="text-yellow-500" />,
      color: 'text-yellow-600'
    },
    Rejected: {
      icon: <FaTimesCircle className="text-red-500" />,
      color: 'text-red-600'
    }
  };

  // Category configuration
  const categoryConfig = {
    Lecture: 'bg-purple-100 text-purple-600',
    Exam: 'bg-red-100 text-red-600',
    Meeting: 'bg-green-100 text-green-600',
    Workshop: 'bg-blue-100 text-blue-600',
    default: 'bg-gray-100 text-gray-600'
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-5 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <FaBuilding className="text-blue-500 mr-2" />
          {booking.venue}
        </h3>
        <span className={`text-xs px-2 py-1 rounded-full ${
          categoryConfig[booking.category] || categoryConfig.default
        }`}>
          {booking.category}
        </span>
      </div>

      {/* Details */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <FaCalendarAlt className="text-blue-400 mr-2 flex-shrink-0" />
          <span>
            <strong>Date:</strong> {new Date(booking.startDate).toLocaleDateString()}
          </span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <FaClock className="text-blue-400 mr-2 flex-shrink-0" />
          <span>
            <strong>Time:</strong> {new Date(booking.startDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
          </span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <FaClock className="text-blue-400 mr-2 flex-shrink-0" />
          <span>
            <strong>Duration:</strong> {booking.duration} minutes
          </span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <FaUsers className="text-blue-400 mr-2 flex-shrink-0" />
          <span>
            <strong>Attendees:</strong> {booking.attendees}
          </span>
        </div>
        
        <div className="flex items-start text-sm text-gray-600">
          <FaClipboardList className="text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
          <span>
            <strong>Purpose:</strong> {booking.purpose}
          </span>
        </div>
        
        <div className="flex items-center text-sm">
          <span className="mr-2">{statusConfig[booking.status]?.icon}</span>
          <span className={`font-medium ${statusConfig[booking.status]?.color}`}>
            {booking.status}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 border-t pt-3">
        <button className="flex items-center text-sm text-red-500 hover:text-red-700 transition-colors">
          <FaTrashAlt className="mr-1" />
          Cancel
        </button>
        <button className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors">
          <FaEdit className="mr-1" />
          Edit
        </button>
      </div>
    </div>
  );
};

export default BookingCard;