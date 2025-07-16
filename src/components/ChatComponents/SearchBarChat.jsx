'use client';

import { Search, SlidersHorizontal } from 'lucide-react';

export default function SearchBarChat() {
  return (
    <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-3 w-full bg-[#F1F0EB] px-4 py-6">

      {/* Search Input */}
      <div className="flex items-center bg-white rounded-full px-4 py-2 w-full shadow-sm">
        <Search className="w-4 h-4 text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search Your favourite artist"
          className="flex-grow text-sm bg-transparent outline-none text-gray-600 placeholder:text-gray-400"
        />
      </div>

      {/* Search Button */}
      <div className='flex gap-4'>
      <button className="bg-[#1FB58F] text-white rounded-full px-7 py-2 text-sm font-semibold hover:bg-[#239c62] transition w-full md:w-auto">
        Search
      </button>

      {/* Filter Icon Button */}
      <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition w-full md:w-auto flex justify-center items-center">
        <SlidersHorizontal className="w-5 h-5 text-black" />
      </button>
      </div>
      
    </div>
  );
}
