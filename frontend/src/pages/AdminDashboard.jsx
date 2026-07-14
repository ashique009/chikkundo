import { useEffect, useState } from 'react';
import { getDashboardStats } from '../services/adminService';
import { motion } from 'framer-motion';
import { 
  Users, 
  UserCheck, 
  UserX, 
  CalendarPlus, 
  GitCompare, 
  MessageSquare, 
  AlertTriangle, 
  Percent 
} from 'lucide-react';
import Loader from '../components/Loader';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getDashboardStats().then((res) => {
      if (res.success) setStats(res.data);
    });
  }, []);

  if (!stats) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  const cards = [
    { label: 'Total Users', value: stats.total_users, icon: Users, color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20' },
    { label: 'Active Users', value: stats.active_users, icon: UserCheck, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
    { label: 'Banned Users', value: stats.banned_users, icon: UserX, color: 'text-rose-400 bg-rose-500/10 border-rose-500/20' },
    { label: 'New Today', value: stats.new_users_today, icon: CalendarPlus, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
    { label: 'Connections', value: stats.total_connections, icon: GitCompare, color: 'text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20' },
    { label: 'Messages', value: stats.total_messages, icon: MessageSquare, color: 'text-sky-400 bg-sky-500/10 border-sky-500/20' },
    { label: 'Reports', value: stats.reports, icon: AlertTriangle, color: 'text-red-400 bg-red-500/10 border-red-500/20' },
    { label: 'Avg Profile Completion', value: `${stats.avg_profile_completion}%`, icon: Percent, color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  return (
    <div className="space-y-8 py-4 px-2 md:px-0">
      <div>
        <h1 className="text-3xl font-extrabold font-display text-white tracking-tight">System Dashboard</h1>
        <p className="text-sm text-slate-400 mt-1">Real-time statistics, system activity, and engagement metrics.</p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-brand-card backdrop-blur-md border border-brand-purple/10 p-6 rounded-2xl flex flex-col justify-between shadow-xl transition-all duration-300 hover:border-brand-purple/35 hover:shadow-[0_0_30px_rgba(124,58,237,0.12)] relative overflow-hidden"
            >
              {/* Card Ambient Glow */}
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-brand-purple/5 blur-xl pointer-events-none" />

              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-bold text-slate-400 tracking-wider uppercase font-sans">
                  {card.label}
                </span>
                <div className={`p-2.5 rounded-xl border flex items-center justify-center ${card.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div>
                <p className="text-3xl font-extrabold text-white font-display tracking-tight">
                  {card.value}
                </p>
                <div className="mt-2 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Live tracking</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}