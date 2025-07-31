"use client";
import React from "react";
import UpcomingGigs from "../MusicianDashboardComponents/UpcomingGigs";
import MusicianCard from "../VenueComponents/MusicianCard";
import GigCard from "../ContributorComponent/GigCard";

const MusicLoverDashboard = () => {
  const updates = [
    { image: "/images/upcominggig2.png", name: "New Album Release", role: "The Indie Rockers" },
    { image: "/images/upcominggig1.png", name: "Tour Announcement", role: "The Pop Sensations" },
    { image: "/images/upcominggig3.png", name: "Live Stream Event", role: "The Electronic Beats" },
    { image: "/images/upcominggig2.png", name: "Behind the Scenes", role: "The Acoustic Duo" },
    { image: "/images/upcominggig1.png", name: "Live Stream Event", role: "The Electronic Beats" },
  ];

  const venues = [
    { image: "/images/upcominggig3.png", name: "The Underground", role: "Live music venue" },
    { image: "/images/upcominggig2.png", name: "The Blue Note", role: "Jazz Club" },
    { image: "/images/upcominggig1.png", name: "The Garage", role: "Local bands showcase" },
    { image: "/images/upcominggig3.png", name: "Central Park", role: "Outdoor music events" },
    { image: "/images/upcominggig2.png", name: "The Blue Note", role: "Outdoor music events" },
    { image: "/images/upcominggig1.png", name: "The Garage", role: "Local bands showcase" },
  ];

  const notifications = [
    { image: "/images/upcominggig1.png", title: "The Indie Rockers", message: "New album just dropped!" },
    { image: "/images/upcominggig1.png", title: "The Pop Sensations", message: "Live concert confirmed!" },
  ];

  return (
    <main className="bg-[#f4f3ee] min-h-screen px-4 md:px-9 lg:px-12 py-10">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        {/* Heading */}
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Welcome back, Sarah!</h1>
          <p className="text-sm md:text-base text-gray-600 mt-1">
            Discover new music events and artists tailored to your taste.
          </p>
        </div>

        {/* Recommended Gigs */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recommended Gigs</h2>
          <UpcomingGigs />
        </div>

        {/* Updates from Artists */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Updates from Artists You Follow</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {updates.map((item, idx) => (
              <MusicianCard key={idx} image={item.image} name={item.name} role={item.role} />
            ))}
          </div>
        </div>

        {/* Upcoming Bookings */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Upcoming Bookings</h2>
          <GigCard
            title="Indie Rock Night"
            subtitle="The Underground, Fri, 8 PM"
            image="/images/upcominggig1.png"
            text="View Booking"
          />
        </div>

        {/* Nearby Venues */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Nearby Venues</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {venues.map((item, idx) => (
              <MusicianCard key={idx} image={item.image} name={item.name} role={item.role} />
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Notifications</h2>
          <div className="flex flex-col gap-4">
            {notifications.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-200"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-medium text-sm text-[#121417]">{item.title}</h4>
                  <p className="text-xs text-gray-500">{item.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default MusicLoverDashboard;
