import React, { useState } from 'react';
import { FaBars, FaUser, FaSignOutAlt, FaFilter } from 'react-icons/fa';
import { HiOutlineBell, HiOutlineUserCircle } from 'react-icons/hi';

const TopNavbar = ({ toggleSidebar }) => {
  const [showProfile, setShowProfile] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white shadow-md h-20">
      
      {/* Left: Menu + Brand */}
      <div className="flex items-center gap-6">
        <button onClick={toggleSidebar} className="text-blue-600 text-2xl">
          <FaBars />
        </button>
        <span className="text-xl font-bold text-blue-600">VMS</span>
      </div>

      {/* Center: Search Bar with Filter */}
      <div className="flex items-center gap-3 flex-1 mx-8">
        <input
          type="text"
          placeholder="Search venue or booking..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="p-2 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200">
          <FaFilter />
        </button>
      </div>

      {/* Right: Bell + Profile Dropdown */}
      <div className="flex items-center gap-6">
        <button className="relative text-blue-600 text-2xl">
          <HiOutlineBell />
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1">3</span>
        </button>

        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2 text-blue-600 text-base"
          >
            <HiOutlineUserCircle className="text-2xl" />
            <span>John Doe</span>
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-md z-50">
              <button className="flex items-center gap-2 w-full px-4 py-2 text-gray-800 hover:bg-gray-100 text-sm">
                <FaUser />
                Profile
              </button>
              <button className="flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-gray-100 text-sm">
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
