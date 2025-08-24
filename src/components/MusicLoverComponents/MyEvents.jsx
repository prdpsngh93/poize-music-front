"use client";

import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Cookies from "js-cookie";
import BackButton from "../GlobalComponents/BackButton";

const MyEvents = () => {
  const [viewMode, setViewMode] = useState("calendar");
  const [selectedDate, setSelectedDate] = useState(null); // ✅ no default current date
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showAll, setShowAll] = useState(true);

  // Format date to readable string
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      const musicLoverId = Cookies.get("userId");
      if (!musicLoverId) return;

      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/contributor-gigs-requests?music_lover_id=${musicLoverId}`
        );
        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
        const data = await res.json();

        const formattedEvents = (data?.data || []).map((item) => ({
          id: item.id,
          title: item.gig?.gig_title || "Untitled",
          date: item.gig?.date || "",
          venue: item.gig?.venue_type || "Unknown Venue",
          genre: item.gig?.genre || "",
          payment: item.gig?.payment || "0",
          image: item.gig?.attachment_url || "/images/upcominggig1.png",
          description: item.gig?.description || "No description available.",
        }));

        setEvents(formattedEvents);
      } catch (err) {
        console.error("Error fetching events:", err);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // ✅ Filter events by selected date (unless "Show All" is active)
  const filteredEvents = showAll
    ? events
    : events.filter((event) => {
        if (!event.date || !selectedDate) return false;
        const eventDate = new Date(event.date).toDateString();
        const selected = new Date(selectedDate).toDateString();
        return eventDate === selected;
      });

  return (
    <main className="bg-[#f4f3ee] min-h-screen px-4 md:px-9 lg:px-12 py-10">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <BackButton/>
        {/* Heading */}
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
            My Events
          </h1>
          <p className="text-sm md:text-base text-gray-600 mt-1">
            Manage your saved, RSVP'd, or performing gigs
          </p>
        </div>

        {/* Toggle View */}
        <div className="flex gap-6 border-b border-gray-300 text-sm font-medium">
          <button
            onClick={() => {
              setViewMode("calendar");
              setShowAll(false);
            }}
            className={`flex items-center gap-2 py-2 border-b-2 transition-all ${
              viewMode === "calendar" && !showAll
                ? "border-[#1FB58F] text-[#1FB58F]"
                : "border-transparent text-gray-500"
            }`}
          >
            Calendar
          </button>
          <button
            onClick={() => {
              setViewMode("list");
              setShowAll(false);
            }}
            className={`flex items-center gap-2 py-2 border-b-2 transition-all ${
              viewMode === "list" && !showAll
                ? "border-[#1FB58F] text-[#1FB58F]"
                : "border-transparent text-gray-500"
            }`}
          >
            List
          </button>
          <button
            onClick={() => {
              setViewMode("list");
              setShowAll(true);
            }}
            className={`flex items-center gap-2 py-2 border-b-2 transition-all ${
              showAll
                ? "border-[#1FB58F] text-[#1FB58F]"
                : "border-transparent text-gray-500"
            }`}
          >
            Show All
          </button>
        </div>

        {/* Calendar View */}
        {viewMode === "calendar" && !showAll && (
          <div className="flex flex-col sm:flex-row gap-6">
            {[0, 1].map((offset) => (
              <Calendar
                key={offset}
                onChange={setSelectedDate}
                value={selectedDate}
                activeStartDate={
                  selectedDate
                    ? new Date(
                        selectedDate.getFullYear(),
                        selectedDate.getMonth() + offset,
                        1
                      )
                    : new Date()
                }
                className="react-calendar border-none text-black rounded-lg bg-transparent shadow-none w-full max-w-xs"
                tileClassName={({ date }) => {
                  const eventDates = events.map(
                    (e) => new Date(e.date).toDateString()
                  );
                  if (eventDates.includes(date.toDateString())) {
                    return "bg-[#1FB58F] text-white rounded-full";
                  }
                  return "";
                }}
              />
            ))}
          </div>
        )}

        {/* Events Section */}
        <div className="mt-6 flex flex-col gap-4">
          <h2 className="text-lg font-bold text-gray-800">
            {showAll
              ? "All Events"
              : selectedDate
              ? `Events on ${formatDate(selectedDate)}`
              : "Select a date to view events"}
          </h2>

          {loading ? (
            <p className="text-gray-500">Loading events...</p>
          ) : filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-md shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 py-3 gap-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-12 w-12 rounded-md object-cover"
                  />
                  <div>
                    <h5 className="text-md font-semibold text-[#1B3139]">
                      {event.title}
                    </h5>
                    <p className="text-sm text-gray-500">
                      {formatDate(event.date)} • {event.venue}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedEvent(event);
                    setShowModal(true);
                  }}
                  className="text-sm cursor-pointer text-white bg-[#1FB58F] rounded-full px-4 py-1 self-start sm:self-auto"
                >
                  View
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">
              {showAll
                ? "No events available."
                : "No events found for this date."}
            </p>
          )}
        </div>
      </div>

      {/* Event Detail Modal */}
      {showModal && selectedEvent && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative animate-fadeIn">
            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 mb-3 cursor-pointer text-gray-600 hover:text-red-500 transition text-xl"
            >
              ✕
            </button>

            {/* Event Image */}
            <div className="overflow-hidden rounded-xl pt-2 mb-4">
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="w-full h-56 object-cover transform hover:scale-105 transition"
              />
            </div>

            {/* Event Info */}
            <h2 className="text-2xl font-bold text-[#1B3139] mb-3">
              {selectedEvent.title}
            </h2>
            <p className="text-gray-600 text-sm mb-1">
              📅 {formatDate(selectedEvent.date)}
            </p>
            <p className="text-gray-600 text-sm mb-1">
              📍 {selectedEvent.venue}
            </p>
            <p className="text-gray-600 text-sm mb-1">
              🎵 {selectedEvent.genre}
            </p>
            <p className="text-gray-600 text-sm mb-3">
              💰 ₹{selectedEvent.payment}
            </p>
            <p className="text-gray-700 text-base leading-relaxed">
              {selectedEvent.description}
            </p>
          </div>
        </div>
      )}
    </main>
  );
};

export default MyEvents;
