'use client'

import React from 'react'

const tabs = ['All', 'Messages', 'Connections', 'Gigs / Bookings', 'System', 'Unread only']

const NotificationTabs = ({ selected, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6 justify-start  sm:justify-center">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onSelect(tab)}
          className={`px-4 py-1.5 text-sm font-medium rounded-xl border transition-all whitespace-nowrap ${
            selected === tab
              ? 'bg-[#1FB58F] text-white border-[#1FB58F]'
              : 'bg-white text-black border-gray-300 hover:bg-gray-100'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}

export default NotificationTabs
