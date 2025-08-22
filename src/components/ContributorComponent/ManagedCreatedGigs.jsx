"use client"
import React, { useEffect, useState } from 'react'
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
  const [pageSize] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ date: "", venue: "", status: "" });
    const router = useRouter();
  
     
  const filterOptions = {
    date: ["Today", "This Week", "This Month"],
    venue: ["indoor", "outdoor"],
    status: ["draft", "active"],
  };

  useEffect(() => {
    const fetchData = async () => {
      const id = Cookies.get("id");
      if (!id) {
        console.error("No userId found in cookies");
        return;
      }

      setLoading(true);
      try {
        const query = new URLSearchParams({
          page: currentPage,
          limit: pageSize,
          search: searchTerm,
          ...(filters.date && { date: filters.date }),
          ...(filters.venue && { venue: filters.venue }),
          ...(filters.status && { status: filters.status }),
        });

        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/contributor-gigs/contributor/${id}?${query}`;
        const res = await fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

        const data = await res.json();
        setGigs(data);
      } catch (error) {
        console.error("Error fetching gigs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, pageSize, searchTerm, filters]);

  // 👇 Reset Filters function
  const handleResetFilters = () => {
    setFilters({ date: "", venue: "", status: "" });
    setCurrentPage(1);
  };

  return (
    <main className="bg-[#f4f3ee] min-h-screen px-4 md:px-9 lg:px-12 py-10">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
       <div className='flex gap-1 items-center'>
        <BackButton route={'/create-gig'}/>
         <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
          Manage Created Gigs
        </h1>
       </div>

        {/* Search */}
        <FindGigsSearchBar
          placeholder="Search gigs..."
          onSearch={(value) => {
            setCurrentPage(1);
            setSearchTerm(value);
          }}
        />

        {/* Dropdown Filters + Reset Button */}
        <div className="flex flex-wrap items-center gap-3">
          <ContributorDropdowns 
            filters={filterOptions} 
            onFilterChange={(newFilters) => {
              setCurrentPage(1);
              setFilters(newFilters);
            }} 
          />
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium text-gray-700"
          >
            Reset Filters
          </button>
        </div>

        {/* Loader or Data */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#1FB58F] border-solid"></div>
          </div>
        ) : (
          <ContributorGigList 
          // editHandler={() => router.push('/')}
            data={gigs} 
            onPageChange={(page) => setCurrentPage(page)} 
          />
        )}
      </div>
    </main>
  )
}

export default ManagedCreatedGigs
