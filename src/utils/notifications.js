// utils/notifications.js

import Cookies from "js-cookie";

/**
 * Posts a notification to the API
 * @param {Object} payload - Notification data
 * @param {string|number} payload.user_id - ID of the user to notify
 * @param {string} payload.type - Type of notification (e.g., 'info', 'warning', 'success', 'error')
 * @param {string|number} payload.reference_id - Reference ID for the notification
 * @param {string} payload.message - Notification message content
 * @returns {Promise<Object>} API response
 * @throws {Error} When API request fails or payload is invalid
 */
export const postNotification = async (payload) => {
  // Validate required fields
  const requiredFields = ['user_id', 'type', 'reference_id', 'message'];
  const missingFields = requiredFields.filter(field => !payload[field]);
  
  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
  }

  // Get base URL from environment variable
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  
  if (!baseUrl) {
    throw new Error('NEXT_PUBLIC_API_BASE_URL environment variable is not set');
  }


  const token = Cookies.get("token")

  try {
    const response = await fetch(`${baseUrl}/api/notifications/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add authorization header if needed
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    // Check if response is ok
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `API request failed: ${response.status} ${response.statusText}${
          errorData.message ? ` - ${errorData.message}` : ''
        }`
      );
    }

    const data = await response.json();
    return data;

  } catch (error) {
    // Re-throw with more context if it's a network error
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error(`Network error: Unable to connect to API at ${baseUrl}`);
    }
    
    throw error;
  }
};

/**
 * Posts multiple notifications in batch
 * @param {Array<Object>} notifications - Array of notification payloads
 * @returns {Promise<Array<Object>>} Array of API responses
 */
export const postNotificationsBatch = async (notifications) => {
  if (!Array.isArray(notifications) || notifications.length === 0) {
    throw new Error('Notifications must be a non-empty array');
  }

  const promises = notifications.map(notification => 
    postNotification(notification)
  );

  return Promise.all(promises);
};

/**
 * Helper function to create notification payload
 * @param {string|number} userId - User ID
 * @param {string} type - Notification type
 * @param {string|number} referenceId - Reference ID
 * @param {string} message - Notification message
 * @param {Object} additionalData - Any additional data to include
 * @returns {Object} Notification payload
 */
export const createNotificationPayload = (userId, type, referenceId, message, additionalData = {}) => {
  return {
    user_id: userId,
    type,
    reference_id: referenceId,
    message,
    ...additionalData
  };
};

// Usage examples:

// Basic usage
// const notification = {
//   user_id: 123,
//   type: 'info',
//   reference_id: 'order_456',
//   message: 'Your order has been confirmed'
// };
// 
// try {
//   const result = await postNotification(notification);
//   console.log('Notification sent:', result);
// } catch (error) {
//   console.error('Failed to send notification:', error.message);
// }

// Using helper function
// const payload = createNotificationPayload(
//   123,
//   'success', 
//   'payment_789',
//   'Payment received successfully',
//   { priority: 'high', category: 'payment' }
// );
// 
// await postNotification(payload);

// Batch notifications
// const notifications = [
//   createNotificationPayload(123, 'info', 'ref1', 'Message 1'),
//   createNotificationPayload(456, 'warning', 'ref2', 'Message 2'),
// ];
// 
// await postNotificationsBatch(notifications);