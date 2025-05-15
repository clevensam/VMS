import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FaChartBar,
  FaCalendarAlt,
  FaBuilding,
  FaFileAlt,
  FaCog,
  FaQuestionCircle,
  FaSignOutAlt,
  FaAngleDown,
  FaClipboardList,
  FaPlusCircle,
  FaSearch,
  FaClock,
} from 'react-icons/fa'

function Sidebar() {
  const [showBookings, setShowBookings] = useState(false)
  const [showVenues, setShowVenues] = useState(false)

  return (
    <div className="h-screen w-64 bg-white shadow-md flex flex-col justify-between px-4 py-6">
      {/* Logo */}
      <div>
        <div className="mb-6 text-blue-600 font-extrabold text-2xl">VMS</div>

        {/* Menu */}
        <nav className="space-y-3 text-base font-semibold">
          <MenuItem icon={<FaChartBar size={20} />} label="Dashboard" to="/dashboard" />

          {/* Bookings */}
          <SubMenu
            icon={<FaCalendarAlt size={20} />}
            label="Bookings"
            show={showBookings}
            toggle={() => setShowBookings(!showBookings)}
            items={[
              { label: 'My Bookings', icon: <FaClipboardList size={16} />, to: '/bookings/my_booking' },
              { label: 'New Request', icon: <FaPlusCircle size={16} />, to: '/booking/new_request' },
            ]}
          />

          {/* Venues */}
          <SubMenu
            icon={<FaBuilding size={20} />}   
            label="Venues"
            show={showVenues}
            toggle={() => setShowVenues(!showVenues)}
            items={[
              { label: 'Browse Venues', icon: <FaSearch size={16} />, to: '/venues/browse' },
              { label: 'Availability', icon: <FaClock size={16} />, to: '/available_venue' },
            ]}
          />

          <MenuItem icon={<FaCalendarAlt size={20} />} label="Calendar" to="/calendar" />
          <MenuItem icon={<FaCog size={20} />} label="Settings" to="/settings" />
        </nav>
      </div>

      {/* Footer */}
      <div className="space-y-4 text-base font-semibold">
        <MenuItem icon={<FaQuestionCircle size={20} />} label="Help" to="/help" />
        <MenuItem icon={<FaSignOutAlt size={20} />} label="Log out" to="/logout" />
        <div className="flex items-center space-x-3 mt-4">
          <div className="w-9 h-9 bg-blue-500 rounded-full text-white flex items-center justify-center text-lg font-bold">U</div>
          <span className="text-gray-800 font-medium">User Name</span>
        </div>
      </div>
    </div>
  )
}

const MenuItem = ({ icon, label, to }) => (
  <Link
    to={to}
    className="flex items-center gap-3 text-gray-800 hover:bg-blue-100 px-4 py-2 rounded cursor-pointer transition"
  >
    {icon}
    <span>{label}</span>
  </Link>
)

const SubMenu = ({ icon, label, show, toggle, items }) => (
  <div>
    <div
      onClick={toggle}
      className="flex justify-between items-center text-gray-800 hover:bg-blue-100 px-4 py-2 rounded cursor-pointer transition"
    >
      <div className="flex items-center gap-3">
        {icon}
        <span>{label}</span>
      </div>
      <FaAngleDown className={`transform transition-transform ${show ? "rotate-180" : ""}`} />
    </div>

    {show && (
      <div className="ml-10 mt-2 space-y-2">
        {items.map((item, i) => (
          <Link
            key={i}
            to={item.to}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 cursor-pointer transition"
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    )}
  </div>
)

export default Sidebar
