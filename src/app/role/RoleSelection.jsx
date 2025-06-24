
"use client"
import { useState } from 'react';
import { Mic, Headphones, BarChart3, ArrowRight } from 'lucide-react';

export default function RoleSelection() {
  const [selectedRole, setSelectedRole] = useState('Artist');

  const roles = [
    {
      id: 'Artist',
      icon: Mic,
      title: 'Artist',
      description: 'Upload and share your music'
    },
    {
      id: 'Listener',
      icon: Headphones,
      title: 'Listener',
      description: 'Discover new music'
    },
    {
      id: 'Producer',
      icon: BarChart3,
      title: 'Producer',
      description: 'Mix and sell your tracks'
    }
  ];

  return (
    <div className="  flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-sm p-8 w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-xl font-medium text-gray-900 mb-2">
            Select the role that best describes you to
          </h1>
          <p className="text-xl font-medium text-gray-900">
            personalize your experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {roles.map((role) => {
            const IconComponent = role.icon;
            const isSelected = selectedRole === role.id;
            
            return (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`p-6 rounded-2xl border-2 transition-all duration-200 text-center hover:shadow-md ${
                  isSelected
                    ? 'border-emerald-400 bg-emerald-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex flex-col items-center space-y-3">
                  <div className={`p-3 rounded-full ${
                    isSelected ? 'bg-emerald-100' : 'bg-gray-100'
                  }`}>
                    <IconComponent 
                      size={24} 
                      className={isSelected ? 'text-emerald-600' : 'text-gray-600'} 
                    />
                  </div>
                  <h3 className={`font-semibold ${
                    isSelected ? 'text-emerald-900' : 'text-gray-900'
                  }`}>
                    {role.title}
                  </h3>
                  <p className={`text-sm ${
                    isSelected ? 'text-emerald-700' : 'text-gray-600'
                  }`}>
                    {role.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex justify-center">
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-8 py-3 rounded-full flex items-center space-x-2 transition-colors duration-200">
            <span>Next</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}