"use client";

import React, { useState, useEffect } from "react";
import { authAPI } from "../../../lib/api";
import { FaSort } from "react-icons/fa";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const MusicLoverProfile = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    genre: "",
    artist: "",
    preferred: "",
    location: "",
    gigsNearby: false,
    artistUpdates: false,
  });

  const [position, setPosition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();

  // Get user ID from cookies (adjust based on your cookie structure)
  const userId = Cookies.get("userId")
  const id = Cookies.get("id")

  // Fetch existing profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) return;

      try {
        setLoading(true);
        const profileData = await authAPI.getMusicProfile(userId);

        // Map API response to form structure
        setFormData({
          fullName: profileData.full_name || "",
          genre: profileData.favourite_genre || "",
          artist: profileData.favourite_artist || "",
          preferred: profileData.preferred || "",
          location: profileData.location || "",
          gigsNearby: profileData.gigs_near_me || false,
          artistUpdates: profileData.artist_updates || false,
        });

        setIsEditing(true); // Profile exists, so this is an edit
      } catch (error) {
        if (error.response?.status === 404) {
          // Profile doesn't exist yet, this is a new profile
          setIsEditing(false);
        } else {
          console.error("Error fetching profile:", error);
          setMessage("Error loading profile data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const setAddress = (address) => {
    setFormData((prev) => ({
      ...prev,
      location: address,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      setMessage("User not authenticated");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      // Prepare payload matching the API structure
      const payload = {
        full_name: formData.fullName,
        favourite_genre: formData.genre,
        favourite_artist: formData.artist,
        preferred: formData.preferred,
        location: formData.location,
        gigs_near_me: formData.gigsNearby,
        artist_updates: formData.artistUpdates,
      };

      let response;
      // Update existing profile
      response = await authAPI.updateMusicProfile(id, payload);
      setMessage("Profile updated successfully!");
      console.log("Profile saved:", response.data);
    } catch (error) {
      console.error("Error saving profile:", error);
      setMessage("Failed to save profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderSelect = (name, value, label, options) => (
    <div className="relative">
      <label className="block mb-1 font-normal text-[15px] text-[#121217]">
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={handleInputChange}
        className="w-full appearance-none border text-[#121217] text-[15px] border-gray-300 rounded-full px-4 py-2 bg-white focus:ring-0 focus:outline-none"
        disabled={loading}
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

  if (loading && !formData.fullName) {
    return (
      <div className="bg-[#F4F3EC] min-h-screen flex items-center justify-center">
        <div className="text-[#121217]">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="bg-[#F4F3EC]">
      <form
        onSubmit={handleSubmit}
        className="p-4 sm:p-8 md:p-10 rounded-xl max-w-5xl mx-auto text-[15px] text-[#121217]"
      >
        <h2 className="font-bold text-xl lg:text-3xl text-[#121217] mb-6 text-left">
          {isEditing
            ? "Update Your Music Taste"
            : "Tell Us About Your Music Taste"}
        </h2>

        {message && (
          <div
            className={`mb-4 p-3 rounded-lg text-center ${
              message.includes("successfully") || message.includes("created")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-normal text-[15px] text-[#121217]">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              className="w-full border border-gray-300 rounded-full px-4 py-2 bg-white text-[#121217] text-[15px] focus:outline-none focus:ring-0"
              disabled={loading}
              required
            />
          </div>

          {renderSelect("genre", formData.genre, "Favourite Genre", [
            "Rock",
            "Hip Hop",
            "Jazz",
            "Pop",
            "Classical",
            "Country",
            "Electronic",
          ])}
          {renderSelect("artist", formData.artist, "Favourite Artist", [
            "Drake",
            "Adele",
            "Coldplay",
            "Ed Sheeran",
            "Taylor Swift",
            "John Mayer",
            "Billie Eilish",
          ])}
          {renderSelect("preferred", formData.preferred, "Preferred", [
            "Solo",
            "Bands",
            "DJs",
            "Live",
            "Studio",
          ])}
        </div>

        <div className="mt-6">
          <label className="block mb-1 font-normal text-[15px] text-[#121217]">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="Enter location"
            className="w-full border border-gray-300 rounded-full px-4 py-2 bg-white text-[#121217] text-[15px] focus:outline-none focus:ring-0"
            disabled={loading}
            required
          />
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
                  disabled={loading}
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
            className="bg-[#2FC7A3] text-white text-[15px] px-6 md:px-20 py-2 rounded-full hover:bg-[#25ae8f] transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : isEditing
              ? "Update Profile"
              : "Start Exploring Gigs"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MusicLoverProfile;
