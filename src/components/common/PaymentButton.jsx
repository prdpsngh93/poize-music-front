"use client";
import React, { useState } from "react";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import axios from "axios";

const PaymentButton = ( {amount, gigId, agreed, performanceTerms, cancellationPolicy, paymentTerms }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const router = useRouter();

  // Update gig status API after payment
  const updateGigStatus = async () => {
    try {
      const artistId = Cookies.get("id");
      if (!artistId) {
        toast.error("No artist ID found");
        return;
      }

      console.log("Updating gig status", {
        artist_id: artistId,
        gig_id: gigId,
        status: "completed",
      });

      await axios.post(
        `https://poize-music-backend-kn0u.onrender.com/api/venue-gigs/status`,
        {
          artist_id: `${artistId}`,
          gig_id: `${gigId}`,
          status: "completed",
           performance_terms: performanceTerms,
        cancellation_policy: cancellationPolicy,
        payment_terms: paymentTerms,
        }
      );

      toast.success("Gig status updated successfully!");
      setIsBooked(true);
      router.push("/manage-created-gigs");
    } catch (err) {
      console.error("Error updating gig:", err.response || err);
      toast.error(err.response?.data?.message || "Failed to update gig status");
    } finally {
      setIsProcessing(false);
    }
  };

  // Razorpay Payment Handler
  const handlePayment = () => {
    if (!window.Razorpay) {
      toast.error("Razorpay SDK failed to load. Please try again later.");
      return;
    }

    setIsProcessing(true);

    const name = Cookies.get("userName") || "Guest User";
    const email = Cookies.get("userEmail") || "guest@example.com";
    const userId = Cookies.get("userId") || "anonymous";

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: amount * 100,
      currency: "INR",
      name: "Music App",
      description: "Payment for gig booking",
      handler: function (response) {
        toast.success("✅ Payment Successful!");
        updateGigStatus(response.razorpay_payment_id);
      },
      modal: {
        ondismiss: function () {
          toast.error("Payment cancelled");
          setIsProcessing(false);
        },
      },
      prefill: { name, email },
      notes: { user_id: userId },
      theme: { color: "#5925DC" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <button
      onClick={handlePayment}
      disabled={!agreed || isProcessing || isBooked}
      className={`px-8 py-2.5 rounded-full text-white text-sm font-medium transition w-full md:w-auto ${
        isBooked
          ? "bg-green-600 cursor-not-allowed"
          : isProcessing
          ? "bg-gray-400 cursor-not-allowed"
          : agreed
          ? "bg-[#1FB58F] hover:bg-[#17a976]"
          : "bg-gray-300 cursor-not-allowed"
      }`}
    >
      {isBooked
        ? "✅ Gig Completed!"
        : isProcessing
        ? "Processing..."
        : `Pay & Complete ₹${amount}`}
    </button>
  );
};

export default PaymentButton;
