import { motion } from 'framer-motion';
import type { UserProfile } from '../../entities/user/user.model';
import { Ghost, Lock } from 'lucide-react';

export const ShadowBossCollection = ({ bosses }: { bosses: UserProfile['collectedBosses'] }) => {
  const totalSlots = 8;
  const filledSlots = bosses.length;
  const emptySlots = totalSlots - filledSlots;

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="bg-black/40 border border-white/10 rounded-3xl p-8 backdrop-blur-md mt-8"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
            <h3 className="text-lg font-bold text-white">Shadow Archive</h3>
            <p className="text-xs text-gray-500 mt-1">물리친 감정 악당들의 기록</p>
        </div>
        <span className="text-xs font-mono text-purple-400 border border-purple-500/30 px-3 py-1 rounded-full">
          {filledSlots}/{totalSlots} Collected
        </span>
      </div>
      
      <div className="grid grid-cols-4 gap-4">
        {bosses.map((boss, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            className="aspect-square bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-xl flex flex-col items-center justify-center p-2 cursor-pointer group hover:border-purple-500/50 transition-colors relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center mb-2 shadow-inner border border-white/5 group-hover:border-purple-500/30 transition-colors">
                <Ghost size={20} className="text-purple-300 group-hover:text-purple-100 transition-colors" />
            </div>
            <p className="text-[10px] text-gray-400 text-center leading-tight line-clamp-1 w-full px-1 group-hover:text-white transition-colors">
                {boss.name}
            </p>
          </motion.div>
        ))}
        
        {Array.from({ length: emptySlots }).map((_, i) => (
          <div key={i} className="aspect-square bg-black/20 border border-white/5 rounded-xl flex items-center justify-center opacity-30">
            <Lock size={16} className="text-gray-500" />
          </div>
        ))}
      </div>
    </motion.div>
  );
};