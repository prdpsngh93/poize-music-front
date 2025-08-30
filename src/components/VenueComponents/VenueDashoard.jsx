"use client"
import React, { useState, useEffect } from "react";
import StatsDashboard from "./StatsDashboard";
import GigCard from "../ContributorComponent/GigCard";
import InterestedArtists from "./InterestedArtists";
import EngagementOverview from "./EngagementOverview";
import QuickActionsAndNotifications from "./QuickActionsAndNotifications";
import Cookies from "js-cookie";
import { toast } from "sonner";

// Loading Component
const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center py-12">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1FB58F]"></div>
    <p className="text-gray-600 mt-4">Loading your dashboard...</p>
  </div>
);

// Skeleton Loading Components
const SkeletonCard = () => (
  <div className="animate-pulse">
    <div className="flex flex-col md:flex-row justify-between items-center w-full border-b border-gray-200 py-4 md:py-6 gap-4 md:gap-6">
      <div className="flex-1 w-full md:w-auto">
        <div className="h-5 bg-gray-300 rounded mb-2 w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded mb-3 w-full"></div>
        <div className="h-8 bg-gray-300 rounded w-24"></div>
      </div>
      <div className="w-full md:w-[50%] h-48 md:h-32 bg-gray-300 rounded-xl"></div>
    </div>
  </div>
);

const SkeletonStats = () => (
  <div className="animate-pulse">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-white p-4 rounded-lg">
          <div className="h-8 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-20"></div>
        </div>
      ))}
    </div>
  </div>
);

const VenueDashboard = () => {
  const userName = Cookies.get("userName");
  const venueId = Cookies.get("id");
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!venueId) {
        setError("Venue ID not found");
        setIsLoading(false);
        toast.error("Unable to load dashboard: Venue ID not found");
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        
        // Show loading toast
        const loadingToast = toast.loading("Loading your dashboard data...");
        
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/venue-gigs/latest?venueId=${venueId}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        setDashboardData(data);
        
        // Dismiss loading toast and show success
        toast.dismiss(loadingToast);
      
        
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setError(error.message);
        
        toast.error("Failed to load dashboard", {
          description: "Please check your connection and try again.",
          action: {
            label: "Retry",
            onClick: () => fetchDashboardData()
          }
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
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

  // Error State
  if (error && !isLoading) {
    return (
      <main className="bg-[#f4f3ee] min-h-screen px-4 md:px-9 lg:px-12 py-10">
        <div className="max-w-5xl mx-auto flex flex-col items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Oops! Something went wrong
            </h2>
            <p className="text-gray-600 mb-6">
              We couldn't load your dashboard. Please try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-[#1FB58F] text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#f4f3ee] min-h-screen px-4 md:px-9 lg:px-12 py-10">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        {/* Heading */}
        <div className="text-left">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
            Welcome back, {userName || "User"}!
          </h1>
          <p className="text-sm md:text-base text-gray-600 mt-1">
            Manage your gigs and connect with talented artists.
          </p>
        </div>
        
        {/* Loading State */}
        {isLoading ? (
          <div className="space-y-6">
            <SkeletonStats />
            <div className="space-y-10">
              <div>
                <div className="h-6 bg-gray-300 rounded w-40 mb-4 animate-pulse"></div>
                <SkeletonCard />
              </div>
              <div>
                <div className="h-6 bg-gray-300 rounded w-48 mb-4 animate-pulse"></div>
                <SkeletonCard />
              </div>
            </div>
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <StatsDashboard dashboardData={dashboardData} />
            
            <div className="space-y-10">
              {/* Latest Gig Section */}
              {dashboardData?.latestGig ? (
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
              ) : (
                <div className="text-center py-8">
                  <div className="text-gray-400 text-4xl mb-4">🎵</div>
                  <p className="text-gray-600">No upcoming gigs at the moment</p>
                  <p className="text-sm text-gray-500">Create your first gig to get started!</p>
                </div>
              )}

              {/* Latest Booking Request Section */}
              {dashboardData?.latestRequest ? (
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
                    image={dashboardData.latestRequest.gig_image || "/images/live-band.png"}
                  />
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-gray-400 text-4xl mb-4">📩</div>
                  <p className="text-gray-600">No recent booking requests</p>
                  <p className="text-sm text-gray-500">New requests will appear here</p>
                </div>
              )}
            </div>

            <InterestedArtists artists={dashboardData?.artists || []} />
            <EngagementOverview dashboardData={dashboardData} />
            <QuickActionsAndNotifications />
          </>
        )}
      </div>
    </main>
  );
};

export default VenueDashboard;