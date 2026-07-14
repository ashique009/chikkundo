import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User as UserIcon, Settings, MessageSquare } from 'lucide-react';
import { API_BASE_URL } from '../api/client';

export const Navbar = () => {
  const { userProfile, logout, username } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  const handleLogout = async () => {
    if (isAdminPath) {
      localStorage.removeItem('admin_token');
    }
    await logout();
    navigate('/');
  };

  const getProfilePictureUrl = () => {
    if (userProfile && userProfile.profile_picture) {
      if (userProfile.profile_picture.startsWith('http')) {
        return userProfile.profile_picture;
      }
      return `${API_BASE_URL}${userProfile.profile_picture}`;
    }
    return null;
  };

  const avatarUrl = getProfilePictureUrl();

  return (
    <nav className="sticky top-0 z-40 w-full glass-panel border-b border-brand-purple/10 px-4 md:px-8 py-3 flex items-center justify-between shadow-lg bg-brand-black/40 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <Link to={isAdminPath ? "/admin/dashboard" : "/dashboard"} className="flex items-center gap-2 select-none">
          <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent font-display">
            Chikkundo
          </span>
          {isAdminPath && (
            <span className="text-[10px] uppercase font-extrabold tracking-widest bg-brand-purple/20 text-brand-purple-light border border-brand-purple/35 px-2 py-0.5 rounded shadow-[0_0_10px_rgba(124,58,237,0.15)]">
              Admin
            </span>
          )}
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {userProfile ? (
          <div className="flex items-center gap-3">
            <Link
              to={`/profile`}
              className="flex items-center gap-2 group cursor-pointer"
            >
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={userProfile.full_name || username}
                  className="w-8 h-8 rounded-full object-cover border border-brand-purple/30 group-hover:border-brand-purple transition-all duration-300"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-brand-purple/20 flex items-center justify-center border border-brand-purple/30 text-brand-purple-light text-xs font-bold uppercase group-hover:border-brand-purple transition-all duration-300">
                  {username ? username.substring(0, 2) : 'CK'}
                </div>
              )}
              <span className="hidden md:inline text-sm font-semibold text-slate-200 group-hover:text-slate-100 transition-colors">
                {userProfile.full_name || username}
              </span>
            </Link>
            
            <div className="h-4 w-px bg-slate-800 hidden md:block"></div>
            
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all duration-200 cursor-pointer"
              title="Log Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link
              to="/login"
              className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-1.5 rounded-lg transition-all"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="text-xs font-semibold bg-brand-purple hover:bg-brand-purple-dark text-white px-3 py-1.5 rounded-lg transition-all shadow-md shadow-brand-purple/25"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
