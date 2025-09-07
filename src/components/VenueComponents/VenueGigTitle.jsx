// pages/VenueGigTitle.js
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import FilterDropdown from "./FilterDropDown"; // Replace with correct path
import ApplicationCard from "./ApplicationCard";

const filterOptions = {
  Role: ["Musician", "Guitarist", "Drummer", "Vocalist"],
  Genre: ["rock", "jazz", "blues", "pop", "classical"],
  Sort: ["Newest", "Oldest"],
  Status: ["pending", "accepted", "rejected"],
};

const VenueGigTitle = () => {
  const params = useParams();
  const [filters, setFilters] = useState({});
  const [gigData, setGigData] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get the gig ID from params
  const gigId = params?.id;

  useEffect(() => {
    const fetchGigData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/venue-gig-requests/get-by-gig/${gigId}`
        );
        
        setGigData(response.data.gig);
        
        // Map the applications data to the format expected by ApplicationCard
        if (response.data.data) {
          const formattedApplications = response.data.data.map(app => ({
            id: app.id,
            name: app.artist?.user_id || "Unknown Artist",
            role: `${app.artist?.genre || "Musician"} · ${response.data.gig?.genre || "Various"}`,
            rating: "4.8",
            note: app.message || "No message provided",
            image: app.artist?.profile_picture || "/images/avatar.png",
            title: app.title,
            status: app.status,
            artistId: app.artist_id,
            gigId: app.gig_id,
            createdAt: app.createdAt,
            artist: app.artist
          }));
          setApplications(formattedApplications);
        }
        
        setError(null);
      } catch (err) {
        console.error("Error fetching gig data:", err);
        setError(err.message || "Failed to fetch gig data");
        
        // Fallback to mock data for development
        const mockApplications = [
          {
            id: 1,
            name: "Ava Harper",
            role: "Guitarist · Rock, Blues",
            rating: "4.8",
            note: "Impressive demo, great stage presence.",
            image: "/images/avatar.png",
            status: "pending"
          },
          {
            id: 2,
            name: "John Doe", 
            role: "Drummer · Jazz",
            rating: "4.6",
            note: "Solid rhythm section experience.",
            image: "/images/avatar.png",
            status: "pending"
          },
        ];
        setApplications(mockApplications);
      } finally {
        setLoading(false);
      }
    };

    if (gigId) {
      fetchGigData();
    }
  }, [gigId]);

  const handleFilterChange = (updatedFilters) => {
    setFilters(updatedFilters);
    // You can filter the applications here if needed
  };

  // Handle status updates from ApplicationCard
  const handleStatusUpdate = (applicationId, newStatus) => {
    setApplications(prev => 
      prev.map(app => 
        app.id === applicationId 
          ? { ...app, status: newStatus }
          : app
      )
    );
  };

  // Filter applications based on selected filters
  const filteredApplications = applications.filter(app => {
    if (filters.Status && filters.Status.length > 0) {
      return filters.Status.includes(app.status || 'pending');
    }
    return true;
  });

  if (loading) {
    return (
      <main className="bg-[#f4f3ee] min-h-screen px-4 md:px-9 lg:px-12 py-10">
        <div className="max-w-5xl mx-auto flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading gig details...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error && !gigData) {
    return (
      <main className="bg-[#f4f3ee] min-h-screen px-4 md:px-9 lg:px-12 py-10">
        <div className="max-w-5xl mx-auto flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 mb-2">Error: {error}</p>
            <p className="text-gray-600">Using fallback data for development</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#f4f3ee] min-h-screen px-4 md:px-9 lg:px-12 py-10">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        {/* Header */}
        <div className="text-left">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
            {gigData?.gig_title || "Gig Title"}
          </h1>
          <p className="text-sm md:text-base text-gray-600 mt-1">
            Date: {gigData?.date_time ? new Date(gigData.date_time).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            }) : "July 20, 2024"} · 
            Location: {gigData?.location ? gigData.location.split(',').slice(0, 2).join(',') : "The Blue Note"} · 
            {applications.length} Applications
          </p>
          
          {/* Additional Gig Details */}
          <div className="mt-3 text-sm text-gray-600">
            <p><span className="font-medium">Genre:</span> {gigData?.genre || "Various"}</p>
            <p><span className="font-medium">Duration:</span> {gigData?.duration || "N/A"}</p>
            <p><span className="font-medium">Artist Type:</span> {gigData?.artist_type || "Any"}</p>
            <p><span className="font-medium">Payment:</span> {gigData?.payment_option || "TBD"} {gigData?.perks && `· Perks: ${gigData.perks.replace('_', ' ')}`}</p>
          </div>
        </div>

        {/* Filter Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-xl font-semibold text-gray-900">Applicants</h1>
          
          {/* Filter Dropdowns */}
          {/* <div className="flex gap-2 flex-wrap">
            <FilterDropdown
              label="Status"
              options={filterOptions.Status}
              selectedValues={filters.Status || []}
              onChange={(values) => setFilters(prev => ({ ...prev, Status: values }))}
            />
            <FilterDropdown
              label="Role"
              options={filterOptions.Role}
              selectedValues={filters.Role || []}
              onChange={(values) => setFilters(prev => ({ ...prev, Role: values }))}
            />
          </div> */}
        </div>

        {/* Applications List */}
        <div className="flex flex-col gap-4 mt-4">
          {filteredApplications.length > 0 ? (
            filteredApplications.map((applicant, idx) => (
              <ApplicationCard 
                key={applicant.id || idx} 
                applicant={applicant}
                onStatusUpdate={handleStatusUpdate}
              />
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">No applications found for this gig.</p>
            </div>
          )}
        </div>

        {/* Gig Description Section */}
        {gigData?.gig_description && (
          <div className="mt-6 p-4 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">About This Gig</h3>
            <p className="text-gray-700">{gigData.gig_description}</p>
            
            {gigData.artist_requirement && (
              <div className="mt-4">
                <h4 className="font-medium text-gray-900 mb-1">Requirements:</h4>
                <p className="text-sm text-gray-600">{gigData.artist_requirement}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default VenueGigTitle;