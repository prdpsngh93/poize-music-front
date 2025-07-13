import React from 'react';
import GigListingPage from "@/components/GlobalComponents/GigListingPage"
import Hero from '@/components/GlobalComponents/Hero';
import Navbar from '@/components/GlobalComponents/Navbar';

const EventBooking = () => {
  return(
    <>
      <Navbar/>
    <Hero/>
        <GigListingPage/>
    </>
  )
};

export default EventBooking;