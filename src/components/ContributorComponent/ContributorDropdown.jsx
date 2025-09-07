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

  const handleSelect = (filterType, option) => {
    const updatedFilters = { 
      ...selectedFilters, 
      [filterType]: option ? option.value : ""   // store only value
    };
    setSelectedFilters(updatedFilters);

    if (onFilterChange) onFilterChange(updatedFilters);

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

  // Helper: find label by value
  const getLabel = (filterType, value) => {
    if (!value) return filterType; // default button text
    const options = filters[filterType];
    const found = options.find(item =>
      (typeof item === "string" ? item : item.value) === value
    );
    return found ? (typeof found === "string" ? found : found.label) : filterType;
  };

  return (
    <div className="flex flex-wrap gap-3" ref={dropdownRef}>
      {Object.keys(filters).map((filterType) => (
        <div key={filterType} className="relative">
          {/* Button with selected filter label */}
          <button
            onClick={() => toggleDropdown(filterType)}
            className="flex items-center gap-1 px-4 py-2 rounded-full bg-[#E3DFCB] text-black text-sm font-medium border border-gray-300 shadow-sm hover:bg-gray-100 transition"
          >
            {getLabel(filterType, selectedFilters[filterType])}
            <ChevronDown className="w-4 h-4" />
          </button>

          {/* Dropdown list */}
          {openDropdown === filterType && (
            <div className="absolute mt-2 w-44 bg-white rounded-md shadow-lg border z-10 max-h-56 overflow-y-auto">
              {/* "All" option */}
              <div
                onClick={() => handleSelect(filterType, null)}
                className="px-4 py-2 text-sm text-gray-500 hover:bg-red-100 cursor-pointer"
              >
                All
              </div>

              {/* Options */}
              {filters[filterType].map((item) => {
                const option = typeof item === "string" ? { label: item, value: item } : item;
                return (
                  <div
                    key={option.value}
                    onClick={() => handleSelect(filterType, option)}
                    className={`px-4 py-2 text-sm cursor-pointer hover:bg-green-100 ${
                      selectedFilters[filterType] === option.value
                        ? 'bg-green-200 text-black font-medium'
                        : 'text-black'
                    }`}
                  >
                    {option.label}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ContributorDropdowns;
