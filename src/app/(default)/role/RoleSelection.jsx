"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Mic,
  Headphones,
  BarChart3,
  ArrowRight,
  LocationEditIcon,
} from "lucide-react";
import { authAPI } from "../../../../lib/api";
import { toast } from "sonner";
import Cookies from "js-cookie";

export default function RoleSelection() {
  const [selectedRole, setSelectedRole] = useState("Artist");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const roles = [
    {
      id: "Artist",
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
      id: "Venue",
      icon: LocationEditIcon,
      title: "Venue",
      description: "Discover and enjoy your tracks",
    },
  ];

  const handleNext = async () => {
    if (!selectedRole) {
      setError("Please select a role");
      return;
    }

  

    setLoading(true);
    setError("");

    try {
      // Call update profile API with selected role
      const payload = {
        newRole: selectedRole.toLocaleLowerCase(),
      };

      const result = await authAPI.updateRole(payload);
      console.log("result", result);

      if (result.status === "success") {
        Cookies.set("id", result?.profile?.user_id);
        toast.success("User role updated successfully");
        if (result.user.role === null) {
          router.push("/role");
        } else if (
          result.user.role === "contributor" ||
          result.user.role === "producer"
        ) {
          router.push("/contributor-profile");
        } else if (result.user.role === "artist") {
          router.push("/musician-dashboard");
        } else if (result.user.role === "music_lover") {
          router.push("/music-lover-profile");
        } else if (result.user.role === "venue")
          router.push("/venue-dashboard");
      }
    } catch (err) {
      // Handle API errors
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to update role. Please try again.";
      setError(errorMessage);
      console.error("Role update error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-sm p-8 w-full max-w-4xl">
        <div className="text-center  mb-8">
          <h1 className="text-xl font-medium text-gray-900 mb-2">
            Select the role that best describes you to
          </h1>
          <p className="text-xl font-medium text-gray-900">
            personalize your experience.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded-2xl text-center">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {roles.map((role) => {
            const IconComponent = role.icon;
            const isSelected = selectedRole === role.id;

            return (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                disabled={loading}
                className={`p-6 rounded-2xl border-2 transition-all duration-200 text-center hover:shadow-md disabled:opacity-50 hover:cursor-pointer disabled:cursor-not-allowed ${
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

        <div className="flex justify-center">
          <button
            onClick={handleNext}
            disabled={loading}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-8 py-3 rounded-full flex items-center space-x-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>{loading ? "Processing..." : "Next"}</span>
            {!loading && <ArrowRight size={18} />}
            {loading && (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
