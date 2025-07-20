import React from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaMusic, FaDollarSign } from "react-icons/fa";

const GigsGridCard = ({ image, title, location, date, artist, price, description }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 sm:p-5 w-full max-w-full md:max-w-md transition hover:shadow-lg">
      
      <div className="flex items-center mb-3 flex-wrap sm:flex-nowrap">
        <img
          src={image}
          alt={title}
          className="w-12 h-12 rounded-full mr-3 mb-2 sm:mb-0 object-cover"
        />
        <div>
          <h2 className="font-bold text-base md:text-lg text-black">{title}</h2>
          <p className="text-sm text-gray-500">Lorem Ipsum is simply dummy text</p>
        </div>
      </div>

      <ul className="text-sm text-gray-700 mb-3 space-y-1">
        <li className="flex items-center">
          <FaMapMarkerAlt className="mr-2 text-gray-600" />
          <strong>{location}</strong>
        </li>
        <li className="flex items-center">
          <FaCalendarAlt className="mr-2 text-gray-600" />
          {date}
        </li>
        <li className="flex items-center">
          <FaMusic className="mr-2 text-gray-600" />
          {artist}
        </li>
        <li className="flex items-center">
          <FaDollarSign className="mr-2 text-gray-600" />
          ${price}
        </li>
      </ul>

      <p className="text-sm text-gray-600 mb-4">
        {description}
      </p>

      <div className="flex flex-wrap gap-3">
        <button className="border border-gray-400 text-gray-800 px-4 py-2 rounded hover:bg-gray-100 w-full sm:w-auto">
          View Details
        </button>
        <button className="bg-[#1FB58F] text-white px-6 py-2 rounded hover:bg-green-600 w-full sm:w-auto">
          Apply
        </button>
      </div>
    </div>
  );
};

export default GigsGridCard;
