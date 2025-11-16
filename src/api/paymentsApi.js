// src/api/paymentsApi.js
import axiosInstance from './axiosInstance';

/**
 * Sends a request to the backend to create a Stripe Payment Intent.
 * @param {object} payload
 * @param {number} payload.post_id The ID of the post that requires payment.
 * @returns {Promise<{clientSecret: string}>} A promise that resolves to an object containing the client secret.
 */
export const createPaymentIntent = async ({ post_id }) => {
  const response = await axiosInstance.post('/api/payments/create-payment-intent/', { post_id });
  return response.data;
};