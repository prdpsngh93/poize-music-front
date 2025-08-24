"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { authAPI } from "../../../lib/api"; // Adjust path as needed
import BackButton from "../GlobalComponents/BackButton";

export default function PostOpportunity() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [opportunityId, setOpportunityId] = useState(null);
  const [fileUploading, setFileUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    genre: "",
    location: "",
    format: "",
    email: "",
    expectations: "",
    visibility: "public",
    file: null,
    media: "", // For uploaded file URL
  });

  const genres = [
    "Indie Pop",
    "Electronic",
    "Acoustic",
    "Rock",
    "Folk",
    "Lo-Fi",
  ];

  // Check if we're editing an existing opportunity (from URL params or props)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const editId = urlParams.get("id");

      if (editId) {
        setOpportunityId(editId);
        setIsEditing(true);
        fetchOpportunity(editId);
      }
    }
  }, []);

  // Fetch existing opportunity data for editing
  const fetchOpportunity = async (id) => {
    try {
      setLoading(true);
      const result = await authAPI.getOpportunity(id); // You'll need to implement this API method

      if (result.opportunity) {
        setFormData({
          title: result.opportunity.project_title || "",
          description: result.opportunity.project_description || "",
          genre: result.opportunity.genre || "",
          location: result.opportunity.location || "",
          format: result.opportunity.collaboration_format || "",
          email: result.opportunity.contact_email || "",
          expectations: result.opportunity.collaboration_expectations || "",
          visibility: result.opportunity.visibility || "public",
          file: null,
          media: result.opportunity.media || "",
        });
      }
    } catch (err) {
      console.error("Error fetching opportunity:", err);
      setError("Failed to load opportunity data");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    if (type === "file") {
      setFormData({ ...formData, file: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleGenreClick = (genre) => {
    setFormData({ ...formData, genre });
  };

  // File upload handler (similar to your image upload)
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ["audio/mpeg", "audio/wav", "audio/mp3", "audio/ogg"];
    if (!allowedTypes.includes(file.type)) {
      setError("Please upload a valid audio file (MP3, WAV, OGG)");
      return;
    }

    // Validate file size (e.g., 10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      setError("File size should be less than 10MB");
      return;
    }

    setFileUploading(true);
    setError("");

    try {
      // Create form data for file upload (could be Cloudinary or your own storage)
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);
      uploadFormData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
      );
      uploadFormData.append("resource_type", "auto"); // For audio files

      // Upload to Cloudinary (or your preferred storage)
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
        {
          method: "POST",
          body: uploadFormData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      const data = await response.json();

      // Update form data with the uploaded file URL
      setFormData((prev) => ({
        ...prev,
        media: data.secure_url,
        file: file, // Keep the file object for display purposes
      }));

      console.log("File uploaded successfully:", data.secure_url);
    } catch (err) {
      console.error("Error uploading file:", err);
      setError("Failed to upload file. Please try again.");
    } finally {
      setFileUploading(false);
    }
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError("Project title is required");
      return false;
    }
    if (!formData.description.trim()) {
      setError("Project description is required");
      return false;
    }
    if (!formData.genre.trim()) {
      setError("Genre is required");
      return false;
    }
    if (!formData.location.trim()) {
      setError("Location is required");
      return false;
    }
    if (!formData.format.trim()) {
      setError("Collaboration format is required");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Contact email is required");
      return false;
    }
    if (!formData.expectations.trim()) {
      setError("Collaboration expectations are required");
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }

    return true;
  };

  const id = Cookies.get("id");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Prepare the payload according to your API structure
      const payload = {
        project_title: formData.title.trim(),
        project_description: formData.description.trim(),
        genre: formData.genre.trim(),
        location: formData.location.trim(),
        collaboration_format: formData.format.trim(),
        media: formData.media, // Use uploaded file URL
        contact_email: formData.email.trim(),
        collaboration_expectations: formData.expectations.trim(),
        visibility: formData.visibility,
        artist_id: id,
      };

      let result;
      if (isEditing && opportunityId) {
        // Update existing opportunity
        result = await authAPI.updateOpportunity(opportunityId, payload);
      } else {
        // Create new opportunity
        result = await authAPI.postCollaboration(payload);
      }

      setSuccess(
        isEditing
          ? "Collaboration opportunity updated successfully!"
          : "Collaboration opportunity posted successfully!"
      );

      // If creating new opportunity, set editing mode
      if (!isEditing && result.opportunity) {
        setIsEditing(true);
        setOpportunityId(result.opportunity.id);
      }

      // Optionally redirect after successful submission
      setTimeout(() => {
        router.push("/musician-dashboard");
      }, 2000);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        `Failed to ${
          isEditing ? "update" : "post"
        } collaboration opportunity. Please try again.`;
      setError(errorMessage);
      console.error("Post/Update collaboration error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Loading state for fetching existing data
  if (loading && isEditing && !formData.title) {
    return (
      <div className="min-h-screen bg-[#f4f3ee] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1FB58F] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading opportunity...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 md:px-9 lg:px-12 py-10 bg-[#f4f3ee]">
      <BackButton />

      <div className="flex flex-col max-w-2xl justify-center mx-auto items-center">
        <h1 className="text-2xl md:text-4xl text-[#121217] font-bold mb-8">
          {isEditing
            ? "Update Collaboration Opportunity"
            : "Post a Collaboration Opportunity"}
        </h1>

        {/* Error Message */}
        {error && (
          <div className="w-full max-w-3xl mb-4 p-4 bg-red-100 border border-red-300 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="w-full max-w-3xl mb-4 p-4 bg-green-100 border border-green-300 text-green-700 rounded-md">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl w-full">
          {/* Collaboration Details */}
          <div>
            <h2 className="text-lg font-semibold text-[#121217] mb-4">
              Collaboration Details
            </h2>

            <label
              htmlFor="title"
              className="block text-sm font-medium text-[#121217] mb-1"
            >
              Project Title *
            </label>
            <input
              id="title"
              type="text"
              name="title"
              placeholder="e.g., Seeking Vocalist for Indie Pop Track"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 bg-white text-[#121217] rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#1FB58F]"
              required
            />

            <label
              htmlFor="description"
              className="block text-sm font-medium text-[#121217] mb-1"
            >
              Project Description *
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Describe your project in detail..."
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 bg-white text-[#121217] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1FB58F]"
              required
            />
          </div>

          {/* Music Preferences */}
          <div>
            <h2 className="text-lg font-semibold text-[#121217] mb-4">
              Music Preferences
            </h2>

            <label
              htmlFor="genre"
              className="block text-sm font-medium text-[#121217] mb-1"
            >
              Genre *
            </label>
            <input
              id="genre"
              type="text"
              name="genre"
              placeholder="Select Genre"
              value={formData.genre}
              onChange={handleChange}
              className="w-full border bg-white text-[#121217] border-gray-300 rounded-md px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-[#1FB58F]"
              required
              readOnly
            />

            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <button
                  key={genre}
                  type="button"
                  onClick={() => handleGenreClick(genre)}
                  className={`px-3 py-1 rounded-full border ${
                    formData.genre === genre
                      ? "bg-[#1FB58F] text-white"
                      : "bg-gray-100 text-gray-700"
                  } hover:bg-[#1FB58F] hover:text-white transition`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* Location and Format */}
          <div>
            <h2 className="text-lg font-semibold text-[#121217] mb-4">
              Location and Format
            </h2>

            <label
              htmlFor="location"
              className="block text-sm font-medium text-[#121217] mb-1"
            >
              Location *
            </label>
            <input
              id="location"
              type="text"
              name="location"
              placeholder="e.g., Remote, New York, London"
              value={formData.location}
              onChange={handleChange}
              className="w-full border bg-white text-[#121217] border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#1FB58F]"
              required
            />

            <label
              htmlFor="format"
              className="block text-sm font-medium text-[#121217] mb-1"
            >
              Collaboration Format *
            </label>
            <input
              id="format"
              type="text"
              name="format"
              placeholder="e.g., Online Only, In-Person, Hybrid"
              value={formData.format}
              onChange={handleChange}
              className="w-full border bg-white text-[#121217] border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1FB58F]"
              required
            />
          </div>

          {/* Media Attachments */}
          <div>
            <h2 className="text-lg font-semibold text-[#121217] mb-4">
              Media Attachments
            </h2>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
              <p className="text-sm font-semibold text-[#121217] mb-2">
                Upload Media
              </p>
              <p className="text-xs text-gray-600 mb-3">
                Attach audio samples, demos, or other relevant files.
              </p>

              {/* Show current file if exists */}
              {formData.media && (
                <div className="mb-3 p-2 bg-gray-100 rounded">
                  <p className="text-sm text-gray-700">Current file uploaded</p>
                  <audio controls className="mt-2 w-full max-w-md mx-auto">
                    <source src={formData.media} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}

              <label className="cursor-pointer font-semibold text-[#121217] hover:underline">
                {fileUploading ? "Uploading..." : "Browse Files"}
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  disabled={fileUploading}
                />
              </label>

              {formData.file && (
                <p className="text-sm text-gray-600 mt-2">
                  Selected: {formData.file.name}
                </p>
              )}

              {fileUploading && (
                <div className="mt-2">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#1FB58F] mx-auto"></div>
                </div>
              )}
            </div>
          </div>

          {/* Contact and Collaboration Details */}
          <div>
            <h2 className="text-lg font-semibold text-[#121217] mb-4">
              Contact and Collaboration Details
            </h2>

            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#121217] mb-1"
            >
              Contact Email *
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Your email address for potential collaborators"
              value={formData.email}
              onChange={handleChange}
              className="w-full border bg-white text-[#121217] border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#1FB58F]"
              required
            />

            <label
              htmlFor="expectations"
              className="block text-sm font-medium text-[#121217] mb-1"
            >
              Collaboration Expectations *
            </label>
            <textarea
              id="expectations"
              name="expectations"
              placeholder="Describe what you expect from collaborators, timeline, etc."
              rows={4}
              value={formData.expectations}
              onChange={handleChange}
              className="w-full border border-gray-300 bg-white text-[#121217] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1FB58F]"
              required
            />
          </div>

          {/* Visibility Settings */}
          <div>
            <h2 className="text-lg font-semibold text-[#121217] mb-4">
              Visibility Settings
            </h2>

            <div className="space-y-2">
              <label className="flex items-center border-gray-300 bg-white p-2 rounded-lg space-x-2">
                <input
                  type="radio"
                  name="visibility"
                  value="public"
                  checked={formData.visibility === "public"}
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
                  checked={formData.visibility === "private"}
                  onChange={handleChange}
                />
                <div>
                  <p className="text-sm font-medium text-[#121217]">Private</p>
                  <p className="text-xs text-gray-500">
                    Only visible to selected users
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading || fileUploading}
              className="w-full md:w-auto px-8 py-3 bg-[#1FB58F] text-white font-semibold rounded-md hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? isEditing
                  ? "Updating..."
                  : "Posting..."
                : isEditing
                ? "Update Opportunity"
                : "Post Opportunity"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
