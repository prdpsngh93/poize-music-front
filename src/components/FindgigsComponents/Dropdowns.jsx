'use client'
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const filterData = {
  Date: ['Today', 'This Week', 'This Month'],
  Genre: ['Rock', 'Jazz', 'Hip-Hop', 'Indie'],
  Location: ['New York', 'Los Angeles', 'Chicago', 'Remote'],
};

const Dropdowns = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    Date: '',
    Genre: '',
    Location: '',
  });

  const toggleDropdown = (filterType) => {
    setOpenDropdown(openDropdown === filterType ? null : filterType);
  };

  const handleSelect = (filterType, value) => {
    setSelectedFilters({ ...selectedFilters, [filterType]: value });
    setOpenDropdown(null);
  };

  return (
    <div className="flex flex-wrap gap-3  ">
      {Object.keys(filterData).map((filterType) => (
        <div key={filterType} className="relative">
          <button
            onClick={() => toggleDropdown(filterType)}
            className="flex items-center gap-1 px-4 py-2 rounded-full bg-[#E3DFCB] text-black text-sm font-medium border border-gray-300 shadow-sm hover:bg-gray-100 transition"
          >
            {selectedFilters[filterType] || filterType}
            <ChevronDown className="w-4 h-4" />
          </button>

          {/* Dropdown */}
          {openDropdown === filterType && (
            <div className="absolute mt-2 w-40 bg-white rounded-md shadow-lg border z-10">
              {filterData[filterType].map((item) => (
                <div
                  key={item}
                  onClick={() => handleSelect(filterType, item)}
                  className="px-4 py-2 text-sm text-black hover:bg-green-100 cursor-pointer"
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Dropdowns;
