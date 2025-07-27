'use client';
import React, { useState } from 'react';
import { FaSort } from 'react-icons/fa';

const CreateGigForm = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [venue, setVenue] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [payment, setPayment] = useState('');
  const [attachment, setAttachment] = useState(null);

  const handleFileChange = (e) => {
    setAttachment(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      title,
      date,
      time,
      venue,
      description,
      genre,
      payment,
      attachment: attachment?.name || 'No file selected',
    };

    console.log('Gig Form Data:', formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" mx-auto p-4 md:p-8 bg-[#F3F2ED] min-h-screen"
    >
        <div className='max-w-5xl flex justify-center flex-col mx-auto'>
      <h1 className="text-2xl font-bold text-[#121417] mb-6">Create Gig</h1>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Enter Gig Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="rounded-full px-4 py-2 border border-gray-300 bg-white text-sm text-[#121417] w-full outline-none"
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="rounded-full px-4 py-2 border border-gray-300 bg-white text-sm text-[#121417] w-full outline-none"
        />

        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="rounded-full px-4 py-2 border border-gray-300 bg-white text-sm text-[#121417] w-full outline-none"
        />
<div className="relative w-full">
        <select
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
        className="appearance-none rounded-full px-4 py-2 border border-gray-300 bg-white text-sm text-[#121417] w-full outline-none"
        >
          <option value="">Select Venue Type</option>
          <option value="Indoor">Indoor</option>
          <option value="Outdoor">Outdoor</option>
        </select>
              <FaSort className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />

</div>
        <textarea
          rows="4"
          placeholder="Gig Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="rounded-2xl px-4 py-2 border border-gray-300 bg-white text-sm text-[#121417] w-full md:col-span-1 outline-none resize-none"
        ></textarea>
<div className="relative w-full">
  <select
    value={genre}
    onChange={(e) => setGenre(e.target.value)}
    className="appearance-none rounded-full px-4 py-2 pr-10 border border-gray-300 bg-white text-sm text-[#121417] w-full outline-none"
  >
    <option value="">Select Genre</option>
    <option value="Jazz">Jazz</option>
    <option value="Rock">Rock</option>
    <option value="Pop">Pop</option>
    <option value="Classical">Classical</option>
  </select>

  <FaSort className="absolute right-3 top-5 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
</div>

      </div>

      {/* Musician Section */}
      <div className="mt-6">
        <h2 className="text-base font-semibold mb-2 text-[#121417]">Musicians</h2>

        <div className="flex items-center justify-between bg-white rounded-lg p-2 shadow-sm border">
          <div className="flex items-center gap-3">
            <img
              src="/images/avatar.png"
              alt="musician"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="text-sm text-[#121417] font-medium">Ethan Carter</p>
              <p className="text-xs text-gray-500">Guitarist</p>
            </div>
          </div>
          <button type="button" className="text-xl font-semibold text-gray-400 hover:text-red-500">×</button>
        </div>

        <button
          type="button"
          className="mt-3 px-4 py-2 bg-[#1FB58F] text-white rounded-full text-sm  hover:bg-green-600"
        >
          Find Musicians
        </button>
      </div>

      {/* Payment */}
      <div className="mt-6">
        <p className="text-sm text-[#121417] mb-1">Payment (Optional)</p>
        <input
          type="number"
          placeholder="Enter payment amount"
          value={payment}
          onChange={(e) => setPayment(e.target.value)}
          className="rounded-full px-4 py-2 border border-gray-300 bg-white text-sm text-[#121417] w-full outline-none"
        />
      </div>

      {/* Upload Section */}
      <div className="mt-6">
        <p className="text-sm text-[#121417] mb-2 font-medium">Attachments</p>
        <div className="border-dashed border-2 border-gray-300 bg-white rounded-2xl py-8 px-6 text-center">
          <p className="text-sm text-[#121417] font-semibold mb-1">Upload Poster or Rider</p>
          <p className="text-xs text-gray-500 mb-4">Drag and drop or browse files</p>
          <label className="cursor-pointer">
            <span className="px-4 py-2 bg-[#1FB58F] text-white rounded-full text-sm  hover:bg-green-600 inline-block">
              Upload
            </span>
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          {attachment && (
            <p className="mt-2 text-sm  text-gray-600">Selected: {attachment.name}</p>
          )}
        </div>
      </div>

      {/* Submit Buttons */}
      <div className="flex flex-col sm:flex-row justify-end items-center gap-4 mt-8">
        <button
          type="submit"
          className="px-6 py-2 rounded-full bg-black text-white text-sm  hover:opacity-80 transition"
        >
          Publish
        </button>
        <button
          type="button"
          className="px-6 py-2 rounded-full bg-[#1FB58F] text-white text-sm  hover:bg-green-600 transition"
        >
          Save as Draft
        </button>
      </div>
    </div>
    </form>
  );
};

export default CreateGigForm;
