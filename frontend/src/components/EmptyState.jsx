import React from 'react';
import { Link } from 'react-router-dom';

export const EmptyState = ({ 
  icon: Icon, 
  title, 
  description, 
  actionText, 
  actionLink, 
  onAction 
}) => {
  return (
    <div className="glass-panel p-8 md:p-12 rounded-3xl border border-brand-purple/10 flex flex-col items-center justify-center text-center bg-brand-dark/10 py-16">
      {Icon && (
        <div className="w-16 h-16 rounded-2xl bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center text-brand-purple-light mb-5">
          <Icon className="w-8 h-8" />
        </div>
      )}
      <h3 className="text-xl font-bold font-display text-slate-100 mb-2">{title}</h3>
      <p className="text-sm text-slate-400 max-w-sm mb-6 leading-relaxed">{description}</p>
      
      {actionText && (
        <>
          {actionLink ? (
            <Link
              to={actionLink}
              className="px-5 py-2.5 rounded-xl text-sm font-bold bg-brand-purple hover:bg-brand-purple-dark text-white border border-brand-purple-light/20 transition-all duration-300 shadow-md shadow-brand-purple/10 cursor-pointer"
            >
              {actionText}
            </Link>
          ) : (
            <button
              onClick={onAction}
              className="px-5 py-2.5 rounded-xl text-sm font-bold bg-brand-purple hover:bg-brand-purple-dark text-white border border-brand-purple-light/20 transition-all duration-300 shadow-md shadow-brand-purple/10 cursor-pointer"
            >
              {actionText}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default EmptyState;
