import axiosInstance from './axiosInstance';

export const checkUserStatus = async () => {
  const response = await axiosInstance.get('/api/users/status/');
  return response.data;
};

export const registerUser = async (name) => {
  const response = await axiosInstance.post('/api/users/register/', { name });
  return response.data;
};