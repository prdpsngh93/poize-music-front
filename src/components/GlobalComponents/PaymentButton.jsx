"use client";
import React, { useState } from "react";
import { toast } from "sonner";
import Cookies from "js-cookie";

const PaymentButton = ({ amount, gigId }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  // Book gig API after payment
  const bookGig = async (paymentId) => {
    try {
      const musicLoverId = Cookies.get("userId");
      
      if (!musicLoverId) {
        toast.error("Please login to book this gig");
        return;
      }

      const bookingData = {
        gig_id: gigId,
        music_lover_id: musicLoverId,
        payment_id: paymentId
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/contributor-gigs-requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      if (!res.ok) throw new Error("Failed to book gig");
      
      toast.success("🎉 Gig booked successfully!");
      setIsBooked(true);
    } catch (err) {
      console.error("Booking failed", err);
      toast.error("Failed to book gig. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };
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
        console.log("Payment response:", response);
        toast.success("✅ Payment Successful!");
        
        // Automatically book the gig after successful payment
        bookGig(response.razorpay_payment_id);
      },

      modal: {
        ondismiss: function() {
          toast.error("Payment cancelled");
          setIsProcessing(false);
        }
      },

      prefill: {
        name: name,
        email: email,
      },
      notes: {
        user_id: userId,
      },
      theme: {
        color: "#5925DC",
      },
    };
    
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
     
      <button
        onClick={handlePayment}
        disabled={isProcessing || isBooked}
        className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
          isBooked 
            ? "bg-green-600 text-white cursor-not-allowed" 
            : isProcessing 
            ? "bg-gray-400 text-white cursor-not-allowed" 
            : "bg-[#1FB58F]  text-white"
        }`}
      >
        {isBooked 
          ? "✅ Gig Booked!" 
          : isProcessing 
          ? "Processing..." 
          : `Pay & Book ₹${amount}`
        }
      </button>
    </div>
  );
};

export default PaymentButton;