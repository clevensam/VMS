import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BookingModal = ({ initialVenue = '', onClose, onBookingCreated }) => {
  const navigate = useNavigate();

  const venues = [
    { id: 'hall1', name: 'Main Hall', capacity: 100 },
    { id: 'conf1', name: 'Conference Room A', capacity: 40 },
    { id: 'meet1', name: 'Meeting Room 1', capacity: 20 },
  ];

  const categories = ['Exam', 'Meeting', 'Lecture', 'Event'];

  const [formData, setFormData] = useState({
    venue: '',
    category: '',
    startDate: '',
    startTime: '',
    duration: '60',
    attendees: 1,
    purpose: ''
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData(prev => ({ ...prev, venue: initialVenue }));
  }, [initialVenue]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.purpose.trim()) {
      alert('Purpose is required.');
      return;
    }

    const selectedVenue = venues.find(v => v.id === formData.venue);
    if (selectedVenue && formData.attendees > selectedVenue.capacity) {
      alert(`Attendees exceed capacity of ${selectedVenue.name} (${selectedVenue.capacity})`);
      return;
    }

    const startDateTime = `${formData.startDate}T${formData.startTime}`;

    const bookingData = {
      ...formData,
      startDate: startDateTime // make sure this matches your backend's expected key
    };
    
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/bookings', bookingData);
      if (onBookingCreated) onBookingCreated();
      onClose(); // Close modal
      navigate('/bookings/my_booking');
    } catch (err) {
      console.error(err);
      alert('Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md p-4 bg-white rounded-md shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Booking: {initialVenue}</h2>

      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm"
          required
        >
          <option value="">Select category</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <div>
          <label className="block text-sm font-medium mb-1">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Start Time</label>
          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm"
            required
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Duration</label>
        <select
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm"
        >
          <option value="30">30 min</option>
          <option value="60">60 min</option>
          <option value="90">90 min</option>
          <option value="120">120 min</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Number of Attendees</label>
        <input
          type="number"
          name="attendees"
          value={formData.attendees}
          onChange={handleChange}
          min="1"
          className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Purpose</label>
        <textarea
          name="purpose"
          value={formData.purpose}
          onChange={handleChange}
          rows="3"
          className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm"
          required
        />
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-1.5 text-sm rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-1.5 text-sm rounded"
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
};

export default BookingModal;
