import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SpaceBackground } from '../../shared/ui/SpaceBackground';
import { GUARDIANS } from '../../entities/guardian/guardian.data';
import type { GuardianType, Guardian } from '../../entities/guardian/guardian.data';

import { useEffect, useState } from 'react';
import { Sparkles, Zap, Info, User, ArrowLeft, Compass } from 'lucide-react';

const KingdomPlanet = ({ 
  guardian, 
  isRecommended, 
  position, 
  onClick, 
  onInfoClick 
}: { 
  guardian: Guardian; 
  isRecommended: boolean; 
  position: string; 
  onClick: () => void; 
  onInfoClick: () => void; 
}) => {
  const baseSize = 120;
  const size = baseSize + (guardian.affinityLevel * 15); 
  
  const positionStyle = {
    'top-left': 'top-0 left-0 -translate-x-1/4 -translate-y-1/4',
    'top-right': 'top-0 right-0 translate-x-1/4 -translate-y-1/4',
    'bottom-left': 'bottom-0 left-0 -translate-x-1/4 translate-y-1/4',
    'bottom-right': 'bottom-0 right-0 translate-x-1/4 translate-y-1/4',
  }[position];

  const floatDelay = position === 'top-left' ? 0 : position === 'top-right' ? 1 : 2;

  return (
    <div className={`absolute ${positionStyle} flex flex-col items-center justify-center z-20`}>
      
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: floatDelay }}
        className="relative group"
      >
        {isRecommended && (
          <div className={`absolute -top-4 left-1/2 -translate-x-1/2 bg-${guardian.bgColor} text-white text-xs font-bold px-3 py-1 rounded-full animate-bounce shadow-lg z-30 flex items-center gap-1 whitespace-nowrap border border-white/20`}>
            <Sparkles size={12} /> BEST MATCH
          </div>
        )}

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          onClick={onClick}
          style={{ 
            width: size, 
            height: size,
            boxShadow: `0 0 ${guardian.affinityLevel * 10 + 20}px var(--tw-color-${guardian.bgColor})`
          }}
          className={`rounded-full border-4 border-${guardian.bgColor} bg-black overflow-hidden relative z-10 transition-all duration-500 cursor-pointer`}
        >
          <img src={guardian.imageSrc} alt={guardian.name} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
          <div className={`absolute inset-0 bg-gradient-to-b ${guardian.bgGradient} opacity-30 group-hover:opacity-0 transition-opacity`} />
        </motion.div>

        <button 
            onClick={(e) => {
                e.stopPropagation();
                onInfoClick();
            }}
            className={`absolute bottom-0 -right-2 w-8 h-8 bg-gray-800 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors z-30 shadow-lg hover:scale-110`}
            title="수호자 정보 보기"
        >
            <Info size={16} />
        </button>

        <div className={`absolute bottom-0 left-0 w-8 h-8 bg-${guardian.bgColor} rounded-full flex items-center justify-center text-xs font-bold text-white border-2 border-white/20 z-20 shadow-lg`}>
            {guardian.affinityLevel}
        </div>

        <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 text-center w-48 pointer-events-none">
            <h3 className={`text-lg font-bold text-white drop-shadow-md ${guardian.color}`}>{guardian.name}</h3>
            <p className="text-xs text-gray-400 tracking-wider uppercase mb-1">{guardian.title}</p>
        </div>
      </motion.div>
    </div>
  );
};

const SelectKingdomPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userEmotion = location.state?.emotion || "알 수 없는 감정";
  const [recommended, setRecommended] = useState<GuardianType>('WARMTH');

  useEffect(() => {
    const emotion = userEmotion;
    if (emotion.includes('짜증') || emotion.includes('화') || emotion.includes('폭발')) setRecommended('STORM');
    else if (emotion.includes('해결') || emotion.includes('방법') || emotion.includes('할일')) setRecommended('ACTION');
    else if (emotion.includes('왜') || emotion.includes('생각') || emotion.includes('이유')) setRecommended('INSIGHT');
    else setRecommended('WARMTH');
  }, [userEmotion]);

  return (
    <SpaceBackground>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black pointer-events-none" />

        <div className="absolute top-6 left-6 z-50 flex items-center gap-4">
            <button 
                onClick={() => navigate('/portal')}
                className="p-3 bg-white/10 rounded-full hover:bg-white/20 backdrop-blur-md border border-white/10 transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)] group"
                title="감정 재입력 (포털로 돌아가기)"
            >
                <ArrowLeft className="text-white group-hover:-translate-x-1 transition-transform" size={24} />
            </button>
            
            <div className="flex items-center gap-2 select-none cursor-pointer" onClick={() => navigate('/')}>
                <Compass className="text-amber-400 animate-pulse-slow" size={24} />
                <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-white tracking-widest font-serif">
                    Mood AtLaS
                </h1>
            </div>
        </div>

        <div className="absolute top-6 right-6 z-50">
            <button 
                onClick={() => navigate('/profile')}
                className="p-3 bg-white/10 rounded-full hover:bg-white/20 backdrop-blur-md border border-white/10 transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)] group"
                title="나의 탐험 기록"
            >
                <User className="text-white group-hover:scale-110 transition-transform" size={24} />
            </button>
        </div>

        <div className="flex flex-col items-center justify-center h-full w-full relative overflow-hidden">
            
            <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] flex items-center justify-center">
                
                <div className="absolute inset-0 border border-white/5 rounded-full" />
                <div className="absolute inset-10 border border-white/5 rounded-full" />
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-2 border-dashed border-white/10 rounded-full" 
                />

                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative z-10 text-center p-8 rounded-full bg-black/50 backdrop-blur-xl border border-white/10 shadow-[0_0_50px_rgba(255,255,255,0.1)]"
                >
                    <div className="text-xs text-gray-500 tracking-widest mb-1 uppercase">Detected Signal</div>
                    <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200">
                        {userEmotion}
                    </h1>
                    <div className="mt-2 text-[10px] text-gray-400 flex justify-center gap-1">
                        <Zap size={12} /> Analyzing Pattern...
                    </div>
                </motion.div>

                <KingdomPlanet 
                    guardian={GUARDIANS.WARMTH} 
                    isRecommended={recommended === 'WARMTH'} 
                    position="top-left"
                    onClick={() => navigate(`/chat/WARMTH`, { state: { emotion: userEmotion } })}
                    onInfoClick={() => navigate(`/guardian/WARMTH`)} 
                />

                <KingdomPlanet 
                    guardian={GUARDIANS.ACTION} 
                    isRecommended={recommended === 'ACTION'} 
                    position="top-right"
                    onClick={() => navigate(`/chat/ACTION`, { state: { emotion: userEmotion } })}
                    onInfoClick={() => navigate(`/guardian/ACTION`)}
                />

                <KingdomPlanet 
                    guardian={GUARDIANS.INSIGHT} 
                    isRecommended={recommended === 'INSIGHT'} 
                    position="bottom-left"
                    onClick={() => navigate(`/chat/INSIGHT`, { state: { emotion: userEmotion } })}
                    onInfoClick={() => navigate(`/guardian/INSIGHT`)}
                />

                <KingdomPlanet 
                    guardian={GUARDIANS.STORM} 
                    isRecommended={recommended === 'STORM'} 
                    position="bottom-right"
                    onClick={() => navigate(`/chat/STORM`, { state: { emotion: userEmotion } })}
                    onInfoClick={() => navigate(`/guardian/STORM`)}
                />

            </div>

            <p className="absolute bottom-10 text-gray-500 text-sm animate-pulse">
                행성을 클릭하여 대화하거나, ⓘ 버튼을 눌러 정보를 확인하세요.
            </p>

        </div>
    </SpaceBackground>
  );
};

export default SelectKingdomPage;