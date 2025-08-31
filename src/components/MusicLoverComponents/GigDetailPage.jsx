"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { MapPin, Calendar, Share2 } from "lucide-react";
import PaymentButton from "@/components/GlobalComponents/PaymentButton";
import Cookies from "js-cookie";
import { toast } from "sonner";
import BackButton from "../GlobalComponents/BackButton";
import StripeCheckoutForm from "@/app/(musician)/music-lover-gigs-detail/StripeCheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const GigDetailDynamicPage = () => {
  const { id } = useParams(); // dynamic id from route
  const [gig, setGig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAlreadyBooked, setIsAlreadyBooked] = useState(false);
  const [bookingCheckLoading, setBookingCheckLoading] = useState(true);
  const [stripeOptions, setStripeOptions] = useState(null);
  const router = useRouter();

  // Fetch gig data
  useEffect(() => {
    const fetchGig = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/contributor-gigs/${id}`
        );
        const data = await res.json();
        setGig(data);
        
        // Set Stripe options based on gig payment amount
        if (data.payment > 0) {
          setStripeOptions({
            mode: "payment",
            currency: "inr", // ✅ Ensure this matches your backend
            amount: data.payment * 100,
          });
        }
      } catch (err) {
        console.error("Error fetching gig:", err);
        setGig(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchGig();
  }, [id]);

  // Check if user has already booked this gig
  useEffect(() => {
    const checkExistingBooking = async () => {
      const musicLoverId = Cookies.get("userId");
      if (!musicLoverId || !id) {
        setBookingCheckLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/contributor-gigs-requests?music_lover_id=${musicLoverId}`
        );
        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);

        const data = await res.json();
        const bookings = data?.data || [];

        // Check if current gig is already booked by this user
        const existingBooking = bookings.find(
          (booking) => booking.gig_id === id
        );

        if (existingBooking) {
          setIsAlreadyBooked(true);
        }
      } catch (err) {
        console.error("Error checking existing bookings:", err);
      } finally {
        setBookingCheckLoading(false);
      }
    };

    checkExistingBooking();
  }, [id]);

  // Book gig API (for free gigs)
  const handleBook = async () => {
    try {
      const musicLoverId = Cookies.get("userId");

      if (!musicLoverId) {
        alert("Please login to book this gig");
        return;
      }

      if (isAlreadyBooked) {
        toast("You have already booked this gig!");
        return;
      }

      const bookingData = {
        gigId: gig.id,
        music_lover_id: musicLoverId,
        payment_id: null,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/contributor-gigs-requests`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingData),
        }
      );

      if (!res.ok) throw new Error("Failed to book gig");

      setIsAlreadyBooked(true); // Update local state
      toast("Gig booked successfully!");
      router.push("/music-lover-myevent");
    } catch (err) {
      console.error("Booking failed", err);
      alert("Failed to book gig. Please try again.");
    }
  };

  if (loading || bookingCheckLoading) return <p className="p-10">Loading...</p>;
  if (!gig) return <p className="p-10">Gig not found</p>;

  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

  return (
    <main className="bg-[#f4f3ee] min-h-screen px-4 md:px-9 lg:px-12 py-10">
      <div className="max-w-5xl mx-auto flex flex-col gap-10">
        <BackButton />
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

        {/* Booking Status Banner */}
        {isAlreadyBooked && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
            ✅ You have already booked this gig!
          </div>
        )}

        {/* Payment/Book Button */}
        {!isAlreadyBooked && (
          <div className="flex gap-4 w-full">
            {gig.payment > 0 && stripeOptions ? (
              <Elements stripe={stripePromise} options={stripeOptions}>
                <StripeCheckoutForm 
                  amount={gig.payment} 
                  gigId={gig.id} 
                  userEmail={Cookies.get("userEmail")} 
                />
              </Elements>
            ) : gig.payment > 0 ? (
              <div className="flex items-center justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#5925DC]"></div>
                <span className="ml-2 text-sm text-gray-600">Loading payment...</span>
              </div>
            ) : (
              <button
                onClick={handleBook}
                disabled={isAlreadyBooked}
                className={`rounded-full px-6 py-2 font-medium transition-colors ${
                  isAlreadyBooked
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-[#5925DC] text-white hover:bg-[#4a1fb8]"
                }`}
              >
                {isAlreadyBooked ? "Already Booked" : "Book Gig"}
              </button>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default GigDetailDynamicPage;