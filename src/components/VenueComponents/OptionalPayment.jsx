// pages/OptionalPayment.js
'use client';
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

const OptionalPayment = () => {
  const params = useParams();
  const router = useRouter();
  const applicationId = params?.id;
  
  const [selectedMethod, setSelectedMethod] = useState('Credit Card');
  const [promoCode, setPromoCode] = useState('');
  const [loading, setLoading] = useState(false);

  const methods = ['Credit Card', 'Digital Wallet', 'Bank Transfer'];

  // Razorpay Payment Integration
  const handleRazorpayPayment = () => {
    setLoading(true);

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Your Razorpay Key ID
      amount: 15000, // Amount in paise (₹150.00)
      currency: 'INR',
      name: 'Music Booking Platform',
      description: 'Booking Fee Payment',
      order_id: '', // You should create order from backend
      handler: function (response) {
        // Payment successful
        console.log('Payment successful:', response);
        
        // Navigate to booking confirmation
        router.push(`/venue-booking-confirm/${applicationId}`);
      },
      prefill: {
        name: '',
        email: '',
        contact: ''
      },
      theme: {
        color: '#1FB58F'
      },
      modal: {
        ondismiss: function() {
          setLoading(false);
          console.log('Payment cancelled');
        }
      }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const handleConfirmPayment = () => {
    handleRazorpayPayment();
  };

  // Load Razorpay script
  React.useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <main className="bg-[#F9F9F7] min-h-screen px-4 md:px-10 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <h1 className="text-2xl font-semibold text-black mb-1">Optional Payment</h1>
        <p className="text-sm text-gray-500 mb-3">Step 3 of 4</p>

        {/* Progress bar */}
        <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden mb-8">
          <div className="h-full w-3/4 bg-black transition-all duration-300"></div>
        </div>

        {/* Info */}
        <p className="text-sm text-gray-700 mb-6">
          This booking requires a payment of <strong>₹150.00</strong>. Please review the breakdown and choose your
          preferred payment method.
        </p>

        {/* Payment Breakdown */}
        <div className="rounded-xl py-6 mb-6">
          <h2 className="font-semibold text-black mb-4">Payment Breakdown</h2>
          <div className="flex justify-between text-sm text-gray-700 border-b border-gray-200 pb-3 mb-3">
            <span>Booking Fee</span>
            <span>₹130.00</span>
          </div>
          <div className="flex justify-between text-sm text-gray-700 border-b border-gray-200 pb-3 mb-3">
            <span>Service Fee</span>
            <span>₹20.00</span>
          </div>
          {promoCode && (
            <div className="flex justify-between text-sm text-green-600 border-b border-gray-200 pb-3 mb-3">
              <span>Promo Discount</span>
              <span>-₹15.00</span>
            </div>
          )}
          <div className="flex justify-between text-sm text-black font-semibold">
            <span>Total</span>
            <span>₹{promoCode ? '135.00' : '150.00'}</span>
          </div>
        </div>

        {/* Promo Code */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Enter Promo Code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 rounded-full border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1FB58F] mr-2"
          />
          <button 
            className="mt-2 md:mt-0 bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded-full text-sm font-medium transition"
            onClick={() => {
              if (promoCode.toLowerCase() === 'discount10') {
                alert('Promo code applied successfully!');
              } else {
                alert('Invalid promo code');
                setPromoCode('');
              }
            }}
          >
            Apply
          </button>
        </div>

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
                } cursor-pointer transition`}
              >
                <span className="text-sm font-medium text-gray-800">{method}</span>
                <input
                  type="radio"
                  name="payment"
                  checked={selectedMethod === method}
                  onChange={() => setSelectedMethod(method)}
                  className="accent-[#121417]"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Razorpay Payment Button */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <h3 className="font-medium text-blue-900">Secure Payment with Razorpay</h3>
          </div>
          <p className="text-sm text-blue-700 mb-3">
            Pay securely using UPI, Cards, NetBanking, and Wallets
          </p>
          <button
            onClick={handleConfirmPayment}
            disabled={loading}
            className="bg-[#1FB58F] hover:bg-[#17a57e] text-white font-medium px-6 py-2 rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            )}
            Pay ₹{promoCode ? '135.00' : '150.00'} with Razorpay
          </button>
        </div>

        {/* Alternative: Skip Payment */}
        <div className="text-center">
          <button
            onClick={() => router.push(`/booking-confirmed/${applicationId}`)}
            className="text-gray-600 hover:text-gray-800 text-sm underline transition"
          >
            Skip Payment (Pay Later)
          </button>
        </div>
      </div>
    </main>
  );
};

export default OptionalPayment;