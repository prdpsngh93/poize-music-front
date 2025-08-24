// pages/BookingSummary.js
'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';

const BookingSummary = () => {
  const params = useParams();
  const router = useRouter();
  const [applicationData, setApplicationData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const applicationId = params?.id;

  useEffect(() => {
    const fetchApplicationData = async () => {
      try {
        setLoading(true);
        
        // Fetch application details
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/venue-gig-requests/${applicationId}`
        );
        
        setApplicationData(response.data);
      } catch (error) {
        console.error("Error fetching application data:", error);
        
        // Fallback mock data for development
        setApplicationData({
          id: applicationId,
          artist: {
            name: "Sophia Reed",
            role: "Saxophonist",
            experience: "5 years experience",
            image: "/images/avatar.png",
            rate: 300
          },
          gig: {
            title: "Evening Jazz at The Blue Note",
            date: "Saturday, July 20, 2024",
            time: "8:00 PM – 10:00 PM",
            venue: "The Blue Note, New York",
            genre: "Jazz",
            image: "/images/nogigs.png"
          },
          message: "Please arrive 30 minutes before the performance for setup. Ensure all equipment is in good working order. Dress code is smart casual."
        });
      } finally {
        setLoading(false);
      }
    };

    if (applicationId) {
      fetchApplicationData();
    }
  }, [applicationId]);

  const handleNext = () => {
    router.push(`/venue-booking-terms/${applicationId}`);
  };

  if (loading) {
    return (
      <main className="bg-white min-h-screen px-4 md:px-10 py-8">
        <div className="max-w-5xl mx-auto flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading booking details...</p>
          </div>
        </div>
      </main>
    );
  }

  if (!applicationData) {
    return (
      <main className="bg-white min-h-screen px-4 md:px-10 py-8">
        <div className="max-w-5xl mx-auto flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600">Error loading booking details</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-white min-h-screen px-4 md:px-10 py-8">
      {/* Step Header */}
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold text-black mb-2">Booking Summary</h1>
        <p className="text-sm text-gray-500 mb-3">Step 1 of 4</p>
        <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden mb-8">
          <div className="h-full w-1/4 bg-black"></div>
        </div>

        {/* Gig Info */}
        <div className="flex flex-col md:flex-row justify-between gap-6 items-start mb-10">
          <div className="w-full md:w-1/2">
            <Image
              src={applicationData.gig?.image || "/images/nogigs.png"}
              alt="Gig Preview"
              width={300}
              height={200}
              className="rounded-lg w-full md:w-[60%] object-cover"
            />
          </div>

          <div className="w-full md:w-1/2 flex flex-col justify-between">
            <h2 className="text-lg font-semibold text-black mb-2">
              {applicationData.gig?.title || "Evening Jazz at The Blue Note"}
            </h2>
            <p className="text-sm text-gray-700">
              {applicationData.gig?.date || "Saturday, July 20, 2024"} • {applicationData.gig?.time || "8:00 PM – 10:00 PM"} • {applicationData.gig?.venue || "The Blue Note, New York"}
            </p>
            <p className="text-sm text-gray-500 mt-1">{applicationData.gig?.genre || "Jazz"}</p>
          </div>
        </div>

        {/* Musician Info */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div className='flex flex-col gap-3'>
            <h3 className="text-base font-semibold text-black mb-1">Musician</h3>
            <p className="text-sm font-medium text-gray-900">
              {applicationData.artist?.name || "Sophia Reed"}
            </p>
            <p className="text-sm text-gray-600">
              {applicationData.artist?.role || "Saxophonist"} · {applicationData.artist?.experience || "5 years experience"}
            </p>
            <button 
              onClick={() => {/* Navigate to profile */}}
              className="mt-2 bg-[#1FB58F] text-white text-sm font-medium px-4 py-1.5 rounded-full hover:bg-green-600 transition"
            >
              View Profile
            </button>
          </div>

          <Image
            src={applicationData.artist?.image || "/images/avatar.png"}
            alt={applicationData.artist?.name || "Musician"}
            width={250}
            height={120}
            className="rounded-lg w-full md:w-[20%] object-cover"
          />
        </div>

        {/* Rate */}
        <div className="mb-10">
          <h3 className="text-base font-semibold text-black mb-2">Rate</h3>
          <div className="rounded-xl overflow-hidden">
            <div className="relative w-full h-28 md:h-32 bg-black">
              <Image
                src="/images/live-band.png"
                alt="Rate"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-start pl-6">
                <span className="text-white text-2xl font-bold">
                  $ {applicationData.artist?.rate || 300}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="mb-10">
          <h3 className="text-base font-semibold text-black mb-2">Notes</h3>
          <p className="text-sm text-gray-700">
            {applicationData.message || "Please arrive 30 minutes before the performance for setup. Ensure all equipment is in good working order. Dress code is smart casual."}
          </p>
        </div>

        {/* Next Button */}
        <div className="flex justify-end">
          <button 
            onClick={handleNext}
            className="bg-[#1FB58F] hover:bg-[#17a57e] text-white font-medium px-8 py-2 rounded-full transition"
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
};

export default BookingSummary;