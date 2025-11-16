import React from 'react';

/**
 * A component to display a single post with its text content and status.
 *
 * @param {object} props
 * @param {object} props.post - The post object from the API.
 * @param {number} props.post.id - The unique ID of the post.
 * @param {number} props.post.post_number - The sequential number of the post.
 * @param {object} props.post.user - The user object associated with the post.
 * @param {string} props.post.user.name - The name of the user who created the post.
 * @param {string} props.post.text_content - The main text content of the post.
 * @param {'POSTED' | 'PROCESSING' | 'PENDING_MODERATION' | 'FAILED'} props.post.status - The current status from the backend.
 * @param {string} props.post.created_at - The ISO 8601 timestamp of when the post was created.
 */
function PostCard({ post }) {
  // --- Status Badge Logic (Updated to match backend statuses) ---
  const statusStyles = {
    // Maps directly to your Django model's PostStatus choices
    POSTED:           { style: 'bg-green-500/20 text-green-400', label: 'Posted' },
    PROCESSING:       { style: 'bg-blue-500/20 text-blue-400', label: 'Processing' },
    PENDING_MODERATION: { style: 'bg-yellow-500/20 text-yellow-400', label: 'Pending Review' },
    FAILED:           { style: 'bg-red-500/20 text-red-400', label: 'Failed' },
    // A fallback for any other unexpected status
    DEFAULT:          { style: 'bg-gray-500/20 text-gray-400', label: 'Unknown' },
  };

  // Get the correct style and label for the current post's status
  const { style: currentStatusStyle, label: currentStatusLabel } =
    statusStyles[post.status] || statusStyles.DEFAULT;

  // --- Timestamp Formatting ---
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '...';
    const date = new Date(timestamp);
    return date.toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-5 flex flex-col h-full space-y-4">
      {/* --- CARD HEADER --- */}
      <div className="flex justify-between items-start">
        <div>
          {/* --- UPDATED: Safely access nested user name --- */}
          <p className="font-bold text-lg text-white">{post.user?.name || 'Anonymous'}</p>
          <p className="text-sm text-gray-400">Post #{post.post_number}</p>
        </div>
        <span
          className={`px-2.5 py-1 text-xs font-semibold rounded-full capitalize ${currentStatusStyle}`}
        >
          {currentStatusLabel}
        </span>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-grow">
        <p className="text-gray-200 text-lg whitespace-pre-wrap">
          {post.text_content}
        </p>
      </div>

      {/* --- CARD FOOTER --- */}
      <div className="flex justify-end pt-2 border-t border-gray-700/50">
        <p className="text-xs text-gray-500">{formatTimestamp(post.created_at)}</p>
      </div>
    </div>
  );
}

export default PostCard;