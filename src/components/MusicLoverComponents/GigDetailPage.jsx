'use client';
import React, { useState } from 'react';
import MapLocation from '../VenueComponents/MapComponet';
import UpcomingEvents from './UpcomingEvents';
import LineupSection from './LineupSection';

import { MapPin, Calendar } from 'lucide-react';
import { Share2 } from 'lucide-react';
const GigDetailsPage = () => {
  const [position, setPosition] = useState([37.7749, -122.4194]);
  const [address, setAddress] = useState('');

  return (
   <main className="bg-[#f4f3ee] min-h-screen px-4 md:px-9 lg:px-12 py-10">
      <div className="max-w-5xl mx-auto flex flex-col gap-10">
      {/* Header */}
      <h1 className="text-2xl font-bold text-[#121417]">Gig Details</h1>
      <img src="/images/gig-detail-main.png" alt="Gig" className="rounded-xl w-full object-cover h-60" />

      {/* Title and Meta */}
      <div className="space-y-4">
      {/* Title & Subtitle */}
      <div>
        <h2 className="text-lg md:text-xl font-semibold text-[#121417]">Indie Rock Night</h2>
        <p className="text-sm md:text-base text-gray-500">
          Featuring The Sonic Waves, Electric Echoes, and Velvet Rhythms
        </p>
      </div>

      {/* Meta Info Cards */}
      <div className="space-y-3">
        {/* Venue Card */}
        <div className="bg-white rounded-lg md:rounded-xl px-4 py-3 flex items-center gap-3 shadow-sm w-full">
          
          <MapPin className="text-[#121417]  w-5 h-5 mt-0.5" />
          <div className="flex flex-col">
            <span className="text-xs text-gray-400">Venue</span>
            <span className="text-sm text-[#121417]">The Echo Chamber</span>
          </div>
        </div>

        {/* Date & Time Card */}
        <div className="bg-white rounded-lg md:rounded-xl px-4 py-3 flex items-center gap-3 shadow-sm w-full">
          
          <Calendar className="text-[#121417]  w-5 h-5 mt-0.5" />
          <div className="flex flex-col">
            <span className="text-xs text-gray-400">Date & Time</span>
            <span className="text-sm text-[#121417]">Saturday, July 20, 2024 - 8:00 PM</span>
          </div>
        </div>
      </div>
    </div>

      {/* Map */}
      <MapLocation position={position} setPosition={setPosition} setAddress={setAddress} />
  <div className="space-y-6">
      {/* Top Action Buttons */}
      <div className="flex items-center justify-between">
        {/* Share Button */}
        <div className="flex gap-3 items-start">
          
        <div className="flex flex-col items-center  text-xs text-[#121417]">
          <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">
            <Share2 className="w-4 h-4 text-[#121417]" />
          </button>
          <span className="mt-1">Share</span>
        </div>
        <button className="bg-[#5925DC] text-white rounded-full px-4 py-2 text-sm font-medium">RSVP</button>
        </div>

        {/* RSVP & Save */}
        
          <button className="bg-[#12B76A] text-white rounded-full px-4 py-1.5 text-sm font-medium">Save</button>
        
      </div>

      {/* Divider */}
      <hr className="border border-[#EAECF0]" />

      {/* About Section */}
      <section className="space-y-2">
        <h3 className="text-sm font-semibold text-[#101828]">About</h3>
        <p className="text-sm text-[#475467] leading-relaxed">
          Get ready for an electrifying night of indie rock with three of the hottest up-and-coming bands in the scene. 
          <span className="font-medium"> The Sonic Waves</span> will kick things off with their high-energy anthems, 
          followed by <span className="font-medium">Electric Echoes'</span> mesmerizing soundscapes, and 
          <span className="font-medium"> Velvet Rhythms</span> will close out the night with their soulful melodies. 
          This is a night you won’t want to miss!
        </p>
      </section>

      {/* Bottom Divider */}
      <hr className="border border-[#EAECF0]" />
    </div>
      {/* Lineup */}
      <LineupSection />

      {/* Venue */}
      <section className='space-y-6'>
       <section className="space-y-2">
        <h3 className="text-sm font-semibold text-[#101828]">Venue</h3>
        <p className="text-sm text-[#475467] leading-relaxed">
          The Echo Chamber is a legendary venue known for its intimate atmosphere and top-notch sound system. It's the perfect place to experience live music up close and personal.
        </p>
      </section>

      {/* Bottom Divider */}
      <hr className="border border-[#EAECF0]" />
      </section>

      {/* Musician CTA */}
      <div>
        <h2 className="text-md font-semibold text-[#121417]">Musicians</h2>
       <div className="bg-white p-5 rounded-lg border mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
      <div>
      <p className="text-sm font-bold  text-gray-700">
        Want to perform at this event? <br />
        </p>
 <p className="text-sm  text-gray-700">
        Apply to play your music live on stage.
      </p>
      </div>
      <button className="bg-indigo-600 text-white px-6 py-2 rounded-full text-sm">
        Apply
      </button>
    </div>
      </div>
      {/* Upcoming Events */}
      <UpcomingEvents />
    </div>
    </main>
  );
};

export default GigDetailsPage;
