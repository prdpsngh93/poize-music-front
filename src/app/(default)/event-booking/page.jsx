import GigsGrid from '@/components/GlobalComponents/GigsGrid'
import Navbar from '@/components/GlobalComponents/Navbar'
import Hero from '@/components/GlobalComponents/Hero'
import React from 'react'

const page = () => {
  return (
    <div className='mb-4'>
        <Hero/>
      <GigsGrid/>
    </div>
  )
}

export default page
