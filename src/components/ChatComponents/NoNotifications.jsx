'use client'

import React from 'react'

const NoNotifications = ({ selectedTab = 'All' }) => {
  const getEmptyMessage = () => {
    switch (selectedTab) {
      case 'Messages':
        return {
          icon: '💬',
          title: 'No message notifications',
          description: 'You\'ll see notifications about new messages here'
        }
      case 'Connections':
        return {
          icon: '🤝',
          title: 'No connection notifications',
          description: 'You\'ll see notifications about new connections here'
        }
      case 'Gigs / Bookings':
        return {
          icon: '🎵',
          title: 'No gig notifications',
          description: 'You\'ll see notifications about gig requests and bookings here'
        }
      case 'System':
        return {
          icon: '🔔',
          title: 'No system notifications',
          description: 'You\'ll see important system updates here'
        }
      case 'Unread only':
        return {
          icon: '✅',
          title: 'All caught up!',
          description: 'You have no unread notifications'
        }
      default:
        return {
          icon: '📭',
          title: 'No notifications yet',
          description: 'When you receive notifications, they\'ll appear here'
        }
    }
  }

  const { icon, title, description } = getEmptyMessage()

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-6xl mb-4 opacity-50">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        {title}
      </h3>
      <p className="text-gray-500 text-center max-w-md">
        {description}
      </p>
    </div>
  )
}

export default NoNotifications