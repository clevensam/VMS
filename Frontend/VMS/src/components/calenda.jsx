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
  const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const renderHeader = () => (
    <div className="flex justify-between items-center mb-6 px-6">
      <button onClick={handlePrevMonth} className="text-gray-500 hover:text-gray-700 text-xl font-bold">&lt;</button>
      <h2 className="text-2xl font-bold text-gray-800">
        {format(currentDate, 'MMMM yyyy')}
      </h2>
      <button onClick={handleNextMonth} className="text-gray-500 hover:text-gray-700 text-xl font-bold">&gt;</button>
    </div>
  );

  const renderDays = () => {
    const days = [];
    const dateFormat = 'EEE';
    const start = startOfWeek(currentDate, { weekStartsOn: 0 });

    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-base font-semibold text-center text-gray-600">
          {format(addDays(start, i), dateFormat).substring(0, 3)}
        </div>
      );
    }

    return <div className="grid grid-cols-7 gap-2 px-4 pb-4">{days}</div>;
  };

  const renderCells = () => {
    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, 'd');
        const isCurrentMonth = isSameMonth(day, monthStart);
        const isToday = isSameDay(day, new Date());

        days.push(
          <div
            key={day.toString()}
            className="flex justify-center items-center h-14 w-14 mx-auto my-1"
          >
            <div
              className={`w-10 h-10 flex items-center justify-center text-base font-medium
                ${isToday ? 'bg-blue-500 text-white' : ''}
                ${!isCurrentMonth ? 'text-gray-300' : 'text-gray-800'}
                ${!isToday ? 'hover:bg-gray-100' : ''}
                rounded-full transition`}
            >
              {formattedDate}
            </div>
          </div>
        );

        day = addDays(day, 1);
      }

      rows.push(
        <div key={day.toString()} className="grid grid-cols-7 gap-2">
          {days}
        </div>
      );
      days = [];
    }

    return <div className="px-4">{rows}</div>;
  };

  return (
    <div className="w-[500px] mx-auto mt-12 p-6 bg-white rounded-2xl shadow-lg">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default Calendar;
