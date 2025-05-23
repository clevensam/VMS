import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/sidebar'
import TopNavbar from '../components/Topnavbar'
import BookingForm from '../components/bookingForm'
import axios from 'axios'

const BookingPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [bookings, setBookings] = useState([])

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  // Fetch bookings from backend
  const fetchBookings = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/bookings')
      setBookings(res.data)
    } catch (error) {
      console.error('Failed to fetch bookings:', error)
    }
  }

  // Load bookings on component mount
  useEffect(() => {
    fetchBookings()
  }, [])

  // Refresh booking list after a new booking is added
  const handleBookingCreated = () => {
    fetchBookings()
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-0'} overflow-hidden`}>
        <Sidebar />
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
        <TopNavbar toggleSidebar={toggleSidebar} />
        <div className="flex-1 overflow-auto mt-4 px-6">
          <h1 className="text-2xl font-bold mb-4">Book a Venue</h1>
          {/* Booking Form with callback */}
          <BookingForm onBookingCreated={handleBookingCreated} />
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default BookingPage
