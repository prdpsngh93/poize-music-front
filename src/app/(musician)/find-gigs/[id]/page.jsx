"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { postNotification } from "@/utils/notifications";
import BackButton from "@/components/GlobalComponents/BackButton";

const GigDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const gigId = params.id;

  const [gig, setGig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [requestForm, setRequestForm] = useState({
    title: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const musicianId = Cookies.get("id");
  const userId = Cookies.get("userId");
  const userDataCookie = Cookies.get("userData");
  const userRole = Cookies.get("userRole");
  const userData = userDataCookie ? JSON.parse(userDataCookie) : null;

  useEffect(() => {
    const role = userData?.role;
    if (role !== "artist"  && userRole !== "artist" ) {
      redirect("/");
    }
    
    fetchGigDetails();
  }, [gigId]);

  const fetchGigDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/venue-gigs/${gigId}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setGig(data);
    } catch (error) {
      console.error("Error fetching gig details:", error);
      toast.error("Failed to load gig details");
      router.push("/find-gigs");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRequestForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setRequestForm({ title: "", message: "" });
  };

  const sendGigRequestNotification = async () => {
    try {
      const musicianName = Cookies.get("name") || "Musician";
      
      const notificationPayload = {
        user_id: userId,
        type: "gig_request",
        reference_id: gig.venue_id,
        message: `New gig request from ${musicianName}: "${requestForm.title}" for "${gig.gig_title}"`
      };

      await postNotification(notificationPayload);
      console.log("Gig request notification sent successfully");
    } catch (error) {
      console.error("Failed to send notification:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!requestForm.title.trim() || !requestForm.message.trim()) {
      toast.info("Please fill in both title and message fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        gig_id: gig.id,
        artist_id: musicianId,
        title: requestForm.title,
        message: requestForm.message,
        venue_id: gig.venue_id,
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/venue-gig-requests`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        await sendGigRequestNotification();
        toast.success("Gig Request sent successfully!");
        setRequestForm({ title: "", message: "" });
      } else {
        throw new Error("Failed to send request");
      }
    } catch (error) {
      console.error("Error sending request:", error);
      toast.error("Failed to send request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="bg-[#f4f3ee] min-h-screen px-4 md:px-9 lg:px-12 py-10">
        <div className="max-w-4xl mx-auto">
          <BackButton />
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1FB58F]"></div>
            <p className="text-gray-500 ml-3">Loading gig details...</p>
          </div>
        </div>
      </main>
    );
  }

  if (!gig) {
    return (
      <main className="bg-[#f4f3ee] min-h-screen px-4 md:px-9 lg:px-12 py-10">
        <div className="max-w-4xl mx-auto">
          <BackButton />
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Gig Not Found
            </h2>
            <p className="text-gray-600 mb-4">
              The gig you're looking for doesn't exist or has been removed.
            </p>
            <button
              onClick={() => router.push("/find-gigs")}
              className="px-4 py-2 bg-[#1FB58F] text-white rounded-md hover:bg-green-700 transition"
            >
              Back to Find Gigs
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#f4f3ee] min-h-screen px-4 md:px-9 lg:px-12 py-10">
      <div className="max-w-4xl mx-auto">
        <BackButton />
        
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6  my-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Gig Image */}
            <div className="w-full lg:w-1/3">
              <img
                src={gig.gig_image || "/images/cards1.png"}
                alt={gig.gig_title}
                className="w-full h-48 lg:h-64 object-cover rounded-lg"
              />
            </div>

            {/* Basic Info */}
            <div className="flex-1">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                {gig.gig_title}
              </h1>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">📅 Date:</span>
                  <span className="text-sm text-gray-600">
                    {gig.date_time
                      ? new Date(gig.date_time).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "No date specified"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">⏰ Duration:</span>
                  <span className="text-sm text-gray-600">
                    {gig.duration || "Not specified"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">🎵 Genre:</span>
                  <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                    {gig.genre || "Not specified"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">🎤 Artist Type:</span>
                  <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                    {gig.artist_type || "Not specified"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">💰 Payment:</span>
                  <span className="text-sm text-gray-600 bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    {gig.payment_option || "Not specified"}
                  </span>
                </div>

                {gig.perks && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">🎁 Perks:</span>
                    <span className="text-sm text-gray-600">
                      {gig.perks}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        {gig.gig_description && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Description
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {gig.gig_description}
            </p>
          </div>
        )}

        {/* Requirements Section */}
        {gig.artist_requirement && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Artist Requirements
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {gig.artist_requirement}
            </p>
          </div>
        )}

        {/* Booking Details Section */}
        {gig.booking_details && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Booking Details
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {gig.booking_details}
            </p>
          </div>
        )}

        {/* Request Form Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Send Request for This Gig
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Request Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={requestForm.title}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FB58F] focus:border-transparent transition"
                placeholder="Enter a compelling title for your request"
                required
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Your Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={requestForm.message}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FB58F] focus:border-transparent resize-vertical transition"
                placeholder="Introduce yourself, mention your experience, and explain why you're perfect for this gig..."
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Tip: Include your experience, style, and what makes you unique
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                Clear Form
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-[#1FB58F] text-white rounded-lg hover:bg-green-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                    Sending Request...
                  </>
                ) : (
                  "Send Request"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default GigDetailsPage;