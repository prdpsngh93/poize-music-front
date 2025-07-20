import React from 'react'
import { Search } from 'lucide-react';

const FindGigsSearchBar = ({placeholder}) => {
  return (

      <div className="w-full flex justify-center">
      <div className="w-full max-w-5xl ">
        <div className="bg-white rounded-full  shadow-sm border border-gray-300 flex items-center px-4 py-2 transition-all w-full">
          <Search className="text-gray-400 w-5 h-5 mr-3" />
          <input
            type="text"
            placeholder={placeholder}
            className="flex-1 text-base text-gray-900 outline-none border-none bg-transparent placeholder-gray-400"
          />
        </div>
      </div>
    </div>
  );
};

export default FindGigsSearchBar
