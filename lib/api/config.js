// lib/api/config.js
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://poize-music-backend-kn0u.onrender.com',
  TIMEOUT: 10000,
};

// lib/api/routes.js
export const API_ROUTES = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    SEND_OTP: '/api/auth/send-otp',
    VERIFY_OTP:'/api/auth/verify-otp',
    RESET_PASSWORD: '/api/auth/change-password',
  },
  USER: {
    UPDATE: '/api/user-update',
    GET: '/api/user-info',
    COLLABORATION: '/api/collaboration',
  },
};




