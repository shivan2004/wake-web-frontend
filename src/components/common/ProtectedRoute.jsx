import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    // You could render a loading spinner here
    return <div className="loading">Loading...</div>;
  }

  if (!isAuthenticated) {
    // Redirect to the login page if not authenticated
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;