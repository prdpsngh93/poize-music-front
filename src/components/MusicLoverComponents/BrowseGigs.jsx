"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import FindGigsSearchBar from "../FindgigsComponents/FindGigsSearchBar";
import FilterDropdown from "../VenueComponents/FilterDropDown";
import MusicianCard from "../VenueComponents/MusicianCard";
import NoGigsFound from "@/components/FindgigsComponents/NogigsFound";
import { useRouter } from "next/navigation";

const BrowseGigs = () => {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    genre: "",
    date: "",
    venueType: "",
    price: "",
    status: "",
  });
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 10;
  const searchTimeoutRef = useRef(null);

  const fetchGigs = useCallback(
    async (params = {}) => {
      const {
        search = searchTerm,
        filterValues = filters,
        pageValue = page,
      } = params;

      setLoading(true);
      try {
        const queryParams = new URLSearchParams({
          page: String(pageValue),
          limit: String(limit),
          ...(search && { search }),
          ...(filterValues.date && { date: filterValues.date }),
          ...(filterValues.genre && { genre: filterValues.genre.toLowerCase() }),
          ...(filterValues.venueType && { venue: filterValues.venueType.toLowerCase() }),
          ...(filterValues.price && { price: filterValues.price.toLowerCase() }),
          ...(filterValues.status && { status: filterValues.status.toLowerCase() }),
        });

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/contributor-gigs?${queryParams}`
        );
        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
        const data = await res.json();
        setGigs(data?.items || []);
        setTotalPages(data?.totalPages || 1);
      } catch (err) {
        console.error("Error fetching gigs:", err);
        setGigs([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    },
    [searchTerm, filters, page]
  );

  useEffect(() => {
    fetchGigs();
  }, []);

  const handleSearch = useCallback(
    (value) => {
      setSearchTerm(value);
      setPage(1);
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
      searchTimeoutRef.current = setTimeout(() => {
        fetchGigs({ search: value, pageValue: 1 });
      }, 300);
    },
    [fetchGigs]
  );

  const handleFilterChange = useCallback(
    (newFilters) => {
      setFilters(newFilters);
      setPage(1);
      fetchGigs({ filterValues: newFilters, pageValue: 1 });
    },
    [fetchGigs]
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
      setPage(newPage);
      fetchGigs({ pageValue: newPage });
    }
  };

  return (
    <main className="bg-[#f4f3ee] min-h-screen px-4 md:px-9 lg:px-12 py-10">
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
          Browse Gigs
        </h1>
        <FindGigsSearchBar
          placeholder="Search by artist, venue, or gig name"
          onSearch={handleSearch}
        />
        <FilterDropdown onChange={handleFilterChange} filters={filters} />

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1FB58F]"></div>
            <p className="text-gray-500 ml-2">Loading gigs...</p>
          </div>
        ) : gigs.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
             {gigs.map((gig) => (
    <div
      key={gig.id}
      onClick={() => router.push(`/music-lover-gigs-detail/${gig.id}`)}
      className="cursor-pointer"
    >
      <MusicianCard
        image={gig.attachment_url || "/images/upcominggig3.png"}
        name={gig.gig_title}
        role={gig.venue_type}
      />
    </div>
  ))}
            </div>
            <div className="flex justify-center pt-8">
              <nav className="flex gap-2 text-sm">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      page === i + 1
                        ? "bg-black text-white"
                        : "bg-white text-black border border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </nav>
            </div>
          </>
        ) : (
          <NoGigsFound
            heading="No gigs found"
            para="Try adjusting your search or filters."
          />
        )}
      </div>
    </main>
  );
};

export default BrowseGigs;
