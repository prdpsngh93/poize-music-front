'use client'
import React, { useState, useEffect } from 'react';
import { ChevronDown, X } from 'lucide-react';

const filterData = {
  Genre: ['Rock', 'Jazz', 'Hip-Hop', 'Indie', 'Pop', 'Classical', 'Electronic', 'R&B'],
  Location: ['New York', 'Los Angeles', 'Chicago', 'Remote', 'London', 'Nashville', 'Austin'],
};

const Dropdowns = ({ onFilterChange, filters = {} }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    Genre: '',
    Location: '',
    ...filters
  });

  // Update parent component when filters change
  useEffect(() => {
    if (onFilterChange) {
      onFilterChange({
        genre: selectedFilters.Genre,
        location: selectedFilters.Location,
      });
    }
  }, [selectedFilters, onFilterChange]);

  const toggleDropdown = (filterType) => {
    setOpenDropdown(openDropdown === filterType ? null : filterType);
  };

  const handleSelect = (filterType, value) => {
    setSelectedFilters(prev => ({ 
      ...prev, 
      [filterType]: prev[filterType] === value ? '' : value 
    }));
    setOpenDropdown(null);
  };

  const clearFilter = (filterType, e) => {
    e.stopPropagation();
    setSelectedFilters(prev => ({ ...prev, [filterType]: '' }));
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      Genre: '',
      Location: '',
    });
  };

  const hasActiveFilters = Object.values(selectedFilters).some(value => value !== '');

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