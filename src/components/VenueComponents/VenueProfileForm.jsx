"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { FiUpload } from "react-icons/fi";
import { authAPI } from "../../../lib/api";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

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
    logo: "",
    photos: [],
  });

  const [position, setPosition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingPhotos, setUploadingPhotos] = useState(false);

  const router = useRouter();

  // Get user ID from cookies
  const userId = Cookies.get("userId");
  const id = Cookies.get("id");

  // Fetch existing venue profile data on component mount
  useEffect(() => {
    const fetchVenueProfile = async () => {
      if (!userId) return;

      try {
        setLoading(true);
        const profileData = await authAPI.getVenueProfile(userId);

        // Map API response to form structure
        setFormData({
          venueName: profileData.venue_name || "",
          venueType: profileData.venue_type || "",
          venueDescription: profileData.venue_description || "",
          venueAddress: profileData.venue_address || "",
          musicGenres: Array.isArray(profileData.genre_tags) 
            ? profileData.genre_tags.join(", ") 
            : profileData.genre_tags || "",
          artistTypes: Array.isArray(profileData.artist_types) 
            ? profileData.artist_types.join(", ") 
            : profileData.artist_types || "",
          hours: profileData.venue_hours || "",
          bookingInfo: profileData.booking_information || "",
          capacity: profileData.venue_capacity || "",
          equipment: Array.isArray(profileData.available_equipment) 
            ? profileData.available_equipment.join(", ") 
            : profileData.available_equipment || "",
          email: profileData.contact_email || "",
          contactPhone: profileData.contact_phone || "",
          website: profileData.venue_website || "",
          managerName: profileData.manager_name || "",
          logo: profileData.venue_logo || "", // Keep as URL string
          photos: Array.isArray(profileData.venue_gallery) 
            ? profileData.venue_gallery 
            : [], // Keep as array of URLs
        });

        setIsEditing(true); // Profile exists, so this is an edit
      } catch (error) {
        if (error.response?.status === 404) {
          // Profile doesn't exist yet, this is a new profile
          setIsEditing(false);
        } else {
          console.error("Error fetching venue profile:", error);
          setMessage("Error loading venue profile data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchVenueProfile();
  }, [userId]);

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

  // Cloudinary upload function
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

  const handleFileChange = async (e) => {
    const { name, files } = e.target;
    if (files[0]) {
      setUploadingLogo(true);
      try {
        const uploadedUrl = await uploadToCloudinary(files[0]);
        setFormData((prev) => ({ ...prev, [name]: uploadedUrl }));
        setMessage("Logo uploaded successfully!");
      } catch (error) {
        console.error("Logo upload failed:", error);
        setMessage("Failed to upload logo. Please try again.");
      } finally {
        setUploadingLogo(false);
      }
    }
  };

  const handlePhotoUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setUploadingPhotos(true);
      try {
        const uploadPromises = files.map(file => uploadToCloudinary(file));
        const uploadedUrls = await Promise.all(uploadPromises);
        setFormData((prev) => ({ 
          ...prev, 
          photos: [...prev.photos, ...uploadedUrls] 
        }));
        setMessage(`${files.length} photo(s) uploaded successfully!`);
      } catch (error) {
        console.error("Photo upload failed:", error);
        setMessage("Failed to upload some photos. Please try again.");
      } finally {
        setUploadingPhotos(false);
      }
    }
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
      // Helper function to convert comma-separated strings to arrays
      const stringToArray = (str) => {
        return str ? str.split(",").map(item => item.trim()).filter(item => item) : [];
      };

      // Upload logo to Cloudinary if it's a new file
      let logoUrl = formData.logo;
      if (formData.logo && typeof formData.logo === 'object' && formData.logo.name) {
        setMessage("Uploading logo...");
        logoUrl = await uploadToCloudinary(formData.logo);
      }

      // Upload gallery photos to Cloudinary if they are new files
      let galleryUrls = [];
      if (formData.photos && formData.photos.length > 0) {
        setMessage("Uploading gallery photos...");
        for (const photo of formData.photos) {
          if (typeof photo === 'object' && photo.name) {
            // It's a new file, upload it
            const url = await uploadToCloudinary(photo);
            galleryUrls.push(url);
          } else if (typeof photo === 'string') {
            // It's already a URL, keep it
            galleryUrls.push(photo);
          }
        }
      }

      setMessage("Saving venue profile...");

      // Prepare payload matching the API structure
      const payload = {
        venue_name: formData.venueName,
        venue_description: formData.venueDescription,
        venue_type: formData.venueType,
        venue_address: formData.venueAddress,
        venue_logo: logoUrl || "", // String URL or empty string
        venue_gallery: galleryUrls, // Array of URLs
        genre_tags: stringToArray(formData.musicGenres),
        artist_types: stringToArray(formData.artistTypes),
        venue_hours: formData.hours,
        manager_name: formData.managerName,
        booking_information: formData.bookingInfo,
        venue_capacity: parseInt(formData.capacity) || 0,
        contact_phone: formData.contactPhone,
        contact_email: formData.email,
        available_equipment: stringToArray(formData.equipment),
        venue_website: formData.website,
        is_profile_complete: true,
      };

      let response;
      // Update existing profile or create new one
      response = await authAPI.updateVenueProfile(id, payload);
      setMessage(isEditing ? "Venue profile updated successfully!" : "Venue profile created successfully!");
      setIsEditing(true);
      console.log("Venue profile saved:", response);
    } catch (error) {
      console.error("Error saving venue profile:", error);
      setMessage("Failed to save venue profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !formData.venueName) {
    return (
      <div className="bg-[#f4f1ea] min-h-screen flex items-center justify-center">
        <div className="text-[#121417]">Loading venue profile...</div>
      </div>
    );
  }

  return (
    <div className="bg-[#f4f1ea]">
      <form onSubmit={handleSubmit} className="p-6 max-w-5xl mx-auto space-y-10 px-4 md:px-9 lg:px-12 py-10 rounded-lg">
        <h1 className="text-3xl font-extrabold mb-8 text-[#121417]">
          {isEditing ? "Update Your Venue Profile" : "Create Your Venue Profile"}
        </h1>

        {message && (
          <div
            className={`mb-4 p-3 rounded-lg text-center ${
              message.includes("successfully")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

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
                  disabled={loading || uploadingLogo}
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-[#121417]">Venue Type</label>
                <select
                  name="venueType"
                  value={formData.venueType}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-full px-4 bg-white text-[#121417] py-3 focus:outline-none focus:ring-2 focus:ring-[#1FB58F]"
                  disabled={loading}
                  required
                >
                  <option value="">Select Venue Type</option>
                  <option value="bar">Bar</option>
                  <option value="club">Club</option>
                  <option value="theater">Theater</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="concert_hall">Concert Hall</option>
                  <option value="outdoor">Outdoor Venue</option>
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
                disabled={loading}
                required
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
            disabled={loading}
            required
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
                  disabled={loading}
                />
                <label
                  htmlFor="upload-logo"
                  className={`${
                    uploadingLogo 
                      ? "bg-gray-400 cursor-not-allowed" 
                      : "bg-[#1FB58F] hover:bg-green-700 cursor-pointer"
                  } text-white px-8 py-2 rounded-full transition`}
                >
                  {uploadingLogo ? "Uploading..." : "Upload"}
                </label>
                {formData.logo && (
                  <p className="text-sm text-gray-600 mt-2">
                    Logo uploaded successfully ✓
                  </p>
                )}
              </div>
            </section>

            <section>
              <h2 className="font-semibold mb-4 text-lg">Venue Gallery</h2>
              <div className="border-2 border-dashed border-gray-400 rounded-xl p-6 flex flex-col items-center justify-center text-center bg-white">
                <p className="font-semibold mb-1 text-[#121417]">Upload Venue Photos</p>
                <p className="text-sm text-gray-500 mb-6">
                  {uploadingPhotos ? "Uploading photos..." : "Attach additional venue photos"}
                </p>
                <div className="flex justify-center flex-wrap gap-4">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <label
                      key={index}
                      htmlFor={`upload-photo-${index}`}
                      className={`w-12 h-12 border border-gray-300 rounded-md flex items-center justify-center transition ${
                        uploadingPhotos 
                          ? "cursor-not-allowed bg-gray-100" 
                          : "cursor-pointer hover:bg-gray-100"
                      }`}
                    >
                      <FiUpload className="text-gray-500" />
                      <input
                        id={`upload-photo-${index}`}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handlePhotoUpload}
                        className="hidden"
                        disabled={loading || uploadingPhotos}
                      />
                    </label>
                  ))}
                </div>
                {formData.photos.length > 0 && (
                  <p className="text-sm text-gray-600 mt-2">
                    {formData.photos.length} photo(s) uploaded ✓
                  </p>
                )}
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
                disabled={loading}
              />
              <p className="text-xs text-gray-500 mt-1">Separate multiple genres with commas</p>
            </div>
            <div>
              <label className="block mb-1 font-medium text-[#121417]">Artist Types</label>
              <input
                name="artistTypes"
                value={formData.artistTypes}
                onChange={handleInputChange}
                placeholder="e.g., Solo, Band, DJ"
                className="w-full border border-gray-300 rounded-full px-4 bg-white text-[#121417] py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1FB58F]"
                disabled={loading}
              />
              <p className="text-xs text-gray-500 mt-1">Separate multiple types with commas</p>
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
              { name: "email", label: "Contact Email", placeholder: "Enter contact email", type: "email" },
              { name: "capacity", label: "Venue Capacity", placeholder: "e.g., 200", type: "number" },
              { name: "contactPhone", label: "Contact Phone", placeholder: "Enter contact phone", type: "tel" },
              { name: "equipment", label: "Available Equipment", placeholder: "e.g., Sound system, Lighting" },
              { name: "website", label: "Venue Website", placeholder: "Enter venue website", type: "url" },
            ].map(({ name, label, placeholder, type = "text" }) => (
              <div key={name}>
                <label className="block mb-1 font-medium text-[#121417]">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleInputChange}
                  placeholder={placeholder}
                  className="w-full border border-gray-300 rounded-full px-4 bg-white text-[#121417] py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1FB58F]"
                  disabled={loading}
                  required={name === "email" || name === "contactPhone"}
                />
                {name === "equipment" && (
                  <p className="text-xs text-gray-500 mt-1">Separate multiple items with commas</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Submit Button */}
        <div className="flex justify-center pt-6">
          <button
            type="submit"
            className="bg-[#1FB58F] hover:bg-green-700 text-white px-12 py-3 rounded-full font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : isEditing
              ? "Update Venue Profile"
              : "Create Venue Profile"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VenueProfileForm;