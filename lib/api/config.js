// lib/api/config.js
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000',
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
  // Add more route categories as needed
  // USER: {
  //   PROFILE: '/api/user/profile',
  //   UPDATE: '/api/user/update',
  // },
};

// lib/api/client.js



// Usage examples:

// Example 1: Using generic api methods
// import { api, API_ROUTES } from '@/lib/api';
// 
// const loginUser = async (email, password) => {
//   try {
//     const result = await api.post(API_ROUTES.AUTH.LOGIN, { email, password });
//     return result;
//   } catch (error) {
//     console.error('Login failed:', error);
//     throw error;
//   }
// };

// Example 2: Using specific auth methods
// import { authAPI } from '@/lib/api';
// 
// const handleLogin = async (credentials) => {
//   try {
//     const result = await authAPI.login(credentials);
//     localStorage.setItem('authToken', result.token);
//     return result;
//   } catch (error) {
//     console.error('Login error:', error);
//     throw error;
//   }
// };

// Example 3: Using in React component
// import { useState } from 'react';
// import { authAPI } from '@/lib/api';
// 
// const LoginForm = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
// 
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
// 
//     try {
//       const formData = new FormData(e.target);
//       const credentials = {
//         email: formData.get('email'),
//         password: formData.get('password'),
//       };
// 
//       const result = await authAPI.login(credentials);
//       localStorage.setItem('authToken', result.token);
//       // Redirect or update UI
//     } catch (err) {
//       setError(err.response?.data?.message || 'Login failed');
//     } finally {
//       setLoading(false);
//     }
//   };
// 
//   return (
//     <form onSubmit={handleSubmit}>
//       {/* form fields */}
//     </form>
//   );
// };