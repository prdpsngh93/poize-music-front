import React from 'react';
import Image from 'next/image';

const NoGigsFound = ({ onClear ,heading,para}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4 md:px-9 lg:px-12">
      <div className="w-64 h-44 relative mb-6">
        <Image
          src="/images/nogigs.png" 
          alt="No gigs found"
          layout="fill"
          objectFit="contain"
          className="rounded-md"
        />
      </div>

      <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-1">{heading}</h2>
      <p className="text-sm md:text-base max-w-lg text-gray-600 mb-4">
        {para}
      </p>
      {/* <button
        onClick={onClear}
        className="text-sm font-semibold text-gray-900 hover:underline"
      >
        Clear Filters
      </button> */}
    </div>
  );
};

export default NoGigsFound;
