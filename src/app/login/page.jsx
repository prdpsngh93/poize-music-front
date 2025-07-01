"use client";

import Hero from "@/components/GlobalComponents/Hero";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { authAPI } from "../../../lib/api";
import { signIn, getSession } from 'next-auth/react';

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setError("");
    setSuccess("");

    try {
      await signIn("google", { callbackUrl: "/music-connect" });
    } catch (err) {
      console.error("Google sign-in error:", err);
      setError(err.message || "Google sign-in failed. Please try again.");
    } finally {
      setGoogleLoading(false);
    }
  };

  // Validate form
  const validateForm = () => {
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!formData.password) {
      setError("Password is required");
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Prepare payload for API
      const payload = {
        email: formData.email.trim(),
        password: formData.password,
      };

      // Call login API
      const result = await authAPI.login(payload);

      // Handle successful login
      setSuccess("Login successful!");

      // Store token
      if (result.token) {
        localStorage.setItem("authToken", result.token);
      }

      // Store user data if provided
      if (result.user) {
        localStorage.setItem("userData", JSON.stringify(result.user));
      }

      router.push("/music-connect");

    } catch (err) {
      // Handle API errors
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Login failed. Please check your credentials.";
      setError(errorMessage);
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Hero />

      <div className="min-h-screen flex flex-col lg:flex-row w-full">
        {/* Left: Login Form */}
        <div className="w-full lg:w-1/2 bg-[#F7F7F5] flex items-center justify-center px-6 py-10 lg:px-16">
          <div className="w-full max-w-[617px]">
            <h2 className="text-[32px] md:text-[42px] font-bold mb-10 md:mb-12 text-[#1B3139] text-center">
              Welcome Back!
            </h2>

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
                  placeholder="Your email address"
                  className="w-full bg-white text-[#1B3139] pl-6 py-[16px] rounded-[25px] focus:outline-none focus:ring-2 focus:ring-teal-400"
                  disabled={loading}
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-[#1B3139] text-[17px] font-semibold mb-2 pl-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Your password"
                  className="w-full bg-white text-[#1B3139] pl-6 py-[16px] rounded-[25px] focus:outline-none focus:ring-2 focus:ring-teal-400"
                  disabled={loading}
                />
                <div className="flex justify-between items-center mt-3">
                  <label className="flex items-center text-[#1B3139] text-sm">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="mr-2 h-4 w-4 rounded"
                      disabled={loading}
                    />
                    Remember me
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-[#1FB58F] text-sm hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1FB58F] cursor-pointer text-white py-[16px] rounded-[25px] text-[16px] font-semibold hover:bg-teal-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </form>

            {/* Google Button */}
            <div className="my-6">
              <button
                type="button"
                disabled={loading || googleLoading}
                onClick={handleGoogleSignIn}
                className="w-full flex items-center cursor-pointer justify-center border border-black text-[16px] font-semibold text-[#222] h-[60px] rounded-[25px] hover:bg-gray-100 disabled:opacity-50"
              >
                {googleLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing in with Google...
                  </>
                ) : (
                  <>
                    <img
                      src="https://www.svgrepo.com/show/475656/google-color.svg"
                      alt="Google"
                      className="w-5 h-5 mr-3"
                    />
                    Sign In with Google
                  </>
                )}
              </button>
            </div>

            {/* Terms and Sign Up Link */}
            <p className="text-center text-[14px] text-black font-medium">
              By logging in, you agree to our{" "}
              <a href="#" className="text-[#1FB58F] underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-[#1FB58F] underline">
                Privacy Policy
              </a>
            </p>

            <p className="text-center text-[16px] font-semibold mt-4 text-black">
              Don't have an account?{" "}
              <Link href="/sign-up" className="text-[#1FB58F] hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>

        {/* Right: Image Section */}
        <div className="w-full lg:w-1/2 bg-[#1FB58F] flex items-center justify-center relative px-6 py-10">
          <div className="relative w-full max-w-[400px] md:max-w-[500px] h-[70%] bg-[#C5EFE6] rounded-[30px] p-6 md:p-10  text-center">
            <img
              src="/images/headphone.png"
              alt="Live Music"
              className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-[60%] md:w-[70%]"
            />
            <div className="mt-[140px] p-3 md:p-2 md:mt-[250px]">
              <p className="text-[20px] md:text-[26px] mt-8 text-black font-bold">
                Seamless
                <br />
                work experience
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
