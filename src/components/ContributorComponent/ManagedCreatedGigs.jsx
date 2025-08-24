"use client"
import React, { useEffect, useState, useCallback } from 'react'
import FindGigsSearchBar from '../FindgigsComponents/FindGigsSearchBar'
import ContributorGigList from './ContributorGigList'
import ContributorDropdowns from './ContributorDropdown'
import Cookies from 'js-cookie'
import BackButton from '../common/BackButton'
import { useRouter } from "next/navigation";

const ManagedCreatedGigs = () => {
  const [gigs, setGigs] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ date: "", venue: "", status: "" });
  const router = useRouter();

  const filterOptions = {
    date: [
      { label: "This Week", value: "1w" },
      { label: "This Month", value: "1m" },
      { label: "Last 3 Months", value: "3m" }
    ],
    venue: ["indoor", "outdoor"],
    status: ["draft", "active"],
  };

  // Memoize fetchData to prevent unnecessary re-renders
  const fetchData = useCallback(async (page = null, search = null, filterParams = null) => {
    const id = Cookies.get("id");
    if (!id) {
      console.error("No userId found in cookies");
      return;
    }

    // Use parameters if provided, otherwise fall back to state
    const pageToUse = page !== null ? page : currentPage;
    const searchToUse = search !== null ? search : searchTerm;
    const filtersToUse = filterParams !== null ? filterParams : filters;

    setLoading(true);
    try {
      const query = new URLSearchParams({
        page: pageToUse.toString(),
        limit: pageSize.toString(),
        search: searchToUse,
        ...(filtersToUse.date && { date: filtersToUse.date }),
        ...(filtersToUse.venue && { venue: filtersToUse.venue }),
        ...(filtersToUse.status && { status: filtersToUse.status }),
      });

      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/contributor-gigs/contributor/${id}?${query}`;
      console.log('Fetching URL:', url, 'Page:', pageToUse); // Debug log
      
      const res = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

      const data = await res.json();
      console.log('API Response for page', pageToUse, ':', data); // Debug log
      setGigs(data);
    } catch (error) {
      console.error("Error fetching gigs:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize, searchTerm, filters]);

  useEffect(() => {
    fetchData(); // Call without parameters to use current state
  }, [currentPage, pageSize, searchTerm, filters]);

  // Handle page change - this is the key fix
  const handlePageChange = useCallback((newPage) => {
    console.log('Changing to page:', newPage); // Debug log
    setCurrentPage(newPage);
    // Immediately fetch data for the new page
    fetchData(newPage);
  }, [fetchData]);

  // Reset Filters function
  const handleResetFilters = () => {
    setFilters({ date: "", venue: "", status: "" });
    setCurrentPage(1);
    setSearchTerm("");
  };

  // Handle search with page reset
  const handleSearch = (value) => {
    setCurrentPage(1);
    setSearchTerm(value);
  };

  // Handle filter change with page reset
  const handleFilterChange = (newFilters) => {
    setCurrentPage(1);
    setFilters(newFilters);
  };

  return (
    <main className="bg-[#f4f3ee] min-h-screen px-4 md:px-9 lg:px-12 py-10">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        <div className='flex gap-1 items-center'>
          <BackButton route={'/create-gig'} />
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
            Manage Created Gigs
          </h1>
        </div>

        {/* Search */}
        <FindGigsSearchBar
          placeholder="Search gigs..."
          onSearch={handleSearch}
        />

        {/* Dropdown Filters + Reset Button */}
        <div className="flex flex-wrap items-center gap-3">
          <ContributorDropdowns
            filters={filterOptions}
            onFilterChange={handleFilterChange}
          />
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium text-gray-700"
          >
            Reset Filters
          </button>
        </div>

        {/* Debug Info - Remove this in production */}

        {/* Loader or Data */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#1FB58F] border-solid"></div>
          </div>
        ) : (
          <ContributorGigList
            data={gigs}
            currentPage={currentPage} // Pass current page explicitly
            fetchData={fetchData}
            onPageChange={handlePageChange} // Use the memoized handler
          />
        )}
      </div>
    </main>
  )
}

export default ManagedCreatedGigs