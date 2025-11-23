import { motion } from 'framer-motion';
import { Ghost, Sword } from 'lucide-react';
import type { ShadowBoss } from '../../entities/report/report.model';

export const ShadowBossCard = ({ boss }: { boss: ShadowBoss }) => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", bounce: 0.5 }}
      className="relative w-full max-w-sm bg-gradient-to-b from-gray-800 to-black border border-purple-500/50 rounded-xl p-1 overflow-hidden shadow-[0_0_30px_rgba(168,85,247,0.2)]"
    >
      <div className="absolute inset-0 bg-[url('/assets/noise.png')] opacity-10 mix-blend-overlay" />
      
      <div className="bg-gray-900/90 rounded-lg p-6 flex flex-col items-center text-center h-full relative z-10">
        
        <div className="w-24 h-24 rounded-full bg-purple-900/50 flex items-center justify-center mb-4 border-2 border-purple-400 shadow-[0_0_15px_#a855f7]">
          <Ghost size={48} className="text-purple-200 animate-pulse" />
        </div>

        <div className="mb-6">
          <h3 className="text-xs text-purple-400 tracking-widest mb-1 uppercase">{boss.title}</h3>
          <h2 className="text-2xl font-bold text-white mb-2">{boss.name}</h2>
          <span className="px-3 py-1 bg-red-900/50 text-red-200 text-xs rounded-full border border-red-500/30">
            LV. {boss.level} Threat
          </span>
        </div>

        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
          "{boss.description}"
        </p>

        <div className="w-full bg-black/40 rounded-lg p-3 border border-white/10 text-left">
          <div className="flex items-center gap-2 text-yellow-400 mb-1">
            <Sword size={14} />
            <span className="text-xs font-bold">WEAKNESS (공략법)</span>
          </div>
          <p className="text-sm text-gray-300 pl-5">{boss.weakness}</p>
        </div>
      </div>
    </motion.div>
  );
};