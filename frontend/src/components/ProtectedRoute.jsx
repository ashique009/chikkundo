import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from './Loader';

export const ProtectedRoute = ({ children, requireProfile = true }) => {
  const { token, isLoading, hasProfile } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <Loader fullScreen={true} />;
  }

  if (!token) {
    // Save the location they tried to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Profile is required for this route, but they don't have one setup yet
  if (requireProfile && !hasProfile) {
    return <Navigate to="/profile-setup" replace />;
  }

  // They have a profile, but they are trying to access /profile-setup
  if (!requireProfile && hasProfile && location.pathname === '/profile-setup') {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
