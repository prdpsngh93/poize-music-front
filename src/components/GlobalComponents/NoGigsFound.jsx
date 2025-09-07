import React from 'react';

const NoGigsFound = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4">
      <p className="text-sm sm:text-base text-gray-700 mb-6 max-w-md">
        No gigs today in your selected filters. Try changing location or viewing upcoming gigs.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <button className="px-6 py-2 border border-black text-black rounded-full hover:bg-gray-100 transition">
          Artist Information
        </button>
        <button className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition">
          Venue Information
        </button>
      </div>
    </div>
  );
};

export default NoGigsFound;
