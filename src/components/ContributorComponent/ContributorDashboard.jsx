"use client";

import React, { useEffect, useState } from "react";
import PerformanceStats from "./PerformanceStats";
import GigCard from "./GigCard";
import Cookies from "js-cookie";
import Link from "next/link";

const ContributorDashboard = () => {
  const [filters, setFilters] = useState({
    availability: {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      selectedDates: [],
    },
  });

  const [latestGigs, setLatestGigs] = useState(null);
  const [requests, setRequests] = useState(null);

  const dummyCard = {
    title: "Live Music Photography at The Roxy",
    subtitle: "Photography | Photograph",
    image: "/images/avatar.png",
    text: "View Details",
  };

  const suggestedCard = {
    title: "Acoustic Set by Steve Benoit",
    subtitle: "Acoustic Music | August 1, 2025 - 7:00 PM",
    image: "/images/avatar.png",
    text: "View Request",
  };

  const getDaysInMonth = (month, year) => new Date(year, month, 0).getDate();
  const getFirstDayOfMonth = (month, year) =>
    new Date(year, month - 1, 1).getDay();

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(
      filters.availability.month,
      filters.availability.year
    );
    const firstDay = getFirstDayOfMonth(
      filters.availability.month,
      filters.availability.year
    );
    const days = [];

    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let day = 1; day <= daysInMonth; day++) days.push(day);
    return days;
  };

  const handleDateToggle = (day) => {
    const dateKey = `${filters.availability.year}-${filters.availability.month}-${day}`;
    const updatedDates = filters.availability.selectedDates.includes(dateKey)
      ? filters.availability.selectedDates.filter((d) => d !== dateKey)
      : [...filters.availability.selectedDates, dateKey];

    setFilters((prev) => ({
      ...prev,
      availability: {
        ...prev.availability,
        selectedDates: updatedDates,
      },
    }));
  };

  const id = Cookies.get("id")

  useEffect(() => {
    const fetchData = async () => {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/contributor-gigs/latest-gigs?id=${id}`;

      try {
        const res = await fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // ✅ if API needs cookies
        });

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        setLatestGigs(data?.items?.slice(0, 2) || []);
      } catch (err) {
        console.error("Error fetching latest gigs:", err);
      } finally {
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const id = Cookies.get("id");
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/contributor-gigs-requests?collaborator_id=${id}`;

      try {
        const res = await fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        setRequests(data?.data[0] || []);
      } catch (err) {
        console.error("Error fetching latest gigs:", err);
      } finally {
      }
    };

    fetchData();
  }, []);

  const userName = Cookies.get("userName");

  return (
    <main className="bg-[#F1F0EA]  min-h-screen py-8 px-4 sm:px-12">
      <div className="max-w-5xl flex  flex-col justify-center  mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 ">
          Welcome back, {userName ? userName : "Sophia"}
        </h1>

        {/* My Active Gigs */}
        <section className="">
          <h2 className="font-semibold my-2 text-lg">My Active Gigs</h2>

          {latestGigs && latestGigs.length > 0 ? (
            <div className="flex flex-col gap-6">
              {latestGigs.map((gig, idx) => (
                <GigCard
                  key={gig.id || idx}
                  linkTo="/manage-created-gigs"
                  data={gig}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 border border-dashed border-gray-300 rounded-xl">
              <p className="text-gray-500 mb-4">No active gigs yet</p>
              <Link
                href="/create-gig"
                className="px-6 py-2 bg-[#1FB58F] text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Create Gig
              </Link>
            </div>
          )}
        </section>

        {/* Collaboration Requests */}
        {/* <section className="">
          <h2 className="font-semibold mb-2 text-lg">Collaboration Requests</h2>
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <GigCard {...suggestedCard} />
          </div>
        </section> */}

        {/* Performance Stats */}
        <section className="">
          <h2 className="font-semibold mb-2 text-lg">Performance Stats</h2>
          <PerformanceStats />
        </section>
        <div className="flex justify-center mt-10 gap-3">
          <Link
            className="bg-black text-white px-4 py-2 rounded-xl text-sm hover:bg-gray-800 hover:cursor-pointer"
            href={"/contributor-profile"}
          >
            View Profile
          </Link>
          {/* <button className="bg-[#1FB58F] text-white px-4 py-2 rounded-xl text-sm hover:bg-green-600 hover:cursor-pointer">
                Contact Me
              </button> */}
          <Link
            className="bg-[#1FB58F] text-white px-4 py-2 rounded-xl text-sm hover:bg-green-600  hover:cursor-pointer"
            href={"/create-gig"}
          >
            Create Gig
          </Link>
                    
        </div>
      </div>
    </main>
  );
};

export default ContributorDashboard;
