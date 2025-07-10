'use client'
import { useState } from 'react';

export default function CreateMusicianProfile() {
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    genre: '',
    availability: '',
    website: '',
    socialMedia: '',
  });

  const genres = ['Vocals', 'Guitar', 'Piano', 'Drums', 'Bass'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenreClick = (selectedGenre) => {
    setFormData({ ...formData, genre: selectedGenre });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Data:', formData);
    setFormData({
    name: '',
    bio: '',
    genre: '',
    availability: '',
    website: '',
    socialMedia: '',
  })
  };

  return (
    <div className="min-h-screen bg-[#f4f3ee] flex flex-col items-center  py-10">
      <h1 className="text-2xl md:text-3xl text-black font-bold text-center mb-6">
        Create Your Musician Profile
      </h1>

      <div className=" p-6 sm:p-8 rounded-2xl 5 w-full max-w-md">
        {/* Avatar */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-30 h-30 rounded-full bg-gray-200 overflow-hidden border border-gray-300">
            <img
              src="/images/avatar.png"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">Upload Image</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <div>
            <h3 className="text-sm font-semibold mb-2 text-gray-800">Basic Information</h3>

            <div className="mb-4">
              <label className="block text-[#222222] text-sm mb-1">Profile Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your stage name or band name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 bg-white text-sm  border text-[#222222] rounded-2xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1FB58F]"
              />
            </div>

            <div>
              <label className="block  text-[#222222] text-sm mb-1">Bio</label>
              <textarea
                name="bio"
                placeholder="Describe your musical style, influences, and experiences"
                value={formData.bio}
                onChange={handleChange}
                rows={3}
                className="w-full p-3 bg-white text-sm border  text-[#222222] rounded-2xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1FB58F]"
              />
            </div>
          </div>

          {/* Genre */}
          <div>
            <h3 className="text-sm font-semibold mb-2  text-gray-800">Genre & Skills</h3>

            <div className="mb-3">
              <label className="block text-sm mb-1 text-[#222222]">Primary Genre</label>
              <input
                type="text"
                name="genre"
                placeholder="Select your main genre"
                value={formData.genre}
                onChange={handleChange}
                className="w-full p-3 bg-white text-sm border rounded-2xl text-[#222222] border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1FB58F]"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <button
                  type="button"
                  key={genre}
                  onClick={() => handleGenreClick(genre)}
                  className={`px-3 py-1 text-sm rounded-2xl  ${formData.genre === genre
                      ? 'bg-[#1FB58F] text-white'
                      : 'bg-[#E3DFCB] text-gray-700'
                    } hover:bg-green-500 hover:text-white transition`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div>
            <h3 className="text-sm font-semibold  mb-2 text-gray-800">Availability</h3>
            <input
              type="text"
              name="availability"
              placeholder="Select your availability for collaborations"
              value={formData.availability}
              onChange={handleChange}
              className="w-full p-3 bg-white text-sm border text-[#222222] rounded-2xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1FB58F]"
            />
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-sm font-semibold mb-2 text-gray-800">Social Links</h3>

            <div className="mb-3">
              <label className="block text-[#222222] text-sm mb-1">Website</label>
              <input
                type="url"
                name="website"
                placeholder="Enter your website URL"
                value={formData.website}
                onChange={handleChange}
                className="w-full p-3 bg-white text-sm border text-[#222222] rounded-2xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1FB58F]"
              />
            </div>

            <div>
              <label className="block text-sm text-[#222222] mb-1">Social Media</label>
              <input
                type="url"
                name="socialMedia"
                placeholder="Enter your social media profile URL"
                value={formData.socialMedia}
                onChange={handleChange}
                className="w-full p-3 bg-white text-sm border text-[#222222] rounded-2xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1FB58F]"
              />
            </div>
          </div>

          {/* Submit */} 
          <div className='flex justify-center items-center'>
            <button
              type="submit"
              className="px-5 py-2 bg-[#1FB58F] text-white rounded-2xl hover:bg-green-500 transition font-medium"
            >
              Save Profile
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
