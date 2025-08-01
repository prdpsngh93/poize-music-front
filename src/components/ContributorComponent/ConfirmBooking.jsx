'use client';
import Image from 'next/image';
import { useState } from 'react';

export default function ConfirmBookingPage() {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="bg-[#F3F2EB] min-h-screen  text-[#121212] font-sans">
      <div className="max-w-5xl mx-auto px-4 md:px-9 lg:px-12 py-10 space-y-10">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold">Confirm Booking</h1>

        {/* Gig Details */}
        <div>
          <h2 className="font-semibold mb-3">Gig Details</h2>
          <div className=" rounded-md text-sm">
            {[
              ['Gig Title', 'Summer Music Festival'],
              ['Date', 'July 20, 2024'],
              ['Time', '7:00 PM – 11:00 PM'],
              ['Pay', '$500'],
              ['Venue', 'The Local Pub'],
            ].map(([label, value], index) => (
              <div
                key={index}
                className="grid grid-cols-2 md:grid-cols-5 border-b last:border-none border-gray-300"
              >
                <div className="col-span-2 px-4 py-3  font-medium">
                  {label}
                </div>
                <div className="col-span-3 text-end px-4 py-3">{value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Artist Information */}
        <div>
          <h2 className="font-semibold mb-4">Artist Information</h2>
          <div className="flex items-center gap-4">
            <Image
              src="/images/avatar.png" // Use your image or placeholder
              alt="Artist"
              width={80}
              height={80}
              className="rounded-full object-cover"
            />
            <div>
              <p className="font-semibold">Ethan Carter</p>
              <p className="text-sm text-gray-500">Guitarist | Rock</p>
              <p className="text-sm text-gray-500">4.8 • 120 gigs</p>
            </div>
          </div>
        </div>

        {/* Review Terms */}
        <div>
          <h2 className="font-semibold mb-4">Review and Confirm Terms</h2>
          <div className="flex flex-col md:flex-row gap-6">
            <textarea
              className="w-full md:w-1/2 h-32 bg-white rounded-md border border-none p-3 text-sm resize-none"
              placeholder="Enter performance terms..."
            />
            <div className="flex flex-col w-full md:w-1/2 gap-4">
              <div>
                <label className="text-sm block mb-1 font-medium">Cancellation Policy</label>
                <input
                  type="text"
                  placeholder="Lorem ipsum"
                  className="w-full border bg-white border-none rounded-full px-4 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-sm block mb-1 font-medium">Payment Terms</label>
                <input
                  type="text"
                  placeholder="Lorem ipsum"
                  className="w-full border bg-white border-none rounded-full px-4 py-2 text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Checkbox */}
        <div className="mt-4">
          <label className="flex items-start text-sm gap-2">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1"
            />
            I agree to the terms and conditions
          </label>
        </div>

        {/* Final Confirmation */}
        <div>
          <p className="text-sm text-gray-700 mb-4">Notify artist upon confirmation</p>
          <div className='flex items-end justify-end w-full '>
          <button
            disabled={!agreed}
            className={`px-8 py-2.5 rounded-full text-white text-sm font-medium transition ${
              agreed ? 'bg-[#1FB58F] hover:bg-[#17a976]' : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Confirm Booking
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}
