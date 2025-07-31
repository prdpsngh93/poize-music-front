'use client';
import React from 'react';

const LineupSection = () => {
  const artists = [
    { name: 'The Sonic Waves', time: '9:00 PM', image: '/images/avatar.png' },
    { name: 'Electric Echoes', time: '10:30 PM', image: '/images/avatar.png' },
    { name: 'Velvet Rhythms', time: '12:00 AM', image: '/images/avatar.png' },
  ];

  return (
    <section className="bg-[#F7F6F1] py-6 border-b border-gray-300">
      <div className="max-w-6xl mx-auto px-4">
        {/* Title */}
        <h3 className="font-semibold text-sm text-gray-900 mb-4">Lineup</h3>

        {/* Row of artist cards, fixed spacing */}
        <div className="flex flex-col md:flex-row gap-10">
          {artists.map((artist, index) => (
            <div key={index} className="flex  items-center gap-2 text-left max-w-xl">
              <img
                src={artist.image}
                alt={artist.name}
                className="w-12 h-12 object-cover rounded-full"
              />
              <div>
              <p className="text-sm font-medium text-gray-900 mt-2">{artist.name}</p>
              <p className="text-xs text-gray-500">{artist.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LineupSection;
