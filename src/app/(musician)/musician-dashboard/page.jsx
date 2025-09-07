"use client";

import UpcomingGigs from "@/components/MusicianDashboardComponents/UpcomingGigs";
import React, { useEffect } from "react";
import ProfileStats from "@/components/MusicianDashboardComponents/ProfileStats";
import RecentActivity from "@/components/MusicianDashboardComponents/RecentActivity";
import Announcements from "@/components/MusicianDashboardComponents/Annoucement";
import Analytics from "@/components/MusicianDashboardComponents/Analytics";
import Cookies from "js-cookie";
import Link from "next/link";
import BackButton from "@/components/GlobalComponents/BackButton";
import { redirect } from "next/navigation";

const userName = Cookies.get("userName");
const userDataCookie = Cookies.get("userData");
const userData = userDataCookie ? JSON.parse(userDataCookie) : null;



const page = () => {
  useEffect(() => {
  const role = userData?.role;
  if (role !== "artist") {
    redirect("/");
  }
}, []);
  return (
    <>
      <main className="bg-[#f4f3ee] min-h-screen px-4 md:px-9 lg:px-12 py-10">
        <div className="max-w-5xl mx-auto flex flex-col gap-10">
          {/* Back Button */}
          <BackButton />

          {/* Heading */}
          <div className="text-left">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
              Welcome back, {userName ? userName : "Emily!"}
            </h1>
            <p className="text-sm md:text-base text-gray-600 mt-1">
              Here's a snapshot of your music journey.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Upcoming Gigs
            </h2>
            <UpcomingGigs />
          </div>

          <ProfileStats />
          {/* <RecentActivity /> */}

          {/* Action Buttons */}
          <div className="flex flex-col gap-6 items-center">
            <div className="w-full max-w-md flex flex-col gap-4 items-center">
              <Link href="/find-gigs" className="w-full">
                <button className="w-full cursor-pointer px-5 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition">
                  Find Gigs
                </button>
              </Link>

              {/* Divider with "or" */}
              <div className="flex items-center w-full">
                <div className="flex-grow h-px bg-gray-300"></div>
                <span className="px-3 text-gray-500 text-sm">or</span>
                <div className="flex-grow h-px bg-gray-300"></div>
              </div>

              <Link href="/post-collab" className="w-full">
                <button className="w-full px-5 py-3 cursor-pointer bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition">
                  Post a Collaboration Opportunity
                </button>
              </Link>
            </div>
          </div>

          <Announcements />
          <Analytics />
        </div>
      </main>
    </>
  );
};

export default page;
