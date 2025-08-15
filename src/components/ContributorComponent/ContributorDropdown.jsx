'use client';
import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

const ContributorDropdowns = ({ filters, onFilterChange }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({});
  const dropdownRef = useRef(null);

  const toggleDropdown = (filterType) => {
    setOpenDropdown(openDropdown === filterType ? null : filterType);
  };

  const handleSelect = (filterType, value) => {
    const updatedFilters = { ...selectedFilters, [filterType]: value };
    setSelectedFilters(updatedFilters);

    if (onFilterChange) {
      onFilterChange(updatedFilters); // Notify parent
    }

    setOpenDropdown(null);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex flex-wrap gap-3" ref={dropdownRef}>
      {Object.keys(filters).map((filterType) => (
        <div key={filterType} className="relative">
          <button
            onClick={() => toggleDropdown(filterType)}
            className="flex items-center gap-1 px-4 py-2 rounded-full bg-[#E3DFCB] text-black text-sm font-medium border border-gray-300 shadow-sm hover:bg-gray-100 transition"
            aria-haspopup="listbox"
            aria-expanded={openDropdown === filterType}
          >
            {selectedFilters[filterType] || filterType}
            <ChevronDown className="w-4 h-4" />
          </button>

          {openDropdown === filterType && (
            <div
              className="absolute mt-2 w-44 bg-white rounded-md shadow-lg border z-10 max-h-56 overflow-y-auto"
              role="listbox"
            >
              <div
                onClick={() => handleSelect(filterType, null)}
                className="px-4 py-2 text-sm text-gray-500 hover:bg-red-100 cursor-pointer"
              >
                All
              </div>
              {filters[filterType].map((item) => (
                <div
                  key={item}
                  onClick={() => handleSelect(filterType, item)}
                  className={`px-4 py-2 text-sm cursor-pointer hover:bg-green-100 ${
                    selectedFilters[filterType] === item ? 'bg-green-200 font-medium' : 'text-black'
                  }`}
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

export default ContributorDropdowns;
