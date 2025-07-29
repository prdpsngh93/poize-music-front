import React from 'react';

const statsData = [
  { label: 'Active Gigs', value: 3 },
  { label: 'Booking Requests', value: 12 },
  { label: 'Profile Views', value: 250 },
  { label: 'Average Rating', value: 4.7 },
  { label: 'Average Rating', value: 4.7 }, // You can replace or remove duplicates
];

const StatsDashboard = () => {
  return (
    <div className="flex flex-wrap gap-4">
      {statsData.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-sm px-6 py-4 w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(20%-0.8rem)]"
        >
          <p className="text-sm text-gray-600">{stat.label}</p>
          <p className="text-xl font-bold text-[#121417] mt-1">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsDashboard;
