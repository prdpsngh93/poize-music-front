import React, { useState } from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaMusic, FaDollarSign } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { toast } from 'sonner';
import axios from 'axios';

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

// Payment Form Component
const PaymentForm = ({ gigId, amount, onSuccess, onCancel }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);

  const handlePayment = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    try {
      const cardElement = elements.getElement(CardElement);

      // Create payment method
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        console.error('Payment method error:', error);
        toast.error(error.message);
        setProcessing(false);
        return;
      }

      // Create payment intent on your backend
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/stripe/create-payment-intent`, {
        amount: amount * 100, // Convert to cents
        gigId: gigId,
        paymentMethodId: paymentMethod.id,
      }, {
        headers: {
          'Authorization': `Bearer ${getCookie('token')}`
        }
      });

      const { client_secret } = response.data;

      // Confirm payment
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(client_secret);

      if (confirmError) {
        console.error('Payment confirmation error:', confirmError);
        toast.error(confirmError.message);
      } else if (paymentIntent.status === 'succeeded') {
        toast.success('Payment successful!');
        
        // Call your API after successful payment
        try {
          await axios.post('/api/gig-application', {
            gigId: gigId,
            paymentIntentId: paymentIntent.id,
            amount: amount
          }, {
            headers: {
              'Authorization': `Bearer ${getCookie('token')}`
            }
          });
          
          onSuccess();
        } catch (apiError) {
          console.error('API call after payment failed:', apiError);
          toast.error('Payment succeeded but application failed. Please contact support.');
        }
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed. Please try again.');
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handlePayment} className="space-y-4">
      <div className="p-4 border rounded-lg">
        <CardElement 
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
            },
          }}
        />
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold">Amount: ${amount}</span>
      </div>
      
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
          disabled={processing}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!stripe || processing}
          className="flex-1 px-4 py-2 bg-[#1FB58F] text-white rounded hover:bg-[#17a07b] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {processing ? 'Processing...' : `Pay $${amount}`}
        </button>
      </div>
    </form>
  );
};

// Payment Modal Component
const PaymentModal = ({ isOpen, onClose, gigId, amount, onSuccess }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Complete Payment</h3>
        <Elements stripe={stripePromise}>
          <PaymentForm 
            gigId={gigId}
            amount={amount}
            onSuccess={() => {
              onSuccess();
              onClose();
            }}
            onCancel={onClose}
          />
        </Elements>
      </div>
    </div>
  );
};

// Utility function to get cookie
const getCookie = (name) => {
  if (typeof document === 'undefined') return null;
  
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

const GigsGridCard = ({ 
  onClick, 
  image, 
  title, 
  location, 
  date, 
  artist, 
  price, 
  description, 
  footerButton,
  gigId // Add gigId prop
}) => {
  const router = useRouter();
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  const handleApplyClick = () => {
    const token = getCookie('token');
    
    if (!token) {
      // No token found, redirect to login
      toast.error('Please log in to apply for this gig');
      router.push('/login');
      return;
    }

    // Token exists, open payment modal
    setPaymentModalOpen(true);
  };

  const handlePaymentSuccess = () => {
    toast.success('Application submitted successfully!');
    // You can add any additional success logic here
    // For example, refresh the gigs list or update the UI
  };

  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-4 sm:p-5 w-full max-w-full md:max-w-md transition hover:shadow-lg">
        
        <div className="flex items-center mb-3 flex-wrap sm:flex-nowrap">
          <img
            src={image}
            alt={title}
            className="w-12 h-12 rounded-full mr-3 mb-2 sm:mb-0 object-cover"
          />
          <div>
            <h2 className="font-bold text-base md:text-lg text-black">{title}</h2>
            <p className="text-sm text-gray-500">Lorem Ipsum is simply dummy text</p>
          </div>
        </div>

        <ul className="text-sm text-gray-700 mb-3 space-y-1">
          <li className="flex items-center">
            <FaMapMarkerAlt className="mr-2 text-gray-600" />
            <strong>{location}</strong>
          </li>
          <li className="flex items-center">
            <FaCalendarAlt className="mr-2 text-gray-600" />
            {date}
          </li>
          <li className="flex items-center">
            <FaMusic className="mr-2 text-gray-600" />
            {artist}
          </li>
          <li className="flex items-center">
            <FaDollarSign className="mr-2 text-gray-600" />
            ${price}
          </li>
        </ul>

        <p className="text-sm text-gray-600 mb-4">
          {description}
        </p>

        <div className="flex flex-wrap gap-3">
          <button 
            onClick={onClick} 
            className="border border-gray-400 text-gray-800 px-4 py-2 rounded hover:bg-gray-100 w-full sm:w-auto"
          >
            View Details
          </button>
          <button 
            onClick={handleApplyClick}
            className="bg-[#1FB58F] text-white px-6 py-2 rounded hover:bg-green-600 w-full sm:w-auto"
          >
            Apply
          </button>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        gigId={gigId}
        amount={price}
        onSuccess={handlePaymentSuccess}
      />
    </>
  );
};

export default GigsGridCard;