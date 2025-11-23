import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, Book, ArrowLeft } from 'lucide-react';

import { SpaceBackground } from '../../shared/ui/SpaceBackground';
import { ChatWindow } from '../../widgets/chat/ChatWindow';
import { StoryModal } from '../../widgets/story/StoryModal';
import { GUARDIANS } from '../../entities/guardian/guardian.data';
import type { GuardianType } from '../../entities/guardian/guardian.data';

const KingdomChatPage = () => {
  const { kingdomId } = useParams<{ kingdomId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [isStoryOpen, setIsStoryOpen] = useState(false);

  const guardianType = (kingdomId as GuardianType) || 'WARMTH';
  const guardian = GUARDIANS[guardianType];
  const emotion = location.state?.emotion || "복잡한 마음";

  const handleEndSession = () => {
    if (window.confirm("탐험을 종료하고 감정 분석 리포트를 생성할까요?")) {
      navigate('/report', { 
          state: { 
              emotion, 
              guardianId: guardian.id 
          } 
      });
    }
  };

  useEffect(() => {
    if (!guardian) {
      navigate('/portal');
    }
  }, [guardian, navigate]);

  if (!guardian) return null;

  return (
    <SpaceBackground>
      <div className={`absolute inset-0 bg-gradient-to-b ${guardian.bgGradient} opacity-20 pointer-events-none`} />

      {/* 전체 레이아웃 컨테이너 */}
      <div className="fixed inset-0 flex flex-col z-10 w-full h-[100dvh]">
        
        {/* 1. 상단 헤더 */}
        <header className="flex-none flex items-center justify-between px-4 py-4 border-b border-white/10 bg-black/20 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            
            <button 
                onClick={() => navigate('/kingdom/select', { state: { emotion } })} // 감정 상태 유지하며 뒤로가기
                className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors mr-1"
            >
                <ArrowLeft size={20} />
            </button>

            {/* 캐릭터 프로필 */}
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${guardian.color} bg-black/50 overflow-hidden`}>
               {guardian.imageSrc ? (
                 <img src={guardian.imageSrc} alt={guardian.name} className="w-full h-full object-cover" />
               ) : (
                 guardian.name[0]
               )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className={`font-bold text-lg ${guardian.color}`}>{guardian.title}</h1>
                <button 
                  onClick={() => setIsStoryOpen(true)}
                  className="p-1.5 bg-white/10 hover:bg-white/20 rounded-full text-gray-300 hover:text-white transition-colors"
                  title="수호자 이야기 보기"
                >
                  <Book size={14} />
                </button>
              </div>
              <p className="text-xs text-gray-400">수호자 {guardian.name}</p>
            </div>
          </div>
          
          <button 
            onClick={handleEndSession}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold bg-white/10 hover:bg-red-500/20 border border-white/20 hover:border-red-400 rounded-full text-white transition-all group"
          >
            <LogOut size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            세션 종료
          </button>
        </header>

        {/* 2. 채팅 위젯 영역 */}
        <div className="flex-1 relative overflow-hidden flex flex-col w-full">
            <ChatWindow guardian={guardian} initialEmotion={emotion} />
        </div>

      </div>

      {/* 3. 스토리 모달 */}
      <StoryModal 
        guardian={guardian} 
        isOpen={isStoryOpen} 
        onClose={() => setIsStoryOpen(false)} 
      />
      
    </SpaceBackground>
  );
};

export default KingdomChatPage;