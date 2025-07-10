
"use client"
import React, { useState } from 'react';
import { 
  Search, 
  ChevronDown, 
  ChevronUp, 
  User, 
  CreditCard, 
  Calendar, 
  Settings, 
  HelpCircle,
  MessageCircle,
  Mail
} from 'lucide-react';

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={onClick}
        className="w-full py-4 px-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
      >
        <span className="font-medium text-gray-900 pr-4">{question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
        )}
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="px-6 pb-4 text-gray-600 leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  );
};

const CategoryCard = ({ icon: Icon, title, description, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-200 cursor-pointer group"
    >
      <div className="flex flex-col items-center text-center">
        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition-colors duration-200">
          <Icon className="w-6 h-6 text-gray-600 group-hover:text-emerald-600" />
        </div>
        <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

const ContactOption = ({ icon: Icon, title, description, buttonText, isPrimary, onClick }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
          <Icon className="w-5 h-5 text-gray-600" />
        </div>
        <div>
          <h4 className="font-medium text-gray-900">{title}</h4>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
      <button
        onClick={onClick}
        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
          isPrimary 
            ? 'bg-emerald-500 text-white hover:bg-emerald-600' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        {buttonText}
      </button>
    </div>
  );
};

const FAQHelpCenter = () => {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const faqData = [
    {
      question: "How do I book an artist?",
      answer: "To book an artist, navigate to the 'Explore' section, search for the artist you want, and click 'Book Now'. Follow the prompts to complete the booking process."
    },
    {
      question: "How do I cancel a booking?",
      answer: "You can cancel a booking by going to your bookings page, selecting the booking you want to cancel, and clicking the 'Cancel' button. Please note our cancellation policy may apply."
    },
    {
      question: "What are the payment options?",
      answer: "We accept major credit cards, PayPal, bank transfers, and various digital payment methods. All payments are processed securely through our encrypted payment system."
    },
    {
      question: "How do I contact support?",
      answer: "You can contact our support team through live chat, email, or our community forum. Our support hours are 9 AM to 6 PM EST, Monday through Friday."
    },
    {
      question: "How do I update my profile?",
      answer: "To update your profile, go to your account settings, click on 'Edit Profile', make your changes, and save. You can update your photo, bio, contact information, and preferences."
    }
  ];

  const categories = [
    {
      icon: User,
      title: "Artist Help",
      description: "Learn how to manage your artist profile"
    },
    {
      icon: CreditCard,
      title: "Account & Payments",
      description: "Manage your account and payment methods"
    },
    {
      icon: Calendar,
      title: "Booking Support",
      description: "Get help with booking artists"
    },
    {
      icon: Settings,
      title: "Technical Support",
      description: "Troubleshooting technical issues"
    },
    {
      icon: HelpCircle,
      title: "General Questions",
      description: "Find answers to common questions"
    }
  ];

  const handleFAQClick = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const filteredFAQs = faqData.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">FAQ and Help Center</h1>
          <p className="text-xl text-gray-300 mb-8">
            Lorem ipsum is simply dummy text of the printing and typesetting industry.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for artists or venues"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 bg-white border-0 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Top Questions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">Top Questions</h2>
              </div>
              <div>
                {filteredFAQs.map((faq, index) => (
                  <FAQItem
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openFAQ === index}
                    onClick={() => handleFAQClick(index)}
                  />
                ))}
              </div>
            </div>

            {/* Browse by Category */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">Browse by Category</h2>
              </div>
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {categories.map((category, index) => (
                    <CategoryCard
                      key={index}
                      icon={category.icon}
                      title={category.title}
                      description={category.description}
                      onClick={() => console.log(`Clicked ${category.title}`)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Us</h3>
              <div className="space-y-4">
                <ContactOption
                  icon={Mail}
                  title="Email Us"
                  description="Get help via email"
                  buttonText="Send Email"
                  isPrimary={false}
                  onClick={() => console.log('Email clicked')}
                />
                <ContactOption
                  icon={MessageCircle}
                  title="Live Chat"
                  description="Chat with our support team"
                  buttonText="Start Chat"
                  isPrimary={true}
                  onClick={() => console.log('Live chat clicked')}
                />
                <ContactOption
                  icon={HelpCircle}
                  title="Community Forum"
                  description="Ask the community"
                  buttonText="Visit Forum"
                  isPrimary={false}
                  onClick={() => console.log('Forum clicked')}
                />
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Links</h3>
              <div className="space-y-2">
                <a href="#" className="block text-emerald-600 hover:text-emerald-700 transition-colors">
                  Getting Started Guide
                </a>
                <a href="#" className="block text-emerald-600 hover:text-emerald-700 transition-colors">
                  Artist Guidelines
                </a>
                <a href="#" className="block text-emerald-600 hover:text-emerald-700 transition-colors">
                  Booking Terms
                </a>
                <a href="#" className="block text-emerald-600 hover:text-emerald-700 transition-colors">
                  Payment Information
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQHelpCenter;