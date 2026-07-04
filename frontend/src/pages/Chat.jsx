import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { chatService } from '../services/chatService';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Loader from '../components/Loader';
import { Send, ArrowLeft, User, ShieldAlert } from 'lucide-react';

export const Chat = () => {
  const { conversationId } = useParams();
  const { username } = useAuth();
  const { showToast } = useToast();

  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const messagesEndRef = useRef(null);
  const pollingTimerRef = useRef(null);

  const fetchChatDetails = async (isPoll = false) => {
    try {
      // Get messages
      const msgResponse = await chatService.getMessages(conversationId);
      if (msgResponse.success && msgResponse.data) {
        // Prevent layout jerk if length is identical
        setMessages((prev) => {
          if (JSON.stringify(prev) !== JSON.stringify(msgResponse.data)) {
            return msgResponse.data;
          }
          return prev;
        });
      }

      // Only fetch conversation details once or on demand
      if (!isPoll) {
        const convoResponse = await chatService.getConversationDetail(conversationId);
        if (convoResponse.success && convoResponse.data) {
          setConversation(convoResponse.data);
        }
      }
    } catch (err) {
      if (!isPoll) {
        showToast('Failed to load chat details.', 'error');
      }
    } finally {
      if (!isPoll) {
        setLoading(false);
      }
    }
  };

  // Scroll to bottom helper
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Initial load
  useEffect(() => {
    setLoading(true);
    fetchChatDetails();

    // Start polling every 3 seconds for messages
    pollingTimerRef.current = setInterval(() => {
      fetchChatDetails(true);
    }, 3000);

    return () => {
      if (pollingTimerRef.current) {
        clearInterval(pollingTimerRef.current);
      }
    };
  }, [conversationId]);

  // Scroll to bottom on new messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || sending) return;

    const contentToSend = newMessage.trim();
    setNewMessage('');
    setSending(true);

    try {
      const response = await chatService.sendMessage(conversationId, contentToSend);
      if (response.success && response.data) {
        // Add to local message list immediately
        setMessages((prev) => [...prev, response.data]);
        scrollToBottom();
      } else {
        showToast('Failed to send message.', 'error');
      }
    } catch (err) {
      showToast(err.message || 'Failed to send message.', 'error');
    } finally {
      setSending(false);
    }
  };

  const getPartner = () => {
    return conversation?.other_participant || { username: '', full_name: 'Chat Partner' };
  };

  const partner = getPartner();

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col h-[calc(100vh-130px)] md:h-[calc(100vh-150px)] max-w-3xl mx-auto glass-panel rounded-3xl border border-brand-purple/10 overflow-hidden bg-brand-dark/15">
      {/* Chat Header */}
      <div className="px-5 py-4 border-b border-slate-900 flex items-center justify-between bg-brand-black/45 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Link
            to="/conversations"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          
          <div className="w-9 h-9 rounded-full bg-brand-purple/15 flex items-center justify-center border border-brand-purple/25 text-brand-purple-light text-xs font-bold uppercase">
            {partner.username ? partner.username.substring(0, 2) : 'CK'}
          </div>

          <div className="text-left">
            <h3 className="text-sm font-bold text-slate-200">{partner.full_name}</h3>
            <span className="text-[10px] text-slate-500 font-semibold">@{partner.username}</span>
          </div>
        </div>
      </div>

      {/* Messages Scroll Zone */}
      <div className="flex-grow overflow-y-auto p-5 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-500 text-center gap-2">
            <User className="w-8 h-8 text-slate-600 mb-2" />
            <div className="text-xs font-bold">This is the start of your secure chat history.</div>
            <div className="text-[10px] text-slate-600">Send a message to break the ice!</div>
          </div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.sender_username === username;
            return (
              <div
                key={msg.id}
                className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm ${
                    isMe
                      ? 'bg-brand-purple text-white rounded-br-none border border-brand-purple-light/20 shadow-md shadow-brand-purple/5'
                      : 'bg-brand-black/60 text-slate-200 rounded-bl-none border border-slate-800'
                  }`}
                >
                  <p className="leading-relaxed break-words text-left">{msg.content}</p>
                  <div
                    className={`text-[8px] font-semibold mt-1 text-left ${
                      isMe ? 'text-purple-300' : 'text-slate-500'
                    }`}
                  >
                    {new Date(msg.created_at).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input Form */}
      <form
        onSubmit={handleSend}
        className="p-4 border-t border-slate-900 flex gap-3 bg-brand-black/35 backdrop-blur-md"
      >
        <input
          type="text"
          className="flex-grow glass-input px-4 py-3 rounded-xl text-sm"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          disabled={sending}
          required
        />
        <button
          type="submit"
          className="p-3 bg-brand-purple hover:bg-brand-purple-dark text-white rounded-xl border border-brand-purple-light/20 transition-all duration-200 flex items-center justify-center flex-shrink-0 cursor-pointer shadow-md shadow-brand-purple/10 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={sending || !newMessage.trim()}
        >
          <Send className="w-4.5 h-4.5" />
        </button>
      </form>
    </div>
  );
};

export default Chat;
