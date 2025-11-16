// src/features/post/PostFeed.jsx

import { useState, useEffect, useCallback, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { getRecentPosts } from '../../api/postsApi';
import PostCard from '../../components/common/PostCard/PostCard';
import Spinner from '../../components/common/Spinner/Spinner';

// --- MODIFIED: Accept the refreshKey prop ---
function PostFeed({ refreshKey }) {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.5 });

  const loadMorePosts = useCallback(async (isRefresh = false) => {
    // Don't load more if we're already loading, unless it's a forced refresh
    if (isLoading && !isRefresh) return;
    
    // Determine the page to load
    const pageToLoad = isRefresh ? 1 : page;
    
    setIsLoading(true);
    
    try {
      const response = await getRecentPosts(pageToLoad);
      const newPosts = response.results; // Assuming your API is paginated
      
      if (newPosts && newPosts.length > 0) {
        // If it's a refresh, replace the posts. Otherwise, append them.
        setPosts(prev => isRefresh ? newPosts : [...prev, ...newPosts]);
        setPage(pageToLoad + 1);
        setHasMore(!!response.next); // API tells us if there are more pages
      } else {
        if (isRefresh) setPosts([]); // Clear posts if refresh returns nothing
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to fetch posts", error);
    } finally {
      setIsLoading(false);
    }
  }, [page, isLoading]);

  // --- NEW: Effect to handle the refresh trigger ---
  useEffect(() => {
    // Don't run on the initial render (refreshKey starts at 0)
    if (refreshKey > 0) {
      console.log("Refresh key changed, reloading feed from page 1.");
      loadMorePosts(true); // `true` indicates it's a refresh action
    }
  }, [refreshKey]); // eslint-disable-line react-hooks/exhaustive-deps

  // Initial load
  useEffect(() => {
    loadMorePosts(true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Infinite scroll trigger
  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      loadMorePosts();
    }
  }, [inView, hasMore, isLoading, loadMorePosts]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Recent Posts</h2>
      <div className="space-y-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      
      {isLoading && (
        <div className="flex justify-center py-8">
          <Spinner />
        </div>
      )}

      {hasMore && !isLoading && posts.length > 0 && (
        <div ref={ref} style={{ height: '20px' }} />
      )}

      {!hasMore && posts.length > 0 && (
         <p className="text-center text-gray-500 py-8">You've reached the end!</p>
      )}
       
      {!hasMore && posts.length === 0 && !isLoading && (
         <p className="text-center text-gray-500 py-8">No posts yet. Be the first to create one!</p>
      )}
    </div>
  );
}

export default PostFeed;