import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaMusic,
  FaDollarSign,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { toast } from "sonner";
import axios from "axios";

// Initialize Stripe
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

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
        type: "card",
        card: cardElement,
      });

      if (error) {
        console.error("Payment method error:", error);
        toast.error(error.message);
        setProcessing(false);
        return;
      }

      // Create payment intent on your backend
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/stripe/create-payment-intent`,
        {
          amount: amount * 100, // Convert to cents
          gigId: gigId,
        },
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );

      if (!response.data || !response.data.clientSecret) {
        toast.error("Failed to initialize payment. Please try again.");
        setProcessing(false);
        return;
      }

      const { clientSecret } = response.data;

      // Confirm payment with the payment method
      const { error: confirmError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentMethod.id,
        });

      if (confirmError) {
        console.error("Payment confirmation error:", confirmError);
        toast.error(confirmError.message);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        toast.success("Payment successful! Event Booked");
        onSuccess();
      } else {
        toast.error("Payment was not completed successfully.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      if (error.response) {
        toast.error(
          `Payment failed: ${error.response.data?.message || "Server error"}`
        );
      } else if (error.request) {
        toast.error(
          "Network error. Please check your connection and try again."
        );
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
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
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
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
          {processing ? "Processing..." : `Pay $${amount}`}
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
            onSuccess={onSuccess}
            onCancel={onClose}
          />
        </Elements>
      </div>
    </div>
  );
};

// Confirmation Modal Component for Free Bookings
const ConfirmationModal = ({ isOpen, onClose, title, onConfirm, loading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Confirm Booking</h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to book "{title}"?
        </p>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 px-4 py-2 bg-[#1FB58F] text-white rounded hover:bg-[#17a07b] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Booking..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
};

// Utility function to get cookie
const getCookie = (name) => {
  if (typeof document === "undefined") return null;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

const GigsGridCard = ({
  gigId,
  image,
  title,
  location,
  date,
  artist,
  price,
  description,
  status = "active",
  genre,
}) => {
  const router = useRouter();
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [booking, setBooking] = useState(false);

  // Navigate to event details page
  const handleViewDetails = () => {
    router.push(`/event-booking/${gigId}`);
  };

  // Quick booking action
  const handleQuickBook = (e) => {
    e.stopPropagation(); // Prevent triggering view details
    
    const token = getCookie("token");

    if (!token) {
      toast.error("Please log in to book this event");
      router.push("/login");
      return;
    }

    // Check if the amount is 0 (free booking)
    if (price < 1 || price === "0") {
      setConfirmationModalOpen(true);
    } else {
      setPaymentModalOpen(true);
    }
  };

  const handlePaymentSuccess = () => {
    setPaymentModalOpen(false);
    toast.success("Event booked successfully!");
    // You can add additional success logic here
  };

  const handleFreeBookingConfirm = async () => {
    setBooking(true);
    
    try {
      // Add your free booking API call here
      // await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/bookings`, {
      //   gigId,
      //   userId: getCookie("userId"),
      // });
      
      toast.success("Event booked successfully!");
      setConfirmationModalOpen(false);
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Failed to book event. Please try again.");
    } finally {
      setBooking(false);
    }
  };

  const formatPrice = (price) => {
    if (!price || price < 1 || price === "0") return "Free";
    return typeof price === "number" ? `$${price}` : price;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Date TBD";
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return dateString;
      }
      
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch (error) {
      return dateString;
    }
  };

  const truncateText = (text, maxLength = 100) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
        {/* Image Section */}
        <div className="relative h-48 overflow-hidden cursor-pointer" onClick={handleViewDetails}>
          <img
            src={image || "/images/avatar.png"}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Status Badge */}
          <div className="absolute top-3 left-3">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              status === "active"
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}>
              {status}
            </span>
          </div>

          {/* Price Badge */}
          <div className="absolute top-3 right-3">
            <span className="px-3 py-1 bg-[#1FB58F] text-white text-sm font-bold rounded-full">
              {formatPrice(price)}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4">
          {/* Title */}
          <h2 
            className="font-bold text-lg text-black mb-2 hover:text-[#1FB58F] cursor-pointer transition-colors line-clamp-2"
            onClick={handleViewDetails}
          >
            {title}
          </h2>

          {/* Event Details */}
          <ul className="text-sm text-gray-700 mb-3 space-y-2">
            <li className="flex items-center">
              <FaMapMarkerAlt className="mr-2 text-gray-600 flex-shrink-0" />
              <span className="font-medium capitalize">{location || "Location TBD"}</span>
            </li>
            <li className="flex items-center">
              <FaCalendarAlt className="mr-2 text-gray-600 flex-shrink-0" />
              <span>{formatDate(date)}</span>
            </li>
            <li className="flex items-center">
              <FaMusic className="mr-2 text-gray-600 flex-shrink-0" />
              <span>{artist || "Artist TBD"}</span>
            </li>
            {genre && (
              <li className="flex items-center">
                <span className="mr-2 text-gray-600">🎵</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                  {genre}
                </span>
              </li>
            )}
          </ul>

          {/* Description */}
          {description && (
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              {truncateText(description)}
            </p>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={handleViewDetails}
              className="flex-1 px-4 py-2 border border-gray-400 text-gray-800 rounded hover:bg-gray-100 transition-colors text-sm font-medium"
            >
              View Details
            </button>
            
            {status === "active" && (
              <button
                onClick={handleQuickBook}
                className="flex-1 px-4 py-2 bg-[#1FB58F] text-white rounded hover:bg-green-600 transition-colors text-sm font-medium"
              >
                {price < 1 || price === "0" ? "Book Now" : "Quick Book"}
              </button>
            )}
          </div>

          {/* Inactive Status Message */}
          {status !== "active" && (
            <div className="mt-2 p-2 bg-yellow-100 border border-yellow-200 rounded text-xs text-yellow-800 text-center">
              This event is currently {status}
            </div>
          )}
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

      {/* Confirmation Modal for Free Bookings */}
      <ConfirmationModal
        isOpen={confirmationModalOpen}
        onClose={() => setConfirmationModalOpen(false)}
        title={title}
        onConfirm={handleFreeBookingConfirm}
        loading={booking}
      />
    </>
  );
};

export default GigsGridCard;