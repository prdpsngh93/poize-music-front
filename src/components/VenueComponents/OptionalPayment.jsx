'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { toast } from 'sonner';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ amount, promoCode, applicationId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    try {
      // Call backend to create payment intent
      const res = await fetch(
        `https://poize-music-backend-kn0u.onrender.com/api/stripe/create-payment-intent`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: amount * 100, currency: 'usd' }),
        }
      );

      const { clientSecret } = await res.json();

      const cardElement = elements.getElement(CardElement);
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });

      if (result.error) {
        toast(result.error.message);
      } else if (result.paymentIntent?.status === 'succeeded') {
        toast('✅ Payment successful!');
        router.push(`/venue-booking-confirm/${applicationId}`);
      }
    } catch (err) {
      console.error(err);
      toast('Payment failed, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="p-3 border rounded-md bg-white" />
      <button
        type="submit"
        disabled={loading || !stripe}
        className="bg-[#1FB58F] hover:bg-[#17a57e] text-white font-medium px-6 py-2 rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Processing...' : `Pay $${promoCode ? amount - 15 : amount}`}
      </button>
    </form>
  );
};

const OptionalPayment = () => {
  const params = useParams();
  const applicationId = params?.id;
  const [promoCode, setPromoCode] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('Credit Card');

  const methods = ['Credit Card', 'Digital Wallet', 'Bank Transfer'];

  const totalAmount = promoCode ? 135 : 150; // Example calculation

  return (
    <main className="bg-[#F9F9F7] min-h-screen px-4 md:px-10 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold mb-2">Optional Payment</h1>
        <p className="text-sm text-gray-500 mb-3">Step 3 of 4</p>

        {/* Payment Method */}
        <div className="mb-8">
          <h2 className="font-semibold text-black mb-4">Payment Method</h2>
          <div className="space-y-3">
            {methods.map((method) => (
              <label
                key={method}
                className={`flex items-center justify-between px-4 py-3 rounded-lg border ${
                  selectedMethod === method
                    ? 'border-gray-400'
                    : 'border-gray-300'
                } cursor-pointer`}
              >
                <span className="text-sm font-medium text-gray-800">{method}</span>
                <input
                  type="radio"
                  name="payment"
                  checked={selectedMethod === method}
                  onChange={() => setSelectedMethod(method)}
                />
              </label>
            ))}
          </div>
        </div>

        {/* Stripe Elements only for Card payments */}
        {selectedMethod === 'Credit Card' && (
          <Elements stripe={stripePromise}>
            <CheckoutForm
              amount={totalAmount}
              promoCode={promoCode}
              applicationId={applicationId}
            />
          </Elements>
        )}

        {/* Placeholder for Digital Wallets and Bank Transfers */}
        {selectedMethod !== 'Credit Card' && (
          <p className="text-sm text-gray-600">
            {selectedMethod} integration coming soon.
          </p>
        )}
      </div>
    </main>
  );
};

export default OptionalPayment;
