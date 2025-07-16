'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, Heart, MessageSquare } from 'lucide-react';

const ProfileDetail = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="bg-[#f3f3ef]  px-4 md:px-9 lg:px-16 py-4 pt-16">
      <div className="max-w-7xl mx-auto">
        {/* Profile Top Section */}
        <div className="flex flex-col md:flex-row items-center justify-center md:items-start gap-6 md:gap-12">
          {/* Profile Image */}
          <div className="w-[250px] h-[200px]">
  <Image
    src="/images/avatar.png"
    alt="Profile"
    width={200}
    height={200}
    className="object-cover rounded-full"
  />
</div>


          {/* Info & Actions */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left w-full">
            {/* Name & Text */}
            <div>
              <h2 className="text-lg font-bold text-gray-800">Alex Turner</h2>
              <p className="text-sm text-gray-500 mt-1">
                Hey, are you still looking for a venue for your upcoming tour?
              </p>
            </div>

            {/* Icons */}
            <div className="flex gap-6 mt-4 flex-wrap justify-center md:justify-start">
              {[
                { icon: <Plus size={18} />, label: 'Connected', active: true },
                { icon: <Heart size={18} />, label: 'Favourite' },
                { icon: <MessageSquare size={18} />, label: 'Message' },
              ].map(({ icon, label, active }, idx) => (
                <div key={idx} className="flex flex-col items-center text-xs text-gray-600 group">
                  <div
                    className={`rounded-full p-2 transition-colors duration-200 ${
                      active
                        ? 'bg-[#1FB58F] text-white'
                        : 'bg-white hover:bg-[#1FB58F] hover:text-white'
                    }`}
                  >
                    {icon}
                  </div>
                  <span className="mt-1">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-8 mt-8 text-sm font-medium border-b border-gray-300 w-full">
          {['overview', 'songs'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 capitalize ${
                activeTab === tab
                  ? 'text-[#1FB58F] border-b-2 border-[#1FB58F]'
                  : 'text-gray-500'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-6 text-sm md:text-base text-gray-700 leading-relaxed">
          {activeTab === 'overview' && (
            <div>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a type specimen book.
              </p>
             
            </div>
          )}

          {activeTab === 'songs' && (
            <div className="text-gray-500 italic">No songs uploaded yet.</div>
          )}
        </div>

    
    
      </div>
    </div>
  );
};

export default ProfileDetail;
