// src/features/post/PostForm.jsx

import { useState } from 'react';
import { createPost } from '../../api/postsApi';
import PaymentModal from '../payment/PaymentModal';

// --- MODIFIED: Accept the onPostSuccess prop ---
function PostForm({ onPostSuccess }) {
  const [textContent, setTextContent] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!textContent.trim()) return;

    setIsLoading(true);
    setError('');
    setSuccessMessage('');
    
    try {
      const response = await createPost({ text_content: textContent });
      setSuccessMessage(response.message || 'Your post is being processed!');
      setTextContent('');
      // --- NEW: Trigger refresh on non-payment success ---
      onPostSuccess();
    } catch (err) {
      if (err.response) {
        if (err.response.status === 402) {
          setPaymentDetails({
            postId: err.response.data.post_id,
            amount: err.response.data.amount,
            currency: err.response.data.currency,
          });
        } else {
          // Handle specific backend messages (e.g., from moderation)
          setError(err.response.data.error || err.response.data.message || 'An error occurred while submitting.');
        }
      } else {
        setError('Could not connect to the server. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentSuccess = () => {
    setPaymentDetails(null);
    setSuccessMessage('Payment successful! Your post is now being processed.');
    setTextContent('');
    setError('');
    // --- NEW: Trigger refresh on payment success ---
    onPostSuccess();
  };

  const handlePaymentClose = () => {
    setPaymentDetails(null);
    setError('Payment was cancelled. Your post has been saved but will not be published.');
  };

  return (
    <div className="mb-8">
      <form onSubmit={handleSubmit}>
        <textarea
          value={textContent}
          onChange={(e) => setTextContent(e.target.value)}
          placeholder="What do you want to create?"
          rows="4"
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
        {successMessage && <p className="text-green-500 mt-2 text-sm">{successMessage}</p>}
        <button
          type="submit"
          disabled={isLoading || !textContent.trim()}
          className="w-full mt-2 px-4 py-3 bg-purple-600 rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-500"
        >
          {isLoading ? 'Analyzing...' : 'Create Post'}
        </button>
      </form>

      {paymentDetails && (
        <PaymentModal 
          details={paymentDetails}
          onClose={handlePaymentClose}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
}

export default PostForm;