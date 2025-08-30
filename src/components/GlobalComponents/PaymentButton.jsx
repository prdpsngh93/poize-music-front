"use client";
import React, { useState } from "react";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";

// Stripe publishable key (safe for client)
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const PaymentButton = ({ amount, gigId }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const handlePayment = async () => {
    try {
      setIsProcessing(true);

      const stripe = await stripePromise;
      if (!stripe) {
        toast.error("Stripe SDK failed to load");
        return;
      }

      // Call your Next.js API route
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: amount * 100, // amount in paise
          gigId,
          userId: Cookies.get("userId"),
          userName: Cookies.get("userName"),
          userEmail: Cookies.get("userEmail"),
        }),
      });

      if (!res.ok) throw new Error("Failed to create checkout session");

      const { id } = await res.json();

      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({ sessionId: id });
      if (result.error) toast.error(result.error.message);
    } catch (err) {
      console.error("Stripe Payment Error:", err);
      toast.error("Payment failed. Try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <button
        onClick={handlePayment}
        disabled={isProcessing}
        className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
          isProcessing ? "bg-gray-400 text-white" : "bg-[#1FB58F] text-white"
        }`}
      >
        {isProcessing ? "Processing..." : `Pay & Book ₹${amount}`}
      </button>
    </div>
  );
};

export default PaymentButton;
