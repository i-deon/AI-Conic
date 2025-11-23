import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MessageCircle, Lock, BookOpen, Shield, Zap } from 'lucide-react';
import { SpaceBackground } from '../../shared/ui/SpaceBackground';
import { GUARDIANS} from '../../entities/guardian/guardian.data';
import type {  GuardianType } from '../../entities/guardian/guardian.data';

const GuardianCodexPage = () => {
  const { guardianId } = useParams<{ guardianId: string }>();
  const navigate = useNavigate();
  
  const guardian = GUARDIANS[guardianId as GuardianType];

  if (!guardian) return <div>Not Found</div>;

  // 친밀도 퍼센트 계산
  const affinityPercent = (guardian.affinityLevel / 5) * 100;
  // 해금된 스토리 개수 계산
  const unlockedStoriesCount = guardian.stories.filter(s => !s.isLocked).length;
  const totalStoriesCount = guardian.stories.length;

  return (
    <SpaceBackground>
      {/* 전체 컨테이너 */}
      <div className="flex flex-col h-screen w-full overflow-hidden relative z-10">
        
        {/* 1. 헤더 (고정) */}
        <div className="flex-none flex items-center justify-between p-6 bg-gradient-to-b from-[#0B1026] to-transparent z-20">
          <button 
            onClick={() => navigate(-1)}
            className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all hover:scale-105"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="text-center">
            <h1 className="text-lg font-bold text-white tracking-[0.2em] uppercase">Guardian Codex</h1>
            <p className="text-[10px] text-gray-400">CLASSIFIED ARCHIVE</p>
          </div>
          <div className="w-10" />
        </div>

        {/* 2. 메인 컨텐츠 (2단 레이아웃) */}
        <div className="flex-1 flex flex-col lg:flex-row max-w-6xl mx-auto w-full h-full overflow-hidden pb-10 px-6 gap-8">
          
          {/* [좌측] 캐릭터 비주얼 & 스탯 (모바일에서는 위, PC에서는 왼쪽 고정) */}
          <div className="lg:w-1/3 flex flex-col items-center lg:justify-center shrink-0 overflow-y-auto lg:overflow-visible [&::-webkit-scrollbar]:hidden">
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative group"
            >
                <div className={`absolute inset-0 bg-${guardian.bgColor} blur-[80px] opacity-20 rounded-full group-hover:opacity-30 transition-opacity duration-500`} />
                
                {/* 캐릭터 이미지 프레임 */}
                <div className={`relative w-64 h-64 md:w-80 md:h-80 rounded-full border-2 border-${guardian.bgColor}/50 p-2 shadow-[0_0_30px_rgba(0,0,0,0.5)] bg-black/20 backdrop-blur-sm`}>
                    <div className={`w-full h-full rounded-full overflow-hidden border border-white/10 relative`}>
                        <img src={guardian.imageSrc} alt={guardian.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
                    </div>
                    
                    <div className={`absolute bottom-4 right-4 bg-black/80 border border-${guardian.bgColor} text-white px-4 py-1 rounded-full flex items-center gap-2 shadow-lg`}>
                        <Shield size={14} className={`text-${guardian.bgColor.split('-')[0]}-400`} />
                        <span className="text-sm font-bold">LV.{guardian.affinityLevel}</span>
                    </div>
                </div>
            </motion.div>

            <div className="mt-8 text-center w-full max-w-xs">
                <h2 className={`text-4xl font-bold text-white mb-2 drop-shadow-lg ${guardian.color}`}>{guardian.name}</h2>
                <p className="text-gray-400 text-sm tracking-wider uppercase mb-6">{guardian.title}</p>

                {/* 친밀도 바 */}
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-md w-full">
                    <div className="flex justify-between text-xs text-gray-300 mb-2">
                        <span className="flex items-center gap-1"><Zap size={12} className="text-yellow-400"/> SYNC RATE</span>
                        <span className="font-mono text-${guardian.bgColor}">{Math.round(affinityPercent)}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${affinityPercent}%` }}
                            transition={{ duration: 1.5, ease: "circOut" }}
                            className={`h-full bg-${guardian.bgColor} shadow-[0_0_10px_currentColor]`}
                        />
                    </div>
                </div>

                {/* 채팅 버튼 */}
                <button 
                    onClick={() => navigate(`/chat/${guardian.id}`)}
                    className={`mt-4 w-full py-3 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2 transition-all hover:brightness-110 shadow-lg bg-${guardian.bgColor}`}
                >
                    <MessageCircle size={18} />
                    <span>통신 연결 (Connect)</span>
                </button>
            </div>
          </div>

          {/* [우측] 스토리 아카이브 (스크롤 영역) */}
          <div className="flex-1 h-full overflow-y-auto [&::-webkit-scrollbar]:hidden pb-20">
             <div className="lg:pt-10 space-y-6 pl-2 pr-2">
                
                <div className="flex items-center justify-between mb-6 sticky top-0 bg-[#0B1026]/90 backdrop-blur-md py-4 z-10 border-b border-white/5">
                    <div className="flex items-center gap-2 text-white font-bold text-xl">
                        <BookOpen size={24} className={`text-${guardian.bgColor.split('-')[0]}-400`} />
                        <span>Memory Archive</span>
                    </div>
                    <span className="text-xs text-gray-500 border border-white/10 px-3 py-1 rounded-full">
                        {unlockedStoriesCount} / {totalStoriesCount} Unlocked
                    </span>
                </div>

                {guardian.stories.map((story, idx) => (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        key={idx} 
                        className={`relative rounded-2xl border overflow-hidden transition-all duration-300 group
                            ${story.isLocked 
                                ? 'bg-black/40 border-white/5' 
                                : `bg-gradient-to-br from-white/5 to-transparent border-${guardian.bgColor}/30 hover:border-${guardian.bgColor}/60 hover:shadow-[0_0_20px_rgba(0,0,0,0.3)]`
                            }`}
                    >
                        {story.isLocked && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-[2px] z-10">
                                <div className="w-12 h-12 rounded-full bg-black/50 border border-white/10 flex items-center justify-center mb-2">
                                    <Lock size={20} className="text-gray-500" />
                                </div>
                                <span className="text-xs text-gray-500 font-mono tracking-widest uppercase">Memory Sealed</span>
                                <span className={`text-[10px] text-${guardian.bgColor.split('-')[0]}-400 mt-1 border border-${guardian.bgColor}/30 px-2 py-0.5 rounded`}>
                                    LV.{story.level} Required
                                </span>
                            </div>
                        )}

                        <div className={`p-6 ${story.isLocked ? 'opacity-30 blur-[1px]' : ''}`}>
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <span className={`text-[10px] font-bold tracking-widest uppercase mb-1 block ${story.isLocked ? 'text-gray-600' : `text-${guardian.bgColor.split('-')[0]}-400`}`}>
                                        Chapter 0{idx + 1}
                                    </span>
                                    <h3 className="text-xl font-bold text-white">{story.title}</h3>
                                </div>
                            </div>

                            {story.image && (
                                <div className="mb-4 rounded-lg overflow-hidden border border-white/10 aspect-video relative">
                                    <img src={story.image} alt="Story Visual" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                </div>
                            )}
                            
                            <p className="text-sm text-gray-300 leading-7 whitespace-pre-wrap font-light">
                                {story.content}
                            </p>
                        </div>
                        
                        {!story.isLocked && (
                            <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-${guardian.bgColor}/20 to-transparent blur-2xl -z-10`} />
                        )}
                    </motion.div>
                ))}
             </div>
          </div>

        </div>
      </div>
    </SpaceBackground>
  );
};

export default GuardianCodexPage;