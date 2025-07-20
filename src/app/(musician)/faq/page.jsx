'use client';
import FaqCategories from '@/components/FAQ/FaqCategories';
import FaqContactOptions from '@/components/FAQ/FaqContactOptions';
import TopQuestions from '@/components/FAQ/TopQuestons'; // ✅ Check spelling here!
import FindGigsSearchBar from '@/components/FindgigsComponents/FindGigsSearchBar';
import React from 'react';

const Page = () => {
  const questions = [
    {
      question: "How do I book an artist?",
      answer: "To book an artist, go to the ‘Explore’ section, search for the artist you want, and click ‘Book Now’.",
    },
    { question: "How do I cancel a booking?", answer: "You can cancel a booking from your dashboard under bookings." },
    { question: "What are the payment options?", answer: "We support credit cards, debit cards, and PayPal." },
    { question: "How do I contact support?", answer: "Email us or use the Live Chat option at the bottom." },
    { question: "How do I update my profile?", answer: "Navigate to your profile settings and make changes." },
  ];

  return (
    <main className="bg-[#f4f3ee] min-h-screen px-4 md:px-9 lg:px-12 py-10">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">FAQ and Help Center</h1>
          <p className="text-sm md:text-base text-gray-600 mt-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, ipsum!
          </p>
        </div>

        {/* Search Bar */}
        <FindGigsSearchBar placeholder="Search for artists or venues" />

        {/* Top Questions */}
        <TopQuestions questionList={questions} />
         <FaqCategories/>
        <FaqContactOptions/>
       
      </div>
    </main>
  );
};

export default Page;
