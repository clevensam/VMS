import React, { useState, useEffect } from 'react';

const BookingModal = ({ initialVenue = '', onClose }) => {
  const [formData, setFormData] = useState({
    venue: '',
    category: '',
    startDate: '',
    duration: '60',
    attendees: 1,
    purpose: ''
  });

  const categories = ['Exam', 'Meeting', 'Lecture', 'Event'];

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      venue: initialVenue
    }));
  }, [initialVenue]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Booking Submitted:', formData);
    onClose(); // Close modal on submit
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md p-4 bg-white rounded-md shadow-lg ">
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
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <div>
          <label className="block text-sm font-medium mb-1">Start Time</label>
          <input
            type="datetime-local"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm"
            required
          />
        </div>
        <div>
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
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Attendees</label>
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
          placeholder="Briefly describe the purpose"
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
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-1.5 text-sm rounded"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default BookingModal;
