import { Search } from 'lucide-react';

export const InsightMission = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <div className="grid gap-6 max-w-2xl mx-auto w-full mt-6">
        <div className="bg-blue-900/20 border border-blue-500/30 p-6 rounded-2xl">
            <label className="text-blue-300 text-sm font-bold flex items-center gap-2"><Search size={14}/> TRIGGER (원인)</label>
            <textarea className="w-full bg-transparent mt-3 text-white text-base outline-none resize-none h-20 placeholder-gray-600" placeholder="무엇이 감정을 유발했나요?" />
        </div>
        <div className="bg-blue-900/20 border border-blue-500/30 p-6 rounded-2xl">
            <label className="text-blue-300 text-sm font-bold">REACTION (반응)</label>
            <textarea className="w-full bg-transparent mt-3 text-white text-base outline-none resize-none h-20 placeholder-gray-600" placeholder="나는 어떻게 반응했나요?" />
        </div>
        <button onClick={onComplete} className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full shadow-lg transition-all">
         분석 완료 및 저장
        </button>
    </div>
  );
};