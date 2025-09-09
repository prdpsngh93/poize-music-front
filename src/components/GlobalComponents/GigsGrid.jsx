"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import FilterSidebar from "./FilterSidebar";
import GigsGridCard from "./GigsGridCard";
import Pagination from "./Pagination";
import CustomDropdown from "./CustomDropdown";
import { FaListUl, FaTh } from "react-icons/fa";
import NoGigsFound from "./NoGigsFound";
import { toast } from "sonner";

const GigsGrid = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [gigs, setGigs] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [viewMode, setViewMode] = useState("grid");
  const [loading, setLoading] = useState(false);

  // FILTER STATES - Updated structure
  const [filters, setFilters] = useState({
    dateFilter: "", // For 1w, 1m, 3m options
    artist: "",
    venue: "", // Will be dropdown: indoor/outdoor
    sortBy: "Default Sorting",
    showCount: 10,
  });

  // Updated fields layout
  const fieldsLayout = [
    {
      label: "Event Date",
      type: "select",
      value: filters.dateFilter,
      options: ["", "1w", "1m", "3m"], // Empty string for "All dates"
      optionLabels: [
        "All dates",
        "Last 1 week",
        "Last 1 month",
        "Last 3 months",
      ],
      onChange: (value) => handleFilterChange("dateFilter", value),
    },
    {
      label: "Event Title",
      type: "input",
      placeholder: "Search by event name",
      value: filters.artist,
      onChange: (value) => handleFilterChange("artist", value),
    },
    {
      label: "Venue Type",
      type: "select",
      value: filters.venue,
      options: ["", "indoor", "outdoor"], // Empty string for "All venues"
      optionLabels: ["All venues", "Indoor", "Outdoor"],
      onChange: (value) => handleFilterChange("venue", value),
    },
  ];

  const sortingOptions = [
    "Default Sorting",
    "Price: Low to High",
    "Price: High to Low",
    "Newest First",
    "Oldest First",
    "Title A-Z",
    "Title Z-A",
  ];
  const showOptions = [5, 10, 15, 20, 30, 50];

  // HANDLE FILTER CHANGES
  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
    setCurrentPage(1); // Reset to first page when filtering
  };

  // HANDLE SORTING CHANGE
  const handleSortingChange = (selectedOption) => {
    handleFilterChange("sortBy", selectedOption);
  };

  // HANDLE SHOW COUNT CHANGE
  const handleShowCountChange = (selectedCount) => {
    handleFilterChange("showCount", selectedCount);
  };

  // DEBOUNCED FETCH FUNCTION
  const fetchGigs = useCallback(async () => {
    try {
      setLoading(true);

      // Build query parameters
      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        limit: filters.showCount.toString(),
      });

      // Add filters to query - updated parameter mapping
      if (filters.artist.trim()) {
        queryParams.append("search", filters.artist);
      }
      if (filters.venue.trim()) {
        queryParams.append("venue", filters.venue);
      }
      if (filters.dateFilter.trim()) {
        queryParams.append("date", filters.dateFilter); // This will use event date filtering
      }

      // Add sorting parameter
      if (filters.sortBy && filters.sortBy !== "Default Sorting") {
        queryParams.append("sortBy", filters.sortBy);
      }

      console.log("Fetching with params:", queryParams.toString());

      const res = await axios.get(
        `https://poize-music-backend-kn0u.onrender.com/api/contributor-gigs?${queryParams}`
      );

      let gigsData = res.data.items || [];

      setGigs(gigsData);
      setTotalPages(res.data.totalPages || 1);
      setTotalItems(res.data.totalItems || 0);
    } catch (err) {
      console.error("Error fetching gigs:", err);
      toast.error("Failed to load events");
      setGigs([]);
      setTotalPages(1);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  }, [currentPage, filters]);

  // FETCH GIGS WITH FILTERS
  useEffect(() => {
    fetchGigs();
  }, [fetchGigs]);

  // HANDLE APPLY FILTERS (for FilterSidebar)
  const handleApplyFilters = () => {
    setCurrentPage(1);
    fetchGigs();
  };

  // HANDLE RESET FILTERS (for FilterSidebar)
  const handleResetFilters = () => {
    setFilters({
      dateFilter: "",
      artist: "",
      venue: "",
      sortBy: "Default Sorting",
      showCount: 10,
    });
    setCurrentPage(1);
  };

  // Navigate to event details
  const handleViewEvent = (gigId) => {
    console.log("gid-id",gigId)
    router.push(`/event-booking/${gigId}`);
  };

  // List View Component
  const GigsListView = ({ gigs }) => {
    return (
      <div className="space-y-4">
        {gigs.map((gig) => (
          <div
            key={gig.id}
            className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-300 p-4"
          >
            <div className="flex flex-col md:flex-row gap-4">
              {/* Image */}
              <div className="w-full md:w-48 h-32 flex-shrink-0">
                <img
                  src={gig.attachment_url || "/images/avatar.png"}
                  alt={gig.gig_title}
                  className="w-full h-full object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => handleViewEvent(gig.id)}
                />
              </div>

              {/* Content */}
              <div className="flex-1 space-y-2">
                <div className="flex justify-between items-start">
                  <h3
                    className="text-lg font-semibold text-[#1B3139] hover:text-[#1FB58F] cursor-pointer transition-colors"
                    onClick={() => handleViewEvent(gig.id)}
                  >
                    {gig.gig_title}
                  </h3>
                  <span className="text-lg font-bold text-[#1FB58F]">
                    ${gig.payment || "0"}
                  </span>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <span>📍 {gig.venue_type || "Venue TBD"}</span>
                  <span>
                    🗓️ {gig.date} {gig.time}
                  </span>
                  <span>🎤 {gig.artist?.name || "Artist TBD"}</span>
                  {gig.genre && <span>🎵 {gig.genre}</span>}
                </div>

                <p className="text-gray-700 text-sm line-clamp-2">
                  {gig.description || "No description available"}
                </p>

                <div className="flex justify-between items-center pt-2">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      gig.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {gig.status || "inactive"}
                  </span>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleViewEvent(gig.id)}
                      className="px-3 py-1 border border-[#1FB58F] text-[#1FB58F] rounded hover:bg-[#1FB58F] hover:text-white transition-colors text-sm"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleViewEvent(gig.id)}
                      className="px-3 py-1 bg-[#1FB58F] text-white rounded hover:bg-[#17a07b] transition-colors text-sm"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 pt-10">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* SIDEBAR FILTERS */}
        <div className="w-full lg:w-[300px]">
          <FilterSidebar
            title="Filter Events"
            fields={fieldsLayout}
            onApply={handleApplyFilters}
            onReset={handleResetFilters}
          />
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-[#1B3139]">
              Events Happening
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Discover and attend live performances
            </p>
          </div>

          {/* TOP FILTERS */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div className="text-sm text-gray-600">
              {loading
                ? "Loading..."
                : `Showing ${gigs.length} of ${totalItems} results`}
              {filters.sortBy !== "Default Sorting" && (
                <span className="ml-2 text-blue-600">
                  • Sorted by {filters.sortBy}
                </span>
              )}
            </div>
            <div className="flex flex-col md:flex-row gap-3">
              <CustomDropdown
                label="Show"
                options={showOptions}
                value={filters.showCount}
                onChange={handleShowCountChange}
              />
            </div>
          </div>

          {/* VIEW TOGGLE */}
          <div className="flex justify-between bg-[#1FB58F] rounded-lg px-6 py-4 text-white mb-8">
            <div className="font-semibold text-sm md:text-base flex gap-6">
              <button
                onClick={() => setViewMode("list")}
                className={`hover:underline transition-opacity ${
                  viewMode === "list" ? "opacity-100" : "opacity-70"
                }`}
              >
                Event List
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`hover:underline transition-opacity ${
                  viewMode === "grid" ? "opacity-100" : "opacity-70"
                }`}
              >
                Event Grid
              </button>
            </div>
            <div className="flex gap-3 text-xl">
              <button
                onClick={() => setViewMode("list")}
                className={`transition-colors ${
                  viewMode === "list"
                    ? "text-white"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                <FaListUl />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`transition-colors ${
                  viewMode === "grid"
                    ? "text-white"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                <FaTh />
              </button>
            </div>
          </div>

          {/* ACTIVE FILTERS DISPLAY */}
          {(filters.artist ||
            filters.venue ||
            filters.dateFilter ||
            filters.sortBy !== "Default Sorting" ||
            filters.showCount !== 10) && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg border">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm font-medium text-gray-700">
                  Active Filters:
                </span>
                {filters.artist && (
                  <span className="px-2 py-1 bg-blue-200 text-blue-800 rounded-full text-xs">
                    Search: {filters.artist}
                  </span>
                )}
                {filters.venue && (
                  <span className="px-2 py-1 bg-blue-200 text-blue-800 rounded-full text-xs">
                    Venue: {filters.venue}
                  </span>
                )}
                {filters.dateFilter && (
                  <span className="px-2 py-1 bg-blue-200 text-blue-800 rounded-full text-xs">
                    Date:{" "}
                    {filters.dateFilter === "1w"
                      ? "Last week"
                      : filters.dateFilter === "1m"
                      ? "Last month"
                      : "Last 3 months"}
                  </span>
                )}
                {filters.sortBy !== "Default Sorting" && (
                  <span className="px-2 py-1 bg-green-200 text-green-800 rounded-full text-xs">
                    Sort: {filters.sortBy}
                  </span>
                )}
                {filters.showCount !== 10 && (
                  <span className="px-2 py-1 bg-purple-200 text-purple-800 rounded-full text-xs">
                    Show: {filters.showCount}
                  </span>
                )}
                <button
                  onClick={handleResetFilters}
                  className="px-2 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full text-xs ml-2"
                >
                  Clear All
                </button>
              </div>
            </div>
          )}

          {/* LOADER */}
          {loading && (
            <div className="text-center py-10">
              <div className="w-8 h-8 border-4 border-[#1FB58F] border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-gray-600 mt-2">Loading events...</p>
            </div>
          )}

          {/* GIGS DISPLAY */}
          {!loading &&
            (gigs.length > 0 ? (
              viewMode === "grid" ? (
                // GRID VIEW
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {gigs.map((gig) => (
                    <GigsGridCard
                      key={gig.id}
                      gigId={gig.id}
                      image={gig.attachment_url || "/images/avatar.png"}
                      title={gig.gig_title}
                      location={gig.venue_type}
                      date={`${gig.date} ${gig.time}`}
                      artist={gig.artist?.name || "N/A"}
                      price={gig.payment}
                      description={gig.description}
                      status={gig.status}
                      genre={gig.genre}
                    />
                  ))}
                </div>
              ) : (
                // LIST VIEW
                <GigsListView gigs={gigs} />
              )
            ) : (
              <NoGigsFound />
            ))}

          {/* PAGINATION */}
          {!loading && gigs.length > 0 && totalPages > 1 && (
            <div className="mt-10">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GigsGrid;