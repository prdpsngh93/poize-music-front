"use client";
import React, { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function CheckoutForm({
  agreed,
  gigId,
  musicianId,
  performanceTerms,
  cancellationPolicy,
  paymentTerms,
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // no redirect page, we’ll handle after confirmation
        return_url: `${window.location.origin}/payment-success`,
      },
      redirect: "if_required",
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    try {
      // ✅ Call backend to update gig status
      await axios.post(
        `https://poize-music-backend-kn0u.onrender.com/api/venue-gigs/status`,
        {
          artist_id: musicianId,
          gig_id: gigId,
          status: "completed",
          performance_terms: performanceTerms,
          cancellation_policy: cancellationPolicy,
          payment_terms: paymentTerms,
        }
      );
      toast.success("Gig status updated successfully!");
      router.push("/manage-created-gigs");
    } catch (err) {
      console.error("Error updating gig:", err.response || err);
      toast.error(err.response?.data?.message || "Failed to update gig status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 w-full rounded-lg shadow-md space-y-4"
    >
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || loading || !agreed}
        className={`w-full px-4 py-2 rounded-lg font-medium transition ${
          loading || !agreed
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[#1FB58F] hover:bg-[#17a976] text-white"
        }`}
      >
        {loading ? "Processing..." : "Pay & Complete"}
      </button>
    </form>
  );
}
