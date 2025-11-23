import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Compass, User, Map } from 'lucide-react';
import { SpaceBackground } from '../../shared/ui/SpaceBackground';

const IntroPage = () => {
  const navigate = useNavigate();

  return (
    <SpaceBackground>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute top-6 right-6 z-20"
      >
        <button 
            onClick={() => navigate('/profile')}
            className="p-3 bg-atlas-blue/30 rounded-full hover:bg-atlas-blue/50 backdrop-blur-md border border-atlas-gold/30 transition-all shadow-[0_0_15px_rgba(245,158,11,0.1)] group"
            title="항해 기록"
        >
            <User className="text-atlas-gold group-hover:scale-110 transition-transform" size={24} />
        </button>
      </motion.div>

      <div className="flex flex-col items-center justify-center h-full px-4 text-center relative z-10">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
            <h2 className="text-sm md:text-base text-atlas-gold tracking-[0.3em] uppercase mb-2 font-bold">
                Emotion Navigation System
            </h2>
            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500 drop-shadow-2xl mb-6 font-serif">
              Mood AtLaS
            </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="text-lg md:text-xl text-atlas-soft mb-12 font-light tracking-wider"
        >
          오늘, 당신의 감정 좌표는 어디를 가리키나요?
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.0, duration: 0.5 }}
          whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(245, 158, 11, 0.4)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/portal')}
          className="px-10 py-4 bg-atlas-blue/40 border border-atlas-gold/60 rounded-full 
                     text-atlas-gold font-bold text-lg backdrop-blur-md
                     shadow-[0_0_20px_rgba(30,58,138,0.5)] transition-all tracking-widest flex items-center gap-3 group"
        >
          <Compass className="group-hover:rotate-45 transition-transform duration-500" />
          <span>지도 펼치기</span>
        </motion.button>

      </div>
    </SpaceBackground>
  );
};

export default IntroPage;