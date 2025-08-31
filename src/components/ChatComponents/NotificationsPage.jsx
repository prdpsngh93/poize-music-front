'use client'

import React, { useState, useEffect } from 'react'
import NotificationTabs from './NotificationTabs'
import NotificationsList from './NotificationsList'
import NoNotifications from './NoNotifications'

// Helper function to get cookie value
const getCookie = (name) => {
  if (typeof document === 'undefined') return null
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
  return null
}

const NotificationsPage = () => {
  const [selectedTab, setSelectedTab] = useState('All')
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch notifications from API
  const fetchNotifications = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const id = getCookie('id')
      const token = getCookie('token')
      
      if (!id || !token) {
        throw new Error('Missing authentication credentials')
      }

      const response = await fetch(
        `https://poize-music-backend-kn0u.onrender.com/api/notifications?id=${id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setNotifications(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Error fetching notifications:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Mark notification as read
  const markAsRead = async (notificationId) => {
    try {
      const token = getCookie('token')
     const id = getCookie('id')
      
      if (!token) {
        throw new Error('Missing authentication token')
      }

      const response = await fetch(
        `https://poize-music-backend-kn0u.onrender.com/api/notifications/${notificationId}/read?id=${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // Update local state to reflect the read status
      setNotifications(prevNotifications =>
        prevNotifications.map(notification =>
          notification.id === notificationId
            ? { ...notification, is_read: true }
            : notification
        )
      )
    } catch (err) {
      console.error('Error marking notification as read:', err)
    }
  }

  // Filter notifications based on selected tab
  const getFilteredNotifications = () => {
    switch (selectedTab) {
      case 'Messages':
        return notifications.filter(n => n.type === 'message')
      case 'Connections':
        return notifications.filter(n => n.type === 'connection')
      case 'Gigs / Bookings':
        return notifications.filter(n => n.type === 'gig_request' || n.type === 'booking')
      case 'System':
        return notifications.filter(n => n.type === 'system')
      case 'Unread only':
        return notifications.filter(n => !n.is_read)
      case 'All':
      default:
        return notifications
    }
  }

  // Get unread count for badge
  const getUnreadCount = () => {
    return notifications.filter(n => !n.is_read).length
  }

  useEffect(() => {
    fetchNotifications()
  }, [])

  const filteredNotifications = getFilteredNotifications()

  return (
    <div className="bg-[#f4f3ee] px-4 sm:px-6 md:px-10 py-8 min-h-screen">
      {/* Centered Container */}
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl md:text-3xl font-bold text-black">
            Notifications
          </h1>
          {getUnreadCount() > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {getUnreadCount()}
            </span>
          )}
        </div>
        <p className="text-sm md:text-base text-gray-600 mb-6">
          Stay updated on your gigs, messages, connections, and more
        </p>

        <div className="flex justify-start mb-6">
          <NotificationTabs
            selected={selectedTab} 
            onSelect={setSelectedTab}
            notifications={notifications}
          />
        </div>

        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1FB58F]"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <div className="text-red-600 text-sm">
                <strong>Error:</strong> {error}
              </div>
              <button
                onClick={fetchNotifications}
                className="ml-4 text-sm text-red-600 underline hover:no-underline"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {!loading && !error && (
          <>
            {filteredNotifications.length > 0 ? (
              <NotificationsList
                notifications={filteredNotifications}
                onMarkAsRead={markAsRead}
              />
            ) : (
              <NoNotifications selectedTab={selectedTab} />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default NotificationsPage