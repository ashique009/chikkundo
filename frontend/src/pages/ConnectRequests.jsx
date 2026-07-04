import React, { useState, useEffect } from 'react';
import { useToast } from '../context/ToastContext';
import { connectService } from '../services/connectService';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';
import { Check, X, Clock, Send, ArrowRight, UserPlus, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ConnectRequests = () => {
  const [activeTab, setActiveTab] = useState('received'); // 'received' | 'sent'
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const { showToast } = useToast();

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const [receivedRes, sentRes] = await Promise.all([
        connectService.getPendingRequests(),
        connectService.getSentRequests(),
      ]);

      if (receivedRes.success) setReceivedRequests(receivedRes.data);
      if (sentRes.success) setSentRequests(sentRes.data);
    } catch (err) {
      showToast('Failed to fetch connection requests.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAccept = async (requestId, senderName) => {
    setActionLoadingId(requestId);
    try {
      const response = await connectService.acceptRequest(requestId);
      if (response.success) {
        showToast(`Matched with ${senderName}! Conversation opened.`, 'success');
        setReceivedRequests((prev) => prev.filter((r) => r.id !== requestId));
      } else {
        showToast(response.message || 'Failed to accept invitation.', 'error');
      }
    } catch (err) {
      showToast(err.message || 'An error occurred.', 'error');
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDecline = async (requestId, senderName) => {
    setActionLoadingId(requestId);
    try {
      const response = await connectService.declineRequest(requestId);
      if (response.success) {
        showToast(`Declined invitation from ${senderName}.`, 'info');
        setReceivedRequests((prev) => prev.filter((r) => r.id !== requestId));
      } else {
        showToast(response.message || 'Failed to decline invitation.', 'error');
      }
    } catch (err) {
      showToast(err.message || 'An error occurred.', 'error');
    } finally {
      setActionLoadingId(null);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Clock className="w-2.5 h-2.5" />
            <span>Pending</span>
          </span>
        );
      case 'accepted':
        return (
          <span className="inline-flex items-center gap-1 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Check className="w-2.5 h-2.5" />
            <span>Accepted</span>
          </span>
        );
      case 'declined':
        return (
          <span className="inline-flex items-center gap-1 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <X className="w-2.5 h-2.5" />
            <span>Declined</span>
          </span>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return <Loader />;
  }

  const currentList = activeTab === 'received' ? receivedRequests : sentRequests;

  return (
    <div className="space-y-6 text-left">
      <div>
        <h2 className="text-2xl font-extrabold font-display text-slate-100">Connect Invites</h2>
        <p className="text-slate-400 text-xs mt-1">
          Approve incoming connection notes to open secure dialogue chat lines.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-900 pb-px gap-1">
        <button
          onClick={() => setActiveTab('received')}
          className={`px-4 py-2.5 text-xs font-extrabold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
            activeTab === 'received'
              ? 'border-brand-purple text-brand-purple-light'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Received ({receivedRequests.length})
        </button>
        <button
          onClick={() => setActiveTab('sent')}
          className={`px-4 py-2.5 text-xs font-extrabold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
            activeTab === 'sent'
              ? 'border-brand-purple text-brand-purple-light'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Sent ({sentRequests.length})
        </button>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {currentList.length === 0 ? (
          <EmptyState
            icon={activeTab === 'received' ? UserPlus : Send}
            title={activeTab === 'received' ? 'No Received Invites' : 'No Sent Invites'}
            description={
              activeTab === 'received'
                ? 'Your request inbox is empty right now. Once users invite you, they will appear here.'
                : 'You have not sent any connect invitations yet. Browse matching suggestion profiles to invite them.'
            }
            actionText={activeTab === 'sent' ? 'Find Matches' : null}
            actionLink={activeTab === 'sent' ? '/suggestions' : null}
          />
        ) : (
          <div className="flex flex-col gap-3">
            <AnimatePresence mode="popLayout">
              {currentList.map((req) => (
                <motion.div
                  layout
                  key={req.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="glass-panel p-4 rounded-xl border border-brand-purple/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-brand-dark/15 hover:border-brand-purple/20 transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-purple/10 flex items-center justify-center border border-brand-purple/20 text-brand-purple-light text-xs font-extrabold uppercase flex-shrink-0">
                      {activeTab === 'received' 
                        ? req.sender_username.substring(0, 2)
                        : req.receiver_username.substring(0, 2)}
                    </div>
                    
                    <div>
                      <div className="text-sm font-bold text-slate-200">
                        {activeTab === 'received' ? (
                          <span>Invitation from <strong className="text-brand-purple-light font-bold">@{req.sender_username}</strong></span>
                        ) : (
                          <span>Invitation to <strong className="text-indigo-400 font-bold">@{req.receiver_username}</strong></span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-1.5 mt-1.5 text-xs text-slate-400 font-medium">
                        <FileText className="w-3.5 h-3.5 text-slate-500" />
                        <span>Note: "{req.reason_display}"</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    {activeTab === 'received' ? (
                      <>
                        <button
                          onClick={() => handleDecline(req.id, req.sender_username)}
                          disabled={actionLoadingId !== null}
                          className="p-2.5 rounded-xl border border-slate-800 text-slate-400 hover:text-rose-400 hover:bg-rose-500/5 transition-all cursor-pointer flex items-center justify-center"
                          title="Decline"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleAccept(req.id, req.sender_username)}
                          disabled={actionLoadingId !== null}
                          className="px-4 py-2 rounded-xl bg-brand-purple hover:bg-brand-purple-dark text-white border border-brand-purple-light/20 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-md shadow-brand-purple/10"
                        >
                          {actionLoadingId === req.id ? (
                            <div className="w-3.5 h-3.5 rounded-full border-2 border-white/20 border-t-white animate-spin"></div>
                          ) : (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Accept</span>
                            </>
                          )}
                        </button>
                      </>
                    ) : (
                      <div className="flex items-center gap-3">
                        {getStatusBadge(req.status)}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectRequests;
