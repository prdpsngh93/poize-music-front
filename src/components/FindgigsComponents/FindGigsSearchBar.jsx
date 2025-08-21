"use client"
import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";

export default function FindGigsSearchBar({ placeholder, onSearch }) {
  const [value, setValue] = useState("");

  // Debounced search - triggers search automatically as user types
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (onSearch) onSearch(value);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [value, onSearch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(value);
  };

  const handleClear = () => {
    setValue("");
    if (onSearch) onSearch("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-[#1FB58F] focus:border-[#1FB58F] transition-colors"
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-[#1FB58F] text-white rounded-lg hover:bg-[#1AA87A] transition-colors flex items-center gap-2"
      >
        <Search className="h-4 w-4" />
        Search
      </button>
    </form>
  );
}