import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';
import { Star, Send, HeartHandshake } from 'lucide-react';
import { motion } from 'framer-motion';

export const Feedback = () => {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) {
      showToast('Please complete all form fields.', 'error');
      return;
    }

    setSubmitting(true);
    // Simulate submission delay
    setTimeout(() => {
      setSubmitting(false);
      showToast('Thank you! Your feedback has been received.', 'success');
      setSubject('');
      setDescription('');
      setRating(5);
    }, 1500);
  };

  return (
    <div className="space-y-6 text-left max-w-xl mx-auto">
      <div>
        <h2 className="text-2xl font-extrabold font-display text-slate-100 flex items-center gap-2">
          <HeartHandshake className="w-6 h-6 text-brand-purple-light" />
          <span>Product Feedback</span>
        </h2>
        <p className="text-slate-400 text-xs mt-1">
          Tell us about your experience on Chikkundo. We read all comments to refine our community circles.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="glass-panel p-6 md:p-8 rounded-3xl border border-brand-purple/10 bg-brand-dark/15 space-y-6">
        {/* Rating Stars */}
        <div className="flex flex-col gap-2 items-center text-center py-2 border-b border-slate-900">
          <label className="text-xs font-semibold text-slate-400">Rate Your Experience</label>
          <div className="flex gap-1.5 mt-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                className="p-1 cursor-pointer transition-transform duration-100 hover:scale-110"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                disabled={submitting}
              >
                <Star
                  className={`w-7 h-7 transition-colors ${
                    star <= (hoverRating || rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-slate-700'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Subject */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-400">Subject</label>
          <input
            type="text"
            className="glass-input p-3 rounded-xl text-sm"
            placeholder="Feature request, bug report, praise..."
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            disabled={submitting}
            required
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-400">Message Description</label>
          <textarea
            className="glass-input p-3 rounded-xl text-sm min-h-32 resize-none"
            placeholder="Write details about what we can improve..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={submitting}
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-brand-purple hover:bg-brand-purple-dark text-white font-bold py-3.5 rounded-xl transition-all duration-300 border border-brand-purple-light/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-brand-purple/10"
          disabled={submitting}
        >
          {submitting ? (
            <div className="w-5 h-5 rounded-full border-2 border-white/20 border-t-white animate-spin"></div>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Submit Feedback</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default Feedback;
