import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-blue-500 text-white py-8 w-full">
      {/* Remove container padding/max-width to force full width */}
      <div className="px-4"> {/* Optional: Add back horizontal padding if needed */}
        
        {/* Main Footer Content - Centered content but full-width bg */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Quick Links Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 pb-2 border-b border-blue-400">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li><Link to="/bookings/my_booking" className="hover:text-blue-200 transition-colors block">My Bookings</Link></li>
              <li><Link to="/booking/new_request" className="hover:text-blue-200 transition-colors block">New Request</Link></li>
              <li><Link to="/venues/browse" className="hover:text-blue-200 transition-colors block">Browse Venues</Link></li>
              <li><Link to="/available_venue" className="hover:text-blue-200 transition-colors block">Availability</Link></li>
              <li><Link to="/calendar" className="hover:text-blue-200 transition-colors block">Calendar</Link></li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 pb-2 border-b border-blue-400">
              Support
            </h3>
            <ul className="space-y-2">
              <li><Link to="/help" className="hover:text-blue-200 transition-colors block">Help Center</Link></li>
              <li><Link to="/faq" className="hover:text-blue-200 transition-colors block">FAQs</Link></li>
              <li><Link to="/privacy" className="hover:text-blue-200 transition-colors block">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-blue-200 transition-colors block">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 pb-2 border-b border-blue-400">
              Contact Us
            </h3>
            <ul className="space-y-2">
              <li>Phone: +1 (123) 456-7890</li>
              <li>Email: support@vms.com</li>
            </ul>
          </div>
        </div>

        {/* Copyright - Full width with centered text */}
        <div className="border-t border-blue-400 pt-6 text-center">
          <p>© {new Date().getFullYear()} Venue Management System | All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;