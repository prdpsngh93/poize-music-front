'use client';
import React, { useState } from 'react';

const OptionalPayment = () => {
  const [selectedMethod, setSelectedMethod] = useState('Credit Card');

  const methods = ['Credit Card', 'Digital Wallet', 'Bank Transfer'];

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
          This booking requires a payment of <strong>$150.00</strong>. Please review the breakdown and choose your
          preferred payment method.
        </p>

        {/* Payment Breakdown */}
        <div className=" rounded-xl py-6 mb-6">
          <h2 className="font-semibold text-black mb-4">Payment Breakdown</h2>
          <div className="flex justify-between text-sm text-gray-700 border-b border-gray-200 pb-3 mb-3">
            <span>Booking Fee</span>
            <span>$130.00</span>
          </div>
          <div className="flex justify-between text-sm text-gray-700 border-b border-gray-200 pb-3 mb-3">
            <span>Service Fee</span>
            <span>$20.00</span>
          </div>
          <div className="flex justify-between text-sm text-black font-semibold">
            <span>Total</span>
            <span>$150.00</span>
          </div>
        </div>

        {/* Promo Code */}
        <input
          type="text"
          placeholder="Promo Code"
          className="w-full md:w-1/2 px-4 py-2 rounded-full border bg-white border-gray-300 mb-6 focus:outline-none focus:ring-2 focus:ring-[#1FB58F]"
        />

        {/* Payment Method */}
        <div className="mb-8">
          <h2 className="font-semibold text-black mb-4">Payment Method</h2>
          <div className="space-y-3">
            {methods.map((method) => (
              <label
                key={method}
                className={`flex items-center justify-between px-4 py-3 rounded-lg border ${
                  selectedMethod === method
                    ? 'border-gray-400 '
                    : 'border-gray-300 '
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

        {/* Confirm Button */}
        <div className="flex justify-end">
          <button className="bg-[#1FB58F] hover:bg-[#17a57e] text-white font-medium px-8 py-2 rounded-full transition">
            Confirm Payment
          </button>
        </div>
      </div>
    </main>
  );
};

export default OptionalPayment;
