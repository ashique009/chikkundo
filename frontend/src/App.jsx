import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';

// Layouts
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';

// Route Guards
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProfileSetup from './pages/ProfileSetup';
import HomeDashboard from './pages/HomeDashboard';
import Suggestions from './pages/Suggestions';
import UserProfile from './pages/UserProfile';
import ConnectRequests from './pages/ConnectRequests';
import ConversationList from './pages/ConversationList';
import Chat from './pages/Chat';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';
import NotFound from './pages/NotFound';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminProtectedRoute from './components/AdminProtectedRoute';



function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes (Guest access only; redirects logged-in sessions) */}
            <Route element={<PublicRoute><AuthLayout /></PublicRoute>}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>

            {/* Public Guest Landing Page */}
            <Route path="/" element={<PublicRoute><Landing /></PublicRoute>} />

            {/* Protected Routes (Require active authentication session) */}
            
            {/* Special Route: Profile Onboarding (Must NOT have a completed profile yet) */}
            <Route
              path="/profile-setup"
              element={
                <ProtectedRoute requireProfile={false}>
                  <div className="min-h-screen bg-brand-black text-slate-100 p-4">
                    <ProfileSetup />
                  </div>
                </ProtectedRoute>
              }
            />

            {/* Main Application Layout (Requires completed profile setup) */}
            <Route element={<ProtectedRoute requireProfile={true}><MainLayout /></ProtectedRoute>}>
              <Route path="/dashboard" element={<HomeDashboard />} />
              <Route path="/suggestions" element={<Suggestions />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/requests" element={<ConnectRequests />} />
              <Route path="/conversations" element={<ConversationList />} />
              <Route path="/chat/:conversationId" element={<Chat />} />
              <Route path="/feedback" element={<Feedback />} />
            </Route>

            {/* Settings Page (Needs auth, but accessible even if profile is not completed so they can complete it) */}
            <Route
              path="/settings"
              element={
                <ProtectedRoute requireProfile={false}>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Settings />} />
            </Route>
            {/* ---------------- ADMIN ROUTES ---------------- */}

<Route path="/admin/login" element={<AdminLogin />} />

<Route
  path="/admin/dashboard"
  element={
    <AdminProtectedRoute>
      <AdminDashboard />
    </AdminProtectedRoute>
  }
/>

<Route
  path="/admin/users"
  element={
    <AdminProtectedRoute>
      <AdminUsers />
    </AdminProtectedRoute>
  }
/>
            {/* Fallback 404 Pages */}
            <Route
              path="*"
              element={
                <ProtectedRoute requireProfile={false}>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
