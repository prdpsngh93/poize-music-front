"use client";
import React, { useEffect, useState } from "react";
import { FaSort } from "react-icons/fa";
import { authAPI } from "../../../lib/api";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import BackButton from "../common/BackButton";

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
  const [status, setStatus] = useState("active");
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [artistResults, setArtistResults] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [errors, setErrors] = useState({}); // ✅ store form validation errors

  const router = useRouter();

  const handleFileChange = (e) => {
    setAttachment(e.target.files[0]);
  };

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

  const id = Cookies.get("id");

  const validateForm = () => {
    let newErrors = {};
    if (!title.trim()) newErrors.title = "Gig title is required";
    if (!date) newErrors.date = "Date is required";
    if (!time) newErrors.time = "Time is required";
    if (!venue) newErrors.venue = "Venue type is required";
    if (!genre) newErrors.genre = "Genre is required";
    if (!selectedArtist) newErrors.musician = "Please select a musician";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      let attachmentUrl = "";
      if (attachment) {
        attachmentUrl = await uploadToCloudinary(attachment);
      }

      const payload = {
        gig_title: title,
        date,
        time: `${time}:00`,
        venue_type: venue.toLowerCase(),
        genre,
        description,
        collaborator_id: id,
        musician_id: selectedArtist?.id,
        payment: Number(payment),
        attachment_url: attachmentUrl,
        status,
      };

      await authAPI.createGig(payload);
      setMessage("Gig created successfully!");
      toast.success("Gig created successfully!");
      router.push("/manage-created-gigs");
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
        <h1 className="text-2xl font-bold text-[#121417] mb-6 flex  items-center" ><BackButton route={'/contributor-dashboard'}/>  Create Gig</h1>
        {message && (
          <p className="mb-4 text-sm font-medium text-center text-red-600">
            {message}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Title */}
          <div>
            <label className="text-sm font-medium text-[#121417]">
              Gig Title *
            </label>
            <input
              type="text"
              placeholder="Enter Gig Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`rounded-full px-4 py-2 border ${
                errors.title ? "border-red-500" : "border-gray-300"
              } bg-white text-sm text-[#121417] w-full outline-none`}
            />
            {errors.title && (
              <p className="text-xs text-red-500">{errors.title}</p>
            )}
          </div>

          {/* Date */}
          <div>
            <label className="text-sm font-medium text-[#121417]">Date *</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={`rounded-full px-4 py-2 border ${
                errors.date ? "border-red-500" : "border-gray-300"
              } bg-white text-sm text-[#121417] w-full outline-none`}
            />
            {errors.date && (
              <p className="text-xs text-red-500">{errors.date}</p>
            )}
          </div>

          {/* Time */}
          <div>
            <label className="text-sm font-medium text-[#121417]">Time *</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className={`rounded-full px-4 py-2 border ${
                errors.time ? "border-red-500" : "border-gray-300"
              } bg-white text-sm text-[#121417] w-full outline-none`}
            />
            {errors.time && (
              <p className="text-xs text-red-500">{errors.time}</p>
            )}
          </div>

          {/* Venue */}
          <div>
            <label className="text-sm font-medium text-[#121417]">
              Venue Type *
            </label>
            <div className="relative w-full">
              <select
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                className={`appearance-none rounded-full px-4 py-2 border ${
                  errors.venue ? "border-red-500" : "border-gray-300"
                } bg-white text-sm text-[#121417] w-full outline-none`}
              >
                <option value="">Select Venue Type</option>
                <option value="Indoor">Indoor</option>
                <option value="Outdoor">Outdoor</option>
              </select>
              <FaSort className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
            </div>
            {errors.venue && (
              <p className="text-xs text-red-500">{errors.venue}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-[#121417]">
              Gig Description
            </label>
            <textarea
              rows="4"
              placeholder="Gig Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="rounded-2xl px-4 py-2 border border-gray-300 bg-white text-sm text-[#121417] w-full outline-none resize-none"
            />
          </div>

          {/* Genre */}
          <div>
            <label className="text-sm font-medium text-[#121417]">Genre *</label>
            <div className="relative w-full">
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className={`appearance-none rounded-full px-4 py-2 border ${
                  errors.genre ? "border-red-500" : "border-gray-300"
                } bg-white text-sm text-[#121417] w-full outline-none`}
              >
                <option value="">Select Genre</option>
                <option value="Jazz">Jazz</option>
                <option value="Rock">Rock</option>
                <option value="Pop">Pop</option>
                <option value="Classical">Classical</option>
              </select>
              <FaSort className="absolute right-3 top-5 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>
            {errors.genre && (
              <p className="text-xs text-red-500">{errors.genre}</p>
            )}
          </div>
        </div>

        {/* Musician Search */}
        <div className="mt-6">
          <label className="text-sm font-medium text-[#121417]">Musician *</label>
          <input
            type="text"
            placeholder="Search musician..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`rounded-full px-4 py-2 border ${
              errors.musician ? "border-red-500" : "border-gray-300"
            } bg-white text-sm text-[#121417] w-full outline-none mb-2`}
          />
          {errors.musician && (
            <p className="text-xs text-red-500">{errors.musician}</p>
          )}

          {artistResults.length > 0 && (
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
                  src={selectedArtist.profile_picture || "/images/avatar.png"}
                  alt="artist"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="text-sm font-medium text-[#121417]">
                    {selectedArtist.name}
                  </p>
                  <p className="text-xs text-gray-500">{selectedArtist.genre}</p>
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
          <label className="text-sm font-medium text-[#121417]">Payment (Optional)</label>
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
          <label className="text-sm font-medium text-[#121417]">Attachments</label>
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
              <input type="file" onChange={handleFileChange} className="hidden" />
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
            onClick={() => setStatus("active")}
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
