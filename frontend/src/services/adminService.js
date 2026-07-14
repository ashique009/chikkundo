import { API_URL } from '../api/client';  // ninte existing base URL config

const getAdminToken = () => localStorage.getItem('admin_token');

export const adminLogin = async (identifier, password) => {
  const response = await fetch(`${API_URL}/api/auth/admin-login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier, password }),
  });
  return response.json();
};

export const getDashboardStats = async () => {
  const response = await fetch(`${API_URL}/api/auth/admin/dashboard-stats/`, {
    headers: { Authorization: `Token ${getAdminToken()}` },
  });
  return response.json();
};

export const getUsers = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const response = await fetch(`${API_URL}/api/auth/admin/users/?${query}`, {
    headers: { Authorization: `Token ${getAdminToken()}` },
  });
  return response.json();
};

export const banUser = async (userId) => {
  const response = await fetch(`${API_URL}/api/auth/admin/users/${userId}/ban/`, {
    method: 'POST',
    headers: { Authorization: `Token ${getAdminToken()}` },
  });
  return response.json();
};

export const unbanUser = async (userId) => {
  const response = await fetch(`${API_URL}/api/auth/admin/users/${userId}/unban/`, {
    method: 'POST',
    headers: { Authorization: `Token ${getAdminToken()}` },
  });
  return response.json();
};

export const deleteUser = async (userId) => {
  const response = await fetch(`${API_URL}/api/auth/admin/users/${userId}/delete/`, {
    method: 'DELETE',
    headers: { Authorization: `Token ${getAdminToken()}` },
  });
  return response.json();
};