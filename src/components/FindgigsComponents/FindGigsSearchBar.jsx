"use client"
import { useState } from "react";

export default function FindGigsSearchBar({ placeholder, onSearch }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-[#1FB58F]"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-[#1FB58F] text-white rounded-lg"
      >
        Search
      </button>
    </form>
  );
}
