// src/pages/WelcomePage.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/usersApi';
import useUserStore from '../store/userStore'; // Assuming you are using Zustand or a similar store

// Frontend list of reserved names. Should match the backend.
const RESERVED_NAMES_FE = ['admin', 'loudsurrey'];

function WelcomePage() {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const login = useUserStore((state) => state.login);
  const navigate = useNavigate();

  // --- NEW: Frontend validation function for instant feedback ---
  const validateName = (nameToValidate) => {
    if (!nameToValidate.trim()) {
      setError('Please enter a name.');
      return false;
    }
    if (nameToValidate.length > 10) {
      setError('Name must be 10 characters or less.');
      return false;
    }
    const normalizedName = nameToValidate.replace(/\s+/g, '').toLowerCase();
    if (RESERVED_NAMES_FE.includes(normalizedName)) {
      setError(`The name '${nameToValidate}' is not available.`);
      return false;
    }
    setError(''); // Clear error if all checks pass
    return true;
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);
    // Validate on every keystroke
    validateName(newName);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Final check on submit
    if (!validateName(name)) {
      return;
    }

    setIsLoading(true);
    try {
      const userData = await registerUser(name);
      login(userData);
      navigate('/'); // Go to the home page after successful registration
    } catch (err) {
      // Show the specific error message from the backend
      setError(err.response?.data?.error || 'Could not register user. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="w-full max-w-sm text-center">
        <h1 className="text-4xl font-bold mb-2">Welcome</h1>
        <p className="text-gray-400 mb-8">Create your username to get started.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Enter your name (max 10 chars)"
            className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 ${
              error ? 'border-red-500 focus:ring-red-500' : 'border-gray-700 focus:ring-blue-500'
            }`}
          />
          {error && <p className="text-red-500 text-sm text-left mt-2">{error}</p>}
          <button
            type="submit"
            disabled={isLoading || !!error || !name.trim()}
            className="w-full mt-4 px-4 py-3 bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Joining...' : 'Join'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default WelcomePage;