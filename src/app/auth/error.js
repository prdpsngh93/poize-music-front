"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthError() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");

  useEffect(() => {
    const errorType = searchParams.get('error');
    const message = searchParams.get('message');

    switch (errorType) {
      case 'EmailExists':
        setError("This email is already registered with a password. Please log in with your email and password instead.");
        break;
      case 'OAuthError':
        setError("Google authentication failed. Please try again or contact support.");
        break;
      default:
        setError("An authentication error occurred. Please try again.");
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Authentication Error</h1>
          <p className="text-gray-700 mb-6">{error}</p>
          <button
            onClick={() => router.push('/login')}
            className="bg-[#1FB58F] text-white px-6 py-2 rounded-lg hover:bg-teal-600"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}