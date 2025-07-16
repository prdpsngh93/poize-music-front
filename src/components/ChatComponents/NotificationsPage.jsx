'use client'

import React, { useState } from 'react'
import NotificationTabs from './NotificationTabs'
import NoNotifications from './NoNotifications'

const NotificationsPage = () => {
  const [selectedTab, setSelectedTab] = useState('All')

  return (
    <div className="bg-[#f4f3ee] px-4 sm:px-6 md:px-10 py-8">
      {/* Centered Container */}
      <div className="max-w-7xl mx-auto w-full">
        <h1 className="text-2xl md:text-3xl font-bold text-black mb-2">
          Notifications
        </h1>
        <p className="text-sm md:text-base text-gray-600 mb-6">
          Stay updated on your gigs, messages, connections, and more
        </p>

        <div className="flex justify-start">
          <NotificationTabs selected={selectedTab} onSelect={setSelectedTab} />
        </div>

        <NoNotifications />
      </div>
    </div>
  )
}

export default NotificationsPage
