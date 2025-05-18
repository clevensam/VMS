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
import RecentlyBooked from '../components/recentBooking';
import Footer from '../components/footer';

const Dashboard = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Breadcrumb */}
      <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base text-gray-600 font-medium">
        <span className="text-blue-600">Login</span>
        <FaAngleRight className="text-gray-500" />
        <span>Dashboard</span>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Stat Card 1 */}
        <Link
          to="/bookings/my_booking"
          className="rounded-xl text-white p-4 sm:p-5 flex items-center gap-4 bg-blue-600 hover:shadow-lg transition duration-300"
        >
          <div className="bg-white rounded-full w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
            <FaCalendarCheck className="text-black text-xl sm:text-2xl" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold">1</div>
            <div className="text-xs sm:text-sm leading-tight">Upcoming Booking</div>
          </div>
        </Link>

        {/* Stat Card 2 */}
        <Link
          to="/bookings/my_booking"
          className="rounded-xl text-white p-4 sm:p-5 flex items-center gap-4 bg-yellow-400 hover:shadow-lg transition duration-300"
        >
          <div className="bg-white rounded-full w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
            <FaHourglassHalf className="text-black text-xl sm:text-2xl" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold">10</div>
            <div className="text-xs sm:text-sm leading-tight">Pending Approval</div>
          </div>
        </Link>

        {/* Stat Card 3 */}
        <Link
          to="/available_venue"
          className="rounded-xl text-white p-4 sm:p-5 flex items-center gap-4 bg-green-600 hover:shadow-lg transition duration-300"
        >
          <div className="bg-white rounded-full w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
            <FaBuilding className="text-black text-xl sm:text-2xl" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold">60</div>
            <div className="text-xs sm:text-sm leading-tight">Active Venue</div>
          </div>
        </Link>

        {/* Stat Card 4 */}
        <Link
          to="/bookings/my_booking"
          className="rounded-xl text-white p-4 sm:p-5 flex items-center gap-4 bg-red-600 hover:shadow-lg transition duration-300"
        >
          <div className="bg-white rounded-full w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
            <FaExclamationTriangle className="text-black text-xl sm:text-2xl" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold">6</div>
            <div className="text-xs sm:text-sm leading-tight">Recent Conflict</div>
          </div>
        </Link>
      </div>

      {/* Venue Cards (already responsive) */}
      <VenueCards />

      {/* Recently Booked Section */}
      <RecentlyBooked />
      <Footer/>
    </div>
  );
};

export default Dashboard;
