import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
  const [bookingCounts, setBookingCounts] = useState({
    Approved: 0,
    Pending: 0,
    Conflict: 0,
  });

  useEffect(() => {
    const fetchBookingCounts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/bookings');
        const counts = {
          Approved: 0,
          Pending: 0,
          Conflict: 0,
        };

        res.data.forEach(booking => {
          const rawStatus = booking.status || 'Pending';
          const status = rawStatus.charAt(0).toUpperCase() + rawStatus.slice(1).toLowerCase();
          if (counts[status] !== undefined) {
            counts[status]++;
          } else {
            counts.Conflict++;
          }
        });

        setBookingCounts(counts);
      } catch (error) {
        console.error('Failed to fetch booking counts:', error);
      }
    };

    fetchBookingCounts();
  }, []);

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
        {/* Approved Bookings */}
        <Link to="/bookings/my_booking?tab=Approved" className="rounded-xl text-white p-4 sm:p-5 flex items-center gap-4 bg-blue-600 hover:shadow-lg transition duration-300">
          <div className="bg-white rounded-full w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
            <FaCalendarCheck className="text-black text-xl sm:text-2xl" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold">{bookingCounts.Approved}</div>
            <div className="text-xs sm:text-sm leading-tight">Approved Bookings</div>
          </div>
        </Link>

        {/* Pending Bookings */}
        <Link to="/bookings/my_booking?tab=Pending" className="rounded-xl text-white p-4 sm:p-5 flex items-center gap-4 bg-yellow-400 hover:shadow-lg transition duration-300">
          <div className="bg-white rounded-full w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
            <FaHourglassHalf className="text-black text-xl sm:text-2xl" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold">{bookingCounts.Pending}</div>
            <div className="text-xs sm:text-sm leading-tight">Pending Bookings</div>
          </div>
        </Link>

        {/* Conflict Bookings */}
        <Link to="/bookings/my_booking?tab=Conflict" className="rounded-xl text-white p-4 sm:p-5 flex items-center gap-4 bg-red-600 hover:shadow-lg transition duration-300">
          <div className="bg-white rounded-full w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
            <FaExclamationTriangle className="text-black text-xl sm:text-2xl" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold">{bookingCounts.Conflict}</div>
            <div className="text-xs sm:text-sm leading-tight">Recent Conflict</div>
          </div>
        </Link>

        {/* Active Venues (static or can also be dynamic later) */}
        <Link to="/available_venue" className="rounded-xl text-white p-4 sm:p-5 flex items-center gap-4 bg-green-600 hover:shadow-lg transition duration-300">
          <div className="bg-white rounded-full w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
            <FaBuilding className="text-black text-xl sm:text-2xl" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold">60</div>
            <div className="text-xs sm:text-sm leading-tight">Active Venue</div>
          </div>
        </Link>
      </div>

      {/* Venue Cards */}
      <VenueCards />

      {/* Recently Booked */}
      <RecentlyBooked />
      <Footer />
    </div>
  );
};

export default Dashboard;
