"use client";
import React from "react";
import { CiMail } from "react-icons/ci";


const SearchResultCard = ({ result }) => {
  return (
    <div className="flex justify-between items-center bg-white rounded-2xl border border-gray-200 p-4 gap-6 shadow-sm">
      {/* Left: Textual Info */}
      <div className="flex flex-col gap-1">
        <p className="text-xs text-gray-500">{result.availability} • Available</p>
        <h3 className="text-md font-semibold text-gray-900">{result.name}</h3>
        <p className="text-sm text-gray-600">{result.genre}</p>
        <button className="mt-2 flex items-center gap-2 justify-center w-fit bg-[#1FB58F] text-white text-sm px-4 py-1.5 rounded-xl hover:bg-green-600 transition-all">
          View Profile <CiMail/>
        </button>
      </div>

      {/* Right: Image */}
      <div className="w-[60%] h-30 rounded-xl overflow-hidden">
        <img
          src={result.image}
          alt={result.name}
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default SearchResultCard;
