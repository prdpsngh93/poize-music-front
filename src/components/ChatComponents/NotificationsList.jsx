'use client'

import React from 'react'

const NotificationsList = ({ notifications, onMarkAsRead }) => {
  // Format date to be more readable
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))
    
    if (diffInHours < 1) {
      return 'Just now'
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`
    } else if (diffInHours < 48) {
      return 'Yesterday'
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
      })
    }
  }

  // Get icon based on notification type
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'gig_request':
        return '🎵'
      case 'message':
        return '💬'
      case 'connection':
        return '🤝'
      case 'booking':
        return '📅'
      case 'system':
        return '🔔'
      default:
        return '📢'
    }
  }

  // Get background color based on read status
  const getNotificationBg = (isRead) => {
    return isRead ? 'bg-white' : 'bg-blue-50 border-l-4 border-l-[#1FB58F]'
  }

  const handleNotificationClick = (notification) => {
    if (!notification.is_read) {
      onMarkAsRead(notification.id)
    }
  }

  return (
    <div className="space-y-3">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all cursor-pointer ${getNotificationBg(notification.is_read)}`}
          onClick={() => handleNotificationClick(notification)}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3 flex-1">
              {/* Icon */}
              <div className="text-2xl mt-1">
                {getNotificationIcon(notification.type)}
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      {notification.type.replace('_', ' ')}
                    </span>
                    {!notification.is_read && (
                      <span className="w-2 h-2 bg-[#1FB58F] rounded-full"></span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">
                    {formatDate(notification.createdAt)}
                  </span>
                </div>
                
                <p className={`text-sm leading-relaxed ${notification.is_read ? 'text-gray-600' : 'text-gray-900 font-medium'}`}>
                  {notification.message}
                </p>
              </div>
            </div>
            
            {/* Mark as read button (only show for unread notifications) */}
            {!notification.is_read && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onMarkAsRead(notification.id)
                }}
                className="ml-3 text-xs text-[#1FB58F] hover:text-[#17a085] font-medium"
              >
                Mark as read
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default NotificationsList