import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, BookOpen } from 'lucide-react';
import type { Guardian } from '../../entities/guardian/guardian.data';

interface StoryModalProps {
  guardian: Guardian;
  isOpen: boolean;
  onClose: () => void;
}

export const StoryModal = ({ guardian, isOpen, onClose }: StoryModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-md bg-gray-900 border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] relative max-h-[80vh] flex flex-col`}
            >
              <div className={`h-32 bg-gradient-to-b ${guardian.bgGradient} relative flex items-end p-6 shrink-0`}>
                <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white bg-black/20 rounded-full p-1 transition-colors">
                  <X size={20} />
                </button>
                <div>
                  <div className="flex items-center gap-2 text-white/80 text-sm font-bold mb-1 uppercase tracking-widest">
                    <BookOpen size={14} />
                    Guardian Story
                  </div>
                  <h2 className="text-3xl font-bold text-white">{guardian.name}</h2>
                </div>
              </div>

              <div className="p-6 space-y-4 overflow-y-auto custom-scrollbar">
                {guardian.stories?.map((story, idx) => (
                  <div 
                    key={idx} 
                    className={`p-4 rounded-xl border transition-all ${
                      story.isLocked 
                        ? 'bg-black/40 border-white/5 opacity-60' 
                        : 'bg-white/5 border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className={`font-bold text-lg ${story.isLocked ? 'text-gray-500' : 'text-white'}`}>
                         {story.title}
                      </h3>
                      {story.isLocked && <Lock size={14} className="text-gray-500" />}
                    </div>

                    {!story.isLocked && story.image && (
                      <div className="mb-4 rounded-lg overflow-hidden border border-white/10 shadow-lg">
                        <img src={story.image} alt="Story Visual" className="w-full h-auto object-cover" />
                      </div>
                    )}
                    
                    <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
                      {story.isLocked ? "친밀도를 높여 이야기를 해금하세요." : story.content}
                    </p>
                    
                    {story.isLocked && (
                      <div className="mt-3 text-xs text-purple-400 bg-purple-900/20 px-2 py-1 rounded inline-block border border-purple-500/30">
                        Required LV.{story.level}
                      </div>
                    )}
                  </div>
                ))}
              </div>

            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};