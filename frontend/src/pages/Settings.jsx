import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { profileService } from '../services/profileService';
import Loader from '../components/Loader';
import { Upload, Check, Save, LogOut } from 'lucide-react';
import { API_BASE_URL } from '../api/client';

export const Settings = () => {
  const { userProfile, refreshProfile, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Form states
  const [profilePicture, setProfilePicture] = useState(null);
  const [picturePreview, setPicturePreview] = useState(null);
  const [bio, setBio] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [lookingFor, setLookingFor] = useState('friendship');
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [interestsList, setInterestsList] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const initializeForm = async () => {
      try {
        const [profileRes, interestsRes] = await Promise.all([
          profileService.getProfileDetail(),
          profileService.getInterests()
        ]);

        if (profileRes.success && profileRes.data) {
          const profile = profileRes.data;
          setBio(profile.bio || '');
          setAddress(profile.address || '');
          setCity(profile.city || '');
          setState(profile.state || '');
          setPincode(profile.pincode || '');
          setLookingFor(profile.looking_for || 'friendship');
          setSelectedInterests(profile.interests.map(i => i.id));
          
          if (profile.profile_picture) {
            if (profile.profile_picture.startsWith('http')) {
              setPicturePreview(profile.profile_picture);
            } else {
              setPicturePreview(`${API_BASE_URL}${profile.profile_picture}`);
            }
          }
        }

        if (interestsRes.success && interestsRes.data) {
          setInterestsList(interestsRes.data);
        }
      } catch (err) {
        showToast('Failed to load settings details.', 'error');
      } finally {
        setLoading(false);
      }
    };

    initializeForm();
  }, [showToast]);

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      setPicturePreview(URL.createObjectURL(file));
    }
  };

  const handleInterestToggle = (id) => {
    setSelectedInterests((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (selectedInterests.length < 3) {
      showToast('Please select at least 3 interests.', 'error');
      return;
    }
    if (selectedInterests.length > 10) {
      showToast('You can select a maximum of 10 interests.', 'error');
      return;
    }

    setSaving(true);
    
    const payload = {
      bio: bio.trim(),
      address: address.trim(),
      city: city.trim(),
      state: state.trim(),
      pincode: pincode.trim(),
      looking_for: lookingFor,
      interest_ids: selectedInterests,
    };

    if (profilePicture) {
      payload.profile_picture = profilePicture;
    }

    try {
      const response = await profileService.updateProfile(payload);
      if (response.success) {
        showToast('Profile settings saved successfully!', 'success');
        await refreshProfile();
      } else {
        showToast(response.message || 'Failed to update profile.', 'error');
      }
    } catch (err) {
      showToast(err.message || 'An error occurred while saving.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    showToast('Logged out successfully.', 'info');
    navigate('/');
  };

  // Group interests by category
  const groupedInterests = interestsList.reduce((acc, interest) => {
    const category = interest.category || 'General';
    if (!acc[category]) acc[category] = [];
    acc[category].push(interest);
    return acc;
  }, {});

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6 text-left max-w-3xl mx-auto">
      <div>
        <h2 className="text-2xl font-extrabold font-display text-slate-100">Settings</h2>
        <p className="text-slate-400 text-xs mt-1">
          Update your location, profile biography, and connection tags here.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Settings Form */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSave} className="glass-panel p-6 md:p-8 rounded-3xl border border-brand-purple/10 bg-brand-dark/15 space-y-6">
            
            {/* Profile Pic Upload */}
            <div className="flex flex-col sm:flex-row items-center gap-5 border-b border-slate-900 pb-6">
              <div className="relative w-20 h-20 rounded-full border border-slate-800 flex items-center justify-center overflow-hidden bg-brand-black/40 group flex-shrink-0">
                {picturePreview ? (
                  <img src={picturePreview} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <Upload className="w-5 h-5 text-slate-500" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePictureChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  disabled={saving}
                />
              </div>
              
              <div className="text-center sm:text-left">
                <div className="text-sm font-bold text-slate-200">Change Profile Image</div>
                <div className="text-xs text-slate-500 mt-1">Upload a clear photo to help matches recognize you.</div>
              </div>
            </div>

            {/* Location & Looking For */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-400">City</label>
                <input
                  type="text"
                  className="glass-input p-3 rounded-xl text-sm"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  disabled={saving}
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-400">State</label>
                <input
                  type="text"
                  className="glass-input p-3 rounded-xl text-sm"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  disabled={saving}
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-400">Pincode</label>
                <input
                  type="text"
                  className="glass-input p-3 rounded-xl text-sm"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  disabled={saving}
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-400">Looking For</label>
                <select
                  className="glass-input p-3 rounded-xl text-sm w-full bg-brand-black/90"
                  value={lookingFor}
                  onChange={(e) => setLookingFor(e.target.value)}
                  disabled={saving}
                  required
                >
                  <option value="friendship">Friendship</option>
                  <option value="relationship">Relationship</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-400">Address</label>
              <input
                type="text"
                className="glass-input p-3 rounded-xl text-sm"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                disabled={saving}
              />
            </div>

            {/* Bio */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-400">Biography</label>
              <textarea
                className="glass-input p-3 rounded-xl text-sm min-h-24 resize-none"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                disabled={saving}
                required
              />
            </div>

            {/* Interests checklist */}
            <div className="flex flex-col gap-3 text-left border-t border-slate-900 pt-6">
              <div className="flex justify-between items-end pb-1">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Update Interests
                </label>
                <span className="text-[10px] font-bold text-brand-purple-light uppercase">
                  {selectedInterests.length} selected (Requires 3-10)
                </span>
              </div>

              <div className="space-y-5 max-h-[250px] overflow-y-auto pr-1">
                {Object.keys(groupedInterests).map((category) => (
                  <div key={category} className="space-y-1.5">
                    <div className="text-[9px] font-extrabold text-slate-500 uppercase tracking-widest">
                      {category}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {groupedInterests[category].map((interest) => {
                        const isSelected = selectedInterests.includes(interest.id);
                        return (
                          <button
                            type="button"
                            key={interest.id}
                            onClick={() => handleInterestToggle(interest.id)}
                            disabled={saving}
                            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all duration-200 cursor-pointer border ${
                              isSelected
                                ? 'bg-brand-purple text-white border-brand-purple-light shadow-sm'
                                : 'bg-brand-black/30 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3" />}
                            <span>{interest.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-brand-purple hover:bg-brand-purple-dark text-white font-bold py-3.5 rounded-xl transition-all duration-300 border border-brand-purple-light/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-brand-purple/10"
              disabled={saving}
            >
              {saving ? (
                <div className="w-5 h-5 rounded-full border-2 border-white/20 border-t-white animate-spin"></div>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>

          </form>
        </div>

        {/* Sidebar Log Out Card */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-brand-purple/10 bg-brand-dark/15 flex flex-col gap-4">
            <h3 className="text-sm font-bold text-slate-200">Account Actions</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              If you want to clear your current browser credentials and exit the workspace, log out below.
            </p>
            
            <button
              onClick={handleLogout}
              className="w-full bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/25 font-bold py-3 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 text-xs"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out Session</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
