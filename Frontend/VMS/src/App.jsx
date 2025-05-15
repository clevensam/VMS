import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/layout'
import AuthPage from './components/AuthPage'
import VenueCards from './components/venueCards'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Dashboard" element={<Layout />}/>
        <Route path="/" element={<AuthPage />}/>
        <Route path="/available" element={<VenueCards/>}/>
        
      </Routes>
    </Router>
  )
}

export default App
