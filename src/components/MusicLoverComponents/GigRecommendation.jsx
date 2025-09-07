'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import FilterDropdown from '../VenueComponents/FilterDropDown';

const filterOptions = {
  Genre: ['Rock', 'Pop', 'Jazz'],
  Date: ['Today', 'This Week', 'This Month'],
  Location: ['New York', 'Los Angeles', 'Chicago'],
};

const gigSections = [
  {
    id: 'trending',
    title: 'Trending in your area',
    gigs: Array.from({ length: 6 }, (_, i) => ({
      id: i + 1,
      title: 'Indie Rock Night',
      venue: 'The Roxy, Jul 15',
      image: '/images/upcominggig1.png',
    })),
  },
  {
    id: 'followed',
    title: 'Based on artists you follow',
    gigs: Array.from({ length: 6 }, (_, i) => ({
      id: i + 11,
      title: 'Luna',
      venue: 'The Echo, Jul 28',
      image: '/images/upcominggig2.png',
    })),
  },
  {
    id: 'similar',
    title: 'Similar to past gigs',
    gigs: Array.from({ length: 6 }, (_, i) => ({
      id: i + 21,
      title: 'Sonic Fusion',
      venue: 'The Fonda Theatre, Aug 8',
      image: '/images/upcominggig3.png',
    })),
  },
];

const GigCard = ({ title, venue, image }) => (
  <div className="w-[100%] sm:w-[45%] md:w-[30%] xl:w-[15.5%] overflow-hidden">
    <div className="w-full h-[150px] md:h-[130px] lg:h-[100px] rounded-lg relative">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover rounded-xl"
      />
    </div>
    <div className="py-2">
      <h3 className="text-sm font-semibold text-gray-900 truncate">{title}</h3>
      <p className="text-xs text-gray-600 truncate">{venue}</p>
    </div>
  </div>
);

const GigRecommendation = () => {
  const [filters, setFilters] = useState({});

  return (
    <main className="bg-[#f4f3ee] min-h-screen px-4 md:px-9 lg:px-12 py-10">
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        {/* Header */}
        <div className='flex flex-col gap-4 border-b border-gray-300  py-4 '>
          <h1 className="text-3xl font-bold text-gray-900">Gig Recommendations</h1>
          <p className="text-sm text-gray-900 w-fit">
            Discover personalized event suggestions based on your music taste and preferences.
          </p>
        </div>

        {/* Filters Heading */}
        <div className="flex flex-col gap-2">
          <h2 className="text-base font-semibold text-gray-900">Filters</h2>
          <div className=" pb-4">
            <FilterDropdown filterData={filterOptions} onChange={setFilters} />
          </div>
        </div>

        {/* Gig Sections */}
        {gigSections.map((section) => (
          <div key={section.id} className="flex flex-col gap-3">
            <h2 className="text-base md:text-lg font-semibold text-gray-900">
              {section.title}
            </h2>
            <div className="flex flex-wrap gap-4">
              {section.gigs.map((gig) => (
                <GigCard
                  key={gig.id}
                  title={gig.title}
                  venue={gig.venue}
                  image={gig.image}
                />
              ))}
            </div>
          </div>
        ))}

        {/* Preferences Section */}
        <div className="pt-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">
            Adjust your preferences
          </h3>
          <button className="bg-white text-gray-900 border-none rounded-full  text-sm border px-4 py-2  shadow hover:bg-gray-100">
            Edit Preferences
          </button>
        </div>
      </div>
    </main>
  );
};

export default GigRecommendation;
