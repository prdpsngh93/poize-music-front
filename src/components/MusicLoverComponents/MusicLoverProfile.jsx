'use client';

import React, { useState } from 'react';
import MapLocation from '../VenueComponents/MapComponet';
import { FaSort } from 'react-icons/fa';

const MusicLoverProfile = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    genre: '',
    artist: '',
    preferred: '',
    location: '',
    gigsNearby: false,
    artistUpdates: false,
  });

  const [position, setPosition] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const setAddress = (address) => {
    setFormData((prev) => ({
      ...prev,
      location: address,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', formData);
  };

  const renderSelect = (name, value, label, options) => (
    <div className="relative">
      <label className="block mb-1 font-normal text-[15px] text-[#121217]">{label}</label>
      <select
        name={name}
        value={value}
        onChange={handleInputChange}
        className="w-full appearance-none border text-[#121217] text-[15px] border-gray-300 rounded-full px-4 py-2 bg-white focus:ring-0 focus:outline-none"
      >
        <option value="">{`Select ${label}`}</option>
        {options.map((opt) => (
          <option key={opt} value={opt} className="text-[#121217]">
            {opt}
          </option>
        ))}
      </select>
      <FaSort className="absolute right-4 top-9 text-[#39393b] pointer-events-none" />
    </div>
  );

  return (
    <div className="bg-[#F4F3EC]">
    <form onSubmit={handleSubmit} className="p-4 sm:p-8 md:p-10 rounded-xl max-w-5xl mx-auto text-[15px] text-[#121217]">
      <h2 className=" font-bold text-xl lg:text-3xl text-[#121217] mb-6 text-left">Tell Us About Your Music Taste</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block mb-1 font-normal text-[15px] text-[#121217]">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Enter your full name"
            className="w-full border border-gray-300 rounded-full px-4 py-2 bg-white text-[#121217] text-[15px] focus:outline-none focus:ring-0"
          />
        </div>

        {renderSelect("genre", formData.genre, "Favourite Genre", ["Rock", "Hip Hop", "Jazz"])}
        {renderSelect("artist", formData.artist, "Favourite Artist", ["Drake", "Adele", "Coldplay"])}
        {renderSelect("preferred", formData.preferred, "Preferred", ["Solo", "Bands", "DJs"])}
      </div>

      <div className="mt-6">
        <label className="block mb-1 font-normal text-[15px] text-[#121217]">Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          placeholder="Enter location"
          className="w-full border border-gray-300 rounded-full px-4 py-2 bg-white text-[#121217] text-[15px] focus:outline-none focus:ring-0"
        />
      </div>

      <div className="mt-4">
        <MapLocation position={position} setPosition={setPosition} setAddress={setAddress} />
      </div>

      <div className="flex flex-col gap-4 mt-8">
        {[
          { label: "Gigs Near Me", name: "gigsNearby" },
          { label: "Artist Updates", name: "artistUpdates" },
        ].map(({ label, name }) => (
          <div
            key={name}
            className="flex items-center justify-between w-full bg-white border border-gray-300 rounded-lg px-4 py-2"
          >
            <span className="text-[15px] text-[#121217]">{label}</span>
            <label className="relative inline-block w-10 h-6 cursor-pointer">
              <input
                type="checkbox"
                name={name}
                checked={formData[name]}
                onChange={handleInputChange}
                className="sr-only peer"
              />
              <div className="w-10 h-6 bg-gray-300 rounded-full peer-checked:bg-[#2FC7A3] transition-colors duration-300"></div>
              <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300 transform peer-checked:translate-x-4"></div>
            </label>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          type="submit"
          className="bg-[#2FC7A3] text-white text-[15px] px-6 md:px-20 py-2 rounded-full hover:bg-[#25ae8f] transition"
        >
          Start Exploring Gigs
        </button>
      </div>
    </form>
    </div>
  );
};

export default MusicLoverProfile;
