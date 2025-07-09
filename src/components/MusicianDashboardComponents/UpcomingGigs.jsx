'use client';

import React from 'react';
import Image from 'next/image';

const gigs = [
  {
    id: 1,
    title: 'Summer Music Fest',
    date: 'July 15th, 8 PM',
    image: '/images/upcominggig2.png',
  },
  {
    id: 2,
    title: 'Local Bar Gig',
    date: 'August 5th, 9 PM',
    image: '/images/upcominggig1.png',
  },
  {
    id: 3,
    title: 'Charity Concert',
    date: 'September 2nd, 7 PM',
    image: '/images/upcominggig3.png',
  },
  {
    id: 4,
    title: 'Summer Music Fest',
    date: 'July 15th, 8 PM',
    image: '/images/upcominggig2.png',
  },
  {
    id: 5,
    title: 'Local Bar Gig',
    date: 'August 5th, 9 PM',
    image: '/images/upcominggig1.png',
  },
];

const UpcomingGigs = () => {
  return (
    <div className="bg-[#f4f3ee]">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">Upcoming Gigs</h2>

      <div className="flex flex-wrap gap-4 justify-center md:justify-start">
        {gigs.map((gig) => (
          <div
            key={gig.id}
            className="w-[100%] sm:w-[45%] md:w-[30%] lg:w-[18.5%]  overflow-hidden"
          >
            <div className="w-full h-[150px] md:h-[130px] lg:h-[100px] rounded-lg relative">
              <Image
                src={gig.image}
                alt={gig.title}
                fill
                className="object-cover rounded-xl"
              />
            </div>
            <div className="p-4">
              <h3 className="text-sm text-gray-900 font-semibold">{gig.title}</h3>
              <p className="text-xs text-gray-600">{gig.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingGigs;
