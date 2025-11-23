import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SpaceBackground } from '../../shared/ui/SpaceBackground';
import { MagicCircleVisual } from '../../widgets/portal-gate/MagicCircleVisual';
import { EmotionTabs } from '../../widgets/portal-gate/EmotionTabs';

const PortalPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputComplete = (emotionStr: string) => {
    setIsSubmitting(true);
    setTimeout(() => {
        navigate('/kingdom/select', { state: { emotion: emotionStr } });
    }, 1500);
  };

  return (
    <SpaceBackground>
      <div className="h-full w-full flex items-center justify-center relative overflow-hidden p-4">
      
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 opacity-30 scale-[1.5] md:scale-[1.8] pointer-events-none">
            <MagicCircleVisual isSubmitting={isSubmitting} />
        </div>

        <div className="relative z-10 flex flex-col items-center w-full max-w-lg">
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200 tracking-wider drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
              감정 입력 포털
            </h2>
            <p className="text-sm text-gray-300 mt-3 tracking-widest font-light">오늘의 당신을 기록해주세요.</p>
          </motion.div>

          <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-full"
          >
              <EmotionTabs onInputComplete={handleInputComplete} />
          </motion.div>

        </div>

        {isSubmitting && (
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex flex-col items-center justify-center pointer-events-none"
            >
                <div className="w-24 h-24 border-4 border-t-pink-500 border-purple-900/30 rounded-full animate-spin mb-8 shadow-[0_0_30px_#ec4899]" />
                <p className="text-2xl text-pink-200 font-bold animate-pulse tracking-widest">감정 세계 동기화 중...</p>
            </motion.div>
        )}

      </div>
    </SpaceBackground>
  );
};

export default PortalPage;