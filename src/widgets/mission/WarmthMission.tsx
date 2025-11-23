import { motion } from 'framer-motion';
import { Save } from 'lucide-react';

export const WarmthMission = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <div className="space-y-6 max-w-2xl mx-auto w-full mt-10">
      <p className="text-pink-200 text-center mb-8">오늘 있었던 작은 일이라도 좋아요. 3가지만 찾아볼까요?</p>
      {[1, 2, 3].map((i) => (
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.2 }}
            key={i} 
            className="bg-pink-900/20 border border-pink-500/30 rounded-xl p-5"
        >
          <label className="text-pink-300 text-sm font-bold mb-2 block">오늘의 감사 {i}</label>
          <input type="text" placeholder="입력하세요..." className="w-full bg-transparent border-b border-pink-500/30 text-white focus:outline-none focus:border-pink-400 py-2 transition-colors" />
        </motion.div>
      ))}
      <button onClick={onComplete} className="w-full py-4 mt-8 bg-pink-600 hover:bg-pink-500 text-white font-bold rounded-full shadow-lg transition-all flex items-center justify-center gap-2">
         <Save size={20} /> 기록 완료하기
      </button>
    </div>
  );
};