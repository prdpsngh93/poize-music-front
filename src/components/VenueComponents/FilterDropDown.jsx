"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { ChevronDown, X } from "lucide-react";

// Filter options
const filterData = {
  Genre: ["Rock", "Jazz", "Pop", "Electronic", "Classical"],
  Date: ["Last Week", "Last Month", "Last 3 Month"],
  "Venue Type": ["Indoor", "Outdoor"],
  Price: ["Free", "Paid"],
  Status: ["Active", "Completed"],
};

// Map date labels to API values
const dateValueMap = {
  "Last Week": "1w",
  "Last Month": "1m",
  "Last 3 Month": "3m",
};

const FilterDropdown = ({ onChange, filters = {} }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    Genre: "",
    Date: "",
    "Venue Type": "",
    Price: "",
    Status: "",
  });

  // Create a stable reference for the initial filters
  const initialFilters = useMemo(() => ({
    Genre: filters.genre || "",
    Date: filters.date || "",
    "Venue Type": filters.venueType || "",
    Price: filters.price || "",
    Status: filters.status || "",
  }), [filters.genre, filters.date, filters.venueType, filters.price, filters.status]);

  // Only update when the actual filter values change, not the filters object reference
  useEffect(() => {
    setSelectedFilters(prevFilters => {
      const newFilters = {
        Genre: filters.genre || "",
        Date: filters.date || "",
        "Venue Type": filters.venueType || "",
        Price: filters.price || "",
        Status: filters.status || "",
      };

      // Only update if the values are actually different
      const hasChanged = Object.keys(newFilters).some(key => 
        newFilters[key] !== prevFilters[key]
      );

      return hasChanged ? newFilters : prevFilters;
    });
  }, [filters.genre, filters.date, filters.venueType, filters.price, filters.status]);

  const toggleDropdown = useCallback((filterType) => {
    setOpenDropdown(prev => prev === filterType ? null : filterType);
  }, []);

  const handleSelect = useCallback((filterType, value) => {
    const newSelected = {
      ...selectedFilters,
      [filterType]: selectedFilters[filterType] === value ? "" : value,
    };
    
    setSelectedFilters(newSelected);
    setOpenDropdown(null);

    if (onChange) {
      // Create the callback data
      const callbackData = {
        genre: newSelected.Genre,
        date: dateValueMap[newSelected.Date] || "",
        venueType: newSelected["Venue Type"],
        price: newSelected.Price,
        status: newSelected.Status.toLowerCase(),
      };
      
      onChange(callbackData);
    }
  }, [selectedFilters, onChange]);

  const clearFilter = useCallback((filterType, e) => {
    e.stopPropagation();
    
    const newSelected = { 
      ...selectedFilters, 
      [filterType]: "" 
    };
    
    setSelectedFilters(newSelected);

    if (onChange) {
      const callbackData = {
        genre: newSelected.Genre,
        date: dateValueMap[newSelected.Date] || "",
        venueType: newSelected["Venue Type"],
        price: newSelected.Price,
        status: newSelected.Status.toLowerCase(),
      };
      
      onChange(callbackData);
    }
  }, [selectedFilters, onChange]);

  const clearAll = useCallback(() => {
    const cleared = {
      Genre: "",
      Date: "",
      "Venue Type": "",
      Price: "",
      Status: "",
    };
    
    setSelectedFilters(cleared);

    if (onChange) {
      onChange({ 
        genre: "", 
        date: "", 
        venueType: "", 
        price: "", 
        status: "" 
      });
    }
  }, [onChange]);

  // Memoize the check for active filters
  const hasActive = useMemo(() => 
    Object.values(selectedFilters).some((v) => v !== ""), 
    [selectedFilters]
  );

  return (
    <div className="flex flex-wrap gap-3 items-center">
      {Object.keys(filterData).map((filterType) => (
        <div key={filterType} className="relative">
          <button
            onClick={() => toggleDropdown(filterType)}
            className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium border shadow-sm transition ${
              selectedFilters[filterType]
                ? "bg-[#1FB58F] text-white border-[#1FB58F]"
                : "bg-[#E3DFCB] text-black border-gray-300 hover:bg-gray-100"
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

          {openDropdown === filterType && (
            <div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg border z-10 max-h-60 overflow-y-auto">
              {filterData[filterType].map((item) => (
                <div
                  key={item}
                  onClick={() => handleSelect(filterType, item)}
                  className={`px-4 py-2 text-sm cursor-pointer transition ${
                    selectedFilters[filterType] === item
                      ? "bg-[#1FB58F] text-white"
                      : "text-black hover:bg-green-50"
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {hasActive && (
        <button
          onClick={clearAll}
          className="px-3 py-1 text-xs text-gray-600 hover:text-red-600 underline transition"
        >
          Clear All
        </button>
      )}
    </div>
  );
};

export default FilterDropdown;