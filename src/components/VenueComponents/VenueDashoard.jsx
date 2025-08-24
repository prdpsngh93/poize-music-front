"use client"
import React, { useState, useEffect } from "react";
import StatsDashboard from "./StatsDashboard";
import GigCard from "../ContributorComponent/GigCard";
import InterestedArtists from "./InterestedArtists";
import EngagementOverview from "./EngagementOverview";
import QuickActionsAndNotifications from "./QuickActionsAndNotifications";
import Cookies from "js-cookie";

const VenueDashboard = () => {
  const userName = Cookies.get("userName");
  const venueId = Cookies.get("id");
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/venue-gigs/latest?venueId=${venueId}`
        );
        const data = await response.json();
        setDashboardData(data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    if (venueId) {
      fetchDashboardData();
    }
  }, [venueId]);

  // Format date and time for display
  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return "Date TBD";
    const date = new Date(dateTimeString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Format genre for display
  const formatGenre = (genre) => {
    if (!genre) return "Mixed Genre";
    return genre.charAt(0).toUpperCase() + genre.slice(1);
  };

  console.log("dashboardData",dashboardData)

  return (
    <main className="bg-[#f4f3ee] min-h-screen px-4 md:px-9 lg:px-12 py-10">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        {/* Heading */}
        <div className="text-left">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
            Welcome back, {userName}!
          </h1>
          <p className="text-sm md:text-base text-gray-600 mt-1">
            Manage your gigs and connect with talented artists.
          </p>
        </div>
        
        <StatsDashboard dashboardData={dashboardData} />
        
        <div className="space-y-10">
          {/* Latest Gig Section */}
          {dashboardData?.latestGig && (
            <div>
              <h2 className="text-lg md:text-xl font-semibold text-[#121417] mb-2">
                Upcoming Gig
              </h2>
              <GigCard
                heading={formatGenre(dashboardData.latestGig.genre)}
                title={dashboardData.latestGig.gig_title || "Untitled Gig"}
                subtitle={`${formatDateTime(dashboardData.latestGig.date_time)} • ${dashboardData.latestGig.duration || "Duration TBD"}`}
                text="View Details"
                image={dashboardData.latestGig.gig_image || "/images/live-band.png"}
                description={dashboardData.latestGig.gig_description}
              />
            </div>
          )}

          {/* Latest Booking Request Section */}
          {dashboardData?.latestRequest && (
            <div>
              <h2 className="text-lg md:text-xl font-semibold text-[#121417] mb-2">
                Latest Booking Request
              </h2>
              <GigCard
              linkTo={`/venue-gig-title/${dashboardData.latestRequest.gig_id}`}
                heading="New Request"
                title={dashboardData.latestRequest.title || "Booking Request"}
                subtitle={`${dashboardData.latestRequest.message} • ${formatDateTime(dashboardData.latestRequest.createdAt)}`}
                text="View Request"
                image={dashboardData.latestRequest.gig_image ||"/images/live-band.png"}
              />
            </div>
          )}
        </div>

        <InterestedArtists artists={dashboardData?.artists || []} />
        <EngagementOverview dashboardData={dashboardData} />
        {/* <QuickActionsAndNotifications /> */}
      </div>
    </main>
  );
};

export default VenueDashboard;