"use client";
import React, { useState, useEffect } from "react";
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
    ...filters,
  });

  useEffect(() => {
    setSelectedFilters({
      Genre: filters.genre || "",
      Date: filters.date || "",
      "Venue Type": filters.venueType || "",
      Price: filters.price || "",
      Status: filters.status || "",
    });
  }, [filters]);

  const toggleDropdown = (filterType) => {
    setOpenDropdown(openDropdown === filterType ? null : filterType);
  };

  const handleSelect = (filterType, value) => {
    const newSelected = {
      ...selectedFilters,
      [filterType]: selectedFilters[filterType] === value ? "" : value,
    };
    setSelectedFilters(newSelected);
    setOpenDropdown(null);

    if (onChange) {
      onChange({
        genre: newSelected.Genre,
        date: dateValueMap[newSelected.Date] || "",
        venueType: newSelected["Venue Type"],
        price: newSelected.Price,
        status: newSelected.Status.toLowerCase(),
      });
    }
  };

  const clearFilter = (filterType, e) => {
    e.stopPropagation();
    const newSelected = { ...selectedFilters, [filterType]: "" };
    setSelectedFilters(newSelected);

    if (onChange) {
      onChange({
        genre: newSelected.Genre,
        date: dateValueMap[newSelected.Date] || "",
        venueType: newSelected["Venue Type"],
        price: newSelected.Price,
        status: newSelected.Status.toLowerCase(),
      });
    }
  };

  const clearAll = () => {
    const cleared = {
      Genre: "",
      Date: "",
      "Venue Type": "",
      Price: "",
      Status: "",
    };
    setSelectedFilters(cleared);

    if (onChange) {
      onChange({ genre: "", date: "", venueType: "", price: "", status: "" });
    }
  };

  const hasActive = Object.values(selectedFilters).some((v) => v !== "");

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
