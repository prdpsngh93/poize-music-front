'use client';

import React, { useEffect, useState } from 'react';
import PerformanceStats from './PerformanceStats';
import GigCard from './GigCard';
import Cookies from 'js-cookie';
import Link from 'next/link';

const ContributorDashboard = () => {
  const [filters, setFilters] = useState({
    availability: {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      selectedDates: [],
    },
  });

  const [latestGigs , setLatestGigs] = useState(null);

  const dummyCard = {
    title: 'Live Music Photography at The Roxy',
    subtitle: 'Photography | Photograph',
    image: '/images/avatar.png',
    text: 'View Details'
  };

  const suggestedCard = {
    title: 'Acoustic Set by Steve Benoit',
    subtitle: 'Acoustic Music | August 1, 2025 - 7:00 PM',
    image: '/images/avatar.png',
    text: 'View Request'

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

  useEffect(() => {
    const fetchData = async () => {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/contributor-gigs/latest-gigs`;

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
        setLatestGigs(data?.items[0] || []); // adjust depending on your API response
      } catch (err) {
        console.error("Error fetching latest gigs:", err);
      } finally {
      }
    };

    fetchData();
  }, []);



  const userName = Cookies.get("userName");
  console.log("latestgigs" , latestGigs)


  return (
    <main className="bg-[#F1F0EA]  min-h-screen py-8 px-4 sm:px-12">
      <div className='max-w-5xl flex  flex-col justify-center  mx-auto'>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 ">
          Welcome back, {userName ? userName : "Sophia"}
        </h1>

        {/* My Active Gigs */}
        <section className="">
          <h2 className="font-semibold mb-2 text-lg">My Active Gigs</h2>
          <div className="flex flex-col sm:flex-row justify-between gap-4">
          { latestGigs   &&   <GigCard data ={latestGigs} />} 

          </div>
        </section>

        {/* Collaboration Requests */}
        <section className="">
          <h2 className="font-semibold mb-2 text-lg">Collaboration Requests</h2>
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <GigCard {...suggestedCard} />

          </div>
        </section>

        {/* Performance Stats */}
        <section className="">
          <h2 className="font-semibold mb-2 text-lg">Performance Stats</h2>
          <PerformanceStats />
        </section>

        {/* Upcoming Gigs Calendar */}
        <section className="">
          <h2 className="font-semibold mb-2 text-lg">Upcoming Gigs</h2>
          <div className="bg-white rounded-xl shadow-sm p-6 w-fit">
            <div className="grid grid-cols-7 gap-2 text-center font-medium text-gray-500 text-sm mb-2">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                <div key={`${day}-${index}`}>{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {generateCalendarDays().map((day, index) => {
                if (day === null) return <div key={index}></div>;
                const dateKey = `${filters.availability.year}-${filters.availability.month}-${day}`;
                const isSelected = filters.availability.selectedDates.includes(dateKey);
                const isToday =
                  day === new Date().getDate() &&
                  filters.availability.month === new Date().getMonth() + 1 &&
                  filters.availability.year === new Date().getFullYear();

                return (
                  <button
                    key={index}
                    onClick={() => handleDateToggle(day)}
                    className={`w-8 h-8 flex items-center justify-center rounded-full text-sm transition-all duration-200
                    ${isSelected
                        ? 'bg-[#1FB58F] text-white'
                        : isToday
                          ? 'bg-blue-500 text-white'
                          : 'hover:bg-gray-200 text-black'
                      }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Suggested Opportunities */}
        <section className="">
          <h2 className="font-semibold mb-2 text-lg">Suggested Opportunities</h2>
          <div className="flex flex-col  justify-between gap-4 items-center">
            <GigCard {...suggestedCard} />
            <div className="flex gap-3">
              <button className="bg-black text-white px-4 py-2 rounded-xl text-sm hover:bg-gray-800 hover:cursor-pointer">
                View Portfolio
              </button>
              <button className="bg-[#1FB58F] text-white px-4 py-2 rounded-xl text-sm hover:bg-green-600 hover:cursor-pointer">
                Contact Me
              </button>
              <Link className='bg-[#1FB58F] text-white px-4 py-2 rounded-xl text-sm hover:bg-green-600  hover:cursor-pointer'
                href={"/create-gig"}  >
                Create Gig
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ContributorDashboard;
