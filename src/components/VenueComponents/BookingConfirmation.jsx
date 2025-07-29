'use client';
import React from 'react';
import { CheckCircle } from 'lucide-react';

const BookingConfirmation = () => {
  return (
    <main className="bg-[#F9F9F7] min-h-screen px-4 md:px-10 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h1 className="text-2xl font-semibold text-black mb-1">Booking Confirmation</h1>
        <p className="text-sm text-gray-500 mb-3">Step 4 of 4</p>

        {/* Progress bar */}
        <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden mb-8">
          <div className="h-full w-full bg-black transition-all duration-300"></div>
        </div>

        {/* Success Icon */}
        <div className="flex flex-col items-center justify-center text-center mb-8">
          <CheckCircle className="text-green-500 w-14 h-14 mb-3" />
          <h2 className="text-xl font-semibold text-black">Booking Confirmed!</h2>
        </div>

        {/* Booking Details */}
        <div className=" py-6 flex flex-col md:flex-row gap-[20%] items-center md:items-start justify-between mb-10">
          <img
            src='/images/bookingconfirm.png'
            alt="Artist"
            className="w-full md:w-1/3 h-40 object-cover rounded-lg"
          />
          <div className="flex-1 mt-10 md:mt-0">
            <p className="font-semibold text-sm text-black mb-1">
              Gig Title: Acoustic Evening with Sarah
            </p>
            <p className="text-sm text-gray-700 mb-1">
              Date: July 30, 2024 | Time: 7:00 PM - 9:00 PM | Location: The Cozy Corner Café
            </p>
            <p className="text-sm text-gray-500">Booking ID: 738102145</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button className="bg-[#1FB58F] hover:bg-[#17a57e] text-white font-medium px-6 py-2 rounded-full transition">
            Message Artist
          </button>
          <button className="bg-black hover:bg-gray-800 text-white font-medium px-6 py-2 rounded-full transition">
            View Booking
          </button>
        </div>
      </div>
    </main>
  );
};

export default BookingConfirmation;
