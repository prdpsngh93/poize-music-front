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
  const [artistUpdates, setArtistUpdates] = useState([]);
  const [updatesLoading, setUpdatesLoading] = useState(false);

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

  // Fetch artist updates from collaboration API
  useEffect(() => {
    const fetchArtistUpdates = async () => {
      const token = Cookies.get("token");
      
      setUpdatesLoading(true);
      try {
        const artistId = Cookies.get("favourite_artist"); 
        
        const headers = {
          'Content-Type': 'application/json',
        };
        
        // Add Authorization header if token exists
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
        
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/collaboration?artist_id=${artistId}`,
          {
            headers: headers,
          }
        );
        
        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
        const data = await res.json();

        // Transform API data to match the component structure
        const transformedUpdates = data?.data?.map((collaboration) => ({
          image: collaboration.media || "/images/upcominggig1.png", // Use media field or fallback
          name: collaboration.project_title || "New Project",
          role: collaboration.User?.name || "Unknown Artist",
          genre: collaboration.genre,
          location: collaboration.location,
          description: collaboration.project_description,
          collaborationFormat: collaboration.collaboration_format,
        })) || [];

        setArtistUpdates(transformedUpdates);
      } catch (err) {
        console.error("Error fetching artist updates:", err);
        // Fallback to static data if API fails
        setArtistUpdates([
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
        ]);
      } finally {
        setUpdatesLoading(false);
      }
    };

    fetchArtistUpdates();
  }, []);

  // Fetch upcoming booking from API
  useEffect(() => {
    const fetchUpcomingBooking = async () => {
      const musicLoverId = Cookies.get("userId");
      const token = Cookies.get("token");
      
      if (!musicLoverId || !token) return;

      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/contributor-gigs-requests?music_lover_id=${musicLoverId}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
        const data = await res.json();

        // Get the most recent upcoming booking (first one from the API)
        const bookings = data?.data || [];
        if (bookings.length > 0) {
          const booking = bookings[0]; // Get the first booking
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
          {updatesLoading ? (
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <p className="text-gray-500">Loading artist updates...</p>
            </div>
          ) : artistUpdates.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {artistUpdates.map((item, idx) => (
                <MusicianCard
                  key={idx}
                  image={item.image}
                  name={item.name}
                  role={item.role}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="text-center py-8">
                <p className="text-gray-500">No artist updates available at the moment.</p>
              </div>
            </div>
          )}
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