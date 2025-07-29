'use client';
import React, { useState } from 'react';
import FilterDropdown from './FilterDropDown'; // Replace with correct path
import ApplicationCard from './ApplicationCard';

const applications = [
  {
    name: 'Ava Harper',
    role: 'Guitarist · Rock, Blues',
    rating: '4.8',
    note: 'Impressive demo, great stage presence.',
    image: '/images/avatar.png',
  },
  {
    name: 'Ava Harper',
    role: 'Guitarist · Rock, Blues',
    rating: '4.8',
    note: 'Impressive demo, great stage presence.',
    image: '/images/avatar.png',
  },
  {
    name: 'Ava Harper',
    role: 'Guitarist · Rock, Blues',
    rating: '4.8',
    note: 'Impressive demo, great stage presence.',
    image: '/images/avatar.png',
  },
];

const filterOptions = {
  Role: ['Guitarist', 'Drummer', 'Vocalist'],
  Genre: ['Rock', 'Jazz', 'Blues'],
  Sort: ['Newest', 'Top Rated'],
};

const VenueGigTitle = () => {
  const [filters, setFilters] = useState({});

  const handleFilterChange = (updatedFilters) => {
    setFilters(updatedFilters);
    console.log('Filters:', updatedFilters);
    // You can filter the applications here if needed
  };

  return (
    <main className="bg-[#f4f3ee] min-h-screen px-4 md:px-9 lg:px-12 py-10">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        {/* Header */}
        <div className="text-left">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Gig Title</h1>
          <p className="text-sm md:text-base text-gray-600 mt-1">
            Date: July 20, 2024 · Location: The Blue Note · 12 Applications
          </p>
        </div>

        {/* Filter Dropdowns */}
        <div className='flex flex-col gap-4'>
         <h1 className=" text-xl font-semibold text-gray-900">Applicants</h1>
        <FilterDropdown filterData={filterOptions} onChange={handleFilterChange} />
</div>
        {/* Applications List */}
        <div className="flex flex-col gap-4 mt-4">
          {applications.map((applicant, idx) => (
            <ApplicationCard key={idx} applicant={applicant} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default VenueGigTitle;
