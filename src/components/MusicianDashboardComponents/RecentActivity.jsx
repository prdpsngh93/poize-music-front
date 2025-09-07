import React from 'react';
import { User, CalendarCheck, MessageSquare } from 'lucide-react';

const activities = [
  {
    id: 1,
    icon: <MessageSquare className="w-5 h-5 text-gray-600" />,
    title: 'New Collaboration Request',
    detail: 'From Ryan',
  },
  {
    id: 2,
    icon: <CalendarCheck className="w-5 h-5 text-gray-600" />,
    title: 'Gig Confirmation',
    detail: 'Confirmed for August 5th',
  },
  {
    id: 3,
    icon: <User className="w-5 h-5 text-gray-600" />,
    title: 'Profile Update',
    detail: 'Updated bio and profile picture',
  },
];

const RecentActivity = () => {
  return (
    <div className="bg-[#f4f3ee] ">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>

      <div className="space-y-3">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="bg-white rounded-lg px-4 py-3 flex items-start gap-3 shadow-sm"
          >
            <div className="mt-1">{activity.icon}</div>
            <div>
              <p className="text-sm font-medium text-gray-900">{activity.title}</p>
              <p className="text-sm text-gray-500">{activity.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
