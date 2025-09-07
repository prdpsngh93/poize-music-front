import React from "react";
import { FaNewspaper, FaSearch } from "react-icons/fa";

const NoBlogsFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-center space-y-4">
        {/* Icon */}
        <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
          <FaNewspaper className="w-10 h-10 text-gray-400" />
        </div>

        {/* Main Message */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-[#1B3139]">
            No Articles Found
          </h3>
          <p className="text-gray-600 max-w-md">
            We couldn&apos;t find any blog articles at the moment. Please check back later or try adjusting your search criteria.
          </p>
        </div>

        {/* Suggestions */}
        <div className="bg-gray-50 rounded-lg p-4 max-w-md mx-auto">
          <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
            <FaSearch className="w-4 h-4 mr-2" />
            Suggestions:
          </h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Check back later for new articles</li>
            <li>• Try different sorting options</li>
            <li>• Browse our latest music news</li>
          </ul>
        </div>

        {/* Action Button */}
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-[#1FB58F] hover:bg-[#17a07b] text-white rounded-lg transition-colors duration-200"
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
};

export default NoBlogsFound;