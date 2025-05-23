// components/EditBookingModal.jsx
import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

const EditBookingModal = ({ isOpen, onClose, onSubmit, booking }) => {
  const [form, setForm] = useState({
    category: '',
    startDate: '',
    endDate: '',
    duration: '',
    attendees: '',
    purpose: ''
  });

  useEffect(() => {
    if (booking) {
      setForm({
        category: booking.category || '',
        startDate: booking.startDate ? new Date(booking.startDate).toISOString().slice(0, 16) : '',
        endDate: booking.endDate ? new Date(booking.endDate).toISOString().slice(0, 16) : '',
        duration: booking.duration || '',
        attendees: booking.attendees || '',
        purpose: booking.purpose || ''
      });
    }
  }, [booking]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          <FaTimes />
        </button>
        <h2 className="text-lg font-semibold mb-4">Reschedule Booking</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="category" value={form.category} onChange={handleChange} placeholder="Category" className="w-full border px-3 py-2 rounded" />
          <input type="datetime-local" name="startDate" value={form.startDate} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          <input type="datetime-local" name="endDate" value={form.endDate} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          <input type="number" name="duration" value={form.duration} onChange={handleChange} placeholder="Duration in minutes" className="w-full border px-3 py-2 rounded" />
          <input type="number" name="attendees" value={form.attendees} onChange={handleChange} placeholder="Number of Attendees" className="w-full border px-3 py-2 rounded" />
          <textarea name="purpose" value={form.purpose} onChange={handleChange} placeholder="Purpose" className="w-full border px-3 py-2 rounded" />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBookingModal;
