import axios from 'axios';

// Create an Axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
// Automatically attach the JWT token to every request if the user is logged in.
api.interceptors.request.use(
  (config) => {
    // In the future, we'll get this from localStorage or AuthContext
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
// Handle global errors like 401 Unauthorized (token expired)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token and optionally force a reload/redirect to login
      localStorage.removeItem('adminToken');
      // window.location.href = '/admin'; // Redirect logic depends on the router
    }
    return Promise.reject(error);
  }
);

export default api;
