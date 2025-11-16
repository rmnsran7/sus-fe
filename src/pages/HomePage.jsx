// src/pages/HomePage.jsx

import { useState } from 'react'; // --- NEW: Import useState
import useUserStore from '../store/userStore';
import PostForm from '../features/post/PostForm';
import PostFeed from '../features/post/PostFeed';
import logo from '../assets/logo.svg'; 

function HomePage() {
  const user = useUserStore((state) => state.user);
  // --- NEW: State to trigger a refresh in the PostFeed ---
  const [refreshKey, setRefreshKey] = useState(0);

  // --- NEW: This function will be called by PostForm on success ---
  const handlePostSuccess = () => {
    console.log("Post success detected in parent, triggering refresh...");
    // A short delay gives the backend a moment to process the new post
    setTimeout(() => {
      setRefreshKey(prevKey => prevKey + 1);
    }, 1000); // 1-second delay
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <header className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <img
            src={logo}
            alt="SpeakUpSurrey logo"
            className="w-10 h-10 object-contain"
          />
          <div>
            <h1 className="text-xl font-bold tracking-wide">SpeakUpSurrey</h1>
            <p className="text-xs text-gray-400 uppercase">We are Loud AF</p>
          </div>
        </div>
        {user && (
          <p className="text-sm text-gray-400">
            Welcome, <span className="font-medium text-white">{user.name}</span>
          </p>
        )}
      </header>

      <main className="p-4 max-w-2xl mx-auto">
        {/* --- MODIFIED: Pass the success handler to PostForm --- */}
        {!user?.is_hard_blocked && <PostForm onPostSuccess={handlePostSuccess} />}
        
        {/* --- MODIFIED: Pass the refresh key to PostFeed --- */}
        <PostFeed refreshKey={refreshKey} />
      </main>
    </div>
  );
}

export default HomePage;