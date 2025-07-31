'use client'
import React, { useState } from 'react';
import FindGigsSearchBar from '../FindgigsComponents/FindGigsSearchBar';
import FilterDropdown from '../VenueComponents/FilterDropDown';
import MusicianCard from '../VenueComponents/MusicianCard'; // adjust path as needed

const filterData = {
  Date: ['Today', 'Tomorrow', 'This Week'],
  Genre: ['Rock', 'Jazz', 'Pop', 'Electronic', 'Classical'],
  Location: ['Mumbai', 'Delhi', 'Bangalore'],
  'Gig Type': ['Live', 'Virtual'],
  Price: ['Free', 'Paid'],
};

const dummyGigs =[
     { image: "/images/upcominggig3.png", name: "The Underground", role: "Live music venue" },
    { image: "/images/upcominggig2.png", name: "The Blue Note", role: "Jazz Club" },
    { image: "/images/upcominggig1.png", name: "The Garage", role: "Local bands showcase" },
    { image: "/images/upcominggig3.png", name: "Central Park", role: "Outdoor music events" },
    { image: "/images/upcominggig2.png", name: "The Blue Note", role: "Outdoor music events" },
    { image: "/images/upcominggig1.png", name: "The Garage", role: "Local bands showcase" },
     { image: "/images/upcominggig3.png", name: "The Underground", role: "Live music venue" },
    { image: "/images/upcominggig2.png", name: "The Blue Note", role: "Jazz Club" },
    { image: "/images/upcominggig1.png", name: "The Garage", role: "Local bands showcase" },
    { image: "/images/upcominggig3.png", name: "Central Park", role: "Outdoor music events" },
    { image: "/images/upcominggig2.png", name: "The Blue Note", role: "Outdoor music events" },
    { image: "/images/upcominggig1.png", name: "The Garage", role: "Local bands showcase" },
];

const BrowseGigs = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <main className="bg-[#f4f3ee] min-h-screen px-4 md:px-9 lg:px-12 py-10">
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        {/* Heading & Search */}
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Browse Gigs</h1>
        <FindGigsSearchBar placeholder={'Search by artist, venue, or gig name'} />

        {/* Filters */}
        <FilterDropdown filterData={filterData} onChange={(filters) => console.log(filters)} />

        {/* Result Info */}
        <div className="flex flex-col items-start gap-4 justify-between mt-2">
          <p className="text-gray-900 font-bold text-sm">Results (120)</p>
          <div className="flex gap-2">
            <button className="px-3 py-2 text-sm font-semibold text-[#141217] bg-[#E3DFCB]  border border-gray-300 rounded-full shadow-sm hover:bg-gray-100">Sort</button>
            <button className="px-3 py-2 text-sm font-semibold text-[#141217] bg-[#E3DFCB] border border-gray-300 rounded-full shadow-sm hover:bg-gray-100">Clear Filters</button>
          </div>
        </div>

        {/* Gigs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {dummyGigs.map((gig, index) => (
            <MusicianCard key={index} image={gig.image} name={gig.name} role={gig.role} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center pt-8">
          <nav className="flex gap-2 text-sm">
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentPage === page
                    ? 'bg-black text-white'
                    : 'bg-white text-black border border-gray-300 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </main>
  );
};

export default BrowseGigs;
