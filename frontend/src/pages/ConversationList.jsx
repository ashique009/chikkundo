import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { chatService } from '../services/chatService';
import { useToast } from '../context/ToastContext';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';
import { MessageSquare, MessageCircle, ChevronRight, User } from 'lucide-react';
import { motion } from 'framer-motion';

export const ConversationList = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await chatService.getConversations();
        if (response.success && response.data) {
          setConversations(response.data);
        }
      } catch (err) {
        showToast('Failed to fetch conversation list.', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchConversations();
  }, [showToast]);

  const formatMessageTime = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6 text-left max-w-2xl mx-auto">
      <div>
        <h2 className="text-2xl font-extrabold font-display text-slate-100 flex items-center gap-2">
          <MessageCircle className="w-6 h-6 text-brand-purple-light" />
          <span>Conversations</span>
        </h2>
        <p className="text-slate-400 text-xs mt-1">
          Chat securely with approved connection matches.
        </p>
      </div>

      {conversations.length === 0 ? (
        <EmptyState
          icon={MessageSquare}
          title="No Conversations Yet"
          description="You haven't matched or opened any chat channels yet. Accept incoming invitations or invite suggestions to get matching!"
          actionText="Discover Suggestions"
          actionLink="/suggestions"
        />
      ) : (
        <div className="flex flex-col gap-3">
          {conversations.map((convo, index) => {
            const partner = convo.other_participant || {};
            const lastMsg = convo.last_message;
            return (
              <motion.div
                key={convo.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link
                  to={`/chat/${convo.id}`}
                  className="glass-panel p-4 rounded-xl border border-brand-purple/10 flex items-center justify-between gap-4 bg-brand-dark/15 hover:border-brand-purple/35 hover:bg-brand-purple/5 transition-all duration-300 group cursor-pointer shadow-md"
                >
                  <div className="flex items-center gap-3.5 min-w-0 flex-grow">
                    <div className="w-11 h-11 rounded-full bg-brand-purple/15 flex items-center justify-center border border-brand-purple/25 text-brand-purple-light text-sm font-extrabold uppercase flex-shrink-0">
                      {partner.username ? partner.username.substring(0, 2) : 'CK'}
                    </div>

                    <div className="min-w-0 flex-grow">
                      <div className="flex justify-between items-baseline gap-2">
                        <h4 className="font-bold text-sm text-slate-200 group-hover:text-brand-purple-light transition-colors truncate">
                          {partner.full_name || partner.username}
                        </h4>
                        {lastMsg && (
                          <span className="text-[10px] text-slate-500 font-semibold flex-shrink-0">
                            {formatMessageTime(lastMsg.created_at)}
                          </span>
                        )}
                      </div>
                      
                      <p className="text-xs text-slate-400 font-medium truncate mt-1">
                        {lastMsg ? (
                          <span>
                            <strong className="text-slate-500 font-bold">
                              {lastMsg.sender === partner.username ? 'They: ' : 'You: '}
                            </strong>
                            {lastMsg.content}
                          </span>
                        ) : (
                          <span className="text-slate-500 italic">No messages sent yet. Say hello!</span>
                        )}
                      </p>
                    </div>
                  </div>

                  <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-slate-300 transition-colors flex-shrink-0" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ConversationList;
