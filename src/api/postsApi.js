import axiosInstance from './axiosInstance';

/**
 * Creates a new post.
 * The PostForm component is already creating the object { text_content: "..." },
 * so this function should just pass that object directly to the API.
 * 
 * @param {object} postData The data object, e.g., { text_content: "some message" }.
 * @returns {Promise<any>} The response data from the server.
 */
export const createPost = async (postData) => {
  // --- THIS IS THE FIX ---
  // We rename the argument to `postData` to be clear it's an object.
  // We then pass this object directly as the request body.
  const response = await axiosInstance.post('/api/posts/create/', postData);
  return response.data;
};

/**
 * Fetches a paginated list of recent posts.
 * @param {number} page The page number to fetch.
 * @returns {Promise<any>} The paginated response data.
 */
export const getRecentPosts = async (page = 1) => {
  const response = await axiosInstance.get(`/api/posts/recent/?page=${page}`);
  return response.data;
};