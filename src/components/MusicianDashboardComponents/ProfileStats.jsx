'use client';

import React from 'react';

const stats = [
  { id: 1, value: 120, label: 'Gigs Played', bg: 'bg-white text-gray-900' },
  { id: 2, value: 45, label: 'Collaborations', bg: 'bg-emerald-500 text-white' },
  { id: 3, value: 8, label: 'Positive Reviews', bg: 'bg-white text-gray-900' },
  { id: 4, value: 45, label: 'Collaborations', bg: 'bg-emerald-500 text-white' },
];

const ProfileStats = () => {
  return (
    <div className="bg-[#f4f3ee]">
      <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-6">Profile Stats</h2>
      <div className="flex flex-wrap gap-4">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className={`w-[45%] md:w-[45%] lg:w-[23.5%] rounded-xl px-4 py-6 text-center shadow-sm ${stat.bg}`}
          >
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileStats;
