import NavbarChat from '@/components/ChatComponents/NavbarChat'
import PopularTracks from '@/components/ChatComponents/PopularTracks'
import ProfileDetail from '@/components/ChatComponents/ProfileDetail'
import React from 'react'

const page = () => {
  return (
    <div className='bg-[#F1F0EA]'>
      <NavbarChat/>
      <ProfileDetail/>
      <PopularTracks/>
    </div>
  )
}

export default page
