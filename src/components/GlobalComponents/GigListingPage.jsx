"use client"
import React, { useState } from 'react';
import FilterSidebar from './FilterSidebar';
import GigCard from './GigCard';
import Pagination from './Pagination';
import CustomDropdown from './CustomDropdown';
import { FaListUl, FaTh } from 'react-icons/fa';

const dummyData = Array.from({ length: 7 }, (_, i) => ({
  title: 'Lorem Ipsum is simply dummy text',
  date: 'Lorem Ipsum',
  genre: 'Lorem Ipsum',
  location: 'Lorem Ipsum is simply dummy text',
  price: '$5000',
  description: 'Lorem Ipsum is simply dummy text',
  about: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's ",
}));

const GigListingPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const sortingOptions = [
    "Price: Low to High",
    "Price: High to Low",
    "Newest First",
  ];
  const showOptions = [10, 20, 30];

  const handleSelection = (value) => {
    console.log("Selected:", value);
  };

  const fieldsLayout = [
    { label: 'Location', type: 'input', placeholder: 'Enter location' },
    { label: 'Genres', type: 'select', options: ['Lorem Ipsum', 'Lorem Ipsum', 'Lorem Ipsum'] },
    { label: 'Event Type', type: 'select', options: ['Lorem Ipsum'] },
    { label: 'Pay Range', type: 'range', rangeLabel: '0-$50000+' },
    { label: 'Date Range', type: 'dateRange' },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6 pt-[80px] max-w-7xl mx-auto px-4">
      
      <div className="lg:max-w-[350px] w-full">
        <FilterSidebar title="Filter Gigs" fields={fieldsLayout} />
      </div>

      <div className="flex-1 w-full">
        
        <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
          
          <label className="flex items-center text-sm sm:text-base font-semibold text-black">
            <input type="checkbox" className="border border-[#F24C4E] h-[18px] w-[18px] mr-3" />
            Show Only List On Booking
          </label>

          <div className="flex flex-wrap gap-3">
            <CustomDropdown label="Sort By" options={sortingOptions} onSelect={handleSelection} />
            <CustomDropdown label="Show" options={showOptions} onSelect={handleSelection} />
          </div>
        </div>

        <div className="flex justify-between bg-[#1FB58F] rounded-[10px] px-4 py-3 sm:px-6 sm:py-4 items-center flex-wrap text-white text-sm sm:text-base">
          <div className="font-semibold flex gap-6 mb-2 sm:mb-0">
            <a href="#" className="hover:underline">Post List</a>
            <a href="#" className="hover:underline">Post Grid</a>
          </div>

          <div className="flex gap-2 text-lg">
            <button className="hover:text-gray-300"><FaListUl /></button>
            <button className="hover:text-gray-300"><FaTh /></button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 pb-8">
          {dummyData.map((gig, idx) => (
            <GigCard key={idx} {...gig} />
          ))}
        </div>

        <Pagination currentPage={currentPage} totalPages={3} onPageChange={setCurrentPage} />
      </div>
    </div>
  );
};

export default GigListingPage;
