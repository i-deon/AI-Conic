import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowLeft, Heart, Zap, Brain, Flame } from 'lucide-react';
import { SpaceBackground } from '../../shared/ui/SpaceBackground';
import type { GuardianType } from '../../entities/guardian/guardian.data';

import { WarmthMission } from '../../widgets/mission/WarmthMission';
import { ActionMission } from '../../widgets/mission/ActionMission';
import { InsightMission } from '../../widgets/mission/InsightMission';
import { StormMission } from '../../widgets/mission/StormMission';

const MissionPage = () => {
  const { missionType } = useParams<{ missionType: string }>();
  const navigate = useNavigate();
  
  const guardianType = (missionType?.toUpperCase() as GuardianType) || 'WARMTH';
  const [isCompleted, setIsCompleted] = useState(false);

  const handleComplete = () => {
    setIsCompleted(true);
    setTimeout(() => navigate('/profile'), 2500);
  };

  const missionTheme = {
    WARMTH: { color: 'pink', icon: Heart, title: "따뜻한 감사 기록", desc: "하루의 작은 온기를 찾아 기록해보세요.", glow: "from-pink-500/30 to-purple-500/10" },
    ACTION: { color: 'orange', icon: Zap, title: "내일의 실행 전략", desc: "복잡한 생각을 단순한 행동으로 바꿔봅시다.", glow: "from-orange-500/30 to-red-500/10" },
    INSIGHT: { color: 'blue', icon: Brain, title: "감정 구조화 설계", desc: "감정의 원인과 패턴을 객관적으로 분석합니다.", glow: "from-blue-500/30 to-cyan-500/10" },
    STORM: { color: 'red', icon: Flame, title: "감정 분출의 방", desc: "안전한 공간에서 억눌린 감정을 폭발시키세요.", glow: "from-red-600/40 to-orange-600/20" }
  }[guardianType];

  const Icon = missionTheme.icon;
  const themeColor = missionTheme.color;

  return (
    <SpaceBackground>
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] bg-gradient-radial ${missionTheme.glow} blur-[150px] opacity-50 pointer-events-none`} />

      <div className="flex flex-col h-screen w-full overflow-hidden relative z-10">
        
        <div className="flex-none p-6">
            <button onClick={() => navigate(-1)} className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-gray-400 hover:text-white">
                <ArrowLeft size={24} />
            </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-20 scrollbar-hide">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`flex flex-col max-w-4xl mx-auto w-full mt-4 mb-10 bg-black/40 backdrop-blur-xl border-2 border-${themeColor}-500/30 rounded-[3rem] shadow-[0_0_50px_rgba(0,0,0,0.3)] overflow-hidden relative min-h-[600px]`} // min-h 추가
            >
                <div className={`absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-${themeColor}-500/20 to-transparent opacity-70 pointer-events-none`} />

                {!isCompleted ? (
                    <div className="flex-1 flex flex-col p-8 md:p-12 relative z-10">
                        <div className="text-center mb-12 flex-none">
                            <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-${themeColor}-500/20 border border-${themeColor}-400/50 flex items-center justify-center shadow-[0_0_20px_currentColor] text-${themeColor}-400`}>
                                <Icon size={32} />
                            </div>
                            <h1 className={`text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-${themeColor}-200 to-white drop-shadow-lg`}>
                                {missionTheme.title}
                            </h1>
                            <p className="text-gray-300 mt-3 text-lg font-light tracking-wide">
                                {missionTheme.desc}
                            </p>
                        </div>

                        <div className="flex-1 w-full">
                            {guardianType === 'WARMTH' && <WarmthMission onComplete={handleComplete} />}
                            {guardianType === 'ACTION' && <ActionMission onComplete={handleComplete} />}
                            {guardianType === 'INSIGHT' && <InsightMission onComplete={handleComplete} />}
                            {guardianType === 'STORM' && <StormMission onComplete={handleComplete} />}
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-12 relative z-10">
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5 }} className="relative">
                            <div className={`absolute inset-0 bg-${themeColor}-500 rounded-full blur-xl opacity-50 animate-pulse`} />
                            <div className={`w-28 h-28 bg-gradient-to-br from-${themeColor}-400 to-${themeColor}-600 rounded-full flex items-center justify-center mb-8 shadow-[0_0_40px_currentColor] relative z-10 border-4 border-white/20`}>
                                <CheckCircle size={48} className="text-white" />
                            </div>
                        </motion.div>
                        <h2 className="text-4xl font-bold text-white mb-3 tracking-wider drop-shadow-lg">MISSION COMPLETE!</h2>
                        <p className={`text-xl text-${themeColor}-300 font-bold`}>완벽하게 해내셨습니다.</p>
                        <div className="mt-6 px-6 py-2 rounded-full bg-white/10 border border-white/20 text-white flex items-center gap-2">
                            <span className="text-yellow-400">✨</span> +50 EXP 획득
                        </div>
                    </div>
                )}
            </motion.div>
        </div>

      </div>
    </SpaceBackground>
  );
};

export default MissionPage;