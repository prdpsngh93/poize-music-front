import NavbarChat from '@/components/ChatComponents/NavbarChat'
import NotificationsPage from '@/components/ChatComponents/NotificationsPage'
import React from 'react'

const page = () => {
  return (
    <>
    <NavbarChat/>
    <div className='flex bg-[#f4f3ee] w-full flex-col justify-center mx-auto'>
      <NotificationsPage/>
    </div>
    </>
  )
}

export default page
