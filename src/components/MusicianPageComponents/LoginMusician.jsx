"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { authAPI } from "../../../lib/api";
import { toast } from "sonner";

export default function CreateMusicianProfile() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    genre: "",
    availability: "",
    website_url: "",
    social_media_link: "",
    profile_picture: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  const cookies = Cookies.get("token");
  const userId = Cookies.get("userId");

  const genres = ["Vocals", "Guitar", "Piano", "Drums", "Bass"];

  // Fetch user profile on component mount
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    if (!userId) return;

    try {
      setLoading(true);
      const result = await authAPI.getArtistProfile(userId);
      console.log("result", result);

      if (result) {
        // Map API response to form data
        setFormData({
          name: result.User.name || "",
          bio: result.bio || "",
          genre: result.genre || "",
          availability: result.availability || "",
          website_url: result.website_url || "",
          social_media_link: result.social_media_link || "",
          profile_picture: result.profile_picture || "",
        });

        // Determine if this is editing an existing profile
        setIsEditing(result.is_profile_complete || false);
      }
    } catch (err) {
      if (err.response?.status === 404) {
        // Profile doesn't exist yet, this is a new profile
        setIsEditing(false);
      } else {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile data");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenreClick = (selectedGenre) => {
    setFormData({ ...formData, genre: selectedGenre });
  };

  // Cloudinary image upload handler
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setError("Please upload a valid image file (JPEG, PNG, JPG, or WebP)");
      return;
    }

    // Validate file size (e.g., 5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      setError("Image size should be less than 5MB");
      return;
    }

    setImageUploading(true);
    setError("");

    try {
      // Create form data for Cloudinary upload
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
      );
      formData.append(
        "cloud_name",
        process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
      );

      // Upload to Cloudinary
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();

      // Update form data with the uploaded image URL
      setFormData((prev) => ({
        ...prev,
        profile_picture: data.secure_url,
      }));

      console.log("Image uploaded successfully:", data.secure_url);
    } catch (err) {
      console.error("Error uploading image:", err);
      setError("Failed to upload image. Please try again.");
    } finally {
      setImageUploading(false);
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Profile name is required");
      return false;
    }
    if (!formData.bio.trim()) {
      setError("Bio is required");
      return false;
    }
    if (!formData.genre) {
      setError("Please select a primary genre");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (!userId) {
      setError("User not authenticated");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Prepare payload for API
      const payload = {
        name: formData.name.trim(),
        bio: formData.bio.trim(),
        genre: formData.genre,
        availability: formData.availability.trim(),
        website_url: formData.website_url.trim(),
        social_media_link: formData.social_media_link.trim(),
        profile_picture: formData.profile_picture,
        is_profile_complete: true,
      };

      // Call update API using the new structure matching venue pattern
      const result = await authAPI.updateArtistProfile(userId, payload);

      // Handle successful update
      setSuccess(
        isEditing
          ? "Profile updated successfully!"
          : "Profile created successfully!"
      );
      setIsEditing(true);
      toast.success("Profile updated successfully!");
         router.push("/musician-dashboard");


      // Update cookies with new user data
      const cookieOptions = {
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        expires: 30,
      };

      if (result.user) {
        Cookies.set("userData", JSON.stringify(result.user), cookieOptions);
      }

      // Optional: Redirect after successful creation/update
      // router.push('/dashboard'); // or wherever you want to redirect
    } catch (err) {
      // Handle API errors using your existing error structure
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to save profile. Please try again.";
      setError(errorMessage);
      console.error("Profile save error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !formData.name) {
    return (
      <div className="min-h-screen bg-[#f4f3ee] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1FB58F] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f3ee] flex flex-col items-center py-10">
      <h1 className="text-2xl md:text-3xl text-black font-bold text-center mb-1">
        {isEditing
          ? "Update Your Musician Profile"
          : "Create Your Musician Profile"}
      </h1>

      <div className="p-6 sm:p-8 rounded-2xl w-full max-w-md">
        {/* Success/Error Messages */}
        {success && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-2xl">
            {success}
          </div>
        )}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-2xl">
            {error}
          </div>
        )}

        {/* Avatar Upload */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-30 h-30 rounded-full bg-gray-200 overflow-hidden border border-gray-300 relative">
            {formData.profile_picture ? (
              <img
                src={formData.profile_picture}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src="/images/avatar.png"
                alt="Default Profile"
                className="w-full h-full object-cover"
              />
            )}
            {imageUploading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
            )}
          </div>

          <label className="mt-2 cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              disabled={imageUploading}
            />
            <span className="text-sm text-[#1FB58F] hover:text-green-500 transition">
              {imageUploading ? "Uploading..." : "Upload Image"}
            </span>
          </label>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <div>
            <h3 className="text-sm font-semibold mb-2 text-gray-800">
              Basic Information
            </h3>

            <div className="mb-4">
              <label className="block text-[#222222] text-sm mb-1">
                Profile Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your stage name or band name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 bg-white text-sm border text-[#222222] rounded-2xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1FB58F]"
                disabled={loading}
                required
              />
            </div>

            <div>
              <label className="block text-[#222222] text-sm mb-1">Bio</label>
              <textarea
                name="bio"
                placeholder="Describe your musical style, influences, and experiences"
                value={formData.bio}
                onChange={handleChange}
                rows={3}
                className="w-full p-3 bg-white text-sm border text-[#222222] rounded-2xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1FB58F]"
                disabled={loading}
                required
              />
            </div>
          </div>

          {/* Genre */}
          <div>
            <h3 className="text-sm font-semibold mb-2 text-gray-800">
              Genre & Skills
            </h3>

            <div className="mb-3">
              <label className="block text-sm mb-1 text-[#222222]">
                Primary Genre
              </label>
              <input
                type="text"
                name="genre"
                placeholder="Select your main genre"
                value={formData.genre}
                onChange={handleChange}
                className="w-full p-3 bg-white text-sm border rounded-2xl text-[#222222] border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1FB58F]"
                readOnly
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <button
                  type="button"
                  key={genre}
                  onClick={() => handleGenreClick(genre)}
                  className={`px-3 py-1 text-sm rounded-2xl ${
                    formData.genre === genre
                      ? "bg-[#1FB58F] text-white"
                      : "bg-[#E3DFCB] text-gray-700"
                  } hover:bg-green-500 hover:text-white transition`}
                  disabled={loading}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div>
            <h3 className="text-sm font-semibold mb-2 text-gray-800">
              Availability
            </h3>
            <input
              type="text"
              name="availability"
              placeholder="Select your availability for collaborations"
              value={formData.availability}
              onChange={handleChange}
              className="w-full p-3 bg-white text-sm border text-[#222222] rounded-2xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1FB58F]"
              disabled={loading}
            />
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-sm font-semibold mb-2 text-gray-800">
              Social Links
            </h3>

            <div className="mb-3">
              <label className="block text-[#222222] text-sm mb-1">
                Website
              </label>
              <input
                type="url"
                name="website_url"
                placeholder="Enter your website URL"
                value={formData.website_url}
                onChange={handleChange}
                className="w-full p-3 bg-white text-sm border text-[#222222] rounded-2xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1FB58F]"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm text-[#222222] mb-1">
                Social Media
              </label>
              <input
                type="url"
                name="social_media_link"
                placeholder="Enter your social media profile URL"
                value={formData.social_media_link}
                onChange={handleChange}
                className="w-full p-3 bg-white text-sm border text-[#222222] rounded-2xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1FB58F]"
                disabled={loading}
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-center items-center">
            <button
              type="submit"
              disabled={loading || imageUploading}
              className="px-5 py-2 bg-[#1FB58F] text-white rounded-2xl hover:bg-green-500 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? "Saving..."
                : isEditing
                ? "Update Profile"
                : "Save Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
