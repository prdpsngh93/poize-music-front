// components/ApplicationCard.js
'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import ConfirmationModal from '../GlobalComponents/ConfirmationModal';

const ApplicationCard = ({ applicant, onStatusUpdate }) => {
  const [activeButton, setActiveButton] = useState('');
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    type: null,
    loading: false
  });
  const router = useRouter();

  console.log("applicant", applicant);

  const handleClick = (buttonName) => {
    if (buttonName === 'Accept' || buttonName === 'Reject') {
      setModalConfig({
        isOpen: true,
        type: buttonName.toLowerCase(),
        loading: false
      });
    } else {
      setActiveButton((prev) => (prev === buttonName ? '' : buttonName));
    }
  };

  const handleConfirmAction = async () => {
    const { type } = modalConfig;
    setModalConfig(prev => ({ ...prev, loading: true }));
    try {
      if (type === 'accept') {
        // Navigate to booking summary instead of calling API
        router.push(`/venue-booking-summary/${applicant.id}`);
        return;
      } else if (type === 'reject') {
        // Call reject API
        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/venue-gig-requests/requests-status/${applicant.id}`,
          { status: 'rejected' }
        );

        if (response.status === 200) {
          // Update the applicant status locally
          if (onStatusUpdate) {
            onStatusUpdate(applicant.id, 'rejected');
          }
          
          setModalConfig({ isOpen: false, type: null, loading: false });
          setActiveButton('');
        }
      }
    } catch (error) {
      console.error(`Error ${type}ing application:`, error);
      // Show error state or toast notification
      alert(`Failed to ${type} application. Please try again.`);
    } finally {
      setModalConfig(prev => ({ ...prev, loading: false }));
    }
  };

  const handleCloseModal = () => {
    if (!modalConfig.loading) {
      setModalConfig({ isOpen: false, type: null, loading: false });
    }
  };

  const isActive = (buttonName) => activeButton === buttonName;

  // Don't show Accept/Reject buttons if already processed
  const showActionButtons = !applicant.status || applicant.status === 'pending';

  return (
    <>
      <div className="bg-[#f4f3ee]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-4 md:py-6 bg-[#f4f3ee]">
          {/* Left Text Content */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-500">Applicant</p>
              {applicant.status && (
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  applicant.status === 'accepted' 
                    ? 'bg-green-100 text-green-800' 
                    : applicant.status === 'rejected'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1)}
                </span>
              )}
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{applicant.name}</h3>
            <p className="text-sm text-gray-700">{applicant.role}</p>

            <div className="mt-2">
              <button className="bg-[#1FB58F] text-white text-sm font-medium px-4 py-1.5 rounded-full hover:bg-green-600 transition">
                View Profile
              </button>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {showActionButtons ? (
                ['Accept', 'Reject', 'Message'].map((btn) => (
                  <button
                    key={btn}
                    onClick={() => handleClick(btn)}
                    disabled={modalConfig.loading}
                    className={`text-sm font-medium px-4 py-1.5 rounded-full transition disabled:opacity-50
                      ${isActive(btn)
                        ? 'bg-blue-600 text-white'
                        : btn === 'Accept'
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : btn === 'Reject'
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : 'bg-[#E3DFCB] text-black hover:bg-[#d6d3be]'}
                    `}
                  >
                    {btn}
                  </button>
                ))
              ) : (
                <button
                  onClick={() => handleClick('Message')}
                  className="bg-[#E3DFCB] text-black text-sm font-medium px-4 py-1.5 rounded-full hover:bg-[#d6d3be] transition"
                >
                  Message
                </button>
              )}
            </div>

            <p className="text-sm text-gray-500 mt-2">
              Rating: {applicant.rating} · Note: "{applicant.note}"
            </p>
          </div>

          {/* Applicant Image */}
          <div className="mt-4 w-full flex items-end justify-end md:mt-0 md:ml-6">
            <Image
              src={applicant.image}
              alt={applicant.name}
              width={250}
              height={200}
              className="rounded-lg w-full md:w-[50%] lg:w-[40%] md:h-[20%] object-cover"
            />
          </div>
        </div>

        {/* Bottom Divider */}
        <hr className="border-t border-gray-300" />
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={modalConfig.isOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmAction}
        type={modalConfig.type}
        applicantName={applicant.name}
        loading={modalConfig.loading}
      />
    </>
  );
};

export default ApplicationCard;