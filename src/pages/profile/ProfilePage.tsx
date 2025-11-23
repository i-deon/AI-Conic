import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Activity } from 'lucide-react';
import { SpaceBackground } from '../../shared/ui/SpaceBackground';
import { MOCK_USER } from '../../entities/user/user.model';

import { UserProfileCard } from '../../widgets/profile/UserProfileCard';
import { EQStatsCard } from '../../widgets/profile/EQStatsCard';
import { ShadowBossCollection } from '../../widgets/profile/ShadowBossCollection';

const ProfilePage = () => {
  const navigate = useNavigate();
  const user = MOCK_USER;

  return (
    <SpaceBackground>
      <div className="flex flex-col h-full w-full relative">

        <div className="absolute top-0 left-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/5">
          <div className="flex items-center gap-4 p-6 max-w-5xl mx-auto">
            <button 
              onClick={() => navigate('/')}
              className="p-2.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors border border-transparent hover:border-white/20"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-xl font-bold text-white tracking-wide">MY PROFILE</h1>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden p-6 pt-28 pb-20">
          <div className="max-w-5xl mx-auto w-full relative z-10">
            
            <UserProfileCard user={user} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <EQStatsCard stats={user.eqStats} />
                
                <div className="bg-black/40 border border-white/10 rounded-3xl p-8 h-full backdrop-blur-md min-h-[300px]">
                    <h3 className="text-lg font-bold text-white mb-6 border-b border-white/5 pb-4 flex items-center gap-2">
                        <Activity size={18} className="text-green-400" />
                        최근 활동 기록
                    </h3>
                    <div className="space-y-6 pl-2">
                        <div className="relative pl-6 border-l border-white/10 pb-6">
                            <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_10px_#a855f7]" />
                            <span className="text-xs text-gray-500 block mb-1">오늘 14:30</span>
                            <p className="text-sm text-white font-bold">'불안의 안개유령' 처치 완료</p>
                            <span className="text-xs text-purple-300">+50 EXP</span>
                        </div>
                        <div className="relative pl-6 border-l border-white/10 opacity-50">
                            <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-gray-500" />
                            <span className="text-xs text-gray-500 block mb-1">어제 09:00</span>
                            <p className="text-sm text-white font-bold">루미와 대화: '걱정'</p>
                            <span className="text-xs text-gray-400">친밀도 상승</span>
                        </div>
                    </div>
                </div>
            </div>

            <ShadowBossCollection bosses={user.collectedBosses} />
            
          </div>
        </div>

      </div>
    </SpaceBackground>
  );
};

export default ProfilePage;