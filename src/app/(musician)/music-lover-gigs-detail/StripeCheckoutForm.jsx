"use client";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function StripeCheckoutForm({
  amount,
  gigId,
  userEmail,
  currency = "inr",
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState(null);
  const [paymentIntentId, setPaymentIntentId] = useState(null);

  // 🔹 Step 1: Create PaymentIntent on backend and get clientSecret
  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/stripe/create-payment-intent`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              amount: amount * 100,
              gigId,
              userEmail,
              currency: "usd",
            }),
          }
        );

        if (!res.ok) {
          throw new Error(`HTTP Error: ${res.status}`);
        }

        const data = await res.json();
        setClientSecret(data.clientSecret);
        setPaymentIntentId(data.paymentIntentId); // Store the payment intent ID
      } catch (err) {
        console.error("Error creating payment intent:", err);
        toast.error("Failed to initialize payment. Please try again.");
      }
    };

    if (amount && gigId) {
      createPaymentIntent();
    }
  }, [amount, gigId, userEmail]);

  // 🔹 Step 2: Handle form submit with proper elements.submit() call
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      toast.error("Payment system not ready. Please try again.");
      return;
    }

    setLoading(true);

    try {
      // 🔹 CRITICAL: Submit the form first
      const { error: submitError } = await elements.submit();

      if (submitError) {
        console.error("Form submission error:", submitError);
        toast.error(submitError.message || "Payment form validation failed");
        setLoading(false);
        return;
      }

      // 🔹 Now confirm the payment with clientSecret
      const { error: confirmError } = await stripe.confirmPayment({
        elements,
        clientSecret, // ✅ Required for confirmPayment
        confirmParams: {
          return_url: `${window.location.origin}/dashboard?gigId=${gigId}&payment_intent=${paymentIntentId}`,
        },
      });

      if (confirmError) {
        console.error("Payment confirmation error:", confirmError);
        toast.error(
          confirmError.message || "Payment failed. Please try again."
        );
        setLoading(false);
      }
      // If successful, Stripe will redirect to return_url
    } catch (err) {
      console.error("Unexpected error during payment:", err);
      toast.error("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
      {/* Show loading state while clientSecret is being fetched */}
      {!clientSecret ? (
        <div className="flex items-center justify-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#5925DC]"></div>
          <span className="ml-2 text-sm text-gray-600">
            Initializing payment...
          </span>
        </div>
      ) : (
        <PaymentElement />
      )}

      <button
        type="submit"
        disabled={loading || !stripe || !elements || !clientSecret}
        className="rounded-full bg-[#5925DC] text-white px-6 py-2 font-medium hover:bg-[#4a1fb8] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Processing...
          </span>
        ) : (
          `Pay ${amount}`
        )}
      </button>
    </form>
  );
}
