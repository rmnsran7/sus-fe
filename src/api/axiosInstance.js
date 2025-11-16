import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Reads from your .env file
  withCredentials: true, // IMPORTANT: This sends the cookie
});

export default axiosInstance;