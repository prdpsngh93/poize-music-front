import React from 'react'
import Image from 'next/image'

const NoNotifications = () => {
  return (
    <div className="flex flex-col items-center text-center px-4 py-10 w-full max-w-md mx-auto">
      <Image
        src="/images/no-notification.png" 
        alt="No Notifications"
        width={250}
        height={250}
        className="mb-6 object-contain"
      />
      <p className="text-[15px] font-bold mb-2 text-black">
        🎉 Hey Music lover! No new notifications right now.
      </p>
      <p className="text-sm text-gray-600">
        Check back later for updates.
      </p>
    </div>
  )
}

export default NoNotifications
