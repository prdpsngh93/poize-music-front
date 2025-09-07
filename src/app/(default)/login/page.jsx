"use client";

import Hero from "@/components/GlobalComponents/Hero";
import Navbar from "@/components/GlobalComponents/Navbar";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Cookies from "js-cookie";
import { authAPI } from "../../../../lib/api";
import { toast } from "sonner";

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (error) setError("");
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setError("");
    setSuccess("");
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (err) {
      console.error("Google sign-in error:", err);
      setError(err.message || "Google sign-in failed. Please try again.");
    } finally {
      setGoogleLoading(false);
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const payload = {
        email: formData.email.trim(),
        password: formData.password,
      };

      const result = await authAPI.login(payload);

      const cookieOptions = {
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        expires: formData.rememberMe ? 30 : undefined,
      };

      if (result.token) Cookies.set("token", result.token, cookieOptions);
      if (result.user) {
        Cookies.set("userData", JSON.stringify(result.user), cookieOptions);
        Cookies.set("userId", result.user.id.toString(), cookieOptions);
        Cookies.set("userName", result.user.name, cookieOptions);
        Cookies.set("userEmail", result.user.email, cookieOptions);
        Cookies.set(
          "id",
          result?.profile?.id || result?.user?.id,
          cookieOptions
        );

        toast.success("Login successful!");
        setSuccess("Login successful!");
        if (result.user.role === null) {
          router.push("/role");
        } else if (
          result.user.role === "contributor" ||
          result.user.role === "producer"
        ) {
          if (result.profile) {
            router.push("/contributor-dashboard");
          } else {
            router.push("/contributor-profile");
          }
        } else if (result.user.role === "music_lover") {
          router.push("/music-lover-profile");
        } else if (result.user.role === "artist") {
          router.push("/musician-profile");
        } else if (result.user.role === "venue")
          router.push("/venue-dashboard");
      }
    } catch (err) {
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
      <Hero title="Log in" />
      <div className="min-h-screen flex flex-col lg:flex-row w-full">
        {/* Left: Login Form */}
        <div className="w-full lg:w-1/2 bg-[#F7F7F5] flex items-center justify-center px-6 py-10 lg:px-16">
          <div className="w-full max-w-[617px]">
            <h2 className="text-[32px] md:text-[42px] font-bold mb-10 md:mb-12 text-[#1B3139] text-center">
              Welcome Back!
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

            <form onSubmit={handleSubmit} className="space-y-6">
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

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1FB58F] text-white py-[16px] rounded-[25px] text-[16px] font-semibold hover:bg-teal-600 transition disabled:opacity-50 flex items-center justify-center"
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
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </form>

            <div className="my-6">
              <button
                type="button"
                disabled={loading || googleLoading}
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center border border-black text-[16px] font-semibold text-[#222] h-[60px] rounded-[25px] hover:bg-gray-100 disabled:opacity-50"
              >
                {googleLoading ? (
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

            <p className="text-center text-[14px] text-black font-medium">
              By logging in, you agree to our{" "}
              <Link href="/terms-and-conditions" className="text-[#1FB58F] underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="privacy-polciy" className="text-[#1FB58F] underline">
                Privacy Policy
              </Link>
            </p>

            <p className="text-center text-[16px] font-semibold mt-4 text-black">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="text-[#1FB58F] hover:underline">
                Sign Up
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

export default Login;
