"use client";
import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./StripeCheckoutForm";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function StripePaymentForm({ amount, gigId,musicianId, userEmail,agreed }) {
  const [clientSecret, setClientSecret] = useState("");
  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/stripe/create-payment-intent`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              amount: amount * 100, // Stripe needs amount in cents
              gigId,
              userEmail,
            }),
          }
        );

        const data = await res.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error("Error creating payment intent:", error);
      }
    };

    if (amount && gigId && userEmail) {
      createPaymentIntent();
    }
  }, [amount, gigId, userEmail]);

  if (!clientSecret) return <p>Loading payment form...</p>;

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm 
      
      agreed={agreed}
      gigId={gigId}
      musicianId={musicianId}
      
      />
    </Elements>
  );
}
