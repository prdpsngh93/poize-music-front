'use client';

import Hero from '@/components/GlobalComponents/Hero';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '../../../../lib/api';

// Import the VerificationCode component
import VerificationCode from '@/components/GlobalComponents/VerificationCode';

const ForgotPassword = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showOTPComponent, setShowOTPComponent] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  // Validate form
  const validateForm = () => {
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Prepare payload for API
      const payload = {
        email: formData.email.trim()
      };

      // Call forgot password API
      const result = await authAPI.sendOTP(payload);
      
      // Handle successful request
      setSuccess('OTP sent to your email!');
      
      // Show OTP component instead of navigating
      setTimeout(() => {
        setShowOTPComponent(true);
      }, 100);

    } catch (err) {
      // Handle API errors
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.error || 
                          'Failed to send OTP. Please try again.';
      setError(errorMessage);
      console.error('Forgot password error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Function to go back to forgot password form
  const handleBackToForgotPassword = () => {
    setShowOTPComponent(false);
    setSuccess('');
    setError('');
  };

  // If OTP component should be shown, render the VerificationCode component
  if (showOTPComponent) {
    return (
      <VerificationCode 
        email={formData.email}
        onBack={handleBackToForgotPassword}
      />
    );
  }

  return (
    <>
      <Hero />

      <div className="min-h-screen flex flex-col lg:flex-row w-full">
        {/* Left: Forgot Password Form */}
        <div className="w-full lg:w-1/2 bg-[#F7F7F5] flex items-center justify-center px-6 py-10 lg:px-16">
          <div className="w-full max-w-[617px]">
            <h2 className="text-[32px] md:text-[42px] font-bold mb-6 text-[#1B3139] text-center">
              Forgot Password?
            </h2>
            
            <p className="text-center text-[16px] text-[#666] mb-10">
              Enter your email address and we'll send you an OTP to reset your password.
            </p>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="mb-4 p-3 bg-green-100 border border-green-300 text-green-700 rounded-lg text-sm">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-[#1B3139] text-[17px] font-semibold mb-2 pl-2">
                  Your email address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className="w-full bg-white text-[#1B3139] pl-6 py-[16px] rounded-[25px] focus:outline-none focus:ring-2 focus:ring-teal-400"
                  disabled={loading}
                />
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-[#1FB58F] text-white py-[16px] rounded-[25px] text-[16px] font-semibold hover:bg-teal-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  'Send OTP'
                )}
              </button>
            </form>

            {/* Back to Login */}
            <p className="text-center text-[16px] font-semibold mt-6 text-black">
              Remember your password?{' '}
              <Link href="/login" className="text-[#1FB58F] hover:underline">
                Back to Login
              </Link>
            </p>
          </div>
        </div>

        {/* Right: Image Section */}
        <div className="w-full lg:w-1/2 bg-[#1FB58F] flex items-center justify-center relative px-6 py-10">
          <div className="relative w-full max-w-[400px] md:max-w-[500px] h-[70%] bg-[#C5EFE6] rounded-[30px] p-6 md:p-10 text-center">
            <img
              src="/images/headphone.png" 
              alt="Live Music"
              className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-[60%] md:w-[70%]"
            />
            <div className="mt-[140px] p-3 md:p-2 md:mt-[250px]">
              <p className="text-[20px] md:text-[26px] mt-8 text-black font-bold">
                Seamless<br />work experience
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;