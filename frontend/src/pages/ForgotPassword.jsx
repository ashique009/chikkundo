import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../services/authService';
import { useToast } from '../context/ToastContext';
import { Mail, ArrowLeft } from 'lucide-react';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      showToast('Please fill in all fields.', 'error');
      return;
    }

    setLoading(true);
    try {
      const response = await authService.forgotPassword(email.trim());
      // On success, show response message in toast
      showToast(response.message || 'If this email is registered, a password reset link has been sent.', 'success');
      setEmail('');
    } catch (err) {
      showToast(err.message || 'An error occurred. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold font-display text-slate-100 text-center mb-6">
        Forgot Password
      </h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5 text-left">
          <label className="text-xs font-semibold text-slate-400">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
            <input
              type="email"
              className="w-full glass-input pl-10 pr-4 py-3 rounded-xl text-sm"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-2 bg-brand-purple hover:bg-brand-purple-dark text-white font-bold py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-brand-purple/20 border border-brand-purple-light/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? (
            <div className="w-5 h-5 rounded-full border-2 border-white/20 border-t-white animate-spin"></div>
          ) : (
            <>
              <Mail className="w-4 h-4" />
              <span>Send Reset Link</span>
            </>
          )}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-slate-400 font-medium">
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-brand-purple-light hover:underline font-bold transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Login</span>
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
