'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useAppContext } from '@/context/AppContext';

const UpcomingGigs = ({ limit = 5 }) => {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {setGigsTotalCount}= useAppContext()

  // Fetch gigs from API
  useEffect(() => {
    const fetchGigs = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const queryParams = new URLSearchParams({
          page: '1',
          limit: String(limit),
          // Add any additional filters if needed
          // genre: 'rock',
          // date: 'upcoming',
        });

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/venue-gigs?${queryParams}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setGigs(data?.items || []);
        setGigsTotalCount(data.totalItems)
      
      } catch (err) {
        console.error('Error fetching upcoming gigs:', err);
        setError(err.message);
        // Fallback to empty array on error
        setGigs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGigs();
  }, [limit]);

  // Format date function (adjust based on your API date format)
  const formatDate = (dateString) => {
    if (!dateString) return 'Date TBD';
    
    try {
      const date = new Date(dateString);
      const options = { 
        month: 'long', 
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      };
      return date.toLocaleDateString('en-US', options);
    } catch {
      return dateString; // Return original if parsing fails
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="bg-[#f4f3ee]">
        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
          {[...Array(limit)].map((_, index) => (
            <div
              key={index}
              className="w-[100%] sm:w-[45%] md:w-[30%] lg:w-[18.5%] overflow-hidden animate-pulse"
            >
              <div className="w-full h-[150px] md:h-[130px] lg:h-[100px] rounded-lg bg-gray-300"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-[#f4f3ee]">
        <div className="flex justify-center items-center py-8">
          <div className="text-center">
            <p className="text-red-600 mb-2">Failed to load upcoming gigs</p>
            <p className="text-gray-500 text-sm">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // No gigs state
  if (gigs.length === 0) {
    return (
      <div className="bg-[#f4f3ee]">
        <div className="flex justify-center items-center py-8">
          <div className="text-center">
            <p className="text-gray-600">No upcoming gigs found</p>
            <p className="text-gray-500 text-sm">Check back later for new opportunities</p>
          </div>
        </div>
      </div>
    );
  }

  // Main render
  return (
    <div className="bg-[#f4f3ee]">
      <div className="flex flex-wrap gap-4 justify-center md:justify-start">
        {gigs.map((gig) => (
          <div
            key={gig.id || gig._id}
            className="w-[100%] sm:w-[45%] md:w-[30%] lg:w-[18.5%] overflow-hidden cursor-pointer hover:transform hover:scale-105 transition-transform duration-200"
          >
            <div className="w-full h-[150px] md:h-[130px] lg:h-[100px] rounded-lg relative">
              <Image
                src={gig.gig_image || gig.imageUrl || '/images/cards1.png'}
                alt={gig.title || gig.name || 'Gig'}
                fill
                className="object-cover rounded-xl"
                onError={(e) => {
                  // Fallback image on error
                  e.target.src = '/images/cards1.png';
                }}
              />
            </div>
            <div className="p-4">
              <h3 className="text-sm text-gray-900 font-semibold truncate">
                {gig.gig_title || gig.name || 'Untitled Gig'}
              </h3>
              <p className="text-xs text-gray-600">
                {formatDate(gig.createdAt || gig.updatedAt )}
              </p>
              {gig.venue && (
                <p className="text-xs text-gray-500 truncate mt-1">
                  {gig.venue}
                </p>
              )}
              {gig.genre && (
                <span className="inline-block bg-[#1FB58F] text-white text-xs px-2 py-1 rounded-full mt-2">
                  {gig.genre}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingGigs;