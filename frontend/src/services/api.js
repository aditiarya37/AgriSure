import axios from 'axios';

// For Vite projects (using import.meta.env)
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api'; // Pointing to backend port 5001

const API = axios.create({
  baseURL,
  withCredentials: true, // Important for cookies, but not primary issue here
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
API.interceptors.request.use(
  (config) => {
    console.log('--- Axios Request Interceptor ---');
    console.log('Request URL:', config.url); // See which request this is for

    const token = localStorage.getItem('token');
    console.log('Token read from localStorage:', token ? token.substring(0, 10) + '...' : 'null or empty');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Authorization header SET.');
    } else {
      console.log('Authorization header NOT set (no token found in localStorage).');
      // Ensure any previous Authorization header is removed if token disappears
      delete config.headers.Authorization;
    }
    // Log final headers being sent
    // console.log('Final Request Headers:', config.headers); // Can be verbose
    return config;
  },
  (error) => {
     console.error("Axios Request Interceptor Error:", error);
     return Promise.reject(error);
  }
);

// Response interceptor
API.interceptors.response.use(
  response => response,
  error => {
    console.error('--- Axios Response Interceptor Error ---');
    console.error('Error Status:', error.response?.status);
    console.error('Error Response Data:', error.response?.data);

    // Existing 401 handling
    if (error.response?.status === 401) {
      console.log('Response Interceptor: Received 401. Clearing token and redirecting.');
      localStorage.removeItem('token');
      // Redirect only if not already on login page to avoid loops
      if (window.location.pathname !== '/login') {
           window.location.href = '/login';
      }
    }
    // Reject with a structured error object
    return Promise.reject(error.response?.data || {
      message: error.message || 'Network Error or CORS issue',
      status: error.response?.status
    });
  }
);

export const authAPI = {
  signup: (userData) => API.post('/auth/signup', userData),
  login: (credentials) => API.post('/auth/login', credentials),
  logout: () => API.post('/auth/logout'),
  checkAuth: () => API.get('/auth/check')
};

export default API;