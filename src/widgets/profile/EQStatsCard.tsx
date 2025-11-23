import { motion } from 'framer-motion';
import type { UserProfile } from '../../entities/user/user.model';
import { Sun, Hammer, BookOpen, Flame } from 'lucide-react';

const statConfig = {
  WARMTH: { name: '공감', icon: Sun, color: 'bg-pink-500', shadow: 'shadow-pink-500/50' },
  ACTION: { name: '해결', icon: Hammer, color: 'bg-orange-500', shadow: 'shadow-orange-500/50' },
  INSIGHT: { name: '분석', icon: BookOpen, color: 'bg-blue-500', shadow: 'shadow-blue-500/50' },
  STORM: { name: '해소', icon: Flame, color: 'bg-red-500', shadow: 'shadow-red-500/50' },
};

export const EQStatsCard = ({ stats }: { stats: UserProfile['eqStats'] }) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="bg-black/40 border border-white/10 rounded-3xl p-8 h-full backdrop-blur-md"
    >
      <h3 className="text-lg font-bold text-white mb-6 border-b border-white/5 pb-4 flex justify-between items-end">
        <span>EQ 성장 지수</span>
        <span className="text-xs text-gray-500 font-normal">Analysis Data</span>
      </h3>
      
      <div className="space-y-7">
        {Object.entries(stats).map(([key, value], idx) => {
          const config = statConfig[key as keyof typeof statConfig];
          const Icon = config.icon;

          return (
            <div key={key} className="group">
              <div className="flex justify-between text-sm text-gray-400 mb-2 group-hover:text-white transition-colors">
                <span className="flex items-center gap-2 font-bold">
                    <Icon size={14} />
                    {config.name}
                </span>
                <span className="font-mono">{value}%</span>
              </div>
              
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden relative">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${value}%` }}
                  transition={{ duration: 1.5, delay: idx * 0.1 + 0.2, ease: "easeOut" }}
                  className={`h-full ${config.color} rounded-full relative shadow-[0_0_10px_currentColor]`}
                >
                    <div className="absolute right-0 top-0 w-2 h-full bg-white/50 blur-[1px]" />
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};