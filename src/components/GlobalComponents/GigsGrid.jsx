'use client';
import React, { useState } from 'react';
import FilterSidebar from './FilterSidebar';
import GigsGridCard from './GigsGridCard';
import Pagination from './Pagination';
import CustomDropdown from './CustomDropdown';
import { FaListUl, FaTh } from 'react-icons/fa';
import NoGigsFound from './NoGigsFound';

const GigsGrid = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const fieldsLayout = [
    { label: 'Date Range', type: 'dateRange' },
    { label: 'Artist', type: 'input', placeholder: 'Search Artist' },
    { label: 'Venue', type: 'input', placeholder: 'Search Venue' },
    { label: 'Location', type: 'input', placeholder: 'Search Location' },
  ];

  const sortingOptions = ["Default Sorting", "Price: Low to High", "Price: High to Low", "Newest First"];
  const showOptions = [10, 20, 30];

  const eventData = [
    {
      image: "/images/avatar.png",
      title: "Sunset Vibes - Luna Club",
      location: "Mumbai",
      date: "July 8",
      artist: "DJ Sonic",
      price: 5000,
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      image: "/images/avatar.png",
      title: "Sunset Vibes - Luna Club",
      location: "Mumbai",
      date: "July 8",
      artist: "DJ Sonic",
      price: 5000,
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      image: "/images/avatar.png",
      title: "Sunset Vibes - Luna Club",
      location: "Mumbai",
      date: "July 8",
      artist: "DJ Sonic",
      price: 5000,
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      image: "/images/avatar.png",
      title: "Sunset Vibes - Luna Club",
      location: "Mumbai",
      date: "July 8",
      artist: "DJ Sonic",
      price: 5000,
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 pt-10">
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Sidebar */}
        <div className="w-full lg:w-[300px]">
          <FilterSidebar title="Filter Gigs" fields={fieldsLayout} />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Heading */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-[#1B3139]">Gigs Happening Today</h1>
            <p className="text-sm text-gray-600 mt-1">
              Discover and attend live performances near you
            </p>
          </div>

          {/* Filters Row */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <label className="text-sm md:text-base font-medium flex items-center">
              <input type="checkbox" className="h-5 text-black w-5 mr-2" />
              <p className='text-black'>Show Only List On Booking</p>
            </label>

            <div className="flex flex-col md:flex-row gap-3">
              <CustomDropdown label="Sort By" options={sortingOptions} />
              <CustomDropdown label="Show" options={showOptions} />
            </div>
          </div>

          {/* View Toggle Tabs */}
          <div className="flex justify-between bg-[#1FB58F] rounded-lg px-6 py-4 text-white mb-8">
            <div className="font-semibold text-sm md:text-base flex gap-6">
              <a href="#" className="hover:underline">Post List</a>
              <a href="#" className="hover:underline">Post Grid</a>
            </div>
            <div className="flex gap-3 text-xl">
              <button className="hover:text-gray-300"><FaListUl /></button>
              <button className="hover:text-gray-300"><FaTh /></button>
            </div>
          </div>

          {/* Gigs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {eventData.map((gig, idx) => (
              <GigsGridCard key={idx} {...gig} />
            ))}

            
          </div>

          <NoGigsFound/>

          {/* Pagination */}
          <div className="mt-10">
            <Pagination currentPage={currentPage} totalPages={3} onPageChange={setCurrentPage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GigsGrid;
