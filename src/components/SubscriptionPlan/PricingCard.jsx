import React from 'react';
import { Check, Star } from 'lucide-react';

const PricingCard = ({ 
  title, 
  price, 
  period, 
  features, 
  buttonText, 
  isPopular = false,
  isHighlighted = false 
}) => {
  return (
    <div className={`
      relative bg-white rounded-2xl max-h-[440px] shadow-lg border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1
      ${isHighlighted ? 'border-emerald-400 bg-gradient-to-br from-emerald-50 to-emerald-100' : 'border-gray-200 hover:border-gray-300'}
      ${isPopular ? 'scale-105' : ''}
    `}>
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <div className="bg-emerald-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
            <Star className="w-4 h-4 fill-current" />
            Most Popular
          </div>
        </div>
      )}
      
      <div className="p-8">
        {/* Header */}
        <div className="text-left mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
          <div className="flex items-baseline  gap-1">
            <span className="text-5xl font-bold text-gray-900">{price}</span>
            <span className="text-gray-600">/{period}</span>
          </div>
        </div>
          {/* Button */}
        <button className={`
          w-full py-3 px-6 mb-8 rounded-lg font-medium transition-all duration-200 transform hover:scale-105
          ${isHighlighted 
            ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg hover:shadow-emerald-500/25' 
            : 'bg-gray-900 hover:bg-gray-800 text-white shadow-lg hover:shadow-gray-900/25'
          }
        `}>
          {buttonText}
        </button>
        
        {/* Features */}
        <div className="space-y-4 ">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="flex-shrink-0 w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center mt-0.5">
                <Check className="w-3 h-3 text-emerald-600" />
              </div>
              <span className="text-gray-700 leading-relaxed">{feature}</span>
            </div>
          ))}
        </div>
        
      
      </div>
    </div>
  );
};

const PricingCards = () => {
  const plans = [
    {
      title: "Free",
      price: "0",
      period: "month",
      features: [
        "Gig access",
        "Basic search listing",
        "Inbox tools"
      ],
      buttonText: "Get Started",
      isPopular: false,
      isHighlighted: false
    },
    {
      title: "Pro",
      price: "499",
      period: "month",
      features: [
        "Gig access",
        "Priority search listing",
        "Inbox tools",
        "Analytics"
      ],
      buttonText: "Upgrade",
      isPopular: true,
      isHighlighted: true
    },
    {
      title: "Premium",
      price: "999",
      period: "month",
      features: [
        "Gig access",
        "Top search listing",
        "Inbox tools",
        "Advanced analytics",
        "Dedicated support"
      ],
      buttonText: "Upgrade",
      isPopular: false,
      isHighlighted: false
    }
  ];

  return (
    <div className="min-h-screen  px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose the plan that's right for you
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Lorem ipsum is simply dummy text of the printing and typesetting industry.
          </p>
        </div>
        
        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <PricingCard
              key={index}
              title={plan.title}
              price={plan.price}
              period={plan.period}
              features={plan.features}
              buttonText={plan.buttonText}
              isPopular={plan.isPopular}
              isHighlighted={plan.isHighlighted}
            />
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default PricingCards;