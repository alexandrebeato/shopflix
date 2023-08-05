import axios from 'axios';

import api from './api';

export interface CookieResponse {
  token: string;
  userData: {
    userId: string;
    email: string;
    username: string;
  };
}

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:5011'
});
// Define the Axios interceptor for "/items" routes
axiosInstance.interceptors.request.use(
  async (config) => {
    if (config.url?.includes('/items')) {
      const res = await api.get<CookieResponse>(
        '/api/cookies',
        {},
        'http://localhost:3000'
      );

      const token = res.data?.token;

      // Modify the request config for "/items" routes
      // For example, add authentication token or other headers
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  async (error) => {
    // Handle request error
    return await Promise.reject(error);
  }
);
