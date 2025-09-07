"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import {
  Mic,
  Headphones,
  BarChart3,
  LocationEditIcon,
  X,
  ArrowRight,
} from "lucide-react";
import Cookies from "js-cookie";

const OAuthRoleSelection = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [userData, setUserData] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const userDataParam = searchParams.get("userData");
    if (userDataParam) {
      try {
        const parsedUserData = JSON.parse(decodeURIComponent(userDataParam));
        setUserData(parsedUserData);
      } catch (err) {
        console.error("Failed to parse user data:", err);
        router.push("/login?error=invalid-data");
      }
    } else {
      router.push("/login");
    }
  }, [searchParams, router]);

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

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    setError("");
  };

  const handleContinue = async () => {
    if (!selectedRole) {
      setError("Please select your role to continue");
      return;
    }

    if (!userData) {
      setError("User data not found. Please try signing in again.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const payload = {
        name: userData.name,
        email: userData.email,
        password: userData.id,
        is_oauth_login: true,
        role: selectedRole,
      };

      const registerUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/register`;
      console.log("registerUrl", registerUrl);
      
      const registerRes = await axios.post(registerUrl, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const registerResult = registerRes.data;
      console.log("registerResult", registerResult);

      if (registerResult.status === "success") {
        console.log("✅ User registered:", registerResult.user.email);
        
        // Now login the user
        const loginUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`;
        const loginRes = await axios.post(loginUrl, {
          email: userData.email,
          password: userData.id,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const loginResult = loginRes.data;
        console.log("loginResult", loginResult);

        if (loginResult.token && loginResult.user) {
          const { token, user, profile } = loginResult;

          // Set cookies and session storage
          Cookies.set("token", token);
          Cookies.set("userId", user.id);
          if (profile?.id) Cookies.set("id", profile.id);
          Cookies.set("userName", user.name);
          Cookies.set("userEmail", user.email);
          Cookies.set("userRole", user.role);
          
          sessionStorage.setItem("authToken", token);

          toast.success("Account created successfully!");

          // Redirect based on role
          const userRole = user.role || selectedRole;
          
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
          throw new Error("Login failed after registration");
        }
      } else {
        throw new Error(registerResult.message || "Registration failed");
      }
    } catch (err) {
      console.error("Registration error:", err);
      
      let errorMessage = "Registration failed. Please try again.";
      
      if (err.response) {
        const responseData = err.response.data;
        
        if (responseData?.error?.name === "SequelizeUniqueConstraintError") {
          const emailError = responseData.error.errors?.find(e => e.path === "email");
          if (emailError) {
            errorMessage = "This email address is already registered. Please try logging in.";
          }
        } else if (responseData?.error?.errors && Array.isArray(responseData.error.errors)) {
          errorMessage = responseData.error.errors.map(e => e.message).join(", ");
        } else {
          errorMessage = 
            responseData?.message || 
            responseData?.error?.message ||
            responseData?.error || 
            `Server error: ${err.response.status}`;
        }
      } else if (err.request) {
        errorMessage = "Network error. Please check your connection.";
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <img
              src={userData.image}
              alt={userData.name}
              className="w-16 h-16 rounded-full border-4 border-emerald-100"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome, {userData.name}!
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            To complete your registration, please select your role:
          </p>
          <p className="text-sm text-gray-500">
            Signed in with: {userData.email}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg text-center">
            {error}
          </div>
        )}

        {/* Role Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {roles.map((role) => {
            const IconComponent = role.icon;
            const isSelected = selectedRole === role.id;

            return (
              <button
                key={role.id}
                onClick={() => handleRoleSelect(role.id)}
                disabled={loading}
                className={`p-6 rounded-2xl border-2 transition-all duration-200 text-center hover:shadow-md hover:cursor-pointer disabled:opacity-50 ${
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

        {/* Continue Button */}
        <div className="flex justify-center">
          <button
            onClick={handleContinue}
            disabled={!selectedRole || loading}
            className="flex items-center px-8 py-3 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              "Creating Account..."
            ) : (
              <>
                Continue
                <ArrowRight size={20} className="ml-2" />
              </>
            )}
          </button>
        </div>

        {/* Back to Login */}
        <div className="text-center mt-6">
          <button
            onClick={() => router.push("/login")}
            disabled={loading}
            className="text-gray-500 hover:text-gray-700 text-sm disabled:opacity-50"
          >
            ← Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default OAuthRoleSelection;