"use client";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function StripeCheckoutForm({ amount, gigId, userEmail, currency = "inr",onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState(null);

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
              currency,
            }),
          }
        );

        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
        const data = await res.json();
        setClientSecret(data.clientSecret);
      } catch (err) {
        console.error("Error creating payment intent:", err);
        toast.error("Failed to initialize payment. Please try again.");
      }
    };

    if (amount && gigId) createPaymentIntent();
  }, [amount, gigId, userEmail, currency]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      toast.error("Payment system not ready. Please try again.");
      return;
    }

    setLoading(true);

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        toast.error(submitError.message || "Payment form validation failed");
        setLoading(false);
        return;
      }

      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}`,
        },
        redirect: "if_required",
      });

      if (error) {
        toast.error(error.message || "Payment failed");
      } else if (paymentIntent?.status === "succeeded") {
        toast.success("Payment successful!");
       await onSuccess(paymentIntent.id);
      }
    } catch (err) {
      console.error("Unexpected error during payment:", err);
      toast.error("An unexpected error occurred. Please try again.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
      {!clientSecret ? (
        <div className="flex items-center justify-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#5925DC]"></div>
          <span className="ml-2 text-sm text-gray-600">Initializing payment...</span>
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
