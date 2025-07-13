import React from "react";
import NavbarMusician from "@/components/MusicianPageComponents/NavbarMusician";
import FindGigsSearchBar from "@/components/FindgigsComponents/FindGigsSearchBar";
import Dropdowns from "@/components/FindgigsComponents/Dropdowns";
import FindArtistsCards from "@/components/MusicianPageComponents/FindArtistsCards";
import NoGigsFound from "@/components/FindgigsComponents/NogigsFound";
const page = () => {
  return (
    <>
      <main className="bg-[#f4f3ee] min-h-screen px-4 md:px-9 lg:px-12 py-10">
        <div className="max-w-5xl mx-auto flex flex-col gap-6">
          {/* Heading */}
          <div className="text-left">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
              Find Artists to Collaborate
            </h1>
          </div>
          <FindGigsSearchBar />
          <Dropdowns />
          <FindArtistsCards />
        </div>

        <NoGigsFound
          heading={"No artists found"}
          para={
            "Try adjusting your search or filters to find artists that match your criteria."
          }
        />
      </main>
    </>
  );
};

export default page;
