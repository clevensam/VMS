import React, { useState } from 'react';
import axios from 'axios';

const BookingForm = ({ onBookingCreated }) => {
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

  const venues = [
    { id: 'hall1', name: 'Main Hall', capacity: 100 },
    { id: 'conf1', name: 'Conference Room A', capacity: 40 },
    { id: 'meet1', name: 'Meeting Room 1', capacity: 20 },
  ];

  const categories = ['Exam', 'Meeting', 'Lecture', 'Event'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.purpose.trim()) {
      alert('Purpose cannot be empty.');
      return;
    }

    const selectedVenue = venues.find(v => v.id === formData.venue);
    if (selectedVenue && formData.attendees > selectedVenue.capacity) {
      alert(`Attendees exceed capacity of ${selectedVenue.name} (${selectedVenue.capacity})`);
      return;
    }

    // Merge date and time into full datetime string
    const startDateTime = `${formData.startDate}T${formData.startTime}`;

    const bookingData = {
      ...formData,
      startDate: startDateTime // rename if your backend expects 'startDate'
    };

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/bookings', bookingData);
      alert('Booking successful!');
      handleCancel();

      if (onBookingCreated) onBookingCreated();
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      venue: '',
      category: '',
      startDate: '',
      startTime: '',
      duration: '60',
      attendees: 1,
      purpose: ''
    });
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="w-full max-w-md p-4 bg-white rounded-md shadow-lg ml-120 mb-10"
      autoComplete="off"
    >
      <h2 className="text-lg font-semibold mb-4">Booking Request</h2>

      {/* Venue Selection */}
      <div className="mb-3">
        <label htmlFor="venue" className="block text-sm font-medium mb-1">Venue</label>
        <select
          name="venue"
          id="venue"
          value={formData.venue}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring"
          required
        >
          <option value="">Select a venue</option>
          {venues.map((venue) => (
            <option key={venue.id} value={venue.id}>
              {venue.name} (Capacity: {venue.capacity})
            </option>
          ))}
        </select>
      </div>

      {/* Category Selection */}
      <div className="mb-3">
        <label htmlFor="category" className="block text-sm font-medium mb-1">Category</label>
        <select
          name="category"
          id="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring"
          required
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Date & Time Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium mb-1">Start Date</label>
          <input
            type="date"
            name="startDate"
            id="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring"
            required
          />
        </div>
        <div>
          <label htmlFor="startTime" className="block text-sm font-medium mb-1">Start Time</label>
          <input
            type="time"
            name="startTime"
            id="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring"
            required
          />
        </div>
      </div>

      {/* Duration */}
      <div className="mb-3">
        <label htmlFor="duration" className="block text-sm font-medium mb-1">Duration (minutes)</label>
        <select
          name="duration"
          id="duration"
          value={formData.duration}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring"
        >
          <option value="30">30</option>
          <option value="60">60</option>
          <option value="90">90</option>
          <option value="120">120</option>
        </select>
      </div>

      {/* Attendee Count */}
      <div className="mb-3">
        <label htmlFor="attendees" className="block text-sm font-medium mb-1">Number of Attendees</label>
        <input
          type="number"
          name="attendees"
          id="attendees"
          value={formData.attendees}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring"
          min="1"
          required
        />
      </div>

      {/* Purpose */}
      <div className="mb-4">
        <label htmlFor="purpose" className="block text-sm font-medium mb-1">Purpose</label>
        <textarea
          name="purpose"
          id="purpose"
          value={formData.purpose}
          onChange={handleChange}
          rows="3"
          className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring"
          placeholder="Briefly describe the purpose"
          required
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={handleCancel}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-1.5 text-sm rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-600 text-white px-5 py-1.5 text-sm rounded hover:bg-blue-700 transition-colors ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
};

export default BookingForm;
