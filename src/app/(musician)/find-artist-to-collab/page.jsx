"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import FindGigsSearchBar from "@/components/FindgigsComponents/FindGigsSearchBar";
import Dropdowns from "@/components/FindgigsComponents/Dropdowns";
import FindArtistsCards from "@/components/MusicianPageComponents/FindArtistsCards";
import NoGigsFound from "@/components/FindgigsComponents/NogigsFound";
import { authAPI } from "../../../../lib/api";

const FindArtistsPage = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    genre: "",
    location: "",
    date: ""
  });

  // Fetch all artists on component mount
  useEffect(() => {
    fetchArtists();
  }, []);

  const fetchArtists = async (query = "") => {
    try {
      setLoading(true);
      setError("");
      
      const response = await authAPI.getArtist(query);
      
      // Transform the data to match the expected format
      const transformedArtists = response.data.map((item) => ({
        id: item.User.id,
        name: item.User.name,
        email: item.User.email,
        genre: item.genre || "Not specified",
        profile_picture: item?.profile_picture || "/images/avatar.png",
        location: item.location || "Not specified",
        bio: item.bio || "",
        // Add any other fields you need
      }));
      
      setArtists(transformedArtists);
    } catch (err) {
      console.error("Error fetching artists:", err);
      setError("Failed to fetch artists. Please try again.");
      setArtists([]); // Reset artists on error
    } finally {
      setLoading(false);
    }
  };

  // Memoized filtered artists for better performance
  const filteredArtists = useMemo(() => {
    let filtered = [...artists];

    // Apply search query filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((artist) =>
        artist.name.toLowerCase().includes(query) ||
        artist.genre.toLowerCase().includes(query) ||
        artist.email.toLowerCase().includes(query) ||
        (artist.bio && artist.bio.toLowerCase().includes(query))
      );
    }

    // Apply genre filter
    if (filters.genre) {
      filtered = filtered.filter((artist) =>
        artist.genre.toLowerCase().includes(filters.genre.toLowerCase())
      );
    }

    // Apply location filter
    if (filters.location) {
      filtered = filtered.filter((artist) =>
        artist.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    return filtered;
  }, [artists, searchQuery, filters]);

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  const handleRetry = () => {
    fetchArtists(searchQuery);
  };

  // Loading state
  if (loading) {
    return (
      <main className="bg-[#f4f3ee] min-h-screen px-4 md:px-9 lg:px-12 py-10">
        <div className="max-w-5xl mx-auto flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1FB58F] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading artists...</p>
          </div>
        </div>
      </main>
    );
  }

  // Error state
  if (error && artists.length === 0) {
    return (
      <main className="bg-[#f4f3ee] min-h-screen px-4 md:px-9 lg:px-12 py-10">
        <div className="max-w-5xl mx-auto flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <div className="text-red-500 mb-4">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={handleRetry}
              className="px-4 py-2 bg-[#1FB58F] text-white rounded-lg hover:bg-[#1AA87A] transition-colors"
            >
              Try Again
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
            Find Artists to Collaborate
          </h1>
          <p className="text-gray-600 mt-1">
            Discover talented musicians for your next project
          </p>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4">
          <FindGigsSearchBar 
            placeholder="Search by name, genre, or email..." 
            onSearch={handleSearch}
          />
          
          <Dropdowns 
            onFilterChange={handleFilterChange}
            filters={filters}
          />
        </div>

        {/* Results */}
        {artists.length === 0 && !loading ? (
          <NoGigsFound
            heading="No artists available"
            para="There are currently no artists in our database. Please check back later."
          />
        ) : filteredArtists.length > 0 ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Found {filteredArtists.length} artist{filteredArtists.length !== 1 ? 's' : ''}
                {(searchQuery || filters.genre || filters.location) && (
                  <span className="text-[#1FB58F] ml-1">
                    matching your criteria
                  </span>
                )}
              </div>
              
              {/* Clear all filters button */}
              {(searchQuery || filters.genre || filters.location) && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setFilters({ genre: "", location: "", date: "" });
                  }}
                  className="text-sm text-gray-500 hover:text-red-500 underline transition-colors"
                >
                  Clear all filters
                </button>
              )}
            </div>
            
            <FindArtistsCards artists={filteredArtists} />
          </div>
        ) : (
          <NoGigsFound
            heading="No artists found"
            para="Try adjusting your search or filters to find artists that match your criteria."
          />
        )}

        {/* Show total artists count */}
        {artists.length > 0 && (
          <div className="text-center text-xs text-gray-500 mt-8">
            Showing results from {artists.length} total artist{artists.length !== 1 ? 's' : ''}
          </div>
        )}
      </div>
    </main>
  );
};

export default FindArtistsPage;