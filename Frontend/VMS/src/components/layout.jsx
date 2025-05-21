import { useState } from "react";
import Sidebar from "./sidebar";
import TopNavbar from "./Topnavbar";
import Dashboard from "../pages/Dashboard";

const Layout = ({ handleLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className={`transition-all duration-300 ${sidebarOpen ? "w-64" : "w-0"} overflow-hidden`}>
        <Sidebar />
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
        <TopNavbar toggleSidebar={toggleSidebar} />

        <div className="flex-1 overflow-auto p-4 py-1">
          <div className="flex justify-end mb-4">
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>

          <Dashboard />
        </div>
      </div>
    </div>
  );
};

export default Layout;
