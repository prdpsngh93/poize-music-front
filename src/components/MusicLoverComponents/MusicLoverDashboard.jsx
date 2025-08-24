"use client";
import React, { useState, useEffect } from "react";
import UpcomingGigs from "../MusicianDashboardComponents/UpcomingGigs";
import MusicianCard from "../VenueComponents/MusicianCard";
import GigCard from "../ContributorComponent/GigCard";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import BackButton from "../GlobalComponents/BackButton";

const MusicLoverDashboard = () => {
  const router = useRouter();
  const [upcomingBooking, setUpcomingBooking] = useState(null);
  const [loading, setLoading] = useState(false);


  const updates = [
    {
      image: "/images/upcominggig2.png",
      name: "New Album Release",
      role: "The Indie Rockers",
    },
    {
      image: "/images/upcominggig1.png",
      name: "Tour Announcement",
      role: "The Pop Sensations",
    },
    {
      image: "/images/upcominggig3.png",
      name: "Live Stream Event",
      role: "The Electronic Beats",
    },
    {
      image: "/images/upcominggig2.png",
      name: "Behind the Scenes",
      role: "The Acoustic Duo",
    },
    {
      image: "/images/upcominggig1.png",
      name: "Live Stream Event",
      role: "The Electronic Beats",
    },
  ];

  const userName = Cookies.get("userName");

  // Format date to readable string
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  // Format time from date string
  const formatTime = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Fetch upcoming booking from API
  useEffect(() => {
    const fetchUpcomingBooking = async () => {
      const musicLoverId = Cookies.get("userId");
      if (!musicLoverId) return;

      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/contributor-gigs-requests?music_lover_id=${musicLoverId}`
        );
        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
        const data = await res.json();

        console.log("data>>>",data)

        // Get the most recent upcoming booking (first one from the API)
        const bookings = data?.data || [];
        if (bookings.length > 0) {

          const booking = bookings[0]; // Get the first booking
          console.log("booking>>",booking)
          setUpcomingBooking({
            id: booking.gig_id,
            title: booking.gig?.gig_title || "Untitled Event",
            venue: booking.gig?.venue_type || "Unknown Venue",
            date: booking.gig?.date || "",
            image: booking.gig?.attachment_url || "/images/upcominggig1.png",
            genre: booking.gig?.genre || "",
            payment: booking.gig?.payment || "0",
          });
        }
      } catch (err) {
        console.error("Error fetching upcoming booking:", err);
        setUpcomingBooking(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingBooking();
  }, []);

  return (
    <main className="bg-[#f4f3ee] min-h-screen px-4 md:px-9 lg:px-12 py-10">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        <BackButton/>
        {/* Heading */}
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
            Welcome back, {userName ? userName : "Sarah!"}{" "}
          </h1>
          <p className="text-sm md:text-base text-gray-600 mt-1">
            Discover new music events and artists tailored to your taste.
          </p>
        </div>

        {/* Recommended Gigs */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Recommended Gigs
          </h2>
          <UpcomingGigs />
        </div>

        {/* Updates from Artists */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Updates from Artists You Follow
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {updates.map((item, idx) => (
              <MusicianCard
                key={idx}
                image={item.image}
                name={item.name}
                role={item.role}
              />
            ))}
          </div>
        </div>

        {/* Upcoming Bookings */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Your Upcoming Bookings
          </h2>
          {loading ? (
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <p className="text-gray-500">Loading your upcoming bookings...</p>
            </div>
          ) : upcomingBooking ? (
            <GigCard
              title={upcomingBooking.title}
              subtitle={`${upcomingBooking.venue}, ${formatDate(upcomingBooking.date)}, ${formatTime(upcomingBooking.date)}`}
              image={upcomingBooking.image}
              text="View Booking"
              onClick={() => router.push(`/music-lover-gigs-detail/${upcomingBooking.id}`)}
            />
          ) : (
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No upcoming bookings found.</p>
                <button
                  onClick={() => router.push("/music-lover-browse-gigs")}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition cursor-pointer"
                >
                  Browse Gigs
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Browse Gigs Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => router.push("/music-lover-browse-gigs")}
            className="px-6 py-3 bg-green-600 cursor-pointer text-white rounded-lg shadow-md hover:bg-green-700 font-medium  transition"
          >
            Browse Gigs
          </button>
        </div>
      </div>
    </main>
  );
};

export default MusicLoverDashboard;