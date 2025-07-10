"use client"
import React, { useState, useEffect } from 'react';
import { Home, Music, User, Search } from 'lucide-react';
import Link from 'next/link';

const SoundWaveVisualization = () => {
  const [waves, setWaves] = useState([]);

  useEffect(() => {
    // Create animated sound waves
    const waveData = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      height: Math.random() * 100 + 20,
      delay: Math.random() * 2,
      duration: Math.random() * 3 + 2
    }));
    setWaves(waveData);
  }, []);

  return (
    <div className="relative w-full h-80 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-2xl overflow-hidden">
      {/* Animated Background Circles */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-64 h-64 border-2 border-orange-500/30 rounded-full animate-pulse"></div>
        <div className="absolute w-48 h-48 border-2 border-emerald-500/30 rounded-full animate-ping"></div>
        <div className="absolute w-32 h-32 border-2 border-blue-500/30 rounded-full animate-bounce"></div>
      </div>
      
      {/* Sound Wave Visualization */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex items-end gap-1 h-32">
          {waves.map((wave) => (
            <div
              key={wave.id}
              className="w-2 bg-gradient-to-t from-emerald-400 to-orange-400 rounded-full animate-pulse"
              style={{
                height: `${wave.height}%`,
                animationDelay: `${wave.delay}s`,
                animationDuration: `${wave.duration}s`
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Floating Music Notes */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute text-2xl opacity-20 animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 3}s`
            }}
          >
            ♪
          </div>
        ))}
      </div>
    </div>
  );
};

const Music404Page = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleNavigation = (path) => {
    // In a real Next.js app, you would use next/router or next/navigation
    console.log(`Navigating to: ${path}`);
    // For Next.js 13+ App Router:
    // import { useRouter } from 'next/navigation';
    // const router = useRouter();
    // router.push(path);
    
    // For Next.js Pages Router:
    // import { useRouter } from 'next/router';
    // const router = useRouter();
    // router.push(path);
  };

  return (
    <div className=" min-h-screen  flex items-center mt-4 lg:mt-10 justify-center p-4">
      <div className="max-w-4xl w-full text-center">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">
            404 – Lost in the Music
          </h1>
          <p className="text-xl text-gray-600 max-w-md mx-auto">
            Looks like this page is offbeat or out of tune.
          </p>
        </div>

        {/* Sound Wave Visualization */}
        <div className="mb-12">
          <SoundWaveVisualization />
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Link
          href="/"
            className="flex items-center gap-2 px-8 py-3 bg-white text-gray-700 rounded-full font-medium hover:bg-gray-50 hover:shadow-lg transition-all duration-200 transform hover:scale-105 border-2 border-gray-200"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
          
          <button
            onClick={() => handleNavigation('/gigs')}
            className="flex items-center gap-2 px-8 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 hover:shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            <Music className="w-5 h-5" />
            Explore Gigs
          </button>
        </div>

        {/* Additional Action Button */}
        <button
          onClick={() => handleNavigation('/profile')}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex items-center gap-2 px-8 py-3 bg-emerald-500 text-white rounded-full font-medium hover:bg-emerald-600 hover:shadow-lg transition-all duration-200 transform hover:scale-105 mx-auto"
        >
          <User className="w-5 h-5" />
          {isHovered ? 'View Your Profile' : 'Visit My Profile'}
        </button>

      
      </div>
    </div>
  );
};

export default Music404Page;