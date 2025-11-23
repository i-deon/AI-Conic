import { motion } from 'framer-motion';
import { useState } from 'react';

export const StormMission = ({ onComplete }: { onComplete: () => void }) => {
  const [text, setText] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!text.trim()) return;
      
      if (window.confirm("이 감정을 태워버리시겠습니까?")) {
        onComplete();
      }
    }
  };

  return (
    <div className="flex flex-col h-full justify-center items-center w-full max-w-4xl mx-auto">
        <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="relative w-full"
        >
            <div className="absolute -top-8 left-0 w-full text-center text-red-500 text-sm font-bold animate-pulse mb-2">
               텍스트를 입력하고 [ENTER]를 눌러 감정을 파괴하세요 💥
            </div>

            <textarea 
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full h-80 bg-red-900/10 border-2 border-red-500/50 text-red-100 text-2xl md:text-4xl font-black p-8 rounded-3xl focus:outline-none focus:border-red-500 focus:shadow-[0_0_30px_rgba(239,68,68,0.4)] text-center leading-relaxed resize-none placeholder-red-800/30 whitespace-pre-wrap break-all scrollbar-hide"
                placeholder="여기에 쏟아내세요.&#13;&#10;욕을 해도 좋고&#13;&#10;소리를 질러도 좋습니다."
                spellCheck={false}
            />
        </motion.div>
    </div>
  );
};