import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from './Loader';

export const PublicRoute = ({ children }) => {
  const { token, isLoading, hasProfile } = useAuth();

  if (isLoading) {
    return <Loader fullScreen={true} />;
  }

  if (token) {
    if (!hasProfile) {
      return <Navigate to="/profile-setup" replace />;
    }
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;
