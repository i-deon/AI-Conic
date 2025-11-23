import { motion } from 'framer-motion';
import type { UserProfile } from '../../entities/user/user.model';
import { User, Sparkles } from 'lucide-react';

export const UserProfileCard = ({ user }: { user: UserProfile }) => {
  const totalExplorations = user.level * 10 + 5; 

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="relative w-full bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-8 flex flex-col md:flex-row items-center gap-8 overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute -left-10 top-1/2 w-32 h-32 bg-purple-500/20 blur-[50px] rounded-full pointer-events-none" />

      <div className="relative shrink-0 group">
        <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-br from-white/20 to-transparent border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
          <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden relative z-10 group-hover:scale-105 transition-transform duration-500">
              <User size={48} className="text-gray-300" />
          </div>
        </div>
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg flex items-center gap-1 whitespace-nowrap">
          <Sparkles size={10} className="text-yellow-400" /> LV.{user.level}
        </div>
      </div>

      <div className="text-center md:text-left flex-1">
        <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-gray-400 tracking-[0.2em] uppercase mb-3">
          Explorer ID
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
          {user.nickname}
        </h2>
        <p className="text-lg text-gray-400 font-light">
          {user.title || "별을 쫓는 여행자"}
        </p>
        
        <div className="flex items-center justify-center md:justify-start gap-6 mt-6">
            <div className="text-center md:text-left">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total Trips</div>
                <div className="text-xl font-bold text-white">{totalExplorations}회</div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-center md:text-left">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Current EXP</div>
                <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    {user.currentExp} / {user.maxExp}
                </div>
            </div>
        </div>
      </div>
    </motion.div>
  );
};