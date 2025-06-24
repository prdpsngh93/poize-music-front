import React from 'react';

const FilterSidebar = () => {
  return (
    <aside className="bg-[#F1F0EA] py-[70px] px-[18px] rounded-[10px] shadow w-full max-w-[395px] max-h-[845px]">
        <div>
      <h2 className="font-bold text-2xl leading-[30px] pl-5 text-[#1B3139] mb-[27px]">Filter Gigs</h2>

      <div className="mb-[15px]">
        <label className="block text-[#1B3139] text-[17px] leading-[30px] font-semibold pl-5 text-sm mb-1">Location</label>
        <input className="w-full pl-6 py-[12px] text-[#1B3139] border-gray-300 rounded-[25px] bg-white focus:outline-none focus:ring focus:ring-teal-400" placeholder="Enter location" />
      </div>

      <div className="mb-[15px]">
        <label className="block text-[#1B3139] text-[17px] leading-[30px] font-semibold pl-5 text-sm mb-1">Genres</label>
        <select className="w-full pl-6 py-[12px] text-[#1B3139] border-gray-300 rounded-[25px] bg-white focus:outline-none focus:ring focus:ring-teal-400">
          <option>Lorem Ipsum</option>
           <option>Lorem Ipsum</option>
            <option>Lorem Ipsum</option>
        </select>
      </div>

      <div className="mb-[42px]">
        <label className="block text-[#1B3139] text-[17px] leading-[30px] font-semibold pl-5 text-sm mb-1">Event Type</label>
        <select className="w-full pl-6 py-[12px] text-[#1B3139] border-gray-300 rounded-[25px] bg-white focus:outline-none focus:ring focus:ring-teal-400">
          <option>Lorem Ipsum</option>
        </select>
      </div>

      <div className="mb-8">
        <label className="block text-[#1B3139] text-[17px] leading-[30px] font-semibold pl-5 text-sm mb-1">Pay Range</label>
        <p className='text-[#838490] font-semibold text-[15px]  pr-[22px] text-right'>0-$50000+</p>
        <input type="range" min="0" max="50000" className="w-full range-color h-[12px] pl-6 border-black custom-slider rounded-[25px] focus:outline-none focus:ring focus:ring-teal-400" />
      </div>

      <div className="mb-[22px]">
        <label className="block text-[#1B3139] text-[17px] leading-[30px] font-semibold pl-5 text-sm mb-[7px]">Date Range</label>
        <div className="flex gap-5">
          <input type="date" className="w-[170px] pl-6 py-[12px] border-gray-300 rounded-[25px] bg-white focus:outline-none focus:ring focus:ring-teal-400" />
          <input type="date" className="  w-[170px] pl-6 py-[12px] border-gray-300 rounded-[25px] bg-white focus:outline-none focus:ring focus:ring-teal-400" />
        </div>
      </div>

      <div className="flex flex-col ">
        <button className="w-full  bg-[#1FB58F] text-white py-[12px] rounded-[25px] hover:bg-teal-600">
                Apply Filter
              </button>
              <div className='flex gap-2 justify-center items-center   mt-[32px] leading-[30px]'>
                <img
                src='/images/reset.png'></img>
        <button className="font-normal text-[15px] text-black tracking-[0] leading-[30px]">Reset Filters</button>
        </div>
      </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
