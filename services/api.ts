import axios from 'axios';
import { getAuthToken, removeAuthToken } from './storage';

// Use environment variable for API URL, with fallback to localhost
const API_BASE_URL = `${process.env.EXPO_PUBLIC_API_URL || 'http://192.168.0.104:8000'}/api`;

console.log('API Base URL:', API_BASE_URL); // Debug log

// Create an axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token to requests
api.interceptors.request.use(
  async (config) => {
    console.log('API request config:', config); // Debug log
    const token = await getAuthToken();
    console.log('Token retrieved in interceptor:', token); // Debug log
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Authorization header set:', config.headers.Authorization); // Debug log
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    console.log('API response:', response); // Debug log
    return response;
  },
  async (error) => {
    console.log('API error:', error); // Debug log
    if (error.response?.status === 401) {
      // Handle unauthorized access
      await removeAuthToken();
      // Redirect to login screen
    }
    return Promise.reject(error);
  }
);

export default api;
