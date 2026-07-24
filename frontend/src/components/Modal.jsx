import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

export const Modal = ({ isOpen, onClose, title, children }) => {
  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#2C2C2A]/40 dark:bg-brand-black/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="w-full max-w-md glass-panel p-6 rounded-2xl shadow-2xl relative z-10 border border-[#F4C0D1] dark:border-brand-purple/20 bg-white dark:bg-brand-dark dark:bg-opacity-95 transition-colors duration-200"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#F4C0D1] dark:border-slate-800 pb-3 mb-4">
              <h3 className="text-base font-bold font-display text-[#2C2C2A] dark:text-slate-100">
                {title}
              </h3>
              <button
                onClick={onClose}
                className="p-1 rounded-lg text-[#5F5E5A] dark:text-slate-400 hover:text-[#2C2C2A] dark:hover:text-slate-200 hover:bg-[#F4C0D1]/30 dark:hover:bg-slate-800/40 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="text-[#2C2C2A] dark:text-slate-300 text-sm">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
