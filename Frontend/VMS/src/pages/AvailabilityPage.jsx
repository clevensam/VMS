import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/sidebar'
import TopNavbar from '../components/Topnavbar'
import VenueAvailability from '../components/AvailableVenue'

const AvailabilityPage= () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  return (
    <div className={` flex h-screen overflow-hidden`}>
      {/* Sidebar */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'w-78' : 'w-0'} overflow-hidden`}>
        <Sidebar />
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
        <TopNavbar toggleSidebar={toggleSidebar}/>
        <div className="flex-1 overflow-auto  mt-8">
       <VenueAvailability/>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AvailabilityPage; 
