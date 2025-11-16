import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import useUserStore from './store/userStore';
import { checkUserStatus } from './api/usersApi';
import HomePage from './pages/HomePage';
import WelcomePage from './pages/WelcomePage';
import Spinner from './components/common/Spinner/Spinner';

function App() {
  const { user, isLoading, login, logout, setLoading } = useUserStore();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const userData = await checkUserStatus();
        login(userData);
      } catch (error) {
        logout(); // If status check fails (e.g., 401), log them out
      } finally {
        setLoading(false);
      }
    };
    verifyUser();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <Spinner />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={user ? <HomePage /> : <Navigate to="/welcome" />}
        />
        <Route
          path="/welcome"
          element={!user ? <WelcomePage /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;