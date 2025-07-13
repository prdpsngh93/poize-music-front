import Cards from '@/components/FindgigsComponents/Cards';
import Dropdowns from '@/components/FindgigsComponents/Dropdowns';
import FindGigsSearchBar from '@/components/FindgigsComponents/FindGigsSearchBar';
import NoGigsFound from '@/components/FindgigsComponents/NogigsFound';
import NavbarMusician from '@/components/MusicianPageComponents/NavbarMusician';
import React from 'react';

const FindGigsPage = () => {
  return (
    <>

      <main className="bg-[#f4f3ee] min-h-screen px-4 md:px-9 lg:px-12 py-10">
        <div className="max-w-5xl mx-auto flex flex-col gap-6">
          {/* Heading */}
          <div className="text-left">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Find Gigs</h1>
            <p className="text-sm md:text-base text-gray-600 mt-1">
              Explore opportunities to perform and connect with audiences.
            </p>
          </div>

          {/* Search Bar */}
          <FindGigsSearchBar />

          {/* Dropdown Filters */}
          <Dropdowns />

          {/* Cards */}
          <Cards />


{/* No gigs page */}
     <NoGigsFound  heading={"No gigs found"}  para={" Try adjusting your search filters or check back later for new opportunities."} />
        </div>
      </main>
    </>
  );
};

export default FindGigsPage;
