'use client';
import { useState } from 'react';

const gigs = [
  {
    gig: 'Summer Music Fest',
    date: 'July 15, 2024',
    venue: 'The Grand Hall',
    musician: 'Ava Carter',
    status: 'Confirmed',
    applications: 15,
    payment: '$500',
  },
  {
    gig: 'Indie Night',
    date: 'August 20, 2024',
    venue: 'The Underground',
    musician: 'Liam Johnson',
    status: 'Pending',
    applications: 8,
    payment: '$300',
  },
  {
    gig: 'Jazz Evening',
    date: 'September 5, 2024',
    venue: 'The Blue Note',
    musician: 'Ethan Davis',
    status: 'Booked',
    applications: 12,
    payment: '$400',
  },
  {
    gig: 'Rock Revival',
    date: 'October 10, 2024',
    venue: 'The Arena',
    musician: 'Olivia Brown',
    status: 'Confirmed',
    applications: 20,
    payment: '$800',
  },
  {
    gig: 'Acoustic Showcase',
    date: 'November 22, 2024',
    venue: 'The Cozy Corner',
    musician: 'Noah Wilson',
    status: 'Pending',
    applications: 5,
    payment: '$250',
  },
];

export default function GigList() {
  const [activeTab, setActiveTab] = useState('list');

  const getStatusClasses = (status) => {
    if (status === 'Confirmed') return 'bg-green-100 text-green-700';
    if (status === 'Pending') return 'bg-gray-100 text-gray-700';
    if (status === 'Booked') return 'bg-blue-100 text-blue-700';
    return '';
  };

  return (
    <div className=" text-gray-800">
      {/* Toggle Tabs */}
      <div className="flex justify-start  items-start mb-6 rounded-full bg-white p-1 max-w-3xl">
        <button
          onClick={() => setActiveTab('list')}
          className={`w-1/2 py-2 rounded-full text-sm font-semibold capitalize transition ${
            activeTab === 'list'
              ? 'bg-[#1FB58F] text-white shadow'
              : 'text-gray-600'
          }`}
        >
          List
        </button>
        <button
          onClick={() => setActiveTab('calendar')}
          className={`w-1/2 py-2 rounded-full text-sm font-semibold capitalize transition ${
            activeTab === 'calendar'
              ? 'bg-[#1FB58F] text-white shadow'
              : 'text-gray-600'
          }`}
        >
          Calendar
        </button>
      </div>

      {/* List Table */}
      {activeTab === 'list' && (
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-700 font-semibold">
              <tr>
                <th className="p-4">Gig</th>
                <th className="p-4">Date</th>
                <th className="p-4">Venue</th>
                <th className="p-4">Musician</th>
                <th className="p-4">Status</th>
                <th className="p-4">Applications</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y text-gray-800">
              {gigs.map((gig, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="p-4 break-words">{gig.gig}</td>
                  <td className="p-4 break-words">{gig.date}</td>
                  <td className="p-4 break-words">{gig.venue}</td>
                  <td className="p-4 break-words">{gig.musician}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClasses(
                        gig.status
                      )}`}
                    >
                      {gig.status}
                    </span>
                  </td>
                  <td className="p-4 break-words">{gig.applications}</td>
                  <td className="p-4 break-words">{gig.payment}</td>
                  <td className="p-4 space-x-1 text-blue-600 text-sm break-words">
                    <button className="hover:underline">Edit</button>
                    <button className="hover:underline">View</button>
                    {gig.status !== 'Booked' && (
                      <button className="hover:underline">Confirm</button>
                    )}
                    <button className="hover:underline">Cancel</button>
                    <button className="hover:underline">Duplicate</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Placeholder Calendar View */}
      {activeTab === 'calendar' && (
        <div className="text-center text-gray-500 mt-10">
          Calendar View (Coming Soon)
        </div>
      )}
    </div>
  );
}
