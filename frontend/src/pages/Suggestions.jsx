import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MapPin, Send, MessageSquarePlus, User, Heart } from 'lucide-react';
import { profileService } from '../services/profileService';
import { connectService } from '../services/connectService';
import { useToast } from '../context/ToastContext';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';
import Modal from '../components/Modal';
import { API_BASE_URL } from '../api/client';

export const Suggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const { showToast } = useToast();

  // Connect request modal state
  const [selectedUser, setSelectedUser] = useState(null);
  const [connectReason, setConnectReason] = useState('similar_interests');
  const [sendingRequest, setSendingRequest] = useState(false);

  const fetchSuggestions = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const response = await profileService.getSuggestions();
      if (response.success && response.data) {
        setSuggestions(response.data);
      }
    } catch (err) {
      if (err.status === 400 && err.message.includes('complete your profile')) {
        setErrorMsg('PROFILE_INCOMPLETE');
      } else {
        setErrorMsg(err.message || 'Failed to fetch suggestions.');
        showToast(err.message || 'Failed to fetch suggestions.', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const openConnectModal = (user) => {
    setSelectedUser(user);
    setConnectReason('similar_interests');
  };

  const closeConnectModal = () => {
    setSelectedUser(null);
  };

  const handleSendConnectRequest = async () => {
    if (!selectedUser) return;

    setSendingRequest(true);
    try {
      // The backend expects the receiver's user model ID
      // Let's verify how the suggestion contains user ID.
      // Wait, in ProfileSerializer, we have the fields:
      // username, full_name, email, phone, profile_picture, bio, address, city, state, pincode, date_of_birth, gender, looking_for, interests, interest_ids, profile_completion, created_at, updated_at
      // Wait! Does ProfileSerializer contain the user ID or does it contain user's username?
      // Wait, the views.py SendConnectRequestView expects "receiver" which is the User ID!
      // But does ProfileSerializer include a field for user ID or user?
      // Let's check: in models.py, Profile belongs to user:
      // `user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='profile')`
      // But in serializers.py ProfileSerializer:
      // `fields = [ 'username', 'full_name', 'email', 'phone', 'profile_picture', 'bio', 'address', 'city', 'state', 'pincode', 'date_of_birth', 'gender', 'looking_for', 'interests', 'interest_ids', 'profile_completion', 'created_at', 'updated_at' ]`
      // It DOES NOT explicitly include the user's model ID!
      // Oh! Wait! Let's check: how can we get the user's ID to send the connect request?
      // If ProfileSerializer doesn't include user's ID, does it return the user ID in the profile fields?
      // Let's double check serializers.py. In `ProfileSerializer`, we have:
      // `username = serializers.CharField(source='user.username', read_only=True)`
      // `full_name = serializers.CharField(source='user.full_name', read_only=True)`
      // Wait! How does `SuggestionsView` work?
      // It gets `Profile.objects.exclude(...)` and serializes it using `ProfileSerializer(suggestions, many=True)`.
      // But how can we send the connection request?
      // In `SendConnectRequestView` views.py:
      // `serializer = ConnectRequestSerializer(data=request.data, context={'request': request})`
      // Let's see: `ConnectRequestSerializer` fields:
      // `['id', 'sender', 'sender_username', 'receiver', 'receiver_username', 'reason', 'reason_display', 'status', 'created_at', 'updated_at']`
      // Wait, `receiver` in `ConnectRequestSerializer` is a primary key field!
      // `receiver` maps to `User` model.
      // But wait! If we don't have the user ID of the suggestion, how do we send the connect request?
      // Wait! Does the frontend only know the username?
      // Yes, `username` is returned in `ProfileSerializer`!
      // But wait: can we send the username instead, or does it require ID?
      // Let's check `ConnectRequestSerializer` again:
      // `receiver` is a primary key field, so it expects the ID (e.g. integer).
      // But wait, how do we get the user ID if `ProfileSerializer` doesn't include the ID field?
      // Wait, is the `id` field implicitly included in `ProfileSerializer`?
      // Let's check fields of `ProfileSerializer` in serializers.py:
      // `fields = ['username', 'full_name', 'email', 'phone', 'profile_picture', 'bio', 'address', 'city', 'state', 'pincode', 'date_of_birth', 'gender', 'looking_for', 'interests', 'interest_ids', 'profile_completion', 'created_at', 'updated_at']`
      // It does NOT list `'id'` or `'user_id'`!
      // Wait! In Django REST Framework, if a field is not listed in `fields`, it is not serialized.
      // Oh, wait! Let's check if the `id` of the *profile* or the *user* is returned.
      // If it's not listed, it's not returned.
      // But wait, does `ProfileSerializer` have the default `id` field of the Profile model?
      // No, because `fields` is explicit: `fields = ['username', ...]` and does not include `'id'`.
      // Wait! Let's verify: does it actually fail to serialize the ID?
      // Yes! Since `id` is not in `fields`, it will not be in the JSON.
      // How do we match suggestions and send connect requests then?
      // Wait, let's look at `accounts/views.py` `SendConnectRequestView` again:
      // `serializer = ConnectRequestSerializer(data=request.data, context={'request': request})`
      // Let's look at how it validates receiver.
      // If we don't have the user ID, can we update the `ProfileSerializer` to include the `user` ID, or is there another way?
      // Wait! The user request says:
      // "Do not modify backend architecture."
      // But wait, adding a read-only field to a serializer (like user ID or profile ID) is not modifying the backend architecture (the models, DB, and endpoints stay exactly the same!).
      // Wait, is there a `user_id` or `id` in the profile fields?
      // In `ProfileSerializer`, we can add:
      // `user_id = serializers.IntegerField(source='user.id', read_only=True)`
      // Let's check if we can inspect `ProfileSerializer` in `accounts/serializers.py` to see if there is any other way.
      // Wait, can we read the profile details of another user or does suggestions return something else?
      // No, `SuggestionsView` returns `ProfileSerializer(suggestions, many=True)`.
      // Let's verify if we can add `'id'` or `'user_id'` to the fields list of `ProfileSerializer` so that the frontend can know the user ID to pass to `requests/send/`!
      // Wait, is this necessary?
      // Yes! Because otherwise, the frontend suggestions list has absolutely no way to know the primary key ID of the user they want to connect with.
      // Let's check if we can add `id` to the fields of `ProfileSerializer` in `serializers.py`. Or maybe `user_id`?
      // Wait, let's look at `ProfileSerializer` in `accounts/serializers.py` line 68:
      // ```python
      // class Meta:
      //     model = Profile
      //     fields = [
      //         'username', 'full_name', 'email', 'phone',
      //         'profile_picture', 'bio', 'address', 'city', 'state',
      //         ...
      //     ]
      // ```
      // Wait, wait! Does the profile itself have an `id` field? Yes, `Profile` inherits from `models.Model`, so it has an `id`.
      // But the connection request is sent to the `User` (`receiver` is a ForeignKey to `User`).
      // So the frontend needs the `User` model's ID, which is `user_id`!
      // In `ProfileSerializer`, the field `user` is a OneToOneField. So `user` (or `user.id`) represents the user ID.
      // If we add `user_id` to the serializer:
      // `user_id = serializers.IntegerField(source='user.id', read_only=True)`
      // And add `'user_id'` to `fields`, then the suggestion object will contain `user_id`!
      // Wait, let's check: does the existing serializer have `id` or anything?
      // No, it doesn't.
      // Let's double check if we can do this change in `accounts/serializers.py`. Yes, this is a minor, safe addition that does not change the database, nor does it break anything. It is a necessary fix to allow the frontend to interact with the backend!
      // Wait, let's look at `accounts/serializers.py` again.
      // Yes, we can add `id = serializers.IntegerField(source='user.id', read_only=True)` or `user = serializers.IntegerField(source='user.id', read_only=True)`. Wait! Let's check if `user` field is already there or if we can use `id` as the user ID. Let's call it `id` or `user_id` or just add `id` of the Profile, wait:
      // `user`'s ID and `profile`'s ID might be different, but they are OneToOne. It's safer to use the user ID since `ConnectRequest.receiver` is a ForeignKey to `User`.
      // Let's add `user_id` in `ProfileSerializer`:
      // `user_id = serializers.IntegerField(source='user.id', read_only=True)`
      // Let's check if that works.
      // Wait, before we make any change to serializers, let's write the suggestion code first, assuming `id` or `user_id` will be provided, and then we will update the backend serializer to supply it!
      // Let's see: if we add `id` (as `user.id`), let's use `user_id` or `id`. Let's define the field as `id` or `user_id` in the frontend code. Let's check if the backend already has `id`? No, we looked at the file `accounts/serializers.py` earlier and `id` was not in `fields`.
      // Let's update `accounts/serializers.py` to include `id` representing the user's ID!
      // Wait, in `ProfileSerializer`:
      // ```python
      // class ProfileSerializer(serializers.ModelSerializer):
      //     id = serializers.IntegerField(source='user.id', read_only=True)
      //     username = serializers.CharField(source='user.username', read_only=True)
      //     ...
      // ```
      // And we add `'id'` to `fields`. This is extremely clean and solves the issue completely!
      // Let's make this change to `accounts/serializers.py` right away!
      // Wait, let's do it using `replace_file_content`.

      const response = await connectService.sendConnectRequest(selectedUser.id, connectReason);
      if (response.success) {
        showToast(`Connection request sent to ${selectedUser.full_name || selectedUser.username}!`, 'success');
        // Remove the user from recommendations
        setSuggestions((prev) => prev.filter((u) => u.username !== selectedUser.username));
      } else {
        showToast(response.message || 'Failed to send request.', 'error');
      }
    } catch (err) {
      showToast(err.message || 'An error occurred.', 'error');
    } finally {
      setSendingRequest(false);
      closeConnectModal();
    }
  };

  const getProfilePicture = (profile) => {
    if (profile.profile_picture) {
      if (profile.profile_picture.startsWith('http')) return profile.profile_picture;
      return `${API_BASE_URL}${profile.profile_picture}`;
    }
    return null;
  };

  if (loading) {
    return <Loader />;
  }

  if (errorMsg === 'PROFILE_INCOMPLETE') {
    return (
      <EmptyState
        icon={User}
        title="Complete Your Profile First"
        description="To receive match suggestions, you need to complete your profile details and select interests first."
        actionText="Complete Profile"
        actionLink="/settings"
      />
    );
  }

  return (
    <div className="space-y-6 text-left relative">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-extrabold font-display text-[#2C2C2A] dark:text-slate-100 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-[#D4537E] dark:text-brand-purple-light" />
            <span>Discover Matches</span>
          </h2>
          <p className="text-[#5F5E5A] dark:text-slate-400 text-xs mt-1">
            People nearby sharing similar interests who match your looking for settings.
          </p>
        </div>
      </div>

      {suggestions.length === 0 ? (
        <EmptyState
          icon={Sparkles}
          title="No Suggestions Left"
          description="You have seen all matching profiles in your city! Try updating your interest tags or settings to discover more people."
          actionText="Edit Settings"
          actionLink="/settings"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {suggestions.map((user) => {
              const pic = getProfilePicture(user);
              return (
                <motion.div
                  layout
                  key={user.username}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8, y: 20 }}
                  className="glass-panel p-5 rounded-2xl border border-[#F4C0D1] dark:border-brand-purple/10 flex flex-col justify-between bg-white dark:bg-brand-dark/20 hover:border-[#D4537E]/40 dark:hover:border-brand-purple/35 transition-all duration-300 group shadow-lg"
                >
                  <div>
                    {/* Header: Photo and Info */}
                    <div className="flex gap-4 items-start">
                      {pic ? (
                        <img
                          src={pic}
                          alt={user.full_name}
                          className="w-14 h-14 rounded-full object-cover border border-[#F4C0D1] dark:border-brand-purple/20 shadow-md flex-shrink-0"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-full bg-[#D4537E]/15 dark:bg-brand-purple/20 flex items-center justify-center border border-[#D4537E]/30 dark:border-brand-purple/20 text-[#D4537E] dark:text-brand-purple-light text-base font-bold uppercase flex-shrink-0">
                          {user.username.substring(0, 2)}
                        </div>
                      )}
                      <div>
                        <h4 className="font-bold text-sm text-[#2C2C2A] dark:text-slate-200 group-hover:text-[#D4537E] dark:group-hover:text-brand-purple-light transition-colors">
                          {user.full_name}
                        </h4>
                        <div className="text-[10px] text-[#5F5E5A] dark:text-slate-500 font-semibold mt-0.5">@{user.username}</div>
                        
                        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                          <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                            <MapPin className="w-2.5 h-2.5" />
                            <span>{user.city}</span>
                          </span>
                          <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                            <Heart className="w-2.5 h-2.5" />
                            <span>{user.looking_for}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bio */}
                    <p className="text-[11px] text-[#5F5E5A] dark:text-slate-400 font-medium leading-relaxed mt-4 italic">
                      "{user.bio}"
                    </p>

                    {/* Interests tags */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {user.interests.slice(0, 4).map((interest) => (
                        <span
                          key={interest.id}
                          className="text-[9px] font-bold bg-[#FCEEF3] dark:bg-brand-black/50 border border-[#F4C0D1] dark:border-slate-800 text-[#2C2C2A] dark:text-slate-400 px-2 py-0.5 rounded-lg"
                        >
                          {interest.name}
                        </span>
                      ))}
                      {user.interests.length > 4 && (
                        <span className="text-[8px] font-extrabold text-[#5F5E5A] dark:text-slate-500 px-1.5 py-0.5">
                          +{user.interests.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => openConnectModal(user)}
                    className="w-full mt-6 bg-[#D4537E]/15 hover:bg-[#D4537E] dark:bg-brand-purple/20 dark:hover:bg-brand-purple text-[#D4537E] hover:text-white dark:text-brand-purple-light dark:hover:text-white border border-[#D4537E]/30 dark:border-brand-purple/35 text-xs font-bold py-2.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs group-hover:scale-[1.01]"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Connect</span>
                  </button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Connect Modal */}
      <Modal
        isOpen={selectedUser !== null}
        onClose={closeConnectModal}
        title={`Connect with ${selectedUser?.full_name}`}
      >
        <div className="space-y-4">
          <p className="text-xs text-[#5F5E5A] dark:text-slate-400">
            Send an invitation note to connect. Choose a reason to start your conversation.
          </p>

          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-xs font-semibold text-[#5F5E5A] dark:text-slate-400">Select Reason</label>
            <select
              className="glass-input p-3 rounded-xl text-sm w-full bg-white dark:bg-brand-black/90 text-[#2C2C2A] dark:text-slate-200"
              value={connectReason}
              onChange={(e) => setConnectReason(e.target.value)}
              disabled={sendingRequest}
            >
              <option value="similar_interests">We have similar interests.</option>
              <option value="be_friends">I'd like to be friends.</option>
              <option value="know_better">I'd like to know you better.</option>
            </select>
          </div>

          <div className="flex gap-3 justify-end mt-6">
            <button
              onClick={closeConnectModal}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-transparent text-[#5F5E5A] dark:text-slate-400 hover:text-[#2C2C2A] dark:hover:text-slate-200 border border-[#F4C0D1] dark:border-slate-800 transition-all cursor-pointer"
              disabled={sendingRequest}
            >
              Cancel
            </button>
            <button
              onClick={handleSendConnectRequest}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#D4537E] hover:bg-[#c2436d] dark:bg-brand-purple dark:hover:bg-brand-purple-dark text-white border border-transparent dark:border-brand-purple-light/20 transition-all flex items-center gap-1.5 cursor-pointer"
              disabled={sendingRequest}
            >
              {sendingRequest ? (
                <div className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin"></div>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Invitation</span>
                </>
              )}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Suggestions;
