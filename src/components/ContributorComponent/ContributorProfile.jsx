'use client';
import React, { useState } from 'react';
import { FaSort } from 'react-icons/fa';

export default function ContributorProfile() {
  const [formData, setFormData] = useState({
    fullName: '',
    location: '',
    role: '',
    venueType: '',
    bio: '',
    skills: '',
    workSamples: '',
    socialLinks: '',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <div className="min-h-screen bg-[#f3f1e9] py-16 px-4 md:px-9 lg:px-12">
      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-[#121417] ">Create Your Contributor Profile</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="flex flex-col">
            <label className="mb-1 text-[#121417] text-sm font-medium">Full Name</label>
            <input
              name="fullName"
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              className="bg-white text-[#121417] text-sm rounded-full p-3 px-4w-full focus:outline-none focus:ring-1 focus:ring-[#616366]"
            />
          </div>

          {/* Location */}
          <div className="flex flex-col">
            <label className="mb-1 text-[#121417] text-sm font-medium">Location</label>
            <input
              name="location"
              type="text"
              placeholder="City, State"
              value={formData.location}
              onChange={handleChange}
              className="bg-white text-[#121417] text-sm rounded-full p-3 px-4w-full focus:outline-none focus:ring-1 focus:ring-[#616366]"
            />
          </div>

          {/* Role */}
   <div className="flex flex-col relative">
        <label className="mb-1 text-[#121417] text-sm font-medium">Role</label>
        <div className="relative">
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="bg-white text-[#616366] text-sm focus:outline-none focus:ring-1 focus:ring-[#616366] rounded-full p-3 pr-10 w-full appearance-none"
          >
            <option value="">Select</option>
            <option value="Singer">Singer</option>
            <option value="Producer">Producer</option>
            <option value="Mixer">Mixer</option>
          </select>
          <FaSort className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>
      </div>

      {/* Venue Type */}
      <div className="flex flex-col relative">
        <label className="mb-1 text-[#121417] text-sm font-medium">Profile Picture</label>
        <div className="relative">
          <select
            name="venueType"
            value={formData.venueType}
            onChange={handleChange}
            className="bg-white text-[#6c6e72] text-sm focus:outline-none focus:ring-1 focus:ring-[#616366] rounded-full p-3 pr-10 w-full appearance-none"
          >
            <option value="">Select Venue Type</option>
            <option value="Studio">Studio</option>
            <option value="Remote">Remote</option>
            <option value="Live">Live</option>
          </select>
          <FaSort className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>
      </div>
          {/* Profile Picture Upload */}
          <div className="flex flex-col bg-white bg-white-dashed rounded-lg p-4 items-center justify-center text-center">
            <label className="text-[#121417] text-sm font-medium mb-2">Upload Your Profile Picture</label>
            <p className="text-sm text-gray-600 mb-2">Attach .JPG, .JPEG, .PNG or other relevant files</p>
            <input
              name="file"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="bg-[#1FB58F] text-white px-4 py-2 rounded-full cursor-pointer"
            >
              Upload
            </label>
            {formData.file && (
              <p className=" mt-2 text-[#121417] text-sm">{formData.file.name}</p>
            )}
          </div>

          {/* Bio */}
          <div className="flex flex-col">
            <label className="mb-1 text-[#121417] text-sm font-medium">Short Bio</label>
            <textarea
              name="bio"
              placeholder="Write a short bio"
              value={formData.bio}
              onChange={handleChange}
              rows="5"
              className="bg-white text-[#121417] text-sm rounded-lg p-3 px-4w-full focus:outline-none focus:ring-1 focus:ring-[#616366]"
            />
          </div>

          {/* Skills */}
          <div className="flex flex-col">
            <label className="mb-1 text-[#121417] text-sm font-medium">Skill Tags</label>
            <input
              name="skills"
              type="text"
              placeholder="Add skill tags (e.g., Mixing, Mastering)"
              value={formData.skills}
              onChange={handleChange}
              className="bg-white text-[#121417] text-sm rounded-full p-3 px-4w-full focus:outline-none focus:ring-1 focus:ring-[#616366]"
            />
          </div>

          {/* Work Samples */}
          <div className="flex flex-col">
            <label className="mb-1 text-[#121417] text-sm font-medium">Work Samples</label>
            <input
              name="workSamples"
              type="text"
              placeholder="Upload or link your work samples"
              value={formData.workSamples}
              onChange={handleChange}
              className="bg-white text-[#121417] text-sm rounded-full p-3 px-4w-full focus:outline-none focus:ring-1 focus:ring-[#616366]"
            />
          </div>

          {/* Social Media Links */}
          <div className="flex flex-col">
            <label className="mb-1 text-[#121417] text-sm font-medium">Social Media Links</label>
            <input
              name="socialLinks"
              type="text"
              placeholder="Add links to your social media profiles"
              value={formData.socialLinks}
              onChange={handleChange}
              className="bg-white text-[#121417] text-sm rounded-full p-3 px-4w-full focus:outline-none focus:ring-1 focus:ring-[#616366]"
            />
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-[#1FB58F] text-white px-6 py-2 rounded-full hover:bg-green-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
