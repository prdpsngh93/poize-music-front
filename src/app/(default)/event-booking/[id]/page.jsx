"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import BackButton from "@/components/GlobalComponents/BackButton";
import Hero from "@/components/GlobalComponents/Hero";

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
    <form onSubmit={handlePayment} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Payment Details
        </label>
        <div className="p-4 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-[#1FB58F] focus-within:border-[#1FB58F]">
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
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between items-center text-lg font-semibold">
          <span>Total Amount:</span>
          <span className="text-[#1FB58F]">${amount}</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
          disabled={processing}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!stripe || processing}
          className="flex-1 px-6 py-3 bg-[#1FB58F] text-white rounded-lg hover:bg-[#17a07b] transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {processing ? (
            <>
              <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
              Processing Payment...
            </>
          ) : (
            `Complete Payment - $${amount}`
          )}
        </button>
      </div>
    </form>
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

const EventDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const eventId = params.id;

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [bookingFree, setBookingFree] = useState(false);

  useEffect(() => {
    fetchEventDetails();
  }, [eventId]);

  const fetchEventDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://poize-music-backend-kn0u.onrender.com/api/contributor-gigs/${eventId}`
      );

      if (response.status === 200) {
        setEvent(response.data);
      } else {
        throw new Error("Event not found");
      }
    } catch (error) {
      console.error("Error fetching event details:", error);
      toast.error("Failed to load event details");
      router.push("/events");
    } finally {
      setLoading(false);
    }
  };

  const handleBookEvent = () => {
    const token = getCookie("token");

    if (!token) {
      toast.error("Please log in to book this event");
      router.push("/login");
      return;
    }

    const eventPrice = event.payment || 0;

    if (eventPrice < 1 || eventPrice === "0") {
      handleFreeBooking();
    } else {
      setShowPaymentForm(true);
    }
  };

  const handleFreeBooking = async () => {
    setBookingFree(true);
    
    try {
      // Add your free booking API call here
      // await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/bookings`, {
      //   gigId: eventId,
      //   userId: getCookie("userId"),
      // });
      
      toast.success("Event booked successfully!");
    } catch (error) {
      console.error("Free booking error:", error);
      toast.error("Failed to book event. Please try again.");
    } finally {
      setBookingFree(false);
    }
  };

  const handlePaymentSuccess = () => {
    setShowPaymentForm(false);
    toast.success("Event booked successfully!");
    // You can add additional success logic here
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No date specified";
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return "";
    return new Date(`2000-01-01 ${timeString}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatPrice = (price) => {
    if (!price || price < 1 || price === "0") return "Free";
    return `$${price}`;
  };

  if (loading) {
    return (
      <main className="bg-[#f4f3ee] min-h-screen px-4 md:px-9 lg:px-12 py-10">
        <div className="max-w-4xl mx-auto">
          <BackButton />
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1FB58F]"></div>
            <p className="text-gray-500 ml-3">Loading event details...</p>
          </div>
        </div>
      </main>
    );
  }

  if (!event) {
    return (
      <main className="bg-[#f4f3ee] min-h-screen px-4 md:px-9 lg:px-12 py-10">
        <div className="max-w-4xl mx-auto">
          <BackButton />
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Event Not Found
            </h2>
            <p className="text-gray-600 mb-4">
              The event you're looking for doesn't exist or has been removed.
            </p>
            <button
              onClick={() => router.push("/events")}
              className="px-4 py-2 bg-[#1FB58F] text-white rounded-md hover:bg-green-700 transition"
            >
              Back to Events
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <div >
        <Hero title={"Event Booking"}/>

      <div className="max-w-4xl my-3 mx-auto">
        <BackButton />
        
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 my-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Event Image */}
            <div className="w-full lg:w-1/3">
              <img
                src={event.attachment_url || "/images/avatar.png"}
                alt={event.gig_title}
                className="w-full h-48 lg:h-64 object-cover rounded-lg"
              />
            </div>

            {/* Basic Info */}
            <div className="flex-1">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                {event.gig_title}
              </h1>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">📅 Date:</span>
                  <span className="text-sm text-gray-600">
                    {formatDate(event.date)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">⏰ Time:</span>
                  <span className="text-sm text-gray-600">
                    {formatTime(event.time) || "Time not specified"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">📍 Venue:</span>
                  <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                    {event.venue_type || "Not specified"}
                  </span>
                </div>

                {event.genre && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">🎵 Genre:</span>
                    <span className="text-sm text-gray-600 bg-blue-100  px-2 py-1 rounded-full">
                      {event.genre}
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">🎤 Artist:</span>
                  <span className="text-sm text-gray-600">
                    {event.artist?.name || "Not specified"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">💰 Price:</span>
                  <span className="text-xl font-bold text-[#1FB58F]">
                    {formatPrice(event.payment)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">📊 Status:</span>
                  <span className={`text-sm px-2 py-1 rounded-full font-medium ${
                    event.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}>
                    {event.status || "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        {event.description && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Event Description
            </h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
              {event.description}
            </p>
          </div>
        )}

        {/* Booking Section */}
        {event.status === "active" && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Book This Event
            </h2>

            {!showPaymentForm ? (
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {event.gig_title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {formatDate(event.date)} at {formatTime(event.time)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-[#1FB58F]">
                        {formatPrice(event.payment)}
                      </p>
                      {(event.payment < 1 || event.payment === "0") && (
                        <p className="text-xs text-gray-500">No payment required</p>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleBookEvent}
                  disabled={bookingFree}
                  className="w-full px-6 py-4 bg-[#1FB58F] text-white text-lg font-semibold rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {bookingFree ? (
                    <>
                      <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                      Booking Event...
                    </>
                  ) : (
                    <>
                      {(event.payment < 1 || event.payment === "0") 
                        ? "Book Event (Free)" 
                        : `Book Event - ${formatPrice(event.payment)}`
                      }
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  {(event.payment < 1 || event.payment === "0") 
                    ? "This event is free to attend. Click to confirm your booking."
                    : "You will be redirected to secure payment processing."
                  }
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800">
                        Secure Payment
                      </h3>
                      <div className="mt-2 text-sm text-blue-700">
                        <p>Your payment information is processed securely through Stripe. We never store your payment details.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Elements stripe={stripePromise}>
                  <PaymentForm
                    gigId={eventId}
                    amount={event.payment}
                    onSuccess={handlePaymentSuccess}
                    onCancel={() => setShowPaymentForm(false)}
                  />
                </Elements>
              </div>
            )}
          </div>
        )}

        {/* Inactive Event Message */}
        {event.status !== "active" && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Event Not Available
                </h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>This event is currently not available for booking. The event status is: <strong>{event.status}</strong></p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Additional Event Information */}
        {(event.requirements || event.additional_info || event.location_details) && (
          <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Additional Information
            </h2>
            <div className="space-y-4">
              {event.requirements && (
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Requirements:</h3>
                  <p className="text-gray-600 text-sm">{event.requirements}</p>
                </div>
              )}
              {event.location_details && (
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Location Details:</h3>
                  <p className="text-gray-600 text-sm">{event.location_details}</p>
                </div>
              )}
              {event.additional_info && (
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Additional Info:</h3>
                  <p className="text-gray-600 text-sm">{event.additional_info}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetailsPage;