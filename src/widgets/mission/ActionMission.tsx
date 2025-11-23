import { CheckSquare } from 'lucide-react';

export const ActionMission = ({ onComplete }: { onComplete: () => void }) => {
  return (
     <div className="bg-orange-900/20 border border-orange-500/30 rounded-2xl p-8 max-w-2xl mx-auto w-full mt-10">
        <h3 className="text-orange-200 mb-6 font-bold text-xl text-center">🔥 Priority Action List</h3>
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <div className="w-8 h-8 border-2 border-orange-500 rounded-lg flex items-center justify-center text-orange-500 font-bold">1</div>
                <input type="text" placeholder="가장 먼저 처리할 일 (딱 하나만!)" className="flex-1 bg-black/40 rounded-xl px-4 py-3 text-white border border-transparent focus:border-orange-500 outline-none transition-all" />
            </div>
            <div className="flex items-center gap-4 opacity-60">
                <div className="w-8 h-8 border-2 border-gray-500 rounded-lg flex items-center justify-center text-gray-500 font-bold">2</div>
                <input type="text" placeholder="그 다음에 할 일" className="flex-1 bg-black/40 rounded-xl px-4 py-3 text-white border border-transparent outline-none" />
            </div>
        </div>
        <button onClick={onComplete} className="w-full py-4 mt-10 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-full shadow-lg transition-all flex items-center justify-center gap-2">
         <CheckSquare size={20} /> 계획 확정하기
        </button>
     </div>
  );
};