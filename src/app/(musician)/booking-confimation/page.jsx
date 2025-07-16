"use client"
import { useState } from "react";

export default function BookingConfirmed() {
  const [eventData] = useState({
    title: "Live Music Performance",
    date: "Saturday, March 15, 2025",
    time: "8:00 PM - 11:00 PM",
    venue: "The Music Hall",
    location: "Downtown City Center",
    image: "/api/placeholder/300/200",
    setDuration: "90 minutes",
    equipment: "Microphones, amplifiers, drum kit",
    manager: {
      name: "Sophia Carter",
      role: "Event Manager",
      avatar: "/api/placeholder/50/50"
    }
  });

  const handleCall = () => {
    // Handle call functionality
    console.log("Calling manager...");
  };

  const handleMessage = () => {
    // Handle message functionality
    console.log("Opening messages...");
  };

  const handleAddToCalendar = () => {
    // Handle add to calendar functionality
    console.log("Adding to calendar...");
  };

  const handleBackToGigs = () => {
    // Handle navigation back to gigs
    console.log("Navigating back to gigs...");
  };

  return (
    <div className="min-h-screen bg-[#f5f5f0] py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header with Success Icon */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#1FB58F] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Booking Confirmed</h1>
          <p className="text-gray-600 text-sm">
            Lorem ipsum is simply dummy text of the printing and typesetting industry.
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
          <div className="flex flex-col md:flex-row">
            {/* Event Image */}
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop"
                alt="Live Performance"
                className="w-full h-48 md:h-full object-cover"
              />
            </div>
            
            {/* Event Details */}
            <div className="md:w-1/2 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">Event Summary</h2>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    You're all set! Here are the details for your upcoming gig. You're all set! Here are the details for your upcoming gig. You're all set! Here are the details for your upcoming gig. You're all set! Here are the details for your upcoming gig.
                  </p>
                </div>
                <button className="bg-[#1FB58F] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-green-600 transition">
                  View Event
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Gig Details */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Gig Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Set Duration</h4>
              <p className="text-sm text-gray-600">{eventData.setDuration}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Equipment</h4>
              <p className="text-sm text-gray-600">{eventData.equipment}</p>
            </div>
          </div>
        </div>

        {/* Manager Contact */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Manager Contact</h3>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1494790108755-2616b332c108?w=50&h=50&fit=crop&crop=face"
                  alt="Manager"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-800">{eventData.manager.name}</h4>
                <p className="text-sm text-gray-600">{eventData.manager.role}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button 
                onClick={handleCall}
                className="bg-[#1FB58F] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-green-600 transition"
              >
                Call
              </button>
              <button 
                onClick={handleMessage}
                className="bg-[#2196F3] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-600 transition"
              >
                Message
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Next Steps</h3>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-800 mb-1">Add to Calendar</h4>
              <p className="text-sm text-gray-600">Never miss your upcoming gigs</p>
            </div>
            <button 
              onClick={handleAddToCalendar}
              className="bg-[#2196F3] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-600 transition"
            >
              Add to Calendar
            </button>
          </div>
        </div>

        {/* Back to Gigs Button */}
        <div className="text-center mt-8">
          <button 
            onClick={handleBackToGigs}
            className="bg-[#1FB58F] text-white px-8 py-3 rounded-full font-medium hover:bg-green-600 transition"
          >
            Back to Gigs
          </button>
        </div>
      </div>
    </div>
  );
}