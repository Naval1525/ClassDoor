import { useState, useEffect} from 'react';
import axios from 'axios';


const API_BASE_URL = 'http://localhost:8000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('anonToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});



export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [anonId, setAnonId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('anonToken');
    setIsAuthenticated(!!token);
    setAnonId(localStorage.getItem('anonId'));
    setLoading(false);
  }, []);

  const createAnonymousSession = async () => {
    setLoading(true);
    try {
      const response = await api.get('/auth/create');
      const { anonId, token } = response.data;

      localStorage.setItem('anonToken', token);
      localStorage.setItem('anonId', anonId);

      setIsAuthenticated(true);
      setAnonId(anonId);
      return { anonId, token };
    } catch (error) {
      console.error('Auth error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const refreshToken = async () => {
    setLoading(true);
    try {
      const response = await api.get('/auth/refresh');
      const { anonId, token } = response.data;

      localStorage.setItem('anonToken', token);
      localStorage.setItem('anonId', anonId);

      setIsAuthenticated(true);
      setAnonId(anonId);
      return { anonId, token };
    } catch (error) {
      // If refresh fails, create new session
      return createAnonymousSession();
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('anonToken');
    localStorage.removeItem('anonId');
    setIsAuthenticated(false);
    setAnonId(null);
  };

  return {
    isAuthenticated,
    anonId,
    loading,
    createAnonymousSession,
    refreshToken,
    logout
  };
};
