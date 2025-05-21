import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout'
import AuthPage from './components/AuthPage'
import VenueCards from './components/venueCards'
import BookingPage from './pages/Bookingpage'
import MyBookingsPage from './pages/mybookingpage'
import AvailabilityPage from './pages/AvailabilityPage'
import CalendarPage from './pages/pageCalendar'
import SettingPage from './pages/settingsPage'
function App() {
  const token = localStorage.getItem('token');
   const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token
    window.location.href = '/';       // Redirect to login page
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/Dashboard" /> : <AuthPage />} />
        <Route path="/Dashboard" element={<Layout handleLogout={handleLogout}/>}/>
        <Route path="/available_venue" element={<AvailabilityPage/>}/>
         <Route path="/booking/new_request" element={<BookingPage/>}/>
          <Route path="/bookings/my_booking" element={<MyBookingsPage/>}/>
          <Route path="/calendar" element={<CalendarPage/>}/>
<Route path="/settings" element={<SettingPage/>}/>
      </Routes>
    </Router>
  )
}

export default App
