import React from 'react';

export const Loader = ({ fullScreen = false }) => {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#FCEEF3]/90 dark:bg-brand-black/90 backdrop-blur-md">
        <div className="relative flex flex-col items-center">
          <div className="w-16 h-16 rounded-full border-4 border-[#F4C0D1] border-t-[#D4537E] dark:border-slate-800 dark:border-t-brand-purple animate-spin"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white dark:bg-brand-black border border-[#F4C0D1] dark:border-brand-purple-light/20"></div>
          <span className="mt-4 text-sm font-semibold text-[#D4537E] dark:text-purple-300 animate-pulse tracking-wide font-display">Lynqo</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8 w-full">
      <div className="relative">
        <div className="w-10 h-10 rounded-full border-2 border-[#F4C0D1] border-t-[#D4537E] dark:border-slate-800 dark:border-t-brand-purple animate-spin"></div>
      </div>
    </div>
  );
};

export default Loader;
