// pages/BookingConfirmed.js
"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function BookingConfirmed() {
  const params = useParams();
  const router = useRouter();
  const applicationId = params?.id;

  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusUpdated, setStatusUpdated] = useState(false);


  useEffect(() => {
    const updateStatusAndFetchData = async () => {
      try {
        setLoading(true);

        // Update application status to 'accepted'
        if (!statusUpdated) {
          await axios.patch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/venue-gig-requests/requests-status/${applicationId}`,
            { status: "accepted" }
          );
          setStatusUpdated(true);
        }

        // Fetch updated application data
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/venue-gig-requests/${applicationId}`
        );

        setEventData(response.data);
      } catch (error) {
        console.error("Error updating status or fetching data:", error);

        // Fallback data for development
        setEventData({
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
            avatar: "/api/placeholder/50/50",
          },
        });
      } finally {
        setLoading(false);
      }
    };

    if (applicationId) {
      updateStatusAndFetchData();
    }
  }, [applicationId, statusUpdated]);

  const handleCall = () => {
    console.log("Calling manager...");
    // Implement call functionality
  };

  const handleMessage = () => {
    console.log("Opening messages...");
    // Implement message functionality
  };

  const handleAddToCalendar = () => {
    const event = {
      title: eventData?.title || "Live Music Performance",
      start: new Date("2025-03-15T20:00:00"),
      end: new Date("2025-03-15T23:00:00"),
      description: `Performance at ${eventData?.venue || "The Music Hall"}`,
    };

    // Create calendar event URL (Google Calendar)
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      event.title
    )}&dates=${event.start
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "")}/${event.end
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "")}&details=${encodeURIComponent(
      event.description
    )}`;

    window.open(calendarUrl, "_blank");
  };

  const handleBackToGigs = () => {
    router.push("/venue-gigs");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f5f0] py-8 px-4">
        <div className="max-w-2xl mx-auto flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Confirming booking...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f0] py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header with Success Icon */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#1FB58F] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Booking Confirmed
          </h1>
          <p className="text-gray-600 text-sm">
            Your booking has been successfully confirmed. The artist has been
            notified and you'll receive further details soon.
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
          <div className="flex flex-col md:flex-row">
            {/* Event Image */}
            <div className="md:w-1/2">
              <img
                src={ eventData.gig.gig_image ||"https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop"}
                alt="Live Performance"
                className="w-full h-48 md:h-full object-cover"
              />
            </div>

            {/* Event Details */}
            <div className="md:w-1/2 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    Event Summary
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Your booking is confirmed! The artist will be notified and
                    you'll receive confirmation details via email. Please review
                    the event details below.
                  </p>
                </div>
                {/* <button className="bg-[#1FB58F] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-green-600 transition">
                  View Event
                </button> */}
              </div>
            </div>
          </div>
        </div>

        {/* Event Details */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Event Details
          </h3>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">Event</h4>
              <p className="text-sm text-gray-900">
                {eventData?.title || "Live Music Performance"}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">
                Date & Time
              </h4>
              <p className="text-sm text-gray-900">
                {eventData?.date_time || "Saturday, March 15, 2025"} •{" "}
                {eventData?.time || "8:00 PM - 11:00 PM"}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">Venue</h4>
              <p className="text-sm text-gray-900">
                {eventData?.location || "The Music Hall"}
              </p>
            </div>
          </div>
        </div>

        {/* Gig Details */}
        {/* <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Performance Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Set Duration
              </h4>
              <p className="text-sm text-gray-600">
                {eventData?.setDuration || "90 minutes"}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Equipment
              </h4>
              <p className="text-sm text-gray-600">
                {eventData?.equipment || "Microphones, amplifiers, drum kit"}
              </p>
            </div>
          </div>
        </div> */}

        {/* Manager Contact */}
      

        {/* Next Steps */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Next Steps
          </h3>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-800 mb-1">
                Add to Calendar
              </h4>
              <p className="text-sm text-gray-600">
                Never miss your upcoming events
              </p>
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
          <Link
          href="/venue-dashboard"
            className="bg-[#1FB58F] text-white px-8 py-3 rounded-full font-medium hover:bg-green-600 transition"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
