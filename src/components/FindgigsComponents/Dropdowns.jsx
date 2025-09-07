'use client'
import React, { useState, useEffect } from 'react';
import { ChevronDown, X } from 'lucide-react';

const filterData = {
  Genre: ['Rock', 'Jazz', 'Hip-Hop', 'Indie', 'Pop', 'Classical', 'Electronic', 'R&B'],
  Date: ['Last Week', 'Last Month', 'Last 3 Months'],
};

// Map for API values
const dateValueMap = {
  'Last Week': '1w',
  'Last Month': '1m',
  'Last 3 Months': '3m',
};

const Dropdowns = ({ onFilterChange, filters = {} }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    Genre: '',
    Date: '',
    ...filters,
  });

  // Sync with external filters only when they change
  useEffect(() => {
    setSelectedFilters(prev => ({
      Genre: filters.genre || '',
      Date: filters.date || '',
    }));
  }, [filters.genre, filters.date]);

  const toggleDropdown = (filterType) => {
    setOpenDropdown(openDropdown === filterType ? null : filterType);
  };

  const handleSelect = (filterType, value) => {
    const newSelectedFilters = {
      ...selectedFilters,
      [filterType]: selectedFilters[filterType] === value ? '' : value,
    };
    
    setSelectedFilters(newSelectedFilters);
    setOpenDropdown(null);
    
    if (onFilterChange) {
      onFilterChange({
        genre: newSelectedFilters.Genre,
        date: dateValueMap[newSelectedFilters.Date] || '', // 👈 convert label to API value
      });
    }
  };

  const clearFilter = (filterType, e) => {
    e.stopPropagation();
    const newSelectedFilters = { ...selectedFilters, [filterType]: '' };
    setSelectedFilters(newSelectedFilters);
    
    if (onFilterChange) {
      onFilterChange({
        genre: newSelectedFilters.Genre,
        date: dateValueMap[newSelectedFilters.Date] || '',
      });
    }
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      Genre: '',
      Date: '',
    };
    setSelectedFilters(clearedFilters);
    
    if (onFilterChange) {
      onFilterChange({ genre: '', date: '' });
    }
  };

  const hasActiveFilters = Object.values(selectedFilters).some((value) => value !== '');

  return (
    <div className="flex flex-wrap gap-3 items-center">
      {Object.keys(filterData).map((filterType) => (
        <div key={filterType} className="relative">
          <button
            onClick={() => toggleDropdown(filterType)}
            className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium border shadow-sm transition ${
              selectedFilters[filterType]
                ? 'bg-[#1FB58F] text-white border-[#1FB58F]'
                : 'bg-[#E3DFCB] text-black border-gray-300 hover:bg-gray-100'
            }`}
          >
            {selectedFilters[filterType] || filterType}

            {selectedFilters[filterType] ? (
              <X
                className="w-4 h-4 ml-1"
                onClick={(e) => clearFilter(filterType, e)}
              />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          {/* Dropdown */}
          {openDropdown === filterType && (
            <div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg border z-10 max-h-60 overflow-y-auto">
              {filterData[filterType].map((item) => (
                <div
                  key={item}
                  onClick={() => handleSelect(filterType, item)}
                  className={`px-4 py-2 text-sm cursor-pointer transition ${
                    selectedFilters[filterType] === item
                      ? 'bg-[#1FB58F] text-white'
                      : 'text-black hover:bg-green-50'
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Clear All Filters Button */}
      {hasActiveFilters && (
        <button
          onClick={clearAllFilters}
          className="px-3 py-1 text-xs text-gray-600 hover:text-red-600 underline transition"
        >
          Clear All
        </button>
      )}
    </div>
  );
};

export default Dropdowns;
