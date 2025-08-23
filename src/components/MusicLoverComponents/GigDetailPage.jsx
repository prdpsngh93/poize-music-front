"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { MapPin, Calendar, Share2 } from "lucide-react";
import PaymentButton from "@/components/GlobalComponents/PaymentButton";
import Cookies from "js-cookie";

const GigDetailDynamicPage = () => {
  const { id } = useParams(); // dynamic id from route
  const [gig, setGig] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch gig data
  useEffect(() => {
    const fetchGig = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/contributor-gigs/${id}`
        );
        if (!res.ok) throw new Error("Failed to fetch gig");
        const data = await res.json();
        setGig(data);
      } catch (err) {
        console.error("Error fetching gig:", err);
        setGig(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchGig();
  }, [id]);

  // Book gig API (for free gigs)
  const handleBook = async () => {
    try {
      const musicLoverId = Cookies.get("userId");
      
      if (!musicLoverId) {
        alert("Please login to book this gig");
        return;
      }

      const bookingData = {
        gigId: gig.id,
        music_lover_id: musicLoverId,
        payment_id: null
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/contributor-gigs-requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      if (!res.ok) throw new Error("Failed to book gig");
      
      alert("Gig booked successfully!");
    } catch (err) {
      console.error("Booking failed", err);
      alert("Failed to book gig. Please try again.");
    }
  };

  if (loading) return <p className="p-10">Loading...</p>;
  if (!gig) return <p className="p-10">Gig not found</p>;

  return (
    <main className="bg-[#f4f3ee] min-h-screen px-4 md:px-9 lg:px-12 py-10">
      <div className="max-w-5xl mx-auto flex flex-col gap-10">
        {/* Title */}
        <h1 className="text-2xl font-bold">{gig.gig_title}</h1>

        {/* Image */}
        <img
          src={gig.attachment_url || "/images/gig-detail-main.png"}
          alt={gig.gig_title}
          className="rounded-xl w-full object-cover h-60"
        />

        {/* Venue */}
        <div className="bg-white rounded-lg px-4 py-3 flex items-center gap-3 shadow-sm">
          <MapPin className="text-[#121417] w-5 h-5" />
          <div>
            <span className="text-xs block text-gray-400">Venue</span>
            <span className="text-sm text-[#121417]">{gig.venue_type}</span>
          </div>
        </div>

        {/* Date & Time */}
        <div className="bg-white rounded-lg px-4 py-3 flex items-center gap-3 shadow-sm">
          <Calendar className="text-[#121417] w-5 h-5" />
          <div>
            <span className="text-xs block text-gray-400">Date & Time</span>
            <span className="text-sm text-[#121417]">
              {gig.date} - {gig.time}
            </span>
          </div>
        </div>

        {/* Description */}
        <section>
          <h3 className="text-sm font-semibold">About</h3>
          <p className="text-sm text-gray-600">{gig.description}</p>
        </section>

        {/* Payment/Book Button */}
        <div className="flex gap-4">
          {gig.payment > 0 ? (
            <PaymentButton 
              amount={gig.payment} 
              gigId={gig.id}
            />
          ) : (
            <button
              onClick={handleBook}
              className="bg-[#5925DC] text-white rounded-full px-6 py-2 font-medium hover:bg-[#4a1fb8] transition-colors"
            >
              Book Gig
            </button>
          )}
        </div>
      </div>
    </main>
  );
};

export default GigDetailDynamicPage;