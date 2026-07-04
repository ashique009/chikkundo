import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { profileService } from '../services/profileService';
import { useToast } from '../context/ToastContext';
import Loader from '../components/Loader';
import { MapPin, Heart, Calendar, User, Mail, Phone, Edit3 } from 'lucide-react';
import { API_BASE_URL } from '../api/client';

export const UserProfile = () => {
  const { userProfile, refreshProfile } = useAuth();
  const [loading, setLoading] = useState(!userProfile);
  const { showToast } = useToast();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        await refreshProfile();
      } catch (err) {
        showToast('Failed to load profile details.', 'error');
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  const getProfilePictureUrl = () => {
    if (userProfile && userProfile.profile_picture) {
      if (userProfile.profile_picture.startsWith('http')) return userProfile.profile_picture;
      return `${API_BASE_URL}${userProfile.profile_picture}`;
    }
    return null;
  };

  const getGenderLabel = (g) => {
    switch (g) {
      case 'M': return 'Male';
      case 'F': return 'Female';
      case 'O': return 'Other';
      default: return 'Not Set';
    }
  };

  const getLookingForLabel = (l) => {
    if (l === 'friendship') return 'Friendship';
    if (l === 'relationship') return 'Relationship';
    return 'Not Set';
  };

  if (loading) {
    return <Loader />;
  }

  if (!userProfile) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-bold text-slate-200">No profile found</h3>
        <p className="text-sm text-slate-500 mt-2">Create your profile details in settings.</p>
        <Link to="/settings" className="mt-4 inline-block bg-brand-purple text-white px-4 py-2 rounded-xl text-xs font-bold">
          Go to Settings
        </Link>
      </div>
    );
  }

  const avatar = getProfilePictureUrl();

  return (
    <div className="space-y-6 text-left">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-extrabold font-display text-slate-100">My Profile</h2>
        <Link
          to="/settings"
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-brand-purple/20 hover:bg-brand-purple text-brand-purple-light hover:text-white border border-brand-purple/30 rounded-xl transition-all duration-300 cursor-pointer"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Edit Profile</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Avatar & Basic Details */}
        <div className="glass-panel p-6 rounded-3xl border border-brand-purple/10 bg-brand-dark/20 text-center flex flex-col items-center">
          {avatar ? (
            <img
              src={avatar}
              alt={userProfile.full_name}
              className="w-32 h-32 rounded-full object-cover border-2 border-brand-purple/30 shadow-xl"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-brand-purple/10 flex items-center justify-center border-2 border-brand-purple/20 text-brand-purple-light text-3xl font-extrabold uppercase">
              {userProfile.username.substring(0, 2)}
            </div>
          )}

          <h3 className="text-xl font-bold text-slate-200 mt-4 font-display">
            {userProfile.full_name}
          </h3>
          <p className="text-xs text-slate-500 font-semibold mt-0.5">@{userProfile.username}</p>

          <div className="mt-6 w-full border-t border-slate-900 pt-6 space-y-4 text-left">
            <div className="flex items-center gap-3 text-slate-400">
              <Mail className="w-4 h-4 text-slate-500" />
              <span className="text-xs font-medium">{userProfile.email}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-400">
              <Phone className="w-4 h-4 text-slate-500" />
              <span className="text-xs font-medium">{userProfile.phone || 'Not available'}</span>
            </div>
            {userProfile.city && (
              <div className="flex items-center gap-3 text-slate-400">
                <MapPin className="w-4 h-4 text-slate-500" />
                <span className="text-xs font-medium">
                  {userProfile.city}, {userProfile.state}
                </span>
              </div>
            )}
            {userProfile.date_of_birth && (
              <div className="flex items-center gap-3 text-slate-400">
                <Calendar className="w-4 h-4 text-slate-500" />
                <span className="text-xs font-medium">Born: {userProfile.date_of_birth}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Bio, Interests, Looking For */}
        <div className="lg:col-span-2 space-y-6">
          {/* Bio Box */}
          <div className="glass-panel p-6 rounded-3xl border border-brand-purple/10 bg-brand-dark/10">
            <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-widest mb-3">About Me</h4>
            <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
              {userProfile.bio || 'No bio written yet.'}
            </p>
          </div>

          {/* Looking For & Gender */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="glass-panel p-5 rounded-2xl border border-brand-purple/10 bg-brand-dark/10 flex items-center gap-4">
              <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
                <Heart className="w-4.5 h-4.5" />
              </div>
              <div>
                <div className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Looking For</div>
                <div className="text-sm font-bold text-slate-200 mt-0.5">
                  {getLookingForLabel(userProfile.looking_for)}
                </div>
              </div>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-brand-purple/10 bg-brand-dark/10 flex items-center gap-4">
              <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                <User className="w-4.5 h-4.5" />
              </div>
              <div>
                <div className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Gender</div>
                <div className="text-sm font-bold text-slate-200 mt-0.5">
                  {getGenderLabel(userProfile.gender)}
                </div>
              </div>
            </div>
          </div>

          {/* Interests Tags */}
          <div className="glass-panel p-6 rounded-3xl border border-brand-purple/10 bg-brand-dark/10">
            <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-widest mb-4">My Interests</h4>
            {userProfile.interests && userProfile.interests.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {userProfile.interests.map((interest) => (
                  <span
                    key={interest.id}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-brand-purple/10 border border-brand-purple/20 text-brand-purple-light"
                  >
                    {interest.name}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-xs">No interest tags selected.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
