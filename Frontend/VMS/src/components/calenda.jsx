import React, { useState } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  subMonths,
  addMonths,
} from 'date-fns';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  // Sample events
  const events = {
    '2025-05-15': ['Design review', 'Sales meeting'],
    '2025-05-17': ['Venue booked for Conference A'],
    '2025-05-22': ['Team Building - Garden Venue'],
  };

  const renderHeader = () => (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-gray-800">
        {format(currentDate, 'MMMM yyyy')}
      </h1>
      <div className="flex space-x-2">
        <button
          onClick={handlePrevMonth}
          className="px-3 py-1 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          &lt;
        </button>
        <button
          onClick={handleNextMonth}
          className="px-3 py-1 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          &gt;
        </button>
      </div>
    </div>
  );

  const renderDays = () => {
    const days = [];
    const dateFormat = 'EEE';
    const start = startOfWeek(currentDate, { weekStartsOn: 1 });

    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-sm font-medium text-center text-gray-500 py-2">
          {format(addDays(start, i), dateFormat)}
        </div>
      );
    }

    return <div className="grid grid-cols-7 mb-2">{days}</div>;
  };

  const renderCells = () => {
    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, 'd');
        const dayKey = format(day, 'yyyy-MM-dd');
        const dayEvents = events[dayKey] || [];

        days.push(
          <div
            key={day.toString()}
            className={`min-h-24 p-2 border border-gray-100 transition-all ${
              !isSameMonth(day, monthStart) ? 'bg-gray-50 text-gray-400' : ''
            }`}
          >
            <div
              className={`text-right ${
                isSameDay(day, new Date())
                  ? 'bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center ml-auto'
                  : ''
              }`}
            >
              {formattedDate}
            </div>
            <div className="mt-1 space-y-1">
              {dayEvents.map((event, index) => (
                <div
                  key={index}
                  className="text-xs p-1 bg-green-100 text-green-800 rounded truncate"
                >
                  {event}
                </div>
              ))}
            </div>
          </div>
        );

        day = addDays(day, 1);
      }

      rows.push(
        <div key={day.toString()} className="grid grid-cols-7">
          {days}
        </div>
      );
      days = [];
    }

    return <div className="border rounded-lg overflow-hidden">{rows}</div>;
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-xl shadow-md">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default Calendar;
