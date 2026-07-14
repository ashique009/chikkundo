import { useEffect, useState } from 'react';
import { getUsers, banUser, unbanUser, deleteUser } from '../services/adminService';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Trash2, ShieldAlert, ShieldCheck, Mail, MapPin, AlertCircle } from 'lucide-react';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  const fetchUsers = async () => {
    const res = await getUsers(search ? { search } : {});
    if (res.success) setUsers(res.data);
  };

  useEffect(() => { fetchUsers(); }, [search]);

  const handleBan = async (id) => { await banUser(id); fetchUsers(); };
  const handleUnban = async (id) => { await unbanUser(id); fetchUsers(); };
  const handleDelete = async (id) => {
    if (window.confirm('Delete this user permanently?')) {
      await deleteUser(id);
      fetchUsers();
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.03 }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 25 } }
  };

  return (
    <div className="space-y-8 py-4 px-2 md:px-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold font-display text-white tracking-tight">User Management</h1>
          <p className="text-sm text-slate-400 mt-1">Audit user accounts, manage statuses, and adjust platform access.</p>
        </div>

        <div className="relative w-full sm:w-80 group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-brand-purple-light transition-colors" />
          <input
            placeholder="Search by name, email, city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-brand-black/60 border border-brand-purple/15 rounded-xl text-white placeholder-slate-500 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple-light/20 outline-none transition-all duration-300 text-sm font-medium"
          />
        </div>
      </div>

      <div className="bg-brand-card backdrop-blur-md border border-brand-purple/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-purple/[0.03] border-b border-brand-purple/10 text-slate-400 text-xs font-semibold uppercase tracking-wider">
                <th className="py-4 px-6">User Info</th>
                <th className="py-4 px-6">Email</th>
                <th className="py-4 px-6">Location</th>
                <th className="py-4 px-6">Account Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <motion.tbody 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="divide-y divide-brand-purple/5"
            >
              <AnimatePresence mode="popLayout">
                {users.length === 0 ? (
                  <motion.tr
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <td colSpan={5} className="py-12 text-center text-slate-500">
                      <div className="flex flex-col items-center gap-2">
                        <AlertCircle className="w-8 h-8 text-slate-600 animate-pulse" />
                        <span className="font-semibold text-sm">No registered users matched your criteria</span>
                      </div>
                    </td>
                  </motion.tr>
                ) : (
                  users.map((u) => (
                    <motion.tr 
                      key={u.id}
                      variants={rowVariants}
                      layout
                      exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
                      className="hover:bg-brand-purple/[0.02] transition-colors duration-150"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center text-brand-purple-light font-bold text-sm uppercase">
                            {u.username ? u.username.substring(0, 2) : 'CK'}
                          </div>
                          <div>
                            <div className="font-bold text-white text-sm">{u.full_name || 'No Name'}</div>
                            <div className="text-xs text-slate-500 mt-0.5">@{u.username}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-300">
                        <div className="flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-slate-500" />
                          <span>{u.email}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-300">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-slate-500" />
                          <span>{u.city || 'Not Specified'}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        {u.is_banned ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-500/10 border border-rose-500/20 text-rose-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                            Banned
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            Active
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {u.is_banned ? (
                            <motion.button 
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleUnban(u.id)}
                              className="px-3 py-1.5 text-xs font-bold rounded-lg border border-emerald-500/35 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500 transition-all duration-205 flex items-center gap-1 cursor-pointer"
                            >
                              <ShieldCheck className="w-3.5 h-3.5" />
                              <span>Unban</span>
                            </motion.button>
                          ) : (
                            <motion.button 
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleBan(u.id)}
                              className="px-3 py-1.5 text-xs font-bold rounded-lg border border-amber-500/35 text-amber-400 hover:bg-amber-500/10 hover:border-amber-500 transition-all duration-205 flex items-center gap-1 cursor-pointer"
                            >
                              <ShieldAlert className="w-3.5 h-3.5" />
                              <span>Ban</span>
                            </motion.button>
                          )}
                          <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleDelete(u.id)}
                            className="px-3 py-1.5 text-xs font-bold rounded-lg border border-rose-500/35 text-rose-400 hover:bg-rose-500/10 hover:border-rose-500 transition-all duration-205 flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </motion.tbody>
          </table>
        </div>
      </div>
    </div>
  );
}