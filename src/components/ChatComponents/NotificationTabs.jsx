'use client'

import React from 'react'

const tabs = ['All', 'Messages', 'Connections', 'Gigs / Bookings', 'System', 'Unread only']

const NotificationTabs = ({ selected, onSelect, notifications = [] }) => {
  // Get count for each tab
  const getTabCount = (tabName) => {
    switch (tabName) {
      case 'All':
        return notifications.length
      case 'Messages':
        return notifications.filter(n => n.type === 'message').length
      case 'Connections':
        return notifications.filter(n => n.type === 'connection').length
      case 'Gigs / Bookings':
        return notifications.filter(n => n.type === 'gig_request' || n.type === 'booking').length
      case 'System':
        return notifications.filter(n => n.type === 'system').length
      case 'Unread only':
        return notifications.filter(n => !n.is_read).length
      default:
        return 0
    }
  }

  return (
    <div className="flex flex-wrap gap-2 mb-6 justify-start sm:justify-center">
      {tabs.map((tab) => {
        const count = getTabCount(tab)
        return (
          <button
            key={tab}
            onClick={() => onSelect(tab)}
            className={`px-4 py-1.5 text-sm font-medium rounded-xl border transition-all whitespace-nowrap flex items-center gap-2 ${
              selected === tab
                ? 'bg-[#1FB58F] text-white border-[#1FB58F]'
                : 'bg-white text-black border-gray-300 hover:bg-gray-100'
            }`}
          >
            <span>{tab}</span>
            {count > 0 && (
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                selected === tab 
                  ? 'bg-white/20 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

export default NotificationTabs