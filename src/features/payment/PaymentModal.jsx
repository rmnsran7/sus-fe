// src/features/payment/PaymentModal.jsx

import React, { useState, useEffect } from 'react';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { createPaymentIntent } from '../../api/paymentsApi';

// Load Stripe outside of a component's render
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ details, onSuccess, onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Your CAD formatting function is great, no changes needed.
  const formatAmountCAD = (d) => {
    if (!d || d.amount == null) return 'the required amount';
    return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(Number(d.amount));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setMessage(null);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    });

    if (error) {
      setMessage(error.message || 'An error occurred during payment.');
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      onSuccess && onSuccess();
    } else {
      setMessage('Payment is not complete. Please try again.');
    }

    setIsProcessing(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold text-white">Payment Required</h2>

      <p className="text-gray-300">
        This post is promotional. To publish, please pay{' '}
        <strong>{formatAmountCAD(details)}</strong>.
      </p>

      <div>
        <PaymentElement id="payment-element" />
      </div>

      <div className="mt-4 flex gap-2">
        <button
          type="submit"
          disabled={isProcessing || !stripe || !elements}
          id="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? 'Processing...' : 'Pay now'}
        </button>

        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg"
        >
          Cancel
        </button>
      </div>

      {message && <div id="payment-message" className="mt-2 text-sm text-red-400">{message}</div>}
    </form>
  );
};

const PaymentModal = ({ details, onClose, onSuccess }) => {
  const [clientSecret, setClientSecret] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!details || !details.postId) {
      setError('Missing payment details.');
      return;
    }
    const fetchIntent = async () => {
      setError('');
      try {
        const response = await createPaymentIntent({ post_id: details.postId });
        if (!response?.clientSecret) {
          throw new Error('No clientSecret returned from API');
        }
        setClientSecret(response.clientSecret);
      } catch (err) {
        console.error('Failed to create payment intent:', err);
        setError('Could not initialize payment. Please try again.');
      }
    };
    fetchIntent();
  }, [details?.postId]);

  // --- THIS IS THE ONLY PART THAT NEEDS TO CHANGE ---
  // We are replacing the default theme with the 'night' theme
  // and customizing it to match your app's dark aesthetic.
  const appearance = {
    theme: 'night',
    variables: {
      colorPrimary: '#2563eb',       // Matches your blue-600 button
      colorBackground: '#1f2937',   // A dark gray (Tailwind's gray-800)
      colorText: '#ffffff',
      colorDanger: '#ef4444',
      borderRadius: '8px',          // Matches your rounded-lg classes
    },
    rules: {
      '.Input': {
        backgroundColor: '#374151', // A slightly lighter gray for inputs
      }
    }
  };
  // ----------------------------------------------------

  const options = { clientSecret, appearance };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl font-bold"
          aria-label="Close"
        >
          &times;
        </button>

        {error ? (
          <div className="text-red-500">{error}</div>
        ) : clientSecret ? (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm details={details} onSuccess={onSuccess} onClose={onClose} />
          </Elements>
        ) : (
          <div className="py-12 text-center text-gray-300">Initializing secure payment...</div>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;