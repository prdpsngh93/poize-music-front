"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Cards from "@/components/FindgigsComponents/Cards";
import Dropdowns from "@/components/FindgigsComponents/Dropdowns";
import FindGigsSearchBar from "@/components/FindgigsComponents/FindGigsSearchBar";
import NoGigsFound from "@/components/FindgigsComponents/NogigsFound";

const FindGigsPage = () => {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const limit = 5;
  const searchTimeoutRef = useRef(null);

  // Memoized function to fetch gigs - removed dependencies that cause infinite loops
  const fetchGigs = useCallback(async (params = {}) => {
    const {
      search = searchTerm,
      filterValues = filters,
      pageValue = page
    } = params;

    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: String(pageValue),
        limit: String(limit),
        ...(search && { search }),
        ...(filterValues.genre && { genre: filterValues.genre }),
        ...(filterValues.date && { date: filterValues.date }),
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/venue-gigs?${queryParams}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setGigs(data?.items || []);
      setTotalPages(data?.totalPages || 1);
    } catch (error) {
      console.error("Error fetching gigs:", error);
      setGigs([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, []); // Remove dependencies to prevent infinite loops

  // Initial load effect
  useEffect(() => {
    fetchGigs();
  }, []); // Only run on mount

  // Handle search with debounce
  const handleSearch = useCallback((value) => {
    setSearchTerm(value);
    setPage(1);
    
    // Clear existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    // Debounced API call
    searchTimeoutRef.current = setTimeout(() => {
      fetchGigs({ search: value, pageValue: 1 });
    }, 300);
  }, [fetchGigs]);

  // Handle filter changes
  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
    setPage(1);
    
    // Clear any pending search
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    // Immediate API call for filters
    fetchGigs({ filterValues: newFilters, pageValue: 1 });
  }, [fetchGigs]);

  // Handle pagination
  const handlePageChange = useCallback((newPage) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
      setPage(newPage);
      
      // Clear any pending search
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      
      // Immediate API call for new page
      fetchGigs({ pageValue: newPage });
    }
  }, [fetchGigs, totalPages, page]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  // Render pagination buttons
  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (page > 3) pages.push('...');
      
      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);
      
      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPages) pages.push(i);
      }
      
      if (page < totalPages - 2) pages.push('...');
      if (totalPages > 1) pages.push(totalPages);
    }

    return (
      <div className="flex justify-center items-center gap-2 mt-6">
        <button
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
        >
          Prev
        </button>

        {pages.map((pageNum, idx) => {
          if (pageNum === '...') {
            return <span key={`ellipsis-${idx}`} className="px-2 text-gray-500">...</span>;
          }
          
          return (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`px-3 py-1 border rounded transition-colors ${
                page === pageNum
                  ? "bg-[#1FB58F] text-white border-[#1FB58F]"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          disabled={page === totalPages}
          onClick={() => handlePageChange(page + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <main className="bg-[#f4f3ee] min-h-screen px-4 md:px-9 lg:px-12 py-10">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        {/* Header */}
        <div className="text-left">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
            Find Gigs
          </h1>
          <p className="text-sm md:text-base text-gray-600 mt-1">
            Explore opportunities to perform and connect with audiences.
          </p>
        </div>

        {/* Search */}
        <FindGigsSearchBar
          placeholder="Find gigs"
          onSearch={handleSearch}
        />

        {/* Filters */}
        <Dropdowns
          onFilterChange={handleFilterChange}
          filters={filters}
        />

        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1FB58F]"></div>
            <p className="text-gray-500 ml-2">Loading gigs...</p>
          </div>
        ) : gigs.length > 0 ? (
          <>
            <Cards gigs={gigs} />
            {renderPagination()}
          </>
        ) : (
          <NoGigsFound
            heading="No gigs found"
            para="Try adjusting your search filters or check back later for new opportunities."
          />
        )}
      </div>
    </main>
  );
};

export default FindGigsPage;