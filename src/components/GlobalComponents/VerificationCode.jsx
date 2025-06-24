'use client';

import Hero from '@/components/GlobalComponents/Hero';
import Link from 'next/link';
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '../../../lib/api';
import SetNewPassword from './SetNewPassword';
import SetNewPasswordWrapper from '@/app/reset-password/page';

const VerificationCode = ({ email, onBack, onVerificationSuccess }) => {
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [verificationComplete, setVerificationComplete] = useState(false);
  const [verificationToken, setVerificationToken] = useState('');
  
  const inputRefs = useRef([]);

  // Countdown timer for resend
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  // Handle OTP input changes
  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (error) setError('');

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newOtp = [...otp];
    
    for (let i = 0; i < pasteData.length; i++) {
      if (i < 6) {
        newOtp[i] = pasteData[i];
      }
    }
    setOtp(newOtp);
    
    const nextEmptyIndex = newOtp.findIndex(digit => digit === '');
    const focusIndex = nextEmptyIndex !== -1 ? nextEmptyIndex : 5;
    inputRefs.current[focusIndex]?.focus();
  };

  // Validate form
  const validateForm = () => {
    const code = otp.join('');
    if (code.length !== 6) {
      setError('Please enter the complete 6-digit code');
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
      const payload = {
        email: email,
        otp: otp.join('')
      };

      const result = await authAPI.verifyOtp(payload);
      
      setSuccess('Code verified successfully!');
      setVerificationToken(result.token);
      
      if (onVerificationSuccess) {
        setTimeout(() => {
          onVerificationSuccess(result);
        }, 1000);
      } else {
        setTimeout(() => {
          setVerificationComplete(true);
        }, 1000);
      }

    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.error || 
                          'Invalid verification code. Please try again.';
      setError(errorMessage);
      console.error('Verification error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle resend code
  const handleResendCode = async () => {
    if (!email || countdown > 0) return;

    setResendLoading(true);
    setError('');

    try {
      const payload = { email };
      await authAPI.sendOTP(payload);
      setSuccess('New verification code sent to your email!');
      setCountdown(60);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.error || 
                          'Failed to resend code. Please try again.';
      setError(errorMessage);
    } finally {
      setResendLoading(false);
    }
  };

  // If verification is complete, show the SetNewPassword component
  if (verificationComplete) {
    return <SetNewPasswordWrapper email={email} token={verificationToken} />;
  }

  return (
    <>
      <Hero />

      <div className="min-h-screen flex flex-col lg:flex-row w-full">
        {/* Left: Verification Form */}
        <div className="w-full lg:w-1/2 bg-[#F7F7F5] flex items-center justify-center px-6 py-10 lg:px-16">
          <div className="w-full max-w-[500px]">
            <div className="text-center mb-8">
              <h2 className="text-[32px] md:text-[40px] font-bold mb-4 text-[#1B3139]">
                Verification Code
              </h2>
              
              <p className="text-[16px] text-[#666] mb-2">
                The verification code has been sent to your
              </p>
              <p className="text-[16px] text-[#666]">
                registered email id <span className="font-semibold text-[#1B3139]">{email}</span>
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm text-center">
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-600 rounded-lg text-sm text-center">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* OTP Input Boxes */}
              <div className="flex justify-center space-x-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="w-12 h-12 md:w-14 md:h-14 text-center text-xl md:text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-[#1FB58F] focus:outline-none bg-white text-[#1B3139] transition-colors"
                    maxLength="1"
                    disabled={loading}
                  />
                ))}
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                disabled={loading || otp.join('').length !== 6}
                className="w-full bg-[#1FB58F] text-white py-4 rounded-lg text-[16px] font-semibold hover:bg-teal-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying...
                  </>
                ) : (
                  'Verify'
                )}
              </button>
            </form>

            {/* Resend Code */}
            <div className="text-center mt-6">
              <p className="text-[14px] text-[#666] mb-2">
                {countdown > 0 ? (
                  `Not received yet? Resend in ${countdown} seconds`
                ) : (
                  "Didn't receive the code?"
                )}
              </p>
              
              {countdown === 0 && (
                <button
                  onClick={handleResendCode}
                  disabled={resendLoading}
                  className="text-[#1FB58F] hover:underline font-semibold disabled:opacity-50 text-[14px]"
                >
                  {resendLoading ? 'Sending...' : 'Resend Code'}
                </button>
              )}
            </div>

            {/* Back Button */}
            {onBack && (
              <div className="text-center mt-6">
                <button
                  onClick={onBack}
                  className="text-[#666] hover:text-[#1B3139] font-medium text-[14px] flex items-center justify-center mx-auto"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Email Entry
                </button>
              </div>
            )}

            {/* Back to Login */}
            <p className="text-center text-[14px] mt-8 text-[#666]">
              Remember your password?{' '}
              <Link href="/login" className="text-[#1FB58F] hover:underline font-semibold">
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
                LIVE<br />MUSIC
              </p>
              <p className="text-[14px] md:text-[16px] mt-2 text-black">
                Seamless<br />work experience
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerificationCode;