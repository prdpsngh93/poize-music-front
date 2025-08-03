'use client'
import React, { useState } from "react";
import LibrarySidebar from "./LibrarySidebar";
import FollowedArtists from "./FollowedArtists";
import UpdatesFeed from "./UpdatesFeed";

const UpdatesMain = () => {
  const [activeTab, setActiveTab] = useState("All");

  const tabs = ["All", "Artist", "Venue"];
  const filters = ["All Updates", "Gig Announcements", "Social Posts"];

  return (
    <main className="bg-[#f4f3ee] min-h-screen p-4 sm:p-6 md:p-10">
      <div className="max-w-6xl mx-auto">

        {/* 🔹 Heading for tablet and mobile only */}
        <div className="mb-6 lg:hidden">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Updates from Artists & Venues
          </h1>
        </div>

        {/* 🔸 Layout */}
        <div className="flex flex-col gap-10 md:flex-row ">
          {/* Left Sidebar */}
          <div className="flex flex-col gap-6 ">
            <LibrarySidebar />
            <FollowedArtists />
          </div>

          {/* Main Feed Section */}
          <div className="flex-1">
            {/* 🔹 Heading for large screen only */}
            <div className="hidden lg:block mb-6">
              <h1 className="text-3xl font-bold text-gray-900">
                Updates from Artists & Venues
              </h1>
            </div>

            {/* 🔸 Tabs */}
            <div className="flex gap-6 mt-4 border-b border-gray-300 mb-4">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? "border-[#1FB58F] text-[#1FB58F] border-b-2"
                      : "text-gray-500"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* 🔸 Filters */}
            <div className="flex flex-wrap gap-3 mb-6">
              {filters.map((filter) => (
                <button
                  key={filter}
                  className="px-4 py-1 bg-white rounded-full border text-sm text-gray-700 hover:bg-gray-100"
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* 🔹 Feed */}
            <UpdatesFeed />
          </div>
        </div>
      </div>
    </main>
  );
};

export default UpdatesMain;
