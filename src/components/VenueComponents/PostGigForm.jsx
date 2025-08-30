"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { FaSort } from "react-icons/fa";
import { authAPI } from "../../../lib/api";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import BackButton from "../common/BackButton";

const MapLocation = dynamic(() => import("./MapComponet"), { ssr: false });

const PostGigForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    duration: "",
    datetime: "",
    genre: "",
    artistType: "",
    location: "",
    description: "",
    requirements: "",
    payment: "",
    perks: "",
    bookingDeadline: "",
  });

  const [position, setPosition] = useState(null);
  const [address, setAddress] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const venueId = Cookies.get("id");

  useEffect(() => {
    if (address) {
      setFormData((prev) => ({ ...prev, location: address }));
    }
  }, [address]);

  // Validation rules
  const validateField = (name, value) => {
    const validationRules = {
      title: {
        required: true,
        minLength: 5,
        maxLength: 100,
        pattern: /^[a-zA-Z0-9\s\-&'.,!]+$/,
      },
      duration: {
        required: true,
        pattern:
          /^(\d+(\.\d+)?\s*(hour|hours|hr|hrs|minute|minutes|min|mins|day|days)?)$/i,
      },
      datetime: {
        required: true,
        futureDate: true,
      },
      genre: {
        required: true,
      },
      artistType: {
        required: true,
      },
      location: {
        required: true,
        minLength: 10,
      },
      description: {
        required: true,
        minLength: 20,
        maxLength: 500,
      },
      requirements: {
        required: true,
        minLength: 10,
        maxLength: 300,
      },
      payment: {
        required: true,
      },
      bookingDeadline: {
        required: true,
        futureDate: true,
        // beforeGigDate: true,
      },
    };

    const rules = validationRules[name];
    if (!rules) return "";

    // Required validation
    if (rules.required && (!value || value.toString().trim() === "")) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    }

    if (!value) return ""; // If not required and empty, no error

    // String length validations
    if (rules.minLength && value.length < rules.minLength) {
      return `${
        name.charAt(0).toUpperCase() + name.slice(1)
      } must be at least ${rules.minLength} characters`;
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} must not exceed ${
        rules.maxLength
      } characters`;
    }

    // Pattern validation
    if (rules.pattern && !rules.pattern.test(value)) {
      if (name === "title") {
        return "Title contains invalid characters";
      }
      if (name === "duration") {
        return "Duration format is invalid (e.g., '2 hours', '90 minutes')";
      }
    }

    // Future date validation
    if (rules.futureDate) {
      const selectedDate = new Date(value);
      const now = new Date();
      if (selectedDate <= now) {
        return `${
          name.charAt(0).toUpperCase() + name.slice(1)
        } must be in the future`;
      }
    }

    // Booking deadline should be before gig date
    if (rules.beforeGigDate && formData.datetime) {
      const bookingDate = new Date(value);
      const gigDate = new Date(formData.datetime);
      if (bookingDate >= gigDate) {
        return "Booking deadline must be before the gig date";
      }
    }

    return "";
  };

  // Validate file upload
  const validateFile = (file) => {
    if (!file) return "";

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "application/pdf",
    ];
    const maxSize = 5 * 1024 * 1024; // 5MB

    // if (!allowedTypes.includes(file.type)) {
    //   return "File must be an image (JPEG, PNG, GIF) or PDF";
    // }

    if (file.size > maxSize) {
      return "File size must be less than 5MB";
    }

    return "";
  };

  // Validate entire form
  const validateForm = () => {
    const newErrors = {};

    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    // Validate file if attached
    if (attachment) {
      const fileError = validateFile(attachment);
      if (fileError) newErrors.attachment = fileError;
    }

    // Additional cross-field validations
    if (formData.datetime && formData.bookingDeadline) {
      const gigDate = new Date(formData.datetime);
      const bookingDate = new Date(formData.bookingDeadline);

      // if (bookingDate >= gigDate) {
      //   newErrors.bookingDeadline = "Booking deadline must be before the gig date";
      // }
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // Real-time validation for better UX
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileError = validateFile(file);
      if (fileError) {
        setErrors((prev) => ({ ...prev, attachment: fileError }));
        toast.error(fileError);
        return;
      }

      setAttachment(file);
      setErrors((prev) => ({ ...prev, attachment: "" }));
      toast.success("File selected successfully");
    }
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    );

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      const data = await res.json();
      return data.secure_url;
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      throw new Error("Failed to upload file");
    }
  };

  const formatDataForAPI = (data, status, gigImageUrl) => {
    return {
      venue_id: venueId,
      gig_title: data.title.trim(),
      duration: data.duration.trim(),
      date_time: data.datetime,
      genre: data.genre,
      artist_type: data.artistType,
      location: data.location.trim(),
      gig_description: data.description.trim(),
      artist_requirement: data.requirements.trim(),
      payment_option: data.payment,
      perks: data.perks || "",
      booking_details: data.bookingDeadline,
      status: status,
      gig_image: gigImageUrl || "",
    };
  };

  const handleSave = async (status) => {
    try {
      if (status === "active") {
        setIsSubmitting(true);
      }

      // Validate form before submission
      const formErrors = validateForm();
      if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
        toast.error("Please fix the errors before submitting");
        return;
      }

      let gigImageUrl = "";
      if (attachment) {
        try {
          gigImageUrl = await uploadToCloudinary(attachment);
        } catch (uploadError) {
          toast.error("Failed to upload file. Please try again.");
          return;
        }
      }

      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/venue-gigs`;
      const payload = formatDataForAPI(formData, status, gigImageUrl);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error:", errorData);

        // Handle specific error messages from server
        if (errorData.message) {
          toast.error(errorData.message);
        } else {
          toast.error("Failed to post gig");
        }
        return;
      }

      const data = await response.json();

      const message =
        status === "draft" ? "Gig saved as draft" : "Gig posted successfully";
      toast.success(message);
      router.push("/venue-dashboard");
    } catch (err) {
      console.error("Request failed:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const customSelectStyle = "appearance-none pr-8 relative";

  // Helper function to get input classes based on error state
  const getInputClasses = (fieldName, baseClasses) => {
    const hasError = errors[fieldName];
    return `${baseClasses} ${hasError ? "border-red-500 border" : ""}`;
  };

  return (
    <div className="bg-[#F7F6F2] min-h-screen">
      <form className="p-6 max-w-5xl mx-auto space-y-10 px-4 md:px-9 lg:px-12 py-10 rounded-lg">
        <div className="flex gap-2 mb-6 items-center">
          <BackButton route={"/venue-dashboard"} />
          <h2 className="text-xl font-bold text-[#121417]">Post a gig</h2>
        </div>

        {/* Title & Duration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-[#121417]">
              Gig Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClasses(
                "title",
                "px-4 py-2 bg-white text-[#121417] rounded-full text-sm w-full outline-none"
              )}
              placeholder="e.g. Live Music Night"
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">{errors.title}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-[#121417]">
              Duration <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClasses(
                "duration",
                "px-4 py-2 bg-white text-[#121417] rounded-full text-sm w-full outline-none"
              )}
              placeholder="e.g. 2 hours, 90 minutes"
            />
            {errors.duration && (
              <p className="text-red-500 text-xs mt-1">{errors.duration}</p>
            )}
          </div>
        </div>

        {/* Date & Genre */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-[#121417]">
              Date and Time <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              name="datetime"
              value={formData.datetime}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClasses(
                "datetime",
                "px-4 py-2 bg-white text-[#121417] rounded-full text-sm w-full outline-none"
              )}
            />
            {errors.datetime && (
              <p className="text-red-500 text-xs mt-1">{errors.datetime}</p>
            )}
          </div>
          <div className="relative">
            <label className="block text-sm font-medium mb-1 text-[#121417]">
              Genre <span className="text-red-500">*</span>
            </label>
            <select
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClasses(
                "genre",
                `${customSelectStyle} px-4 py-2 bg-white text-[#121417] rounded-full text-sm w-full outline-none`
              )}
            >
              <option value="">Select Genre</option>
              <option value="rock">Rock</option>
              <option value="jazz">Jazz</option>
              <option value="electronic">Electronic</option>
              <option value="bollywood">Bollywood</option>
              <option value="classical">Classical</option>
              <option value="pop">Pop</option>
              <option value="folk">Folk</option>
            </select>
            <FaSort className="absolute right-4 top-9 text-gray-500 pointer-events-none" />
            {errors.genre && (
              <p className="text-red-500 text-xs mt-1">{errors.genre}</p>
            )}
          </div>
        </div>

        {/* Artist Type */}
        <div className="relative">
          <label className="block text-sm font-medium mb-1 text-[#121417]">
            Artist Type <span className="text-red-500">*</span>
          </label>
          <select
            name="artistType"
            value={formData.artistType}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getInputClasses(
              "artistType",
              `${customSelectStyle} px-4 py-2 bg-white text-[#121417] rounded-full text-sm w-[50%] outline-none`
            )}
          >
            <option value="">Select Artist Type</option>
            <option value="solo">Solo Artist</option>
            <option value="band">Band</option>
          </select>
          <FaSort className="absolute right-4 top-9 text-gray-500 pointer-events-none" />
          {errors.artistType && (
            <p className="text-red-500 text-xs mt-1">{errors.artistType}</p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium mb-1 text-[#121417]">
            Location <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            readOnly
            className={getInputClasses(
              "location",
              "px-4 py-2 bg-white text-[#121417] rounded-full text-sm w-[50%] outline-none cursor-not-allowed"
            )}
            placeholder="Select location on map below"
          />
          {errors.location && (
            <p className="text-red-500 text-xs mt-1">{errors.location}</p>
          )}
        </div>

        <div>
          <MapLocation
            position={position}
            setPosition={setPosition}
            setAddress={setAddress}
          />
        </div>

        {/* Description & Requirements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-[#121417]">
              Gig Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClasses(
                "description",
                "p-3 bg-white text-sm w-full h-28 rounded-md outline-none resize-none"
              )}
              placeholder="Describe your gig in detail... (min 20 characters)"
              maxLength="500"
            />
            <div className="flex justify-between text-xs mt-1">
              <div>
                {errors.description && (
                  <span className="text-red-500">{errors.description}</span>
                )}
              </div>
              <span className="text-gray-500">
                {formData.description.length}/500
              </span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-[#121417]">
              Artist Requirements <span className="text-red-500">*</span>
            </label>
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClasses(
                "requirements",
                "p-3 bg-white text-sm w-full h-28 rounded-md outline-none resize-none"
              )}
              placeholder="What do you expect from artists... (min 10 characters)"
              maxLength="300"
            />
            <div className="flex justify-between text-xs mt-1">
              <div>
                {errors.requirements && (
                  <span className="text-red-500">{errors.requirements}</span>
                )}
              </div>
              <span className="text-gray-500">
                {formData.requirements.length}/300
              </span>
            </div>
          </div>
        </div>

        {/* Payment + Perks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <label className="block text-sm font-medium mb-1 text-[#121417]">
              Payment Option <span className="text-red-500">*</span>
            </label>
            <select
              name="payment"
              value={formData.payment}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClasses(
                "payment",
                `${customSelectStyle} px-4 py-2 bg-white text-[#121417] rounded-full text-sm w-full outline-none`
              )}
            >
              <option value="">Select Payment Option</option>
              <option value="fixed">Fixed Amount</option>
              <option value="hourly">Hourly Rate</option>
              <option value="revenue_share">Revenue Share</option>
            </select>
            <FaSort className="absolute right-4 top-9 text-gray-500 pointer-events-none" />
            {errors.payment && (
              <p className="text-red-500 text-xs mt-1">{errors.payment}</p>
            )}
          </div>
          <div className="relative">
            <label className="items-center flex text-sm font-medium mb-1 text-[#121417]">
              Perks{" "}
              <span className="text-gray-500 text-xs ml-1">(Optional)</span>
            </label>
            <select
              name="perks"
              value={formData.perks}
              onChange={handleChange}
              className={`${customSelectStyle} px-4 py-2 bg-white text-[#121417] rounded-full text-sm w-full outline-none`}
            >
              <option value="">Select Perks (Optional)</option>
              <option value="free_drinks">Free Drinks</option>
              <option value="free_meals">Free Meals</option>
              <option value="accommodation">Accommodation</option>
              <option value="transport">Transport</option>
              <option value="free_dinner_drink">Free Dinner & Drinks</option>
            </select>
            <FaSort className="absolute right-4 top-9 text-gray-500 pointer-events-none" />
          </div>
        </div>

        {/* Booking Deadline */}
        <div>
          <label className="block text-sm font-medium mb-1 text-[#121417]">
            Booking Deadline <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="bookingDeadline"
            value={formData.bookingDeadline}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getInputClasses(
              "bookingDeadline",
              "px-4 py-2 bg-white text-[#121417] rounded-full text-sm w-[50%] outline-none"
            )}
          />
          {errors.bookingDeadline && (
            <p className="text-red-500 text-xs mt-1">
              {errors.bookingDeadline}
            </p>
          )}
        </div>

        {/* Attachments */}
        <div className="mt-6">
          <label className="text-sm font-medium text-[#121417]">
            Attachments{" "}
            <span className="text-gray-500 text-xs">
              (Optional - Images or PDF only, max 5MB)
            </span>
          </label>
          <div
            className={`border-dashed border-2 ${
              errors.attachment ? "border-red-500" : "border-gray-300"
            } bg-white rounded-2xl py-8 px-6 text-center`}
          >
            <p className="text-sm text-[#121417] font-semibold mb-1">
              Upload Poster or Rider
            </p>
            <p className="text-xs text-gray-500 mb-4">
              Drag and drop or browse files (JPEG, PNG, GIF, PDF - Max 5MB)
            </p>
            <label className="cursor-pointer">
              <span className="px-4 py-2 bg-[#1FB58F] text-white rounded-full text-sm hover:bg-green-600 inline-block">
                Upload
              </span>
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                accept="image/*,.pdf"
              />
            </label>
            {attachment && (
              <p className="mt-2 text-sm text-green-600">
                ✓ Selected: {attachment.name} (
                {(attachment.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
            {errors.attachment && (
              <p className="text-red-500 text-xs mt-2">{errors.attachment}</p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full md:justify-center">
          <button
            type="button"
            onClick={() => handleSave("draft")}
            className="bg-black text-white px-6 py-2 rounded-full text-sm hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Draft"}
          </button>
          <button
            type="button"
            className="bg-[#1BBF81] text-white px-6 py-2 rounded-full text-sm hover:bg-[#16a86f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => handleSave("active")}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Posting..." : "Post Gig"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostGigForm;
