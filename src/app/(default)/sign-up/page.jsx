"use client";

import Hero from "@/components/GlobalComponents/Hero";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Navbar from "@/components/GlobalComponents/Navbar";
import { toast } from "sonner";
import axios from "axios";
import {
  Mic,
  Headphones,
  BarChart3,
  ArrowRight,
  LocationEditIcon,
  X,
  ChevronDown,
} from "lucide-react";
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

  // Role selection states
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [roleError, setRoleError] = useState("");

  const roles = [
    {
      id: "artist",
      icon: Mic,
      title: "Artist",
      description: "Upload and share your music",
    },
    {
      id: "music_lover",
      icon: Headphones,
      title: "Listener",
      description: "Discover new music",
    },
    {
      id: "contributor",
      icon: BarChart3,
      title: "Producer",
      description: "Mix and sell your tracks",
    },
    {
      id: "venue",
      icon: LocationEditIcon,
      title: "Venue",
      description: "Discover and enjoy your tracks",
    },
  ];

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
    if (!selectedRole) {
      setError("Please select your role");
      return false;
    }
    return true;
  };

  // Handle role selection from modal
  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    setRoleError("");
    setShowRoleModal(false);
    if (error) setError("");
  };

  // Get selected role details for display
  const getSelectedRoleDetails = () => {
    return roles.find((role) => role.id === selectedRole);
  };

  // Updated registration with axios
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const registerPayload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        is_oauth_login: false,
        role: selectedRole,
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/register`,
        registerPayload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const registerResult = response.data;

      if (registerResult.status === "success") {
        sessionStorage.setItem("authToken", registerResult.token);
        Cookies.set("id", registerResult?.profile?.id);
        
        toast.success("Account created successfully!");

        // Redirect based on role
        const userRole = registerResult.user?.role || selectedRole;
        
        switch (userRole) {
          case "contributor":
          case "producer":
            router.push("/contributor-profile");
            break;
          case "artist":
            router.push("/musician-profile");
            break;
          case "music_lover":
            router.push("/music-lover-profile");
            break;
          case "venue":
            router.push("/venue-profile-form");
            break;
          default:
            router.push("/dashboard");
        }
      } else {
        throw new Error(registerResult.message || "Registration failed");
      }
    } catch (err) {
      console.error("Registration error:", err);
      
      let errorMessage = "Registration failed. Please try again.";
      
      if (err.response) {
        // Server responded with error status
        const responseData = err.response.data;
        
        // Handle specific error types
        if (responseData?.error?.name === "SequelizeUniqueConstraintError") {
          const emailError = responseData.error.errors?.find(e => e.path === "email");
          if (emailError) {
            errorMessage = "This email address is already registered. Please use a different email or try logging in.";
          }
        } else if (responseData?.error?.errors && Array.isArray(responseData.error.errors)) {
          // Handle array of validation errors
          errorMessage = responseData.error.errors.map(e => e.message).join(", ");
        } else {
          // Handle other server errors
          errorMessage = 
            responseData?.message || 
            responseData?.error?.message ||
            responseData?.error || 
            `Server error: ${err.response.status}`;
        }
      } else if (err.request) {
        // Request was made but no response received
        errorMessage = "Network error. Please check your connection.";
      } else if (err.message) {
        // Something else happened
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Google sign-in with API integration
  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setError("");
    setSuccess("");

    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (err) {
      console.error("Google sign-in error:", err);
      const errorMessage = err.message || "Google sign-in failed. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setGoogleLoading(false);
    }
  };

  // Role Selection Modal Component
  const RoleSelectionModal = () => (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={() => setShowRoleModal(false)}
    >
      <div
        className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Select Your Role</h2>
          <button
            onClick={() => setShowRoleModal(false)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="text-center mb-8">
          <p className="text-lg text-gray-600">
            Choose the role that best describes you to personalize your
            experience.
          </p>
        </div>

        {/* Error Message */}
        {roleError && (
          <div className="mb-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded-2xl text-center">
            {roleError}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {roles.map((role) => {
            const IconComponent = role.icon;
            const isSelected = selectedRole === role.id;

            return (
              <button
                key={role.id}
                onClick={() => handleRoleSelect(role.id)}
                className={`p-6 rounded-2xl border-2 transition-all duration-200 text-center hover:shadow-md hover:cursor-pointer ${
                  isSelected
                    ? "border-emerald-400 bg-emerald-50"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div className="flex flex-col items-center space-y-3">
                  <div
                    className={`p-3 rounded-full ${
                      isSelected ? "bg-emerald-100" : "bg-gray-100"
                    }`}
                  >
                    <IconComponent
                      size={24}
                      className={
                        isSelected ? "text-emerald-600" : "text-gray-600"
                      }
                    />
                  </div>
                  <h3
                    className={`font-semibold ${
                      isSelected ? "text-emerald-900" : "text-gray-900"
                    }`}
                  >
                    {role.title}
                  </h3>
                  <p
                    className={`text-sm ${
                      isSelected ? "text-emerald-700" : "text-gray-600"
                    }`}
                  >
                    {role.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <>
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

              {/* Role Selection Field */}
              <div>
                <label className="block text-[#1B3139] text-[15px] md:text-[17px] font-semibold pl-3 mb-1">
                  Select your role *
                </label>
                <button
                  type="button"
                  onClick={() => setShowRoleModal(true)}
                  disabled={loading || googleLoading}
                  className={`w-full pl-4 py-3 text-left rounded-[20px] focus:outline-none bg-white focus:ring focus:ring-teal-400 border-2 transition-colors ${
                    selectedRole
                      ? "border-emerald-400 text-[#1b3139]"
                      : "border-gray-200 text-gray-500"
                  } disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-between`}
                >
                  <span className="flex items-center">
                    {selectedRole ? (
                      <>
                        {(() => {
                          const roleDetails = getSelectedRoleDetails();
                          if (roleDetails) {
                            const IconComponent = roleDetails.icon;
                            return (
                              <>
                                <IconComponent
                                  size={18}
                                  className="mr-2 text-emerald-600"
                                />
                                {roleDetails.title}
                              </>
                            );
                          }
                          return null;
                        })()}
                      </>
                    ) : (
                      "Choose your role"
                    )}
                  </span>
                  <ChevronDown size={18} className="text-gray-400 mr-4" />
                </button>
              </div>

              <button
                type="submit"
                disabled={loading || googleLoading || !selectedRole}
                className="w-full bg-[#1FB58F] font-semibold text-white py-3 rounded-[20px] hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
              >
                {loading ? "Creating Account..." : "Sign Up"}
              </button>
            </form>

            <div className="my-6">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading || googleLoading}
                className="w-full flex items-center justify-center border text-[14px] sm:text-[16px] font-semibold text-[#222222] border-black h-[50px] sm:h-[60px] py-3 rounded-[20px] hover:bg-gray-100 disabled:opacity-50"
              >
                {googleLoading ? (
                  "Signing up with Google..."
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
        <div className="w-full lg:w-1/2 bg-[#1FB58F] relative flex items-end justify-center px-6 py-12 md:py-18">
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
              className="absolute inset-0 left-10 h-full z-0 object-cover mix-blend-plus-lighter "
            />

            {/* Headphone Image */}
            <img
              src="/images/headphone.png"
              alt="Live Music"
              className="absolute -top-[10%] left-[56%] -translate-x-1/2 w-[90%] md:w-[100%] z-10"
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

      {/* Role Selection Modal */}
      {showRoleModal && <RoleSelectionModal />}
    </>
  );
};

export default SignUp;