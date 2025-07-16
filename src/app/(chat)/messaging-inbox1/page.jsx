import NavbarChat from '@/components/ChatComponents/NavbarChat';
import React from 'react';
import SearchBarChat from '@/components/ChatComponents/SearchBarChat';
import ProfileCards from '@/components/ChatComponents/ProfileCards';

const Page = () => {
  return (
    <>
      <NavbarChat />

      {/* Content Section */}
      <div className="bg-[#F1F0EB] flex flex-col items-center justify-center text-center py-16 px-4">

        {/* Heading Text */}
        <p className="max-w-xl text-lg md:text-xl font-semibold text-gray-800">
          Your creative journey begins with a conversation — start building your music network.
        </p>

        {/* Search Bar */}
        <div className="mt-8 w-full max-w-2xl">
          <SearchBarChat />
        </div>

        <ProfileCards/>

      </div>
    </>
  );
};

export default Page;
