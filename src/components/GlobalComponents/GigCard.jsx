import React from 'react';

const GigCard = ({ title, genre, location, price, description, date, about }) => {
  return (
    <div className="bg-[#F1F0EA] rounded-lg py-6 px-4 sm:px-6 flex flex-col justify-between min-h-[200px]">

      <div>
        <h3 className="text-xl sm:text-2xl font-bold text-[#1B3139] mb-2">{title}</h3>
        <p className="text-sm sm:text-base text-[#1B3139] font-light mb-4">{description}</p>

        <ul className="text-sm text-[#1B3139] space-y-1 mb-3">
          <li className="font-semibold">📍 {location}</li>
          <li>🎵 {date}</li>
          <li>🎵 {genre}</li>
          <li>💲 {price}</li>
        </ul>

        <p className="text-sm text-black font-normal">{about}</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-5">
        <button className="border text-black border-black py-2 px-4 w-full sm:w-auto rounded-full font-semibold hover:bg-gray-100 text-sm">
          Details
        </button>
        <button className="bg-[#1FB58F] py-2 px-4 w-full sm:w-auto rounded-full font-semibold text-white hover:bg-green-600 text-sm">
          Apply
        </button>
      </div>

    </div>
  );
};

export default GigCard;
