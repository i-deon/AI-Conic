import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, MessageCircle, LayoutGrid } from 'lucide-react';
import { Slider } from '../../shared/ui/Slider';

type TabType = 'KEYWORD' | 'SENTENCE' | 'STATUS';

const KEYWORDS = ['짜증', '불안', '설렘', '지침', '행복', '우울', '분노', '평온', '외로움', '감사', '두려움', '희망'];

export const EmotionTabs = ({ onInputComplete }: { onInputComplete: (emotionStr: string) => void }) => {
  const [activeTab, setActiveTab] = useState<TabType>('KEYWORD');
  
  const [selectedKeyword, setSelectedKeyword] = useState('');
  const [sentence, setSentence] = useState('');
  const [status, setStatus] = useState({ sleep: 50, stress: 50, schedule: 50, energy: 50 });

  const handleSubmit = () => {
    let finalEmotion = '';
    
    if (activeTab === 'KEYWORD' && selectedKeyword) {
      finalEmotion = selectedKeyword;
    } else if (activeTab === 'SENTENCE' && sentence) {
      finalEmotion = sentence;
    } else if (activeTab === 'STATUS') {
      finalEmotion = `수면:${status.sleep}%, 스트레스:${status.stress}%, 일정압박:${status.schedule}%, 에너지:${status.energy}% 상태`;
    }

    if (finalEmotion) {
      onInputComplete(finalEmotion);
    } else {
      alert("감정을 입력하거나 선택해주세요!");
    }
  };

  const tabBtnStyle = (tabName: TabType) => `
    flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all
    ${activeTab === tabName 
      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-[0_0_20px_#a855f7]' 
      : 'text-gray-400 hover:text-white hover:bg-white/10'}
  `;

  return (
    <div className="w-full mx-auto relative z-10">
      
      <div className="flex justify-center gap-3 bg-black/40 backdrop-blur-md p-1.5 rounded-full border border-white/10 mb-8 shadow-lg mx-auto w-fit">
        <button onClick={() => setActiveTab('KEYWORD')} className={tabBtnStyle('KEYWORD')}>
          <Target size={16} /> 키워드
        </button>
        <button onClick={() => setActiveTab('SENTENCE')} className={tabBtnStyle('SENTENCE')}>
          <MessageCircle size={16} /> 문장
        </button>
        <button onClick={() => setActiveTab('STATUS')} className={tabBtnStyle('STATUS')}>
          <LayoutGrid size={16} /> 상태
        </button>
      </div>

      <div className="bg-[#1a0b2e]/80 backdrop-blur-xl border border-purple-500/30 rounded-[2rem] p-8 shadow-[0_0_40px_rgba(168,85,247,0.15)] min-h-[350px]">
        <AnimatePresence mode="wait">
          
          {activeTab === 'KEYWORD' && (
            <motion.div 
              key="keyword"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-3 md:grid-cols-4 gap-4"
            >
              {KEYWORDS.map((k) => (
                <button
                  key={k}
                  onClick={() => setSelectedKeyword(k)}
                  className={`py-3 rounded-2xl text-sm font-bold border transition-all hover:scale-105 active:scale-95 ${
                    selectedKeyword === k 
                      ? 'bg-purple-500 border-purple-400 text-white shadow-[0_0_15px_#a855f7]' 
                      : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/30 hover:text-white'
                  }`}
                >
                  {k}
                </button>
              ))}
            </motion.div>
          )}

          {activeTab === 'SENTENCE' && (
            <motion.div 
              key="sentence"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="h-full flex flex-col justify-center"
            >
              <textarea
                value={sentence}
                onChange={(e) => setSentence(e.target.value)}
                placeholder="오늘 어떤 일이 있었나요? &#13;&#10;자유롭게 적어주세요..."
                className="w-full h-60 bg-black/30 border border-purple-500/30 rounded-2xl p-6 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 resize-none text-lg leading-relaxed shadow-inner"
              />
            </motion.div>
          )}

          {activeTab === 'STATUS' && (
            <motion.div 
              key="status"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="space-y-6 py-4"
            >
              <Slider label="수면의 질" icon="😴" value={status.sleep} onChange={(v) => setStatus({...status, sleep: v})} />
              <Slider label="스트레스 지수" icon="🤯" value={status.stress} onChange={(v) => setStatus({...status, stress: v})} />
              <Slider label="일정 압박감" icon="📅" value={status.schedule} onChange={(v) => setStatus({...status, schedule: v})} />
              <Slider label="현재 에너지" icon="⚡" value={status.energy} onChange={(v) => setStatus({...status, energy: v})} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.button
        whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(191,0,255,0.6)" }}
        whileTap={{ scale: 0.98 }}
        onClick={handleSubmit}
        className="w-full mt-10 py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white font-bold text-xl rounded-full shadow-[0_0_20px_rgba(191,0,255,0.4)] tracking-widest relative overflow-hidden group"
      >
        <span className="relative z-10 drop-shadow-md">감정 세계로 입장</span>
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 filter blur-xl"/>
      </motion.button>

    </div>
  );
};