'use client';
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import FilterSidebar from './FilterSidebar';
import GigsGridCard from './GigsGridCard';
import Pagination from './Pagination';
import CustomDropdown from './CustomDropdown';
import { FaListUl, FaTh } from 'react-icons/fa';
import NoGigsFound from './NoGigsFound';
import Modal from '../common/Modal';
import { toast } from 'sonner';

const GigsGrid = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [gigs, setGigs] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [viewMode, setViewMode] = useState('grid');

  // FILTER STATES - Updated structure
  const [filters, setFilters] = useState({
    dateFilter: '', // For 1w, 1m, 3m options
    artist: '',
    venue: '', // Will be dropdown: indoor/outdoor
    sortBy: 'Default Sorting',
    showCount: 10
  });

  // MODAL STATES
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [viewGigId, setViewGigId] = useState(null);
  const [applyGigId, setApplyGigId] = useState(null);
  const [applyData, setApplyData] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(false);

  // Updated fields layout
  const fieldsLayout = [
    { 
      label: 'Event Date', 
      type: 'select',
      value: filters.dateFilter,
      options: ['', '1w', '1m', '3m'], // Empty string for "All dates"
      optionLabels: ['All dates', 'Last 1 week', 'Last 1 month', 'Last 3 months'],
      onChange: (value) => handleFilterChange('dateFilter', value)
    },
    { 
      label: 'Gig Title', 
      type: 'input', 
      placeholder: 'Search by gig name',
      value: filters.artist,
      onChange: (value) => handleFilterChange('artist', value)
    },
    { 
      label: 'Venue Type', 
      type: 'select',
      value: filters.venue,
      options: ['', 'indoor', 'outdoor'], // Empty string for "All venues"
      optionLabels: ['All venues', 'Indoor', 'Outdoor'],
      onChange: (value) => handleFilterChange('venue', value)
    },
  ];

  const sortingOptions = [
    "Default Sorting", 
    "Price: Low to High", 
    "Price: High to Low", 
    "Newest First",
    "Oldest First",
    "Title A-Z",
    "Title Z-A"
  ];
  const showOptions = [5, 10, 15, 20, 30, 50];

  // HANDLE FILTER CHANGES
  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
    setCurrentPage(1); // Reset to first page when filtering
  };

  // HANDLE SORTING CHANGE
  const handleSortingChange = (selectedOption) => {
    handleFilterChange('sortBy', selectedOption);
  };

  // HANDLE SHOW COUNT CHANGE
  const handleShowCountChange = (selectedCount) => {
    handleFilterChange('showCount', selectedCount);
  };

  // DEBOUNCED FETCH FUNCTION
  const fetchGigs = useCallback(async () => {
    try {
      console.log("Fetching gigs with filters:", filters);
      setLoading(true);
      
      // Build query parameters
      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        limit: filters.showCount.toString()
      });

      // Add filters to query - updated parameter mapping
      if (filters.artist.trim()) {
        queryParams.append('search', filters.artist);
      }
      if (filters.venue.trim()) {
        queryParams.append('venue', filters.venue);
      }
      if (filters.dateFilter.trim()) {
        queryParams.append('date', filters.dateFilter); // This will use event date filtering
      }
      
      // Add sorting parameter
      if (filters.sortBy && filters.sortBy !== 'Default Sorting') {
        queryParams.append('sortBy', filters.sortBy);
      }

      console.log('Fetching with params:', queryParams.toString());

      const res = await axios.get(
        `https://poize-music-backend-kn0u.onrender.com/api/contributor-gigs?${queryParams}`
      );
      
      console.log('API Response:', res.data);
      
      let gigsData = res.data.items || [];
      
      setGigs(gigsData);
      setTotalPages(res.data.totalPages || 1);
      setTotalItems(res.data.totalItems || 0);
      
    } catch (err) {
      console.error("Error fetching gigs:", err);
      toast.error("Failed to load gigs");
      setGigs([]);
      setTotalPages(1);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  }, [currentPage, filters]);

  console.log("Current filters:", filters);

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
      dateFilter: '',
      artist: '',
      venue: '',
      sortBy: 'Default Sorting',
      showCount: 10
    });
    setCurrentPage(1);
  };

  // HANDLE APPLY
  const handleApply = async () => {
    if (!applyData.title || !applyData.description) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      // Replace with actual POST API endpoint:
      // await axios.post(`/api/apply/${applyGigId}`, applyData);

      setApplyModalOpen(false);
      setApplyData({ title: '', description: '' });
      toast.success("Application submitted successfully!");
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error("Failed to apply. Try again.");
    }
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
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              
              {/* Content */}
              <div className="flex-1 space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-[#1B3139] hover:text-[#1FB58F] cursor-pointer"
                      onClick={() => {
                        setViewGigId(gig.id);
                        setViewModalOpen(true);
                      }}>
                    {gig.gig_title}
                  </h3>
                  <span className="text-lg font-bold text-[#1FB58F]">${gig.payment}</span>
                </div>
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <span>📍 {gig.venue_type}</span>
                  <span>🗓️ {gig.date} {gig.time}</span>
                  <span>🎤 {gig.artist?.name || "N/A"}</span>
                  {gig.genre && <span>🎵 {gig.genre}</span>}
                </div>
                
                <p className="text-gray-700 text-sm line-clamp-2">
                  {gig.description}
                </p>
                
                <div className="flex justify-between items-center pt-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    gig.status === 'active' ? 'bg-green-100 text-green-800' : 
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {gig.status}
                  </span>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setViewGigId(gig.id);
                        setViewModalOpen(true);
                      }}
                      className="px-3 py-1 border border-[#1FB58F] text-[#1FB58F] rounded hover:bg-[#1FB58F] hover:text-white transition-colors text-sm"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => {
                        setApplyGigId(gig.id);
                        setApplyModalOpen(true);
                      }}
                      className="px-3 py-1 bg-[#1FB58F] text-white rounded hover:bg-[#17a07b] transition-colors text-sm"
                    >
                      Apply
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

  const currentViewGig = gigs.find(g => g.id === viewGigId);

  return (
    <div className="max-w-7xl mx-auto px-4 pt-10">
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* SIDEBAR FILTERS */}
        <div className="w-full lg:w-[300px]">
          <FilterSidebar 
            title="Filter Gigs" 
            fields={fieldsLayout}
            onApply={handleApplyFilters}
            onReset={handleResetFilters}
          />
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-[#1B3139]">Gigs Happening Today</h1>
            <p className="text-sm text-gray-600 mt-1">Discover and attend live performances near you</p>
          </div>

          {/* TOP FILTERS */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div className="text-sm text-gray-600">
              {loading ? 'Loading...' : `Showing ${gigs.length} of ${totalItems} results`}
              {filters.sortBy !== 'Default Sorting' && (
                <span className="ml-2 text-blue-600">• Sorted by {filters.sortBy}</span>
              )}
            </div>
            <div className="flex flex-col md:flex-row gap-3">
              {/* <CustomDropdown 
                label="Sort By" 
                options={sortingOptions} 
                value={filters.sortBy}
                onChange={handleSortingChange}
              /> */}
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
                onClick={() => setViewMode('list')}
                className={`hover:underline transition-opacity ${viewMode === 'list' ? 'opacity-100' : 'opacity-70'}`}
              >
                Post List
              </button>
              <button 
                onClick={() => setViewMode('grid')}
                className={`hover:underline transition-opacity ${viewMode === 'grid' ? 'opacity-100' : 'opacity-70'}`}
              >
                Post Grid
              </button>
            </div>
            <div className="flex gap-3 text-xl">
              <button 
                onClick={() => setViewMode('list')}
                className={`transition-colors ${viewMode === 'list' ? 'text-white' : 'text-gray-300 hover:text-white'}`}
              >
                <FaListUl />
              </button>
              <button 
                onClick={() => setViewMode('grid')}
                className={`transition-colors ${viewMode === 'grid' ? 'text-white' : 'text-gray-300 hover:text-white'}`}
              >
              <FaTh />
              </button>
            </div>
          </div>

          {/* ACTIVE FILTERS DISPLAY */}
          {(filters.artist || filters.venue || filters.dateFilter || filters.sortBy !== 'Default Sorting' || filters.showCount !== 10) && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg border">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm font-medium text-gray-700">Active Filters:</span>
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
                  Date: {filters.dateFilter === '1w' ? 'Last week' : filters.dateFilter === '1m' ? 'Last month' : 'Last 3 months'}
                </span>
              )}
              {filters.sortBy !== 'Default Sorting' && (
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
              <p className="text-gray-600 mt-2">Loading gigs...</p>
            </div>
          )}

          {/* GIGS DISPLAY */}
          {!loading && (
            gigs.length > 0 ? (
              viewMode === 'grid' ? (
                // GRID VIEW
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {gigs.map((gig) => (
                    <GigsGridCard
                      key={gig.id}
                      image={gig.attachment_url || "/images/avatar.png"}
                      title={gig.gig_title}
                      location={gig.venue_type}
                      date={`${gig.date} ${gig.time}`}
                      artist={gig.artist?.name || "N/A"}
                      price={gig.payment}
                      description={gig.description}
                      onClick={() => {
                        setViewGigId(gig.id);
                        setViewModalOpen(true);
                      }}
                      footerButton={() => {
                        setApplyGigId(gig.id);
                        setApplyModalOpen(true);
                      }}  
                    />
                  ))}
                </div>
              ) : (
                // LIST VIEW
                <GigsListView gigs={gigs} />
              )
            ) : (
              <NoGigsFound />
            )
          )}

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

      {/* VIEW MODAL */}
      <Modal
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        title={currentViewGig?.gig_title || "Gig Details"}
      >
        {currentViewGig && (
          <div className="space-y-2 max-h-[70dvh] overflow-y-auto">
            <img src={currentViewGig.attachment_url || "/images/avatar.png"} alt="" className="w-full rounded-lg" />
            <p><strong>Date:</strong> {currentViewGig.date} {currentViewGig.time}</p>
            <p><strong>Venue:</strong> {currentViewGig.venue_type}</p>
            <p><strong>Genre:</strong> {currentViewGig.genre}</p>
            <p><strong>Artist:</strong> {currentViewGig.artist?.name}</p>
            <p><strong>Payment:</strong> ${currentViewGig.payment}</p>
            <p><strong>Status:</strong> {currentViewGig.status}</p>
            <p><strong>Description:</strong> {currentViewGig.description}</p>
          </div>
        )}
      </Modal>

      {/* APPLY MODAL */}
      <Modal
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        title="Apply for Gig"
      >
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter Title"
            value={applyData.title}
            onChange={(e) => setApplyData({ ...applyData, title: e.target.value })}
            className="w-full border px-3 py-2 rounded"
          />
          <textarea
            placeholder="Enter Description"
            value={applyData.description}
            onChange={(e) => setApplyData({ ...applyData, description: e.target.value })}
            className="w-full border px-3 py-2 rounded min-h-[100px]"
          />
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setApplyModalOpen(false)}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              className="px-4 py-2 bg-[#1FB58F] text-white rounded hover:bg-[#17a07b]"
            >
              Apply
            </button>
            </div>
        </div>
      </Modal>
    </div>
  );
};

export default GigsGrid;