import Footer from '@/components/GlobalComponents/Footer'
import Navbar from '@/components/GlobalComponents/Navbar'
import Artists from '@/components/HomePageComponents/Artists'
import Banner from '@/components/HomePageComponents/Banner'
import ListenToTheCollective from '@/components/HomePageComponents/ListenToTheCollective'
import MeetOurArtists from '@/components/HomePageComponents/MeetOurArtists'
import NewsSection from '@/components/HomePageComponents/NewsSection'
import SpotifyPlaylist from '@/components/HomePageComponents/SpotifyPlaylist'
import StayInTheLoop from '@/components/HomePageComponents/StayInTheLoop'
import TestimonialSlider from '@/components/HomePageComponents/TestimonialSlider'
import React from 'react'

function HomePageContainer() {
    return (
        <>
            <Banner />
            <Artists/>
            <SpotifyPlaylist/>
            <ListenToTheCollective/>
            <StayInTheLoop/>
           
            <MeetOurArtists/>
            <TestimonialSlider/>
            <NewsSection/>  
            {/* <Footer /> */}
        </>
    )
}

export default HomePageContainer