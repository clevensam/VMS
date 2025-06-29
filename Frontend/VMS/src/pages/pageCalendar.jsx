import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/sidebar'
import TopNavbar from '../components/Topnavbar'
import Calendar from '../components/calenda'

const CalendarPage= () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  return (
    <div className={` flex h-screen overflow-hidden`}>
      {/* Sidebar */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-0'} overflow-hidden`}>
        <Sidebar />
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
        <TopNavbar toggleSidebar={toggleSidebar}/>
        <div className="flex-1 overflow-auto p-4 py-1">
          <Calendar/>
        </div>
      </div>
    </div>
  )
}

export default CalendarPage;
