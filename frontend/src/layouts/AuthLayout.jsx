import React from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';

export const AuthLayout = () => {
  return (
    <div className="relative min-h-screen bg-brand-black text-slate-100 flex flex-col justify-center items-center p-4 overflow-hidden select-none">
      {/* Background ambient glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-brand-purple/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-brand-purple-light/5 blur-[120px] pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8 z-10"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-purple-300 to-brand-purple-light bg-clip-text text-transparent font-display m-0">
          Lynqo
        </h1>
        <p className="text-slate-400 text-sm mt-2 tracking-wide font-medium">
          Connect Beyond Chats.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-full max-w-md glass-panel p-8 rounded-2xl shadow-2xl relative z-10 border border-brand-purple/20 bg-brand-dark/40"
      >
        <Outlet />
      </motion.div>
      
      <div className="mt-8 text-center text-xs text-slate-500 font-medium z-10 max-w-xs">
        A trusted social platform to build genuine friendships and meaningful relationships.
      </div>
    </div>
  );
};

export default AuthLayout;
