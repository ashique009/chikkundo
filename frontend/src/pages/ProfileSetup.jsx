import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { profileService } from '../services/profileService';
import { Upload, ChevronRight, Check } from 'lucide-react';

export const ProfileSetup = () => {
  const { refreshProfile } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // State fields
  const [profilePicture, setProfilePicture] = useState(null);
  const [picturePreview, setPicturePreview] = useState(null);
  const [bio, setBio] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('M');
  const [lookingFor, setLookingFor] = useState('friendship');
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [interestsList, setInterestsList] = useState([]);

  const [loading, setLoading] = useState(false);
  const [fetchingInterests, setFetchingInterests] = useState(true);

  // Fetch all interests on mount
  useEffect(() => {
    const loadInterests = async () => {
      try {
        const response = await profileService.getInterests();
        if (response.success && response.data) {
          setInterestsList(response.data);
        }
      } catch (err) {
        showToast('Failed to load interests directory.', 'error');
      } finally {
        setFetchingInterests(false);
      }
    };
    loadInterests();
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedInterests.length < 3) {
      showToast('Please select at least 3 interests.', 'error');
      return;
    }
    if (selectedInterests.length > 10) {
      showToast('You can select a maximum of 10 interests.', 'error');
      return;
    }

    setLoading(true);

    const payload = {
      bio: bio.trim(),
      address: address.trim(),
      city: city.trim(),
      state: state.trim(),
      pincode: pincode.trim(),
      date_of_birth: dateOfBirth,
      gender: gender,
      looking_for: lookingFor,
      interest_ids: selectedInterests,
    };

    if (profilePicture) {
      payload.profile_picture = profilePicture;
    }

    try {
      const response = await profileService.createProfile(payload);
      if (response.success) {
        showToast('Profile setup complete!', 'success');
        await refreshProfile();
        navigate('/dashboard');
      } else {
        showToast(response.message || 'Failed to complete profile.', 'error');
      }
    } catch (err) {
      showToast(err.message || 'An error occurred during profile creation.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Group interests by category
  const groupedInterests = interestsList.reduce((acc, interest) => {
    const category = interest.category || 'General';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(interest);
    return acc;
  }, {});

  return (
    <div className="relative min-h-[calc(100vh-130px)] flex items-center justify-center py-6">
      <div className="w-full max-w-2xl glass-panel p-6 md:p-10 rounded-3xl shadow-2xl bg-white dark:bg-brand-dark/40 border border-[#F4C0D1] dark:border-brand-purple/20 transition-colors duration-200">
        <h2 className="text-3xl font-bold font-display text-[#2C2C2A] dark:text-slate-100 mb-2">
          Setup Your Profile
        </h2>
        <p className="text-[#5F5E5A] dark:text-slate-400 text-sm mb-8">
          Tell us about yourself to find your perfect connection on Lynqo.
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Avatar Upload */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-28 h-28 rounded-full border-2 border-dashed border-[#D4537E]/40 hover:border-[#D4537E] dark:border-brand-purple/40 dark:hover:border-brand-purple flex items-center justify-center overflow-hidden bg-[#FCEEF3] dark:bg-brand-black/30 group transition-all duration-300">
              {picturePreview ? (
                <img
                  src={picturePreview}
                  alt="Avatar Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-[#5F5E5A] dark:text-slate-500 group-hover:text-[#D4537E] dark:group-hover:text-brand-purple-light transition-colors">
                  <Upload className="w-6 h-6 mb-1" />
                  <span className="text-[10px] font-bold uppercase">Upload</span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handlePictureChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
                disabled={loading}
              />
            </div>
            <span className="text-xs font-semibold text-[#5F5E5A] dark:text-slate-400">Profile Picture (Recommended)</span>
          </div>

          {/* Core Info Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#5F5E5A] dark:text-slate-400">Date of Birth</label>
              <input
                type="date"
                className="glass-input p-3 rounded-xl text-sm w-full"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#5F5E5A] dark:text-slate-400">Gender</label>
              <select
                className="glass-input p-3 rounded-xl text-sm w-full bg-white dark:bg-brand-black/90 text-[#2C2C2A] dark:text-slate-200"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                disabled={loading}
                required
              >
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#5F5E5A] dark:text-slate-400">Looking For</label>
              <select
                className="glass-input p-3 rounded-xl text-sm w-full bg-white dark:bg-brand-black/90 text-[#2C2C2A] dark:text-slate-200"
                value={lookingFor}
                onChange={(e) => setLookingFor(e.target.value)}
                disabled={loading}
                required
              >
                <option value="friendship">Friendship</option>
                <option value="relationship">Relationship</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#5F5E5A] dark:text-slate-400">City</label>
              <input
                type="text"
                className="glass-input p-3 rounded-xl text-sm"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                disabled={loading}
                required
              />
            </div>
          </div>

          {/* Full Location */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="md:col-span-2 flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#5F5E5A] dark:text-slate-400">State</label>
              <input
                type="text"
                className="glass-input p-3 rounded-xl text-sm"
                placeholder="Enter state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                disabled={loading}
                required
              />
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#5F5E5A] dark:text-slate-400">Pincode</label>
              <input
                type="text"
                className="glass-input p-3 rounded-xl text-sm"
                placeholder="682024"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                disabled={loading}
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-xs font-semibold text-[#5F5E5A] dark:text-slate-400">Full Address</label>
            <input
              type="text"
              className="glass-input p-3 rounded-xl text-sm"
              placeholder="Apartment, Street Name"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              disabled={loading}
            />
          </div>

          {/* Bio Description */}
          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-xs font-semibold text-[#5F5E5A] dark:text-slate-400">Short Bio</label>
            <textarea
              className="glass-input p-3 rounded-xl text-sm min-h-24 resize-none"
              placeholder="Tell other members what you enjoy..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          {/* Dynamic categorized Interests */}
          <div className="flex flex-col gap-3 text-left">
            <div className="flex justify-between items-end border-b border-[#F4C0D1] dark:border-slate-800 pb-2">
              <label className="text-xs font-semibold text-[#5F5E5A] dark:text-slate-400 uppercase tracking-wider">
                Select Interests
              </label>
              <span className="text-[10px] font-bold text-[#D4537E] dark:text-brand-purple-light uppercase">
                {selectedInterests.length} selected (Requires 3-10)
              </span>
            </div>

            {fetchingInterests ? (
              <div className="flex justify-center py-6 text-[#5F5E5A] dark:text-slate-500 text-xs font-medium animate-pulse">
                Fetching interests list...
              </div>
            ) : (
              <div className="space-y-6 max-h-[300px] overflow-y-auto pr-2">
                {Object.keys(groupedInterests).map((category) => (
                  <div key={category} className="space-y-2">
                    <div className="text-[10px] font-extrabold text-[#5F5E5A] dark:text-slate-500 uppercase tracking-widest">
                      {category}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {groupedInterests[category].map((interest) => {
                        const isSelected = selectedInterests.includes(interest.id);
                        return (
                          <button
                            type="button"
                            key={interest.id}
                            onClick={() => handleInterestToggle(interest.id)}
                            disabled={loading}
                            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer border ${
                              isSelected
                                ? 'bg-[#D4537E] text-white border-transparent shadow-md dark:bg-brand-purple dark:border-brand-purple-light'
                                : 'bg-[#FCEEF3] text-[#2C2C2A] dark:bg-brand-black/40 dark:text-slate-400 border-[#F4C0D1] dark:border-slate-800 hover:border-[#D4537E]'
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5" />}
                            <span>{interest.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-4 bg-[#D4537E] hover:bg-[#c2436d] dark:bg-gradient-to-r dark:from-brand-purple dark:to-indigo-600 dark:hover:from-brand-purple-dark dark:hover:to-indigo-700 text-white font-bold py-4 rounded-2xl transition-all duration-300 shadow-xl shadow-[#D4537E]/20 dark:shadow-brand-purple/25 border border-transparent dark:border-brand-purple-light/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <div className="w-6 h-6 rounded-full border-2 border-white/20 border-t-white animate-spin"></div>
            ) : (
              <>
                <span>Complete Profile Setup</span>
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetup;
