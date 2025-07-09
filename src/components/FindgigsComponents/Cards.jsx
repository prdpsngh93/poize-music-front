import React from 'react';

const events = [
  {
    id: 1,
    title: 'Open Mic Night at The Blue Note',
    location: 'The Blue Note, New York, NY',
    time: '7:00 PM - 10:00 PM',
    image: '/images/cards1.png',
  },
  {
    id: 2,
    title: 'Indie Showcase at The Roxy',
    location: 'The Roxy, Los Angeles, CA',
    time: '8:00 PM - 11:00 PM',
    image: '/images/cards2.png',
  },
  {
    id: 3,
    title: 'Blues Jam Session at The Crossroads',
    location: 'The Crossroads, Chicago, IL',
    time: '6:00 PM - 10:00 AM',
    image: '/images/cards3.png',
  },
];

const Cards = () => {
  return (
    <div className="bg-[#f4f3ee] ">
      {events.map((event) => (
        <div
          key={event.id}
          className="flex flex-col md:flex-row justify-between items-center gap-4 py-6 border-b border-gray-200"
        >
          {/* Text Info */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-md md:text-lg font-semibold text-gray-900 mb-1">
              {event.title}
            </h2>
            <p className="text-sm text-gray-600">
              {event.location} | {event.time}
            </p>
            <button className="mt-3 px-4 py-1.5 text-sm bg-[#1FB58F] text-white rounded-full hover:bg-green-700 transition">
              View Details
            </button>
          </div>

          {/* Image */}
          <div className="w-full max-w-[270px] h-28 md:h-32 lg:h-36 overflow-hidden rounded-md">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
