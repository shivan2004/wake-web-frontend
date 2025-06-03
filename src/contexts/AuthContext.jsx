import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const url = new URL(window.location.href);
    const token = url.searchParams.get('token');

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp > currentTime) {
          localStorage.setItem('token', token);
          setCurrentUser(decodedToken);
          api.setAuthToken(token);
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Invalid token:', error);
        logout();
      }
    } else {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          const decodedToken = jwtDecode(storedToken);
          const currentTime = Date.now() / 1000;

          if (decodedToken.exp > currentTime) {
            setCurrentUser(decodedToken);
            api.setAuthToken(storedToken);
          } else {
            logout();
          }
        } catch (error) {
          console.error('Invalid stored token:', error);
          logout();
        }
      }
    }
    setLoading(false);
  }, [navigate]);

  const login = async (token) => {
    try {
      localStorage.setItem('token', token);
      const decodedToken = jwtDecode(token);
      setCurrentUser(decodedToken);
      api.setAuthToken(token);
      navigate('/dashboard');
      toast.success('Login successful!');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    sessionStorage.clear(); // Clear any session data
    setCurrentUser(null);
    api.removeAuthToken();
    navigate('/');
    toast.info('Logged out successfully');
  };

  const value = {
    currentUser,
    loading,
    login,
    logout,
    isAuthenticated: !!currentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};