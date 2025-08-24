"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { FaSort } from "react-icons/fa";
import { authAPI } from "../../../lib/api";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
  const [isSubmitting, setIsSubmitting] = useState(false);


  const venueId = Cookies.get("id")
  

  useEffect(() => {
    if (address) {
      setFormData((prev) => ({ ...prev, location: address }));
    }
  }, [address]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formatDataForAPI = (data, status) => {
    return {
      venue_id: venueId, 
      gig_title: data.title,
      duration: data.duration,
      date_time: data.datetime,
      genre: data.genre,
      artist_type: data.artistType,
      location: data.location,
      gig_description: data.description,
      artist_requirement: data.requirements,
      payment_option: data.payment,
      perks: data.perks,
      booking_details: data.bookingDeadline,
      status: status, 
    };
  };

  const handleSave = async (status) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/venue-gigs`;
     const paylaod = formatDataForAPI(formData , status)
  
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`, // if your API requires auth
        },
        body: JSON.stringify(paylaod),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error:", errorData);
        return;
      }
  
      const data = await response.json();
      console.log("Saved Gig:", data);
  
      toast.success("Gig is Posted")
      router.push('/venue-dashboard')
    } catch (err) {
      console.error("Request failed:", err);
    }
  };


  const customSelectStyle = "appearance-none pr-8 relative";

  return (
    <div className="bg-[#F7F6F2] min-h-screen">
      <form
        onSubmit={handleSave}
        className="p-6 max-w-5xl mx-auto space-y-10 px-4 md:px-9 lg:px-12 py-10 rounded-lg"
      >
        <h2 className="text-xl font-bold mb-6 text-[#121417]">Post a gig</h2>

        {/* Title & Duration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-[#121417]">
              Gig Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="px-4 py-2 bg-white text-[#121417] rounded-full text-sm w-full outline-none"
              placeholder="e.g. Live Music Night"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-[#121417]">
              Duration
            </label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="px-4 py-2 bg-white text-[#121417] rounded-full text-sm w-full outline-none"
              placeholder="e.g. 2 hours"
              required
            />
          </div>
        </div>

        {/* Date & Genre */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-[#121417]">
              Date and Time
            </label>
            <input
              type="datetime-local"
              name="datetime"
              value={formData.datetime}
              onChange={handleChange}
              className="px-4 py-2 bg-white text-[#121417] rounded-full text-sm w-full outline-none"
              required
            />
          </div>
          <div className="relative">
            <label className="block text-sm font-medium mb-1 text-[#121417]">
              Genre
            </label>
            <select
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className={`${customSelectStyle} px-4 py-2 bg-white text-[#121417] rounded-full text-sm w-full outline-none`}
              required
            >
              <option value="">Select</option>
              <option value="rock">Rock</option>
              <option value="jazz">Jazz</option>
              <option value="electronic">Electronic</option>
              <option value="bollywood">Bollywood</option>
              <option value="classical">Classical</option>
              <option value="pop">Pop</option>
              <option value="folk">Folk</option>
            </select>
            <FaSort className="absolute right-4 top-9 text-gray-500 pointer-events-none" />
          </div>
        </div>

        {/* Artist Type */}
        <div className="relative">
          <label className="block text-sm font-medium mb-1 text-[#121417]">
            Artist Type
          </label>
          <select
            name="artistType"
            value={formData.artistType}
            onChange={handleChange}
            className={`${customSelectStyle} px-4 py-2 bg-white text-[#121417] rounded-full text-sm w-[50%] outline-none`}
            required
          >
            <option value="">Select</option>
            <option value="solo">Solo</option>
            <option value="band">Band</option>
          </select>
          <FaSort className="absolute right-4 top-9 text-gray-500 pointer-events-none" />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium mb-1 text-[#121417]">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            readOnly
            className="px-4 py-2 bg-white text-[#121417] rounded-full text-sm w-[50%] outline-none"
            placeholder="Select on map"
            required
          />
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
              Gig Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="p-3 bg-white text-sm w-full h-28 rounded-md outline-none resize-none"
              placeholder="Describe your gig..."
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-[#121417]">
              Artist Requirement
            </label>
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              className="p-3 bg-white text-sm w-full h-28 rounded-md outline-none resize-none"
              placeholder="What do you expect from artists..."
              required
            />
          </div>
        </div>

        {/* Payment + Perks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <label className="block text-sm font-medium mb-1 text-[#121417]">
              Payment Option
            </label>
            <select
              name="payment"
              value={formData.payment}
              onChange={handleChange}
              className={`${customSelectStyle} px-4 py-2 bg-white text-[#121417] rounded-full text-sm w-full outline-none`}
              required
            >
              <option value="">Select</option>
              <option value="fixed">Fixed</option>
              <option value="hourly">Hourly</option>
              <option value="revenue_share">Revenue Share</option>
            </select>
            <FaSort className="absolute right-4 top-9 text-gray-500 pointer-events-none" />
          </div>
          <div className="relative">
            <label className="items-center flex text-sm font-medium mb-1 text-[#121417]">
              Perks
            </label>
            <select
              name="perks"
              value={formData.perks}
              onChange={handleChange}
              className={`${customSelectStyle} px-4 py-2 bg-white text-[#121417] rounded-full text-sm w-full outline-none`}
            >
              <option value="">Select</option>
              <option value="free_drinks">Free Drinks</option>
              <option value="free_meals">Free Meals</option>
              <option value="accommodation">Accommodation</option>
              <option value="transport">Transport</option>
              <option value="free_dinner_drink">Free dinner & drink</option>
            </select>
            <FaSort className="absolute right-4 top-9 text-gray-500 pointer-events-none" />
          </div>
        </div>

        {/* Booking Deadline */}
        <div>
          <label className="block text-sm font-medium mb-1 text-[#121417]">
            Booking Deadline
          </label>
          <input
            type="date"
            name="bookingDeadline"
            value={formData.bookingDeadline}
            onChange={handleChange}
            className="px-4 py-2 bg-white text-[#121417] rounded-full text-sm w-[50%] outline-none"
            required
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full md:justify-center">
          <button
            type="button"
            onClick={()=>{handleSave('draft')}}
            className="bg-black text-white px-6 py-2 rounded-full text-sm hover:cursor-pointer"
            disabled={isSubmitting}
          >
            Save Draft
          </button>
          <button
            type="submit"
            className="bg-[#1BBF81] text-white px-6 py-2 rounded-full text-sm hover:cursor-pointer"
            onClick={()=>{handleSave('active')}}
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