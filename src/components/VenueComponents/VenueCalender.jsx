'use client';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import FilterDropdown from './FilterDropDown';
import { Plus, Music } from 'lucide-react';

const VenueCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const filterOptions = {
    Artist: ['Sarah', 'John', 'Emma'],
    'Event Type': ['Acoustic', 'Rock', 'Jazz'],
    Date: ['July', 'August'],
    Status: ['Upcoming', 'Past']
  };

  const upcomingGigs = [
    { title: 'Acoustic Night', date: 'July 15, 2024' },
    { title: 'Indie Rock Showcase', date: 'July 22, 2024' },
    { title: 'Jazz Evening', date: 'August 5, 2024' },
    { title: 'Jazz Evening', date: 'August 5, 2024' }
  ];

  return (
    <section className="min-h-screen bg-[#F7F7F2] px-4 py-8 md:px-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-black mb-6">Venue Calendar</h1>

        {/* Upcoming Gigs */}
       {/* Upcoming Gigs */}
<div className="mb-8">
  <h2 className="text-lg font-semibold text-black mb-3">Upcoming Gigs</h2>
  <div className="flex flex-wrap gap-4 w-full">
    {upcomingGigs.map((gig, i) => (
      <div
        key={i}
        className="flex-1 min-w-[250px] bg-white flex items-start gap-3 px-4 py-3 rounded-xl shadow-sm border-none text-sm font-medium text-black hover:bg-green-50 transition"
      >
        <div className="border-gray-400 border p-4 rounded-xl">
          <Music className="w-4 h-4 mt-1 text-gray-500" />
        </div>
        <div>
          <p className="text-black">{gig.title}</p>
          <p className="text-gray-500 text-xs">{gig.date}</p>
        </div>
      </div>
    ))}
  </div>
</div>




        {/* Filters and Add Gig */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
            <h2 className="text-xl font-semibold text-black mb-4">Venue Calendar</h2>
          <FilterDropdown filterData={filterOptions} onChange={(filters) => console.log(filters)} />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#1FB58F] text-white font-medium rounded-full hover:bg-[#179b7a] transition">
            <Plus className="w-4 h-4" /> Add Gig
          </button>
        </div>

        {/* Calendar Section Heading */}
        

        {/* Calendars */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {[{ month: 'July', index: 6 }, { month: 'August', index: 7 }].map(({ month, index }) => (
            <div
              key={month}
              className=""
            >
              <h3 className="font-semibold text-black text-sm mb-2">{month} 2025</h3>
              <Calendar
                defaultActiveStartDate={new Date(2025, index, 1)}
                value={selectedDate}
                onChange={setSelectedDate}
                className="venue-calendar bg-white text-black"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Custom calendar styles */}
      <style jsx global>{`
        .venue-calendar {
          border: none;
          background-color: white;
          width:60%;
          padding:2px;
          border-radius:10px;
        }

        .venue-calendar .react-calendar__tile {
          padding: 10px 0;
          border-radius: 50%;
          transition: background 0.3s;
        }

        .venue-calendar .react-calendar__tile--active {
          background: #2563eb !important;
          color: white !important;
        }

        .venue-calendar .react-calendar__tile--now {
          background: #e2e8f0;
          border-radius: 9999px;
        }

        .venue-calendar .react-calendar__month-view__weekdays {
          text-transform: uppercase;
          font-size: 0.75rem;
          color: #6b7280;
        }

        .venue-calendar abbr {
          text-decoration: none;
        }

        .venue-calendar .react-calendar__navigation {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default VenueCalendar;
