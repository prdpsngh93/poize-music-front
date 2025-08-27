'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import BackButton from '../common/BackButton';
import PaymentButton from '../common/PaymentButton';

export default function ConfirmBookingPage() {
  const [agreed, setAgreed] = useState(false);
  const [gig, setGig] = useState(null);
  const [loading, setLoading] = useState(true);

  // New states for input fields
  const [performanceTerms, setPerformanceTerms] = useState('');
  const [cancellationPolicy, setCancellationPolicy] = useState('');
  const [paymentTerms, setPaymentTerms] = useState('');

  const params = useParams();
  const gigId = params?.slug;

  useEffect(() => {
    const fetchGig = async () => {
      if (!gigId) return;
      try {
        const res = await axios.get(
          `https://poize-music-backend-kn0u.onrender.com/api/contributor-gigs/${gigId}`
        );
        setGig(res.data);
      } catch (error) {
        console.error('Error fetching gig details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGig();
  }, [gigId]);

  return (
    <div className="bg-[#F3F2EB] min-h-screen text-[#121212] font-sans">
      <div className="max-w-5xl mx-auto px-4 md:px-9 lg:px-12 py-10 space-y-10">
        {/* Page Heading */}
        <div className="flex items-center gap-2 mb-6">
          <BackButton route={'/manage-created-gigs'} />
          <h1 className="text-2xl md:text-3xl font-bold">Confirm Booking</h1>
        </div>

        {/* Loader */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#1FB58F] border-solid"></div>
          </div>
        )}

        {/* If no gig and not loading */}
        {!loading && !gig && (
          <div className="p-6 text-center text-gray-600">Gig not found.</div>
        )}

        {/* Show Gig Details once loaded */}
        {!loading && gig && (
          <>
            {/* Gig Details */}
            <div>
              <h2 className="font-semibold pl-3 mb-3">Gig Details</h2>
              <div className="rounded-md text-sm">
                {[
                  ['Gig Title', gig.gig_title],
                  ['Date', gig.date],
                  ['Time', gig.time],
                  ['Pay', `$${gig.payment}`],
                  ['Venue', gig.venue_type],
                ].map(([label, value], index) => (
                  <div
                    key={index}
                    className="grid grid-cols-2 md:grid-cols-5 border-b last:border-none border-gray-300"
                  >
                    <div className="col-span-2 px-4 py-3 font-medium">{label}</div>
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
                  src={gig.artist?.image_url || '/images/avatar.png'}
                  alt={gig.artist?.name || 'Artist'}
                  width={80}
                  height={80}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{gig.artist?.name || 'Unknown'}</p>
                  <p className="text-sm text-gray-500">{gig.genre || 'No genre info'}</p>
                  <p className="text-sm text-gray-500">
                    {gig.artist?.rating
                      ? `${gig.artist.rating} • ${gig.artist.total_gigs} gigs`
                      : 'No rating'}
                  </p>
                </div>
              </div>
            </div>

            {/* Review Terms */}
            <div>
              <h2 className="font-semibold mb-4">Review and Confirm Terms</h2>
              <div className="flex flex-col md:flex-row gap-6">
                <textarea
                  value={performanceTerms}
                  onChange={(e) => setPerformanceTerms(e.target.value)}
                  className="w-full md:w-1/2 h-32 bg-white rounded-md border border-none p-3 text-sm resize-none"
                  placeholder="Enter performance terms..."
                />
                <div className="flex flex-col w-full md:w-1/2 gap-4">
                  <div>
                    <label className="text-sm block mb-1 font-medium">Cancellation Policy</label>
                    <input
                      type="text"
                      value={cancellationPolicy}
                      onChange={(e) => setCancellationPolicy(e.target.value)}
                      placeholder="Enter cancellation policy"
                      className="w-full border bg-white border-none rounded-full px-4 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-sm block mb-1 font-medium">Payment Terms</label>
                    <input
                      type="text"
                      value={paymentTerms}
                      onChange={(e) => setPaymentTerms(e.target.value)}
                      placeholder="Enter payment terms"
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
              <div className="flex items-end justify-end w-full">
                <PaymentButton  
                  agreed={agreed} 
                  amount={gig.payment} 
                  gigId={gigId} 
                  performanceTerms={performanceTerms}
                  cancellationPolicy={cancellationPolicy}
                  paymentTerms={paymentTerms}
                  key={gigId} 
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
