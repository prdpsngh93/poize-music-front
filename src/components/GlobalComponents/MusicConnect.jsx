"use client"
import React, { useState } from 'react';
import FilterSidebar from './FilterSidebar';
import MusicCard from './MusicCard';
import Pagination from './Pagination';
import CustomDropdown from './CustomDropdown';

const dummyData = Array.from({ length: 6 }, (_, i) => ({
  location: 'Lorem Ipsum is simply dummy text',
  description: 'Lorem Ipsum',
  about: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's ",
}));

const MusicConnect = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const sortingOptions = [
    "Price: Low to High",
    "Price: High to Low",
    "Newest First",
  ];

  const showOptions = [10, 20, 30];

  const handleSelection = (value) => {
  };

  return (
    <div className="flex flex-col  md:flex-row gap-6 pt-[100px]  container mx-auto px-4 ">
      <FilterSidebar />
      <div className="flex-1 pl-[52px]">
        <div className="flex items-center justify-between">
          <div className="flex gap-4 items-center">
            <label className="text-[16px] font-semibold leading-[100%] tracking-[0] text-black flex items-center">
              <input type="checkbox" className="border border-[#F24C4E] h-[21px] w-[21px] mr-4" />
              Show Only List On Booking
            </label>
          </div>
          <div className="flex gap-4  items-end mb-[10px]">
            <div className='flex gap-x-5'>
              <CustomDropdown label="Sort By" options={sortingOptions} onSelect={handleSelection} />
              <CustomDropdown label="Show" options={showOptions} onSelect={handleSelection} />
            </div>
          </div>
        </div>
        <div>
          <div className="flex justify-between bg-[#1FB58F] border rounded-[10px] items-center leading-[100%] tracking-[0] px-[38px] py-[25px]">
            <div className='font-semibold text-[16px] flex gap-10 '>
              <a href="#">Post List</a>
              <a href="#">Post Grid</a>
            </div>
            <div className='flex gap-2' >
              <button>📃</button>
              <button>🔲</button>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2  gap-[17px]  pt-12 pb-[35px]">
            {dummyData.map((gig, idx) => (
              <MusicCard key={idx} {...gig} />
            ))}
          </div>

          <Pagination currentPage={currentPage} totalPages={3} onPageChange={setCurrentPage} />
        </div>
      </div>
      </div>
      );
};

      export default MusicConnect;
