'use client';

import React from 'react';
import Image from 'next/image';
import { Plus, Heart, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

const FindArtistsCards = ({ artists = [] }) => {
  const handleConnect = (artist) => {
    // Implement connect functionality
    toast.success(`Connection request sent to ${artist.name}`);
    console.log('Connecting to artist:', artist);
  };

  const handleFavorite = (artist) => {
    // Implement favorite functionality
    toast.success(`${artist.name} added to favorites`);
    console.log('Adding to favorites:', artist);
  };

  const handleMessage = (artist) => {
    // Implement message functionality
    toast.success(`Opening chat with ${artist.name}`);
    console.log('Starting message with artist:', artist);
  };

  const handleViewProfile = (artist) => {
    // Navigate to artist profile
    console.log('Viewing profile:', artist);
    // You can use router.push here if needed
    // router.push(`/artist/${artist.id}`);
  };

  if (!artists || artists.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1 justify-items-center">
      {artists.map((artist) => (
        <div
          key={artist.id}
          className="w-full max-w-[250px] rounded-xl flex flex-col gap-3 items-center p-4"
        >
          <div className="w-[100px] h-[100px] relative mb-3">
            <Image
              src={artist.profile_picture || '/images/avatar.png'}
              alt={artist.name}
              fill
              className="object-cover rounded-full"
            />
          </div>
          
          <div className="flex flex-col justify-center items-center gap-1">
            <h3 className="text-sm font-semibold text-gray-800 text-center">
              {artist.name}
            </h3>
            <p className="text-sm text-gray-500 mb-3 text-center">
              {artist.genre}
            </p>
            {artist.location && artist.location !== "Not specified" && (
              <p className="text-xs text-gray-400 text-center">
                📍 {artist.location}
              </p>
            )}
          </div>
          
          <div className="flex justify-center space-x-2">
            <div className="flex flex-col items-center gap-1 text-[10px] text-gray-500">
              <button 
                onClick={() => handleConnect(artist)}
                className="bg-white rounded-full p-1 hover:bg-gray-100 transition-colors"
              >
                <Plus size={20} />
              </button>
              <span>Connect</span>
            </div>
            
            <div className="flex flex-col items-center gap-1 text-[10px] text-gray-500">
              <button 
                onClick={() => handleFavorite(artist)}
                className="bg-white rounded-full p-1 hover:bg-gray-100 transition-colors"
              >
                <Heart size={19} />
              </button>
              <span>Favourite</span>
            </div>
            
            <div className="flex flex-col items-center gap-1 text-[10px] text-gray-500">
              <button 
                onClick={() => handleMessage(artist)}
                className="bg-white rounded-full p-1 hover:bg-gray-100 transition-colors"
              >
                <MessageSquare size={19} />
              </button>
              <span>Message</span>
            </div>
          </div>

          <button 
            onClick={() => handleViewProfile(artist)}
            className="bg-emerald-500 text-white px-4 py-1 rounded-full text-sm hover:bg-emerald-600 transition"
          >
            View Profile
          </button>
        </div>
      ))}
    </div>
  );
};

export default FindArtistsCards;