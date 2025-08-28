'use client';
import React, { useEffect, useState } from 'react';
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

  // MODAL STATES
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [applyModalOpen, setApplyModalOpen] = useState(false);

  // SELECTED IDs FOR EACH MODAL
  const [viewGigId, setViewGigId] = useState(null);
  const [applyGigId, setApplyGigId] = useState(null);

  // APPLY FORM DATA
  const [applyData, setApplyData] = useState({ title: '', description: '' });

  const [loading, setLoading] = useState(false);

  const fieldsLayout = [
    { label: 'Date Range', type: 'dateRange' },
    { label: 'Artist', type: 'input', placeholder: 'Search Artist' },
    { label: 'Venue', type: 'input', placeholder: 'Search Venue' },
    { label: 'Location', type: 'input', placeholder: 'Search Location' },
  ];

  const sortingOptions = ["Default Sorting", "Price: Low to High", "Price: High to Low", "Newest First"];
  const showOptions = [10, 20, 30];

  // FETCH GIGS
  useEffect(() => {
    const fetchGigs = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://poize-music-backend-kn0u.onrender.com/api/contributor-gigs?page=${currentPage}`
        );
        setGigs(res.data.items || []);
        setTotalPages(res.data.totalPages || 1);
      } catch (err) {
        console.error("Error fetching gigs:", err);
        toast.error("Failed to load gigs");
      } finally {
        setLoading(false);
      }
    };
    fetchGigs();
  }, [currentPage]);

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

  const currentViewGig = gigs.find(g => g.id === viewGigId);

  return (
    <div className="max-w-7xl mx-auto px-4 pt-10">
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* SIDEBAR FILTERS */}
        <div className="w-full lg:w-[300px]">
          <FilterSidebar title="Filter Gigs" fields={fieldsLayout} />
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-[#1B3139]">Gigs Happening Today</h1>
            <p className="text-sm text-gray-600 mt-1">Discover and attend live performances near you</p>
          </div>

          {/* TOP FILTERS */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <label className="text-sm md:text-base font-medium flex items-center">
              <input type="checkbox" className="h-5 text-black w-5 mr-2" />
              <p className='text-black'>Show Only List On Booking</p>
            </label>
            <div className="flex flex-col md:flex-row gap-3">
              <CustomDropdown label="Sort By" options={sortingOptions} />
              <CustomDropdown label="Show" options={showOptions} />
            </div>
          </div>

          {/* VIEW TOGGLE */}
          <div className="flex justify-between bg-[#1FB58F] rounded-lg px-6 py-4 text-white mb-8">
            <div className="font-semibold text-sm md:text-base flex gap-6">
              <a href="#" className="hover:underline">Post List</a>
              <a href="#" className="hover:underline">Post Grid</a>
            </div>
            <div className="flex gap-3 text-xl">
              <button className="hover:text-gray-300"><FaListUl /></button>
              <button className="hover:text-gray-300"><FaTh /></button>
            </div>
          </div>

          {/* LOADER */}
          {loading && (
            <div className="text-center py-10">
              <div className="w-8 h-8 border-4 border-[#1FB58F] border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-gray-600 mt-2">Loading gigs...</p>
            </div>
          )}

          {/* GIGS GRID */}
          {!loading && (
            gigs.length > 0 ? (
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
              <NoGigsFound />
            )
          )}

          {/* PAGINATION */}
          {!loading && gigs.length > 0 && (
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
