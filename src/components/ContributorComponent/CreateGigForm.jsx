"use client";
import React, { useEffect, useState } from "react";
import { FaSort } from "react-icons/fa";
import { authAPI } from "../../../lib/api";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";


const CreateGigForm = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [venue, setVenue] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [payment, setPayment] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("published");
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [artistResults, setArtistResults] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);

  const handleFileChange = (e) => {
    setAttachment(e.target.files[0]);
  };
    const router = useRouter();
  
  const searchArtists = async (query) => {
    try {
      const res = await authAPI.getArtist(query);
      const users = res.data.map((item) => ({
        id: item.User.id,
        name: item.User.name,
        email: item.User.email,
        profile_picture: item.profile_picture,
        genre: item.genre,
      }));
      setArtistResults(users);
    } catch (err) {
      console.error("Error fetching artists:", err);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.length >= 2) searchArtists(searchQuery);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    );
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    return data.secure_url;
  };

  const userId = Cookies.get("userId");
  const id = Cookies.get("id");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      let attachmentUrl = "";
      if (attachment) {
        attachmentUrl = await uploadToCloudinary(attachment);
      }

      const payload = {
        gig_title: title,
        date,
        time: `${time}:00`,
        venue_type: venue,
        genre,
        description,
        collaborator_id: id,
        musician_id: selectedArtist?.id, // ✅ Add this
        payment: Number(payment),
        attachment_url: attachmentUrl,
        status,
      };

      await authAPI.createGig(payload);
      setMessage("Gig created successfully!");
      router.push("/contributor-dashboard");
    } catch (err) {
      console.error("Error creating gig:", err);
      setMessage("Failed to create gig. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto p-4 md:p-8 bg-[#F3F2ED] min-h-screen"
    >
      <div className="max-w-5xl flex justify-center flex-col mx-auto">
        <h1 className="text-2xl font-bold text-[#121417] mb-6">Create Gig</h1>
        {message && (
          <p className="mb-4 text-sm font-medium text-center text-red-600">
            {message}
          </p>
        )}

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
          />

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

        <div className="mt-6">
          <h2 className="text-base font-semibold mb-2 text-[#121417]">
            {" "}
            Musician
          </h2>
          <input
            type="text"
            placeholder="Search musician..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rounded-full px-4 py-2 border border-gray-300 bg-white text-sm text-[#121417] w-full outline-none mb-2"
          />

          {artistResults && artistResults.length > 0 && (
            <ul className="bg-white border border-gray-300 rounded-lg max-h-40 overflow-auto mb-3">
              {artistResults.map((artist) => (
                <li
                  key={artist.id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-[#121417]"
                  onClick={() => {
                    setSelectedArtist(artist);
                    setSearchQuery("");
                    setArtistResults([]);
                  }}
                >
                  {artist.name} ({artist.email})
                </li>
              ))}
            </ul>
          )}

          {selectedArtist && (
            <div className="flex items-center justify-between bg-white rounded-lg p-2 shadow-sm border">
              <div className="flex items-center gap-3">
                <img
                  src={selectedArtist.avatar || "/images/avatar.png"}
                  alt="artist"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="text-sm font-medium text-[#121417]">
                    {selectedArtist.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {selectedArtist.instrument}
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="text-xl font-semibold text-gray-400 hover:text-red-500"
                onClick={() => setSelectedArtist(null)}
              >
                ×
              </button>
            </div>
          )}
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

        {/* File Upload */}
        <div className="mt-6">
          <p className="text-sm text-[#121417] mb-2 font-medium">Attachments</p>
          <div className="border-dashed border-2 border-gray-300 bg-white rounded-2xl py-8 px-6 text-center">
            <p className="text-sm text-[#121417] font-semibold mb-1">
              Upload Poster or Rider
            </p>
            <p className="text-xs text-gray-500 mb-4">
              Drag and drop or browse files
            </p>
            <label className="cursor-pointer">
              <span className="px-4 py-2 bg-[#1FB58F] text-white rounded-full text-sm hover:bg-green-600 inline-block">
                Upload
              </span>
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            {attachment && (
              <p className="mt-2 text-sm text-gray-600">
                Selected: {attachment.name}
              </p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-end items-center gap-4 mt-8">
          <button
            type="submit"
            onClick={() => setStatus("published")}
            className="px-6 py-2 rounded-full bg-black text-white text-sm hover:opacity-80 transition"
            disabled={loading}
          >
            {loading ? "Publishing..." : "Publish"}
          </button>
          <button
            type="submit"
            onClick={() => setStatus("draft")}
            className="px-6 py-2 rounded-full bg-[#1FB58F] text-white text-sm hover:bg-green-600 transition"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save as Draft"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateGigForm;
