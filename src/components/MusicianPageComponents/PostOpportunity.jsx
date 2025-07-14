'use client';

import { useState } from 'react';

export default function PostOpportunity() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    genre: '',
    location: '',
    format: '',
    email: '',
    expectations: '',
    visibility: 'public',
    file: null,
  });

  const genres = ['Indie Pop', 'Electronic', 'Acoustic', 'Rock', 'Folk'];

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, file: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleGenreClick = (genre) => {
    setFormData({ ...formData, genre });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Form:', formData);
  };

  return (
    <div className='min-h-screen px-4 md:px-9 lg:px-12 py-10   bg-[#f4f3ee]'>
    <div className=" flex flex-col max-w-2xl   justify-center mx-auto items-center ">
      <h1 className="text-2xl md:text-4xl text-[#121217] font-bold mb-8">
        Post a Collaboration Opportunity
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl w-full">
        {/* Collaboration Details */}
        <div>
          <h2 className="text-lg font-semibold text-[#121217] mb-4">Collaboration Details</h2>

          <label htmlFor="title" className="block text-sm font-medium text-[#121217] mb-1">
            Project Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            placeholder="e.g., Seeking Vocalist for Indie Pop Track"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 bg-white text-[#121217]  rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#1FB58F]"
          />

          <label htmlFor="description" className="block text-sm font-medium text-[#121217] mb-1">
            Project Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Project Description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 bg-white text-[#121217] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1FB58F]"
          />
        </div>

        {/* Music Preferences */}
        <div>
          <h2 className="text-lg font-semibold text-[#121217] mb-4">Music Preferences</h2>

          <label htmlFor="genre" className="block text-sm font-medium text-[#121217] mb-1">
            Genre
          </label>
          <input
            id="genre"
            type="text"
            name="genre"
            placeholder="Select Genre"
            value={formData.genre}
            onChange={handleChange}
            className="w-full border bg-white text-[#121217] border-gray-300 rounded-md px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-[#1FB58F]"
          />

          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <button
                key={genre}
                type="button"
                onClick={() => handleGenreClick(genre)}
                className={`px-3 py-1 rounded-full border ${
                  formData.genre === genre
                    ? 'bg-[#1FB58F] text-white'
                    : 'bg-gray-100 text-gray-700'
                } hover:bg-[#1FB58F] hover:text-white transition`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* Location and Format */}
        <div>
          <h2 className="text-lg font-semibold text-[#121217] mb-4">Location and Format</h2>

          <label htmlFor="location" className="block text-sm font-medium text-[#121217] mb-1">
            Location
          </label>
          <input
            id="location"
            type="text"
            name="location"
            placeholder="Select Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border bg-white text-[#121217] border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#1FB58F]"
          />

          <label htmlFor="format" className="block text-sm font-medium text-[#121217] mb-1">
            Collaboration Format
          </label>
          <input
            id="format"
            type="text"
            name="format"
            placeholder="Select Format"
            value={formData.format}
            onChange={handleChange}
            className="w-full border bg-white text-[#121217] border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1FB58F]"
          />
        </div>

        {/* Media Attachments */}
        <div>
          <h2 className="text-lg font-semibold text-[#121217] mb-4">Media Attachments</h2>
          <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
            <p className="text-sm font-semibold text-[#121217] mb-2">Upload Media</p>
            <p className="text-xs text-gray-600 mb-3">Attach audio samples, demos, or other relevant files.</p>
            <label className="cursor-pointer font-semibold  text-[#121217] hover:underline">
              Browse Files
              <input
                type="file"
                name="file"
                accept="audio/*"
                onChange={handleChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Contact and Collaboration Details */}
        <div>
          <h2 className="text-lg font-semibold text-[#121217] mb-4">Contact and Collaboration Details</h2>

          <label htmlFor="email" className="block text-sm font-medium text-[#121217] mb-1">
            Contact Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Your email address for potential collaborators"
            value={formData.email}
            onChange={handleChange}
            className="w-full border bg-white text-[#121217] border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#1FB58F]"
          />

          <label htmlFor="expectations" className="block text-sm font-medium text-[#121217] mb-1">
            Collaboration Expectations
          </label>
          <textarea
            id="expectations"
            name="expectations"
            placeholder="Collaboration Expectations"
            rows={4}
            value={formData.expectations}
            onChange={handleChange}
            className="w-full border border-gray-300 bg-white text-[#121217] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1FB58F]"
          />
        </div>

        {/* Visibility Settings */}
        <div>
          <h2 className="text-lg font-semibold text-[#121217] mb-4">Visibility Settings</h2>

          <div className="space-y-2">
            <label className="flex items-center border-gray-300 bg-white p-2 rounded-lg  space-x-2">
              <input
                type="radio"
                name="visibility"
                value="public"
                checked={formData.visibility === 'public'}
                onChange={handleChange}
              />
              <div>
                <p className="text-sm font-medium text-[#121217]">Public</p>
                <p className="text-xs text-gray-500">Visible to all users</p>
              </div>
            </label>

            <label className="flex border-gray-300 bg-white p-2 rounded-lg items-center space-x-2">
              <input
                type="radio"
                name="visibility"
                value="private"
                checked={formData.visibility === 'private'}
                onChange={handleChange}
              />
              <div className=''>
                <p className="text-sm font-medium text-[#121217]">Private</p>
                <p className="text-xs  text-gray-500">Only visible to selected users</p>
              </div>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full md:w-auto px-8 py-3 bg-[#1FB58F] text-white font-semibold rounded-md hover:bg-green-700 transition"
          >
            Post Opportunity
          </button>
        </div>
      </form>
    </div>
    </div>
  );
}
