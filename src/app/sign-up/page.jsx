'use client';

import Button from '@/components/GlobalComponents/Button';
import Hero from '@/components/GlobalComponents/Hero';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '../../../lib/api';
import { signIn, getSession } from 'next-auth/react';

const SignUp = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Full name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  // Regular form submission sign-up
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
         is_oauth_login: false// Indicate this is email signup
      };

      const result = await authAPI.register(payload);
      
      setSuccess('Account created successfully!');
      
      if (result.token) {
        // Store token in memory or use your preferred method
        // Note: localStorage is not recommended for production
        sessionStorage.setItem('authToken', result.token);
      }

      setTimeout(() => {
        router.push('/login');
      }, 2000);

    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.error || 
                          'Registration failed. Please try again.';
      setError(errorMessage);
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Google sign-in with API integration
  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // Step 1: Authenticate with Google via NextAuth
      const result = await signIn('google', { 
        redirect: false,
        callbackUrl: '/music-connect'
      });
      
      if (result?.error) {
        throw new Error(result.error);
      }

      // Step 2: Get the session data after Google sign-in
      const session = await getSession();
      console.log("session",session)
      
      if (session?.user) {
        // Step 3: Call your sign-up API with Google user data
        try {
          const googleUserPayload = {
            name: session.user.name,
            email: session.user.email,
            // googleId: session.user.id || session.user.email, // Use ID if available, fallback to email
            // avatar: session.user.image,
            is_oauth_login: true, // Indicate this is Google signup
            // Add any other fields your API expects
          };

          const apiResult = await authAPI.register(googleUserPayload);
          
          // Handle successful API registration
          if (apiResult.token) {
            sessionStorage.setItem('authToken', apiResult.token);
          }

          setSuccess('Account created successfully with Google!');
          
          setTimeout(() => {
            router.push('/music-connect');
          }, 2000);

        } catch (apiErr) {
          // Handle case where user might already exist
          if (apiErr.response?.status === 409 || apiErr.response?.data?.message?.includes('already exists')) {
            // User already exists, just redirect to login or dashboard
            setSuccess('Welcome back! Redirecting...');
            setTimeout(() => {
              router.push('/music-connect');
            }, 1500);
          } else {
            // Other API errors
            const errorMessage = apiErr.response?.data?.message || 
                              apiErr.response?.data?.error || 
                              'Failed to create account. Please try again.';
            setError(errorMessage);
            console.error('API registration error:', apiErr);
          }
        }
      } else {
        throw new Error('Failed to get user information from Google');
      }
      
    } catch (err) {
      setError(err.message || 'Google sign-in failed. Please try again.');
      console.error('Google sign-in error:', err);
    } finally {
      setGoogleLoading(false);
    }
  };

  // Alternative approach: Check if user exists first, then create or sign in
  const handleGoogleSignInWithCheck = async () => {
    setGoogleLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // Step 1: Authenticate with Google
      const result = await signIn('google', { 
        redirect: false,
        callbackUrl: '/music-connect'
      });
      
      if (result?.error) {
        throw new Error(result.error);
      }

      const session = await getSession();
      
      if (session?.user) {
        // Step 2: Check if user exists in your database
        try {
          const checkUserResponse = await authAPI.checkUserExists(session.user.email);
          
          if (checkUserResponse.exists) {
            // User exists, proceed to sign in
            setSuccess('Welcome back! Signing you in...');
            setTimeout(() => {
              router.push('/music-connect');
            }, 1500);
          } else {
            // User doesn't exist, create new account
            const googleUserPayload = {
              name: session.user.name,
              email: session.user.email,
              googleId: session.user.id || session.user.email,
              avatar: session.user.image,
              signUpMethod: 'google',
            };

            const apiResult = await authAPI.register(googleUserPayload);
            
            if (apiResult.token) {
              sessionStorage.setItem('authToken', apiResult.token);
            }

            setSuccess('Account created successfully with Google!');
            setTimeout(() => {
              router.push('/music-connect');
            }, 2000);
          }
        } catch (apiErr) {
          // Fallback: attempt to create user anyway
          const googleUserPayload = {
            name: session.user.name,
            email: session.user.email,
            googleId: session.user.id || session.user.email,
            avatar: session.user.image,
            signUpMethod: 'google',
          };

          try {
            const apiResult = await authAPI.register(googleUserPayload);
            if (apiResult.token) {
              sessionStorage.setItem('authToken', apiResult.token);
            }
            setSuccess('Account created successfully with Google!');
            setTimeout(() => {
              router.push('/music-connect');
            }, 2000);
          } catch (finalErr) {
            const errorMessage = finalErr.response?.data?.message || 
                              finalErr.response?.data?.error || 
                              'Failed to process Google sign-in. Please try again.';
            setError(errorMessage);
          }
        }
      }
      
    } catch (err) {
      setError(err.message || 'Google sign-in failed. Please try again.');
      console.error('Google sign-in error:', err);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <>
      <Hero/>
      <div className="min-h-screen flex flex-col md:flex-row max-h-[900px]">
        {/* Left Section: Sign Up Form */}
        <div className="md:w-1/2 w-full flex flex-col justify-center items-center bg-[#F7F7F5] p-6 min-h-screen">
          <div className='w-full max-w-[617px]'>
            <h2 className="text-[42px] font-bold mb-[27px] leading-[30px] text-[#1B3139] text-center">Create an account</h2>
            
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 bg-green-100 border border-green-300 text-green-700 rounded-lg text-sm">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[#1B3139] text-[17px] leading-[30px] font-semibold pl-5 text-sm mb-1">
                  Full name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full name"
                  className="w-full pl-6 py-[18px] text-[#1b3139] rounded-[25px] focus:outline-none bg-white focus:ring focus:ring-teal-400"
                  disabled={loading || googleLoading}
                />
              </div>

              <div>
                <label className="block text-[#1B3139] text-[17px] leading-[30px] font-semibold pl-5 text-sm mb-1">
                  Your email address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email address"
                  className="w-full pl-6 py-[18px] text-[#1b3139] rounded-[25px] focus:outline-none bg-white focus:ring focus:ring-teal-400"
                  disabled={loading || googleLoading}
                />
              </div>

              <div>
                <label className="block text-[#1B3139] text-[17px] leading-[30px] font-semibold pl-5 text-sm mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Your password"
                  className="w-full pl-6 py-[18px] text-[#1b3139] rounded-[25px] focus:outline-none bg-white focus:ring focus:ring-teal-400"
                  disabled={loading || googleLoading}
                />
              </div>

              <div>
                <label className="block text-[#1B3139] text-[17px] leading-[30px] font-semibold pl-5 text-sm mb-1">
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className="w-full pl-6 py-[18px] text-[#1b3139] mb-[20px] rounded-[25px] focus:outline-none bg-white focus:ring focus:ring-teal-400"
                  disabled={loading || googleLoading}
                />
              </div>

              <button 
                type="submit"
                disabled={loading || googleLoading}
                className="w-full bg-[#1FB58F] font-semibold text-white py-[18px] rounded-[25px] hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </>
                ) : (
                  'Sign Up'
                )}
              </button>
            </form>

            <div className="my-[30px]">
              <button 
                type="button"
                onClick={handleGoogleSignIn} // or use handleGoogleSignInWithCheck
                disabled={loading || googleLoading}
                className="w-full flex items-center justify-center border text-[16px] font-semibold text-[#222222] border-black h-[60px] py-[18px] rounded-[25px] hover:bg-gray-100 disabled:opacity-50"
              >
                {googleLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in with Google...
                  </>
                ) : (
                  <>
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5 mr-2" />
                    Sign Up with Google
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Section: Image */}
        <div className="md:w-1/2 w-full bg-[#1FB58F] flex items-center justify-center p-6">
          <div className="bg-[#C5EFE6] mt-36 mb-[59px] h-[697px] w-[660] p-6 rounded-[30px] text-center">
            <img src="/images/headphone.png" alt="Live Music" className="mx-auto w-[698px] md:w-50 mb-4" />
            <p className="text-sm mt-2 font-semibold text-[32px] leading=[100%] text-black">
              Seamless<br />work experience
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;