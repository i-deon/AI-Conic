import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Map, ArrowRight, Activity, ShieldAlert } from 'lucide-react';

import { SpaceBackground } from '../../shared/ui/SpaceBackground';
import { generateMockReport} from '../../entities/report/report.model';
import type { AnalysisResult } from '../../entities/report/report.model';

import { ShadowBossCard } from '../../widgets/report/ShadowBossCard';

const AnalysisReportPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [report, setReport] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);

  const emotion = location.state?.emotion || "알 수 없는 감정";
  const chatGuardianId = location.state?.guardianId; 

  useEffect(() => {
    const timer = setTimeout(() => {
      setReport(generateMockReport(emotion));
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [emotion]);

  const missionType = chatGuardianId || report?.stats[0].type || 'WARMTH';

  if (loading) {
    return (
      <SpaceBackground>
        <div className="flex flex-col items-center justify-center h-full text-center z-10">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="w-20 h-20 border-4 border-t-purple-500 border-purple-900/50 rounded-full mb-8 shadow-[0_0_30px_rgba(168,85,247,0.4)]"
          />
          <h2 className="text-2xl text-white font-light animate-pulse mb-2">감정의 파편을 분석하고 있습니다...</h2>
          <p className="text-gray-500 text-sm font-mono">Deep Scanning: "{emotion}"</p>
        </div>
      </SpaceBackground>
    );
  }

  return (
    <SpaceBackground>
      <div className="flex flex-col h-full overflow-y-auto [&::-webkit-scrollbar]:hidden p-6 pb-20 max-w-5xl mx-auto w-full z-10">
        
        <header className="text-center mb-10 mt-6">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400 mb-3 inline-block">
              {report?.date} • SESSION COMPLETED
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 drop-shadow-lg">
              ANALYSIS REPORT
            </h1>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          <div className="flex flex-col items-center">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="w-full max-w-md"
            >
                <div className="flex items-center gap-2 mb-4 text-gray-400 text-sm font-bold uppercase tracking-wider">
                    <ShieldAlert size={16} className="text-red-400" />
                    Detected Anomaly (감지된 감정 악당)
                </div>
                {report && <ShadowBossCard boss={report.boss} />}
            </motion.div>
          </div>

          <div className="space-y-6">
            
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-900/60 border border-white/10 rounded-2xl p-6 backdrop-blur-sm"
            >
              <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-3">
                <Activity size={18} className="text-purple-400" />
                <h3 className="text-sm text-gray-300 font-bold">EMOTION COMPOSITION</h3>
              </div>
              
              <div className="space-y-4">
                {report?.stats.map((stat, idx) => (
                  <div key={stat.type}>
                    <div className="flex justify-between text-xs text-gray-300 mb-2 font-medium">
                      <span>{stat.type}</span>
                      <span>{stat.percentage}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${stat.percentage}%` }}
                        transition={{ duration: 1, delay: 0.6 + (idx * 0.1) }}
                        className={`h-full shadow-[0_0_10px_currentColor] ${
                          stat.type === 'STORM' ? 'bg-red-500 text-red-500' : 
                          stat.type === 'WARMTH' ? 'bg-pink-500 text-pink-500' : 
                          stat.type === 'ACTION' ? 'bg-orange-500 text-orange-500' : 'bg-blue-500 text-blue-500'
                        }`} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-2xl p-6 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="text-blue-400" size={20} />
                    <h3 className="text-blue-200 font-bold text-sm tracking-wide">RECOMMENDED MISSION</h3>
                </div>
                
                <p className="text-xl text-white font-semibold mb-6 leading-relaxed">
                    "{report?.mission}"
                </p>
                
                <button 
                    onClick={() => navigate(`/mission/${missionType}`)}
                    className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-900/50 flex items-center justify-center gap-2 group-hover:scale-[1.02]"
                >
                    <span>미션 수락하기 (+50 EXP)</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
                </button>
              </div>
            </motion.div>

          </div>
        </div>

        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-16 flex justify-center"
        >
          <button 
            onClick={() => navigate('/kingdom/select', { state: { emotion } })}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors px-8 py-3 rounded-full hover:bg-white/10 border border-transparent hover:border-white/20"
          >
            <Map size={18} />
            <span>왕국 지도로 복귀 (Return to Map)</span>
          </button>
        </motion.div>

      </div>
    </SpaceBackground>
  );
};

export default AnalysisReportPage;