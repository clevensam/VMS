import React from 'react';
import { FaBuilding, FaMapMarkerAlt, FaUsers, FaCalendarAlt } from 'react-icons/fa';
import { format, addDays, isSameDay, startOfWeek } from 'date-fns';

const VenueAvailability = () => {
  // Get current week (Monday to Sunday)
  const weekStart = startOfWeek(new Date());
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  // Sample venue data with bookings
  const venues = [
    {
      id: 1,
      name: 'Grand Ballroom',
      capacity: 200,
      location: 'Main Building',
      bookings: [
        { date: format(addDays(weekStart, 1), 'yyyy-MM-dd') }, // Tuesday
        { date: format(addDays(weekStart, 3), 'yyyy-MM-dd') }  // Thursday
      ]
    },
    {
      id: 2,
      name: 'Conference Room A',
      capacity: 30,
      location: 'West Wing',
      bookings: [
        { date: format(addDays(weekStart, 0), 'yyyy-MM-dd') }, // Monday
        { date: format(addDays(weekStart, 4), 'yyyy-MM-dd') }  // Friday
      ]
    }
  ];

  // Check if venue is booked on a specific date
  const isBooked = (venue, date) => {
    const dateString = format(date, 'yyyy-MM-dd');
    return venue.bookings.some(booking => booking.date === dateString);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Page Heading */}
      <div className="flex items-center mb-6">
        <FaCalendarAlt className="text-blue-600 mr-2 text-xl" />
        <h1 className="text-2xl font-bold text-gray-800">Venue Availability</h1>
      </div>

      {/* Indicator Key */}
      <div className="bg-gray-50 rounded-lg p-3 mb-6 border border-gray-200">
        <h3 className="font-medium text-gray-700 mb-2">Availability Key:</h3>
        <div className="flex space-x-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm">Available</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
            <span className="text-sm">Booked</span>
          </div>
        </div>
      </div>

      {/* Venue Cards */}
      {venues.map(venue => (
        <div key={venue.id} className="mb-8 bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          {/* Venue Header */}
          <div className="flex items-start mb-4">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <FaBuilding className="text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">{venue.name}</h2>
              <div className="flex items-center text-gray-600">
                <FaUsers className="mr-1" />
                <span className="mr-3">{venue.capacity} pax</span>
                <FaMapMarkerAlt className="mr-1" />
                <span>{venue.location}</span>
              </div>
            </div>
          </div>

          {/* Availability Section */}
          <div>
            <h3 className="text-md font-semibold mb-3 text-gray-700">Availability This Week:</h3>
            
            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-1 mb-1">
              {weekDays.map(day => (
                <div key={day.toString()} className="text-center">
                  <div className="text-xs font-medium text-gray-500">
                    {format(day, 'EEE')}
                  </div>
                </div>
              ))}
            </div>

            {/* Date Numbers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {weekDays.map(day => (
                <div 
                  key={day.toString()} 
                  className={`text-center text-sm font-medium ${
                    isSameDay(day, new Date()) 
                      ? 'bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mx-auto' 
                      : 'text-gray-700'
                  }`}
                >
                  {format(day, 'd')}
                </div>
              ))}
            </div>

            {/* Availability Indicators */}
            <div className="grid grid-cols-7 gap-1">
              {weekDays.map(day => (
                <div key={day.toString()} className="text-center">
                  <div className={`w-4 h-4 rounded-full mx-auto ${
                    isBooked(venue, day) 
                      ? 'bg-red-500' 
                      : 'bg-green-500'
                  }`}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VenueAvailability;