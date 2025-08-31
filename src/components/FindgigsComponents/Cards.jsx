import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { postNotification } from "@/utils/notifications";
// Import the notification utility

const Cards = ({ gigs }) => {
  const [selectedGig, setSelectedGig] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requestForm, setRequestForm] = useState({
    title: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openModal = (gig) => {
    setSelectedGig(gig);
    setIsModalOpen(true);
  };

  const musicianId = Cookies.get("id");

  const userId=Cookies.get("userId")

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedGig(null);
    setRequestForm({ title: "", message: "" });
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

  // Function to send gig request notification
  const sendGigRequestNotification = async () => {
    try {
      const musicianName = Cookies.get("name") || "Musician";
      
      const notificationPayload = {
        user_id: userId,                    
        type: "gig_request",                  
        reference_id: selectedGig.venue_id,   
        message: `New gig request from ${musicianName}: "${requestForm.title}" for "${selectedGig.gig_title}"`
      };

      await postNotification(notificationPayload);
      console.log("Gig request notification sent successfully");
    } catch (error) {
      console.error("Failed to send notification:", error);
      // Don't throw error here as gig request was successful
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
        gig_id: selectedGig.id,
        artist_id: musicianId,
        title: requestForm.title,
        message: requestForm.message,
        venue_id: selectedGig.venue_id,
      };

      // Replace with your actual API endpoint
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
        // Send notification after successful gig request
        await sendGigRequestNotification();
        
        toast.success("Gig Request sent successfully!");
        closeModal();
      } else {
        throw new Error("Failed to send request");
      }
    } catch (error) {
      console.error("Error sending request:", error);
      alert("Failed to send request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="bg-[#f4f3ee]">
        {gigs.map((gig) => (
          <div
            key={gig.id}
            className="flex flex-col md:flex-row justify-between items-center gap-4 py-6 border-b border-gray-200"
          >
            {/* Text Info */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-md md:text-lg font-semibold text-gray-900 mb-1">
                {gig.gig_title}
              </h2>

              <p className="text-sm text-gray-600">
                {gig.date_time
                  ? new Date(gig.date_time).toLocaleDateString()
                  : "No date"}{" "}
                | {gig.duration || "N/A"}
              </p>

              <p className="text-xs text-gray-500">
                {gig.genre || "No genre"} |{" "}
                {gig.artist_type || "Unknown artist"}
              </p>

              <p className="text-xs text-gray-600 mt-1">
                {gig.payment_option ? `Payment: ${gig.payment_option}` : "N/A"}
                {gig.perks ? ` | Perks: ${gig.perks}` : ""}
              </p>

              {gig.gig_description && (
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                  {gig.gig_description}
                </p>
              )}

              <button
                onClick={() => openModal(gig)}
                className="mt-3 px-4 py-1.5 text-sm bg-[#1FB58F] text-white rounded-full hover:bg-green-700 transition"
              >
                View Details
              </button>
            </div>

            {/* Image placeholder since API has no image */}
            <div className="w-full max-w-[270px] h-28 md:h-32 lg:h-36 overflow-hidden rounded-md flex items-center justify-center bg-gray-200 text-gray-500">
              <img
                src={gig.gig_image || `/images/cards1.png`}
                alt={gig.gig_title}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && selectedGig && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">
                Gig Details
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* Gig Details */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {selectedGig.gig_title}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Date & Time:
                    </p>
                    <p className="text-sm text-gray-600">
                      {selectedGig.date_time
                        ? new Date(selectedGig.date_time).toLocaleDateString()
                        : "No date"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Duration:
                    </p>
                    <p className="text-sm text-gray-600">
                      {selectedGig.duration || "N/A"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700">Genre:</p>
                    <p className="text-sm text-gray-600">
                      {selectedGig.genre || "No genre"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Artist Type:
                    </p>
                    <p className="text-sm text-gray-600">
                      {selectedGig.artist_type || "Unknown"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Payment:
                    </p>
                    <p className="text-sm text-gray-600">
                      {selectedGig.payment_option || "N/A"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700">Perks:</p>
                    <p className="text-sm text-gray-600">
                      {selectedGig.perks || "None"}
                    </p>
                  </div>
                </div>

                {selectedGig.gig_description && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Description:
                    </p>
                    <p className="text-sm text-gray-600">
                      {selectedGig.gig_description}
                    </p>
                  </div>
                )}

                {selectedGig.artist_requirement && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Artist Requirements:
                    </p>
                    <p className="text-sm text-gray-600">
                      {selectedGig.artist_requirement}
                    </p>
                  </div>
                )}

                {selectedGig.booking_details && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Booking Details:
                    </p>
                    <p className="text-sm text-gray-600">
                      {selectedGig.booking_details}
                    </p>
                  </div>
                )}
              </div>

              {/* Request Form */}
              <div className="border-t pt-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Send Request
                </h4>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Title *
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={requestForm.title}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1FB58F] focus:border-transparent"
                      placeholder="Enter request title"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={requestForm.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1FB58F] focus:border-transparent resize-vertical"
                      placeholder="Enter your message"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
                    >
                      Reset
                    </button>

                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="px-6 py-2 text-sm bg-[#1FB58F] text-white rounded-md hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Sending..." : "Send Request"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cards;