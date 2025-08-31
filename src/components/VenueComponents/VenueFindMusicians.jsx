'use client';
import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation'; // Add this import
import FindGigsSearchBar from '../FindgigsComponents/FindGigsSearchBar';
import MusicianCard from './MusicianCard';
import FilterDropdown from './FilterDropDown';
import { authAPI } from '../../../lib/api';
import BackButton from '../common/BackButton';
import Cookies from 'js-cookie';

const filters = {
  Genre: ['Rock', 'Pop', 'Metal', 'Jazz', 'Blues'],
  Skills: ['Guitarist', 'Vocalist', 'Drummer', 'Keyboardist', 'Bassist'],
  Location: ['New York', 'Los Angeles', 'Austin', 'Chicago', 'Seattle'],
  Experience: ['<1 Year', '1-3 Years', '3-5 Years', '5+ Years'],
  Availability: ['Available', 'Unavailable'],
  Rating: ['5 Stars', '4 Stars', '3 Stars', '2 Stars', '1 Star'],
};

const VenueFindMusicians = () => {
  const router = useRouter(); // Add router hook
  const [musicians, setMusicians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({});
  const [selectedArtist, setSelectedArtist] = useState(null); // Add this state
  
  // Server-side pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  
  // Debounce state for search
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  
  // Ref to track if component is mounted to prevent state updates after unmount
  const isMountedRef = useRef(true);
  const abortControllerRef = useRef(null);

  const token = Cookies.get("token")

  // Add the handleMessageClick function
  const handleMessageClick = (artist) => {
    if(token){

    setSelectedArtist(artist);
    try {
      // Note: localStorage is not supported in Claude artifacts, so this might not work
      // In a real environment, this would work fine
      localStorage.setItem("selectedArtist", JSON.stringify(artist));
      router.push("/messaging-inbox3-4"); 
    } catch (e) {
      console.error("Error saving artist data:", e);
      // Still navigate even if localStorage fails
      router.push("/messaging-inbox3-4");
    }
  }
    else {
router.push("/login")
    }

  };

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Reset to first page when search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchQuery, selectedFilters]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // Fetch musicians with server-side pagination
  const fetchMusicians = useCallback(async (page = 1, query = '', filters = {}) => {
    try {
      // Cancel any existing request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create new abort controller for this request
      abortControllerRef.current = new AbortController();
      
      if (!isMountedRef.current) return;

      setLoading(true);
      setError('');
      
      // Prepare API parameters
      const params = {
        page,
        limit: itemsPerPage,
        signal: abortControllerRef.current.signal
      };

      // Add search query if exists
      if (query.trim()) {
        params.search = query.trim();
      }

      // Add filters if they exist
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          params[key.toLowerCase()] = value;
        }
      });

      const response = await authAPI.getArtist(params);

      // Check if component is still mounted before updating state
      if (!isMountedRef.current) return;
      
      // Transform the data to match your existing musician format
      const transformedMusicians = response.data.map((item, index) => ({
        id: item.User?.id || item.id || `musician-${index}`,
        name: item.User?.name || item.name || 'Unknown Artist',
        role: item.genre || item.skills || item.role || 'Musician',
        genre: item.genre || 'Not specified',
        location: item.location || 'Not specified',
        experience: item.experience || 'Not specified',
        availability: item.availability || 'Available',
        rating: item.rating || '3 Stars',
        image: item.profile_picture || item.User?.profile_picture || '/images/avatar.png',
        featured: item.featured || false,
        bio: item.bio,
        gigsCompleted: item?.gigs_completed || 0,
        // Include the full original data for the connect functionality
        originalData: item
      }));
      
      setMusicians(transformedMusicians);
      
      // Update pagination info from server response
      if (response.pagination) {
        setTotalItems(response.pagination.total);
        setTotalPages(response.pagination.pages);
      } else {
        // Fallback if pagination info not provided
        setTotalItems(transformedMusicians.length);
        setTotalPages(1);
      }

    } catch (err) {
      // Don't handle abort errors
      if (err.name === 'AbortError') return;
      
      console.error('Error fetching musicians:', err);
      
      if (!isMountedRef.current) return;
      
      setError('Failed to fetch musicians. Please try again.');
      setMusicians([]);
      setTotalItems(0);
      setTotalPages(0);
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }, [itemsPerPage]);

  // Fetch musicians when page, search, or filters change
  useEffect(() => {
    fetchMusicians(currentPage, debouncedSearchQuery, selectedFilters);
  }, [currentPage, debouncedSearchQuery, selectedFilters, fetchMusicians]);

  const handleFilterChange = useCallback((updatedFilters) => {
    setSelectedFilters(updatedFilters);
    // currentPage will reset to 1 via useEffect
  }, []);

  const handleSearchChange = useCallback((value) => {
    setSearchQuery(value);
    // currentPage will reset to 1 via useEffect
  }, []);

  const handleRetry = useCallback(() => {
    fetchMusicians(currentPage, debouncedSearchQuery, selectedFilters);
  }, [fetchMusicians, currentPage, debouncedSearchQuery, selectedFilters]);

  // Featured musicians (only from current page)
  const featuredMusicians = useMemo(() => 
    musicians.filter(m => m.featured), 
    [musicians]
  );

  // Pagination handlers
  const goToPage = useCallback((page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll to top when page changes
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [totalPages]);

  const nextPage = useCallback(() => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  }, [currentPage, totalPages, goToPage]);

  const prevPage = useCallback(() => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  }, [currentPage, goToPage]);

  // Generate page numbers for pagination
  const getPageNumbers = useCallback(() => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const halfVisible = Math.floor(maxVisiblePages / 2);
      let startPage = Math.max(1, currentPage - halfVisible);
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      
      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  }, [currentPage, totalPages]);

  // Handle items per page change
  const handleItemsPerPageChange = useCallback((newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page
  }, []);

  // Clear all filters function
  const clearAllFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedFilters({});
    setCurrentPage(1);
  }, []);

  // Calculate display indices
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

  // Loading state
  if (loading && musicians.length === 0) {
    return (
      <main className="bg-[#f4f3ee] min-h-screen px-4 md:px-9 lg:px-12 py-10">
        <div className="max-w-5xl mx-auto flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1FB58F] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading musicians...</p>
          </div>
        </div>
      </main>
    );
  }

  // Error state
  if (error && musicians.length === 0) {
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

  const hasActiveFilters = searchQuery || Object.values(selectedFilters).some(v => v);

  return (
    <main className="bg-[#f4f3ee] min-h-screen px-4 md:px-9 lg:px-12 py-10">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        <div className="text-left">
          <div className='flex  items-center gap-2' ><BackButton route={'/venue-dashboard'} /><h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Find Musicians!</h1></div>
          <p className="text-sm md:text-base text-gray-600 mt-1">
            Discover talented musicians for your venue. Use filters to refine your search and find the perfect match for your event.
          </p>
        </div>

        <FindGigsSearchBar
          placeholder="Search by name"
          value={searchQuery}
          onSearch={handleSearchChange}
        />

        {/* <FilterDropdown filterData={filters} onChange={handleFilterChange} /> */}

        {/* Loading indicator for search/filter changes */}
        {loading && musicians.length > 0 && (
          <div className="flex justify-center items-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#1FB58F]"></div>
            <span className="ml-2 text-gray-600">Updating results...</span>
          </div>
        )}

        {/* Results count and clear filters */}
        {!loading && totalItems > 0 && (
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Found {totalItems} musician{totalItems !== 1 ? 's' : ''}
              {hasActiveFilters && (
                <span className="text-[#1FB58F] ml-1">
                  matching your criteria
                </span>
              )}
              {totalPages > 1 && (
                <span className="text-gray-500 ml-2">
                  (Page {currentPage} of {totalPages})
                </span>
              )}
            </div>
            
            {/* Clear all filters button */}
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-sm text-gray-500 hover:text-red-500 underline transition-colors"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}

        {/* No musicians found */}
        {!loading && totalItems === 0 && !hasActiveFilters ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No musicians available</h2>
            <p className="text-gray-600">There are currently no musicians in our database. Please check back later.</p>
          </div>
        ) : !loading && totalItems === 0 && hasActiveFilters ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No musicians found</h2>
            <p className="text-gray-600">Try adjusting your search or filters to find musicians that match your criteria.</p>
          </div>
        ) : (
          <>
            {/* Featured Musicians - Show only on first page */}
            {currentPage === 1 && featuredMusicians.length > 0 && (
              <div className='flex flex-col items-center justify-center md:items-start'>
                <h2 className="text-lg text-[#121417] font-bold mb-4">Featured Musicians</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
                  {featuredMusicians.map((m) => (
                    <MusicianCard 
                      key={`featured-${m.id}`} 
                      image={m.image} 
                      name={m.name} 
                      role={m.role}
                      artist={m} 
                      onConnect={handleMessageClick} 
                    />
                  ))}
                </div>
              </div>
            )}

            {/* All Musicians */}
            <div className='flex flex-col items-center justify-center md:items-start'>
              <h2 className="text-lg text-[#121417] font-bold mb-4">
                {currentPage === 1 && featuredMusicians.length > 0 ? 'All Musicians' : 'Musicians'}
                <span className="text-sm font-normal text-gray-500 ml-2">
                  ({startIndex}-{endIndex} of {totalItems})
                </span>
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
                {musicians.map((m) => (
                  <MusicianCard 
                    key={`all-${m.id}`} 
                    image={m.image} 
                    name={m.name} 
                    role={m.role}
                    artist={m} 
                    onConnect={handleMessageClick} 
                  />
                ))}
              </div>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex flex-col items-center gap-4 mt-8">
                {/* Page Info */}
                <div className="text-sm text-gray-600">
                  Showing {startIndex} to {endIndex} of {totalItems} musicians
                </div>

                {/* Pagination Buttons */}
                <div className="flex items-center gap-2">
                  {/* Previous Button */}
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                      currentPage === 1
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    Previous
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1">
                    {currentPage > 3 && totalPages > 5 && (
                      <>
                        <button
                          onClick={() => goToPage(1)}
                          className="px-3 py-1 rounded-md text-sm font-medium bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                        >
                          1
                        </button>
                        {currentPage > 4 && <span className="px-2 text-gray-500">...</span>}
                      </>
                    )}

                    {getPageNumbers().map((page) => (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                          currentPage === page
                            ? 'bg-[#1FB58F] text-white'
                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    {currentPage < totalPages - 2 && totalPages > 5 && (
                      <>
                        {currentPage < totalPages - 3 && <span className="px-2 text-gray-500">...</span>}
                        <button
                          onClick={() => goToPage(totalPages)}
                          className="px-3 py-1 rounded-md text-sm font-medium bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                        >
                          {totalPages}
                        </button>
                      </>
                    )}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                      currentPage === totalPages
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default VenueFindMusicians;