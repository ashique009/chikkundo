import React, { createContext, useState, useEffect, useContext } from 'react';
import { authService } from '../services/authService';
import { profileService } from '../services/profileService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('chikkundo_token'));
  const [username, setUsername] = useState(localStorage.getItem('chikkundo_username'));
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasProfile, setHasProfile] = useState(false);

  // Load profile details if token exists
  const fetchProfile = async (authToken) => {
    if (!authToken) {
      setUserProfile(null);
      setHasProfile(false);
      setIsLoading(false);
      return;
    }
    
    try {
      const response = await profileService.getProfileDetail();
      if (response.success && response.data) {
        setUserProfile(response.data);
        setHasProfile(true);
      } else {
        setUserProfile(null);
        setHasProfile(false);
      }
    } catch (err) {
      // 404 means profile is not yet created
      if (err.status === 404) {
        setUserProfile(null);
        setHasProfile(false);
      } else {
        console.error('Error fetching profile detail:', err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchProfile(token);
    } else {
      setIsLoading(false);
    }
  }, [token]);

  const login = async (identifier, password) => {
    setIsLoading(true);
    try {
      const response = await authService.login(identifier, password);
      if (response.success && response.data) {
        const { token: authToken, username: userObj } = response.data;
        localStorage.setItem('chikkundo_token', authToken);
        localStorage.setItem('chikkundo_username', userObj);
        setToken(authToken);
        setUsername(userObj);
        // Fetch profile to verify profile setup status
        await fetchProfile(authToken);
        return { success: true };
      }
      return { success: false, message: response.message || 'Login failed' };
    } catch (err) {
      setIsLoading(false);
      return { success: false, message: err.message || 'Invalid credentials' };
    }
  };

  const signup = async (fullName, usernameInput, email, phone, password, confirmPassword) => {
    setIsLoading(true);
    try {
      const response = await authService.signup(fullName, usernameInput, email, phone, password, confirmPassword);
      if (response.success && response.data) {
        const { token: authToken, username: userObj } = response.data;
        localStorage.setItem('chikkundo_token', authToken);
        localStorage.setItem('chikkundo_username', userObj);
        setToken(authToken);
        setUsername(userObj);
        setHasProfile(false);
        setUserProfile(null);
        setIsLoading(false);
        return { success: true };
      }
      return { success: false, message: response.message || 'Signup failed' };
    } catch (err) {
      setIsLoading(false);
      return { 
        success: false, 
        message: err.message || 'Signup failed',
        errors: err.errors 
      };
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authService.logout();
    } catch (err) {
      console.error('Logout API failed:', err);
    } finally {
      localStorage.removeItem('chikkundo_token');
      localStorage.removeItem('chikkundo_username');
      setToken(null);
      setUsername(null);
      setUserProfile(null);
      setHasProfile(false);
      setIsLoading(false);
    }
  };

  const refreshProfile = async () => {
    if (token) {
      await fetchProfile(token);
    }
  };

  const value = {
    token,
    username,
    userProfile,
    isLoading,
    hasProfile,
    login,
    signup,
    logout,
    refreshProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
