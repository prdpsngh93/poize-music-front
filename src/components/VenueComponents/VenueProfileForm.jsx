"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { FiUpload } from "react-icons/fi";

const MapLocation = dynamic(() => import("./MapComponet"), { ssr: false });

const VenueProfileForm = () => {
  const [formData, setFormData] = useState({
    venueName: "",
    venueType: "",
    venueDescription: "",
    venueAddress: "",
    musicGenres: "",
    artistTypes: "",
    hours: "",
    bookingInfo: "",
    capacity: "",
    equipment: "",
    email: "",
    contactPhone: "",
    website: "",
    managerName: "",
    logo: null,
    photos: [],
  });

  const [position, setPosition] = useState(null);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (formData.venueAddress.length > 5) {
        fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            formData.venueAddress
          )}`
        )
          .then((res) => res.json())
          .then((data) => {
            if (data && data[0]) {
              const lat = parseFloat(data[0].lat);
              const lon = parseFloat(data[0].lon);
              setPosition({ lat, lng: lon });
            }
          });
      }
    }, 1000);
    return () => clearTimeout(delayDebounce);
  }, [formData.venueAddress]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, photos: [...prev.photos, ...files] }));
  };

  return (
    <div className="bg-[#f4f1ea]">
      <form className="p-6 max-w-5xl mx-auto space-y-10 px-4 md:px-9 lg:px-12 py-10 rounded-lg">
        <h1 className="text-3xl font-extrabold mb-8 text-[#121417]">
          Create Your Venue Profile
        </h1>

        {/* Venue Basics */}
        <section>
          <h2 className="font-semibold mb-4 text-lg text-[#121417]">Venue Basics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-6">
              <div>
                <label className="block mb-1 font-medium text-[#121417]">Venue Name</label>
                <input
                  name="venueName"
                  value={formData.venueName}
                  onChange={handleInputChange}
                  placeholder="e.g., The Blue Note"
                  className="w-full border border-gray-300 rounded-full px-4 bg-white text-[#121417] py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1FB58F]"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-[#121417]">Venue Type</label>
                <select
                  name="venueType"
                  value={formData.venueType}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-full px-4 bg-white text-[#121417] py-3 focus:outline-none focus:ring-2 focus:ring-[#1FB58F]"
                >
                  <option value="">Select Venue Type</option>
                  <option value="Bar">Bar</option>
                  <option value="Club">Club</option>
                  <option value="Theater">Theater</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block mb-1 font-medium text-[#121417]">Venue Description</label>
              <textarea
                name="venueDescription"
                value={formData.venueDescription}
                onChange={handleInputChange}
                rows={4}
                placeholder="Describe your venue's vibe, history, and anything special."
                className="w-full border border-gray-300 rounded-xl px-4 bg-white text-[#121417] py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1FB58F]"
              />
            </div>
          </div>
        </section>

        {/* Location */}
        <section>
          <h2 className="font-semibold mb-4 text-lg text-[#121417]">Location</h2>
          <label className="block mb-1 font-medium text-[#121417]">Venue Address</label>
          <input
            name="venueAddress"
            value={formData.venueAddress}
            onChange={handleInputChange}
            placeholder="Enter venue address"
            className="w-[50%] border border-gray-300 rounded-full px-4 bg-white text-[#121417] py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1FB58F] mb-4"
          />
          <div className="rounded-xl overflow-hidden border border-gray-300 shadow-sm">
            <MapLocation
              position={position}
              setPosition={setPosition}
              setAddress={(addr) =>
                setFormData((prev) => ({ ...prev, venueAddress: addr }))
              }
            />
          </div>
        </section>

        {/* Photos */}
        <section>
          <h2 className="font-semibold mb-4 text-lg text-[#121417]">Photos</h2>
          <div className="grid sm:grid-cols-2 gap-8">
            <section>
              <h2 className="font-semibold mb-4 text-lg">Venue Logo/Cover Photo</h2>
              <div className="border-2 border-dashed border-gray-400 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-white">
                <p className="font-semibold mb-1 text-[#121417]">Upload Logo or Cover Photo</p>
                <p className="text-sm text-gray-500 mb-4">
                  Attach a logo or main venue image.
                </p>
                <input
                  type="file"
                  name="logo"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="upload-logo"
                />
                <label
                  htmlFor="upload-logo"
                  className="bg-[#1FB58F] hover:bg-green-700 text-white px-8 py-2 rounded-full cursor-pointer transition"
                >
                  Upload
                </label>
              </div>
            </section>

            <section>
              <h2 className="font-semibold mb-4 text-lg">Venue Gallery</h2>
              <div className="border-2 border-dashed border-gray-400 rounded-xl p-6 flex flex-col items-center justify-center text-center bg-white">
                <p className="font-semibold mb-1 text-[#121417]">Upload Venue Photos</p>
                <p className="text-sm text-gray-500 mb-6">Attach additional venue photos</p>
                <div className="flex justify-center flex-wrap gap-4">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <label
                      key={index}
                      htmlFor={`upload-photo-${index}`}
                      className="w-12 h-12 border border-gray-300 rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-100 transition"
                    >
                      <FiUpload className="text-gray-500" />
                      <input
                        id={`upload-photo-${index}`}
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </label>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </section>

        {/* Music Preferences */}
        <section>
          <h2 className="font-semibold mb-4 text-lg text-[#121417]">Music Preferences</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 font-medium text-[#121417]">Genre Tags</label>
              <input
                name="musicGenres"
                value={formData.musicGenres}
                onChange={handleInputChange}
                placeholder="e.g., Jazz, Blues, Rock"
                className="w-full border border-gray-300 rounded-full px-4 bg-white text-[#121417] py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1FB58F]"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-[#121417]">Artist Types</label>
              <input
                name="artistTypes"
                value={formData.artistTypes}
                onChange={handleInputChange}
                placeholder="e.g., Solo, Band, DJ"
                className="w-full border border-gray-300 rounded-full px-4 bg-white text-[#121417] py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1FB58F]"
              />
            </div>
          </div>
        </section>

        {/* Operational Info */}
        <section>
          <h2 className="font-semibold mb-4 text-lg text-[#121417]">Operational Info</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { name: "hours", label: "Venue Hours", placeholder: "e.g., 7 PM – 2 AM" },
              { name: "managerName", label: "Manager Name", placeholder: "Enter manager's name" },
              { name: "bookingInfo", label: "Booking Information", placeholder: "How to book your venue" },
              { name: "email", label: "Contact Email", placeholder: "Enter contact email" },
              { name: "capacity", label: "Venue Capacity", placeholder: "e.g., 200" },
              { name: "contactPhone", label: "Contact Phone", placeholder: "Enter contact phone" },
              { name: "equipment", label: "Available Equipment", placeholder: "e.g., Sound system, Lighting" },
              { name: "website", label: "Venue Website", placeholder: "Enter venue website" },
            ].map(({ name, label, placeholder }) => (
              <div key={name}>
                <label className="block mb-1 font-medium text-[#121417]">{label}</label>
                <input
                  name={name}
                  value={formData[name]}
                  onChange={handleInputChange}
                  placeholder={placeholder}
                  className="w-full border border-gray-300 rounded-full px-4 bg-white text-[#121417] py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1FB58F]"
                />
              </div>
            ))}
          </div>
        </section>
      </form>
    </div>
  );
};

export default VenueProfileForm;
