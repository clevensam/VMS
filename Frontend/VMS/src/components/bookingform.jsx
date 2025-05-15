import React, { useState } from 'react';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    venue: '',
    category: '',
    startDate: '',
    duration: '60',
    attendees: 1,
    purpose: ''
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking Submitted:", formData);
  };

  const handleCancel = () => {
    setFormData({
      venue: '',
      category: '',
      startDate: '',
      duration: '60',
      attendees: 1,
      purpose: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md p-4 bg-white rounded-md shadow-lg ml-120">
      <h2 className="text-lg font-semibold mb-4">Booking Request</h2>

      {/* Venue Selection */}
      <div className="mb-3">
        <label htmlFor="venue" className="block text-sm font-medium mb-1">Venue</label>
        <select
          name="venue"
          id="venue"
          value={formData.venue}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm"
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
          className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm"
          required
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Date & Duration */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium mb-1">Start Time</label>
          <input
            type="datetime-local"
            name="startDate"
            id="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="duration" className="block text-sm font-medium mb-1">Duration (minutes)</label>
          <select
            name="duration"
            id="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm"
          >
            <option value="30">30</option>
            <option value="60">60</option>
            <option value="90">90</option>
            <option value="120">120</option>
          </select>
        </div>
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
          className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm"
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
          className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm"
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
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-1.5 text-sm rounded"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default BookingForm;
