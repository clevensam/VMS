import React from 'react';
import { 
  FaCalendarCheck, 
  FaHourglassHalf, 
  FaBuilding, 
  FaExclamationTriangle,
  FaAngleRight,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import VenueCards from '../components/venueCards';
import Calendar from '../components/calenda';
const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-md text-gray-600 font-medium">
        <span className="text-blue-600">Login</span>
        <FaAngleRight />
        <span>Dashboard</span>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stat Card 1 */}
        <Link
          to="/bookings/upcoming"
          className="rounded-xl text-white p-5 flex items-center gap-4 bg-blue-600 hover:shadow-lg transition duration-300"
        >
          <div className="bg-white rounded-full w-14 h-14 flex items-center justify-center">
            <FaCalendarCheck className="text-black text-2xl" />
          </div>
          <div>
            <div className="text-2xl font-bold">1</div>
            <div className="text-sm leading-tight">Upcoming Booking</div>
          </div>
        </Link>

        {/* Stat Card 2 */}
        <Link
          to="/bookings/pending"
          className="rounded-xl text-white p-5 flex items-center gap-4 bg-yellow-400 hover:shadow-lg transition duration-300"
        >
          <div className="bg-white rounded-full w-14 h-14 flex items-center justify-center">
            <FaHourglassHalf className="text-black text-2xl" />
          </div>
          <div>
            <div className="text-2xl font-bold">10</div>
            <div className="text-sm leading-tight">Pending Approval</div>
          </div>
        </Link>

        {/* Stat Card 3 */}
        <Link
          to="/available"
          className="rounded-xl text-white p-5 flex items-center gap-4 bg-green-600 hover:shadow-lg transition duration-300"
        >
          <div className="bg-white rounded-full w-14 h-14 flex items-center justify-center">
            <FaBuilding className="text-black text-2xl" />
          </div>
          <div>
            <div className="text-2xl font-bold">60</div>
            <div className="text-sm leading-tight">Active Venue</div>
          </div>
        </Link>

        {/* Stat Card 4 */}
        <Link
          to="/bookings/conflicts"
          className="rounded-xl text-white p-5 flex items-center gap-4 bg-red-600 hover:shadow-lg transition duration-300"
        >
          <div className="bg-white rounded-full w-14 h-14 flex items-center justify-center">
            <FaExclamationTriangle className="text-black text-2xl" />
          </div>
          <div>
            <div className="text-2xl font-bold">6</div>
            <div className="text-sm leading-tight">Recent Conflict</div>
          </div>
        </Link>
      </div>
<VenueCards/>
  <h2 className="text-lg font-bold text-gray-800 ml-152">Calendar</h2>
<Calendar/>
    </div>
  );
};

export default Dashboard;
