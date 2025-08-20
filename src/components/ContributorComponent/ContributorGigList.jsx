'use client';
import { useState } from 'react';

export default function GigList({ data, onPageChange }) {
  const [activeTab, setActiveTab] = useState('list');

  const getStatusClasses = (status) => {
    if (status === 'published' || status === 'active') return 'bg-green-100 text-green-700';
    if (status === 'draft') return 'bg-gray-100 text-gray-700';
    return 'bg-blue-100 text-blue-700';
  };

  return (
    <div className="text-gray-800">
      {/* Toggle Tabs */}
      <div className="flex justify-start items-start mb-6 rounded-full bg-white p-1 max-w-3xl">
        <button
          onClick={() => setActiveTab('list')}
          className={`w-1/2 py-2 rounded-full text-sm font-semibold capitalize transition ${activeTab === 'list'
              ? 'bg-[#1FB58F] text-white shadow'
              : 'text-gray-600'
            }`}
        >
          List
        </button>
        <button
          onClick={() => setActiveTab('calendar')}
          className={`w-1/2 py-2 rounded-full text-sm font-semibold capitalize transition ${activeTab === 'calendar'
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
                <th className="p-4">Payment</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y text-gray-800">

              {data?.items?.length > 0 ? (
                data.items.map((gig) => (
                  <tr key={gig.id} className="hover:bg-gray-50">
                    <td className="p-4 break-words">{gig.gig_title}</td>
                    <td className="p-4 break-words">{gig.date}</td>
                    <td className="p-4 break-words">{gig.venue_type}</td>
                    <td className="p-4 break-words">{gig.artist?.name || 'N/A'}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClasses(
                          gig.status
                        )}`}
                      >
                        {gig.status}
                      </span>
                    </td>
                    <td className="p-4 break-words">
                      {gig.payment === '0.00' ? 'Unpaid' : `$${gig.payment}`}
                    </td>
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
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-10 text-gray-500 font-medium">
                    No gigs found
                  </td>
                </tr>
              )}
            </tbody>


          </table>

          {/* Pagination */}
          <div className="flex justify-between items-center p-4 text-sm">
            <span>
              Page {data?.currentPage} of {data?.totalPages}
            </span>
            <div className="space-x-2">
              <button
                disabled={data?.currentPage === 1}
                onClick={() => onPageChange(data.currentPage - 1)}
                className="px-3 py-1 rounded border disabled:opacity-50 hover:cursor-pointer"
              >
                Prev
              </button>
              <button
                disabled={data?.currentPage === data?.totalPages}
                onClick={() => onPageChange(data.currentPage + 1)}
                className="px-3 py-1 rounded border disabled:opacity-50 hover:cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
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
