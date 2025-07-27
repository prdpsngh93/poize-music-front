'use client';
import React, { useState } from 'react';
import Image from 'next/image';

const BookingTerms = () => {
  const [terms, setTerms] = useState({
    policy: false,
    contract: false,
    rules: false,
  });

  const handleToggle = (key) => {
    setTerms((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <main className="bg-[#F9F9F7] min-h-screen px-4 md:px-10 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <h1 className="text-2xl font-semibold text-black mb-2">Booking Terms</h1>
        <p className="text-sm text-gray-500 mb-3">Step 2 of 4</p>

        {/* Progress bar */}
        <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden mb-6">
          <div className="h-full w-1/2 bg-black transition-all duration-300"></div>
        </div>

        {/* Banner image */}
        <div className="w-full h-48 md:h-50 relative overflow-hidden rounded-xl mb-8">
          <Image
            src="/images/booking-terms.png" // Replace with your actual image path
            alt="Guitarist"
            fill
            className="object-cover"
          />
        </div>

        {/* Terms checkboxes */}
        <div className="mb-10">
          <h2 className="text-base font-semibold text-black mb-4">Terms and Conditions</h2>
          <div className="flex flex-col gap-4">
            <label className="flex items-start gap-3 text-sm text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={terms.policy}
                onChange={() => handleToggle('policy')}
                className="mt-1 accent-black"
              />
              <span>
                I agree to the cancellation policy, which allows cancellations up to 24 hours before the session.
              </span>
            </label>
            <label className="flex items-start gap-3 text-sm text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={terms.contract}
                onChange={() => handleToggle('contract')}
                className="mt-1 accent-black"
              />
              <span>
                I acknowledge that the contract details have been reviewed and accepted.
              </span>
            </label>
            <label className="flex items-start gap-3 text-sm text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={terms.rules}
                onChange={() => handleToggle('rules')}
                className="mt-1 accent-black"
              />
              <span>
                I agree to abide by the platform’s rules and guidelines during the session.
              </span>
            </label>
          </div>
        </div>

        {/* Next button */}
        <div className="flex justify-end">
          <button className="bg-[#1FB58F] hover:bg-[#17a57e] text-white font-medium px-8 py-2 rounded-full transition">
            Next
          </button>
        </div>
      </div>
    </main>
  );
};

export default BookingTerms;
