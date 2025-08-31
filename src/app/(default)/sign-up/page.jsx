"use client";

import Hero from "@/components/GlobalComponents/Hero";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authAPI } from "../../../../lib/api";
import { signIn, getSession } from "next-auth/react";
import Link from "next/link";
import Navbar from "@/components/GlobalComponents/Navbar";
import { toast } from "sonner";
import Cookies from "js-cookie";

const SignUp = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Check for OAuth session after Google signup
  useEffect(() => {
    const checkOAuthSession = async () => {
      const session = await getSession();
      if (session && session.provider === "google") {
        handleOAuthSuccess(session);
      }
    };
    checkOAuthSession();
  }, []);

   const handleOAuthSuccess = async (session) => {
     try {
       const user = session.user.dbUser;
 
       console.log("user", user);
       if (!user) return;
 
       const payload = {
         email: user.email.trim(),
         password: user.email + 1,
       };
 
       const result = await authAPI.login(payload);
 
 
       // Set cookies similar to regular login
       const cookieOptions = {
         secure: process.env.NODE_ENV === "production",
         sameSite: "strict",
         expires: 30, // OAuth users get 30-day expiry
       };
 
       // You might need to generate a token for OAuth users
       // For now, using session info
       if (result.token)
          Cookies.set("token", result.token, cookieOptions);
 
       
       Cookies.set("userData", JSON.stringify(user), cookieOptions);
       Cookies.set("userId", user.id.toString(), cookieOptions);
       Cookies.set("userName", user.name, cookieOptions);
       Cookies.set("userEmail", user.email, cookieOptions);
 
       toast.success("Google login successful!");
 
       // Handle role-based routing
       if (user.role === null) {
         router.push("/role");
       } else if (user.role === "contributor" || user.role === "producer") {
         // Check if profile exists (you might need to fetch this)
         router.push("/contributor-dashboard"); // or "/contributor-profile"
       } else if (user.role === "music_lover") {
         router.push("/music-lover-profile");
       } else if (user.role === "artist") {
         router.push("/musician-profile");
       } else if (user.role === "venue") {
         router.push("/venue-dashboard");
       }
     } catch (error) {
       console.error("OAuth session handling error:", error);
       setError("Failed to complete Google login");
     }
   };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Full name is required");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!formData.password) {
      setError("Password is required");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  // Regular form submission sign-up
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // First check if user already exists
      const checkResponse = await fetch('https://poize-music-backend-kn0u.onrender.com/api/auth/check-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email.trim() }),
      });

      const checkData = await checkResponse.json();
      
      if (checkData.success && checkData.user) {
        setError("An account with this email already exists. Please use a different email or try logging in.");
        return;
      }

      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        is_oauth_login: false, // Indicate this is email signup
      };

      const result = await authAPI.register(payload);

      setSuccess("Account created successfully!");

      if (result.status === "success") {
        toast.success("Account created successfully!")
        sessionStorage.setItem("authToken", result.token);
        setTimeout(() => router.push("/login"), 1000); 
      }

    } catch (err) {
      const errorMessage = err?.response?.data?.message || err?.response?.data?.error || "Registration failed. Please try again.";
      setError(errorMessage);
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Google sign-up
  const handleGoogleSignUp = async () => {
    setGoogleLoading(true);
    setError("");
    setSuccess("");

    try {
      const result = await signIn("google", { 
        redirect: false // Handle redirect manually
      });
      
      if (result?.error) {
        setError("Google sign-up failed. Please try again.");
      }
      // Success will be handled by useEffect
    } catch (err) {
      console.error("Google sign-up error:", err);
      setError("Google sign-up failed. Please try again.");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Hero title="Sign Up" />
      <div className="min-h-screen flex flex-col lg:flex-row w-full">
        <div className="w-full lg:w-1/2 bg-[#F7F7F5] flex items-center justify-center px-4 sm:px-6 py-8 sm:py-10 md:px-10 lg:px-16">
          <div className="w-full max-w-[400px] sm:max-w-[450px] md:max-w-[500px] lg:max-w-[617px]">
            <h2 className="text-[28px] sm:text-[32px] md:text-[36px] lg:text-[42px] font-bold mb-6 leading-[1.2] text-[#1B3139] text-center">
              Create an account
            </h2>

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
                <label className="block text-[#1B3139] text-[15px] md:text-[17px] font-semibold pl-3 mb-1">
                  Full name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full name"
                  className="w-full pl-4 py-3 text-[#1b3139] rounded-[20px] focus:outline-none bg-white focus:ring focus:ring-teal-400"
                  disabled={loading || googleLoading}
                />
              </div>

              <div>
                <label className="block text-[#1B3139] text-[15px] md:text-[17px] font-semibold pl-3 mb-1">
                  Your email address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email address"
                  className="w-full pl-4 py-3 text-[#1b3139] rounded-[20px] focus:outline-none bg-white focus:ring focus:ring-teal-400"
                  disabled={loading || googleLoading}
                />
              </div>

              <div>
                <label className="block text-[#1B3139] text-[15px] md:text-[17px] font-semibold pl-3 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Your password"
                  className="w-full pl-4 py-3 text-[#1b3139] rounded-[20px] focus:outline-none bg-white focus:ring focus:ring-teal-400"
                  disabled={loading || googleLoading}
                />
              </div>

              <div>
                <label className="block text-[#1B3139] text-[15px] md:text-[17px] font-semibold pl-3 mb-1">
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className="w-full pl-4 py-3 text-[#1b3139] rounded-[20px] focus:outline-none bg-white focus:ring focus:ring-teal-400"
                  disabled={loading || googleLoading}
                />
              </div>

              <button
                type="submit"
                disabled={loading || googleLoading}
                className="w-full bg-[#1FB58F] font-semibold text-white py-3 rounded-[20px] hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 mr-2"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      />
                    </svg>
                    Creating Account...
                  </>
                ) : (
                  "Sign Up"
                )}
              </button>
            </form>

            <div className="my-6">
              <button
                type="button"
                onClick={handleGoogleSignUp}
                disabled={loading || googleLoading}
                className="w-full flex items-center justify-center border text-[14px] sm:text-[16px] font-semibold text-[#222222] border-black h-[50px] sm:h-[60px] py-3 rounded-[20px] hover:bg-gray-100 disabled:opacity-50"
              >
                {googleLoading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 mr-2"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      />
                    </svg>
                    Signing up with Google...
                  </>
                ) : (
                  <>
                    <img
                      src="https://www.svgrepo.com/show/475656/google-color.svg"
                      alt="Google"
                      className="w-5 h-5 mr-2"
                    />
                    Sign Up with Google
                  </>
                )}
              </button>
            </div>

            <p className="text-center text-[14px] sm:text-[16px] font-semibold mt-4 text-black">
              Already have an account?{" "}
              <Link href="/login" className="text-[#1FB58F] hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>

        {/* Right: Image Section with Background */}
        <div className="w-full lg:w-1/2 bg-[#1FB58F] relative flex items-end justify-center   px-6 py-12 md:py-18">
          {/* Main Content */}
          <div className="relative z- w-full max-w-[400px] md:max-w-[450px] h-[100%] md:h-[90%] bg-[#FFFFFF]/30 rounded-xl p-6 md:p-10 text-center ">
            {/* Music Notes Background */}
            <img
              src="/images/loginbg.png"
              alt="Music Notes Background"
              className="absolute inset-0 left-20 h-full object-cover z-0 opacity-70"
            />

            {/* Gradient Overlay */}
            <img
              src="/images/login-gradient.png"
              alt="Gradient Overlay"
              className="absolute inset-0 left-10 h-full z-0 object-cover  mix-blend-plus-lighter "
            />

            {/* Headphone Image */}
            <img
              src="/images/headphone.png"
              alt="Live Music"
              className="absolute -top-[10%] left-[56%]  -translate-x-1/2 w-[90%] md:w-[100%] z-10"
            />

            {/* Text */}
            <div className="mt-[230px] md:mt-[350px] z-20 relative">
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

export default SignUp;