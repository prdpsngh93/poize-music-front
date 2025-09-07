import React from 'react';
import Image from 'next/image';

const announcements = [
  {
    id: 1,
    image: '/images/announcement.png', // Replace with your actual image
  },
  {
    id: 2,
    image: '/images/announcement.png',
  },
];

const Announcements = () => {
  return (
    <div className=" bg-[#f4f3ee]">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Announcements</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center">
        {announcements.map((item) => (
          <div
            key={item.id}
            className="w-full h-48 md:h-40 rounded-lg overflow-hidden relative shadow-sm"
          >
            <Image
              src={item.image}
              alt={`Announcement ${item.id}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
