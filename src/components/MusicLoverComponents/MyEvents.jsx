'use client';

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


const MyEvents = () => {
  const [viewMode, setViewMode] = useState('calendar');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const events = [
    {
      title: 'Indie Rock Night',
      date: 'July 12, 2024',
      venue: 'The Roxy Theatre',
      image: '/images/upcominggig1.png',
    },
    {
      title: 'Electronic Beats',
      date: 'July 15, 2024',
      venue: 'The Echo',
      image: '/images/upcominggig2.png',
    },
    {
      title: 'Acoustic Sessions',
      date: 'July 20, 2024',
      venue: 'The Troubadour',
      image: '/images/upcominggig3.png',
    },
  ];

  return (
    <main className="bg-[#f4f3ee] min-h-screen px-4 md:px-9 lg:px-12 py-10">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {/* Heading */}
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">My Events</h1>
          <p className="text-sm md:text-base text-gray-600 mt-1">
            Manage your saved, RSVP'd, or performing gigs
          </p>
        </div>

        {/* Toggle View */}
        <div className="flex gap-6 border-b border-gray-300 text-sm font-medium">
          <button
            onClick={() => setViewMode('calendar')}
            className={`flex items-center gap-2 py-2 border-b-2 transition-all ${
              viewMode === 'calendar'
                ? 'border-[#1FB58F] text-[#1FB58F]'
                : 'border-transparent text-gray-500'
            }`}
          >
            
            Calendar
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-2 py-2 border-b-2 transition-all ${
              viewMode === 'list'
                ? 'border-[#1FB58F] text-[#1FB58F]'
                : 'border-transparent text-gray-500'
            }`}
          >
           
            List
          </button>
        </div>

        {/* Calendar View */}
        {viewMode === 'calendar' && (
          <div className="flex flex-col sm:flex-row gap-6">
            {[0, 1].map((offset) => (
              <Calendar
                key={offset}
                onChange={setSelectedDate}
                value={selectedDate}
                activeStartDate={
                  new Date(selectedDate.getFullYear(), selectedDate.getMonth() + offset, 1)
                }
                className="react-calendar border-none text-black rounded-lg bg-transparent shadow-none w-full max-w-xs"
                tileClassName={({ date }) => {
                  const isSameMonth =
                    date.getMonth() ===
                    new Date(selectedDate.getFullYear(), selectedDate.getMonth() + offset).getMonth();
                  const isSameDate =
                    date.getDate() === selectedDate.getDate() &&
                    date.getMonth() === selectedDate.getMonth() + offset &&
                    date.getFullYear() === selectedDate.getFullYear();
                  return isSameDate && isSameMonth
                    ? 'bg-[#1B3139]  text-white rounded-full'
                    : '';
                }}
              />
            ))}
          </div>
        )}

        {/* List or Upcoming Events */}
        <div className="mt-6 flex flex-col gap-4">
          <h2 className="text-lg font-bold text-gray-800">Your Upcoming Events</h2>
          {events.map((event, idx) => (
            <div
              key={idx}
              className="bg-white rounded-md shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 py-3 gap-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={event.image}
                  alt={event.title}
                  className="h-12 w-12 rounded-md object-cover"
                />
                <div>
                  <h5 className="text-md font-semibold text-[#1B3139]">{event.title}</h5>
                  <p className="text-sm text-gray-500">
                    {event.date} • {event.venue}
                  </p>
                </div>
              </div>
              <button className="text-sm text-[#141217] bg-gray-300 rounded-full px-4 py-1 self-start sm:self-auto">
                View
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default MyEvents;
