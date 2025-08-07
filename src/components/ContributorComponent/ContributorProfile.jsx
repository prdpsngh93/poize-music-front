'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { FaSort } from 'react-icons/fa';
import { authAPI } from "../../../lib/api";

export default function ContributorProfile() {
  const router = useRouter();
  const [userId, setUserId] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    location: '',
    role: '',
    venueType: '',
    bio: '',
    skills: '',
    workSamples: '',
    socialLinks: '',
    profile_image: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  const cookies = Cookies.get("token");

  useEffect(() => {
    fetchUserAndProfile();
  }, []);

  const fetchUserAndProfile = async () => {
    try {
      setLoading(true);
      const userInfo = await authAPI.getApi();
      if (userInfo.user) {
        setUserId(userInfo.user.id);

        const result = await authAPI.getContributorProfile();

        if (result.User) {
          setFormData({
            fullName: result.User.name || "",
            location: result.location || "",
            role: result.role || "",
            venueType: result.venueType || "",
            bio: result.short_bio || "",
            skills: (result.skill_tags || []).join(', '),
            workSamples: result.work_sample || "",
            socialLinks: result.social_media_link || "",
            profile_image: result.profile_picture || "",
          });

          setIsEditing(true);
        }
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      setError("Failed to load profile data");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      handleImageUpload(e);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError("Please upload a valid image file (JPEG, PNG, JPG, or WebP)");
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setError("Image size should be less than 5MB");
      return;
    }

    setImageUploading(true);
    setError("");

    try {
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
      data.append('cloud_name', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: data,
        }
      );

      if (!response.ok) throw new Error('Failed to upload image');

      const result = await response.json();
      setFormData((prev) => ({
        ...prev,
        profile_image: result.secure_url,
      }));
    } catch (err) {
      console.error("Image upload error:", err);
      setError("Failed to upload image. Please try again.");
    } finally {
      setImageUploading(false);
    }
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setError("Full name is required");
      return false;
    }
    if (!formData.bio.trim()) {
      setError("Bio is required");
      return false;
    }
    if (!formData.role) {
      setError("Please select a role");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const payload = {
        short_bio: formData.bio.trim(),
        location: formData.location.trim(),
        role: formData.role,
        venueType: formData.venueType,
        profile_picture: formData.profile_image,
        skill_tags: formData.skills.split(',').map(tag => tag.trim()).filter(Boolean),
        work_sample: formData.workSamples.trim(),
        social_media_link: formData.socialLinks.trim(),
        is_profile_complete: true
      };

      const result = await authAPI.updateContributorProfile(payload);

      setSuccess(isEditing ? "Profile updated successfully!" : "Profile created successfully!");
      setIsEditing(true);
      router.push("/create-gig");


      const cookieOptions = {
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        expires: 30,
      };

      if (result.user) {
        Cookies.set("contributorData", JSON.stringify(result.user), cookieOptions);
      }
    } catch (err) {
      console.error("Save profile error:", err);
      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to save profile. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading && !formData.fullName) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f3f1e9]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1FB58F] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading contributor profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f1e9] py-16 px-4 md:px-9 lg:px-12">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-[#121417] mb-6">
          {isEditing ? "Edit Your Contributor Profile" : "Create Your Contributor Profile"}
        </h2>

        {success && <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-2xl">{success}</div>}
        {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-2xl">{error}</div>}

        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden border border-gray-300 relative">
            {formData.profile_image ? (
              <img src={formData.profile_image} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <img src="/images/avatar.png" alt="Default Profile" className="w-full h-full object-cover" />
            )}
            {imageUploading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
            )}
          </div>
          <label className="mt-2 cursor-pointer">
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={imageUploading} />
            <span className="text-sm text-[#1FB58F] hover:text-green-500 transition">
              {imageUploading ? "Uploading..." : "Upload Profile Picture"}
            </span>
          </label>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-[#121417]">Full Name</label>
              <input name="fullName" type="text" value={formData.fullName} onChange={handleChange}
                className="bg-white rounded-full p-3 px-4 w-full text-sm text-[#121417] focus:outline-none focus:ring-2 focus:ring-[#1FB58F]" />
            </div>

            {/* Location */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-[#121417]">Location</label>
              <input name="location" type="text" value={formData.location} onChange={handleChange}
                className="bg-white rounded-full p-3 px-4 w-full text-sm text-[#121417] focus:outline-none focus:ring-2 focus:ring-[#1FB58F]" />
            </div>

            {/* Role */}
            <div className="flex flex-col relative">
              <label className="mb-1 text-sm font-medium text-[#121417]">Role</label>
              <div className="relative">
                <select name="role" value={formData.role} onChange={handleChange}
                  className="bg-white rounded-full p-3 pr-10 w-full text-sm text-[#121417] appearance-none focus:outline-none focus:ring-2 focus:ring-[#1FB58F]">
                  <option value="">Select Role</option>
                  <option value="Singer">Singer</option>
                  <option value="Producer">Producer</option>
                  <option value="Mixer">Mixer</option>
                  <option value="Sound Engineer">Sound Engineer</option>
                  <option value="Songwriter">Songwriter</option>
                </select>
                <FaSort className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Venue Type */}
            <div className="flex flex-col relative">
              <label className="mb-1 text-sm font-medium text-[#121417]">Venue Type</label>
              <div className="relative">
                <select name="venueType" value={formData.venueType} onChange={handleChange}
                  className="bg-white rounded-full p-3 pr-10 w-full text-sm text-[#121417] appearance-none focus:outline-none focus:ring-2 focus:ring-[#1FB58F]">
                  <option value="">Select Venue Type</option>
                  <option value="Studio">Studio</option>
                  <option value="Remote">Remote</option>
                  <option value="Live">Live</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
                <FaSort className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Bio */}
            <div className="flex flex-col md:col-span-2">
              <label className="mb-1 text-sm font-medium text-[#121417]">Short Bio</label>
              <textarea name="bio" value={formData.bio} onChange={handleChange} rows="4"
                placeholder="Write a short bio about your experience and expertise"
                className="bg-white rounded-lg p-3 px-4 w-full text-sm text-[#121417] focus:outline-none focus:ring-2 focus:ring-[#1FB58F]" />
            </div>

            {/* Skills */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-[#121417]">Skill Tags</label>
              <input name="skills" value={formData.skills} onChange={handleChange}
                placeholder="e.g., Mixing, Mastering, Audio Production"
                className="bg-white rounded-full p-3 px-4 w-full text-sm text-[#121417] focus:outline-none focus:ring-2 focus:ring-[#1FB58F]" />
            </div>

            {/* Work Samples */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-[#121417]">Work Samples</label>
              <input name="workSamples" value={formData.workSamples} onChange={handleChange}
                placeholder="Portfolio URL, SoundCloud, etc."
                className="bg-white rounded-full p-3 px-4 w-full text-sm text-[#121417] focus:outline-none focus:ring-2 focus:ring-[#1FB58F]" />
            </div>

            {/* Social Media */}
            <div className="flex flex-col md:col-span-2">
              <label className="mb-1 text-sm font-medium text-[#121417]">Social Media Links</label>
              <input name="socialLinks" value={formData.socialLinks} onChange={handleChange}
                placeholder="Instagram, LinkedIn, etc."
                className="bg-white rounded-full p-3 px-4 w-full text-sm text-[#121417] focus:outline-none focus:ring-2 focus:ring-[#1FB58F]" />
            </div>
          </div>

          <div className="text-center">
            <button type="submit" disabled={loading || imageUploading}
              className="bg-[#1FB58F] text-white px-8 py-3 rounded-full hover:bg-green-600 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? "Saving..." : isEditing ? "Update Profile" : "Save Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
