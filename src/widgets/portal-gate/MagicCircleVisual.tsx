import { motion } from 'framer-motion';

export const MagicCircleVisual = ({ isSubmitting }: { isSubmitting: boolean }) => {
  return (
    <div className="relative flex items-center justify-center w-[300px] h-[300px] md:w-[400px] md:h-[400px] opacity-80 pointer-events-none">
      <motion.div
        animate={{ rotate: 360, scale: isSubmitting ? [1, 1.1, 1] : 1 }}
        transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, scale: { duration: 1, repeat: Infinity } }}
        className={`absolute inset-0 rounded-full border border-dashed border-opacity-30 
          ${isSubmitting ? 'border-pink-400 shadow-[0_0_50px_#f87171]' : 'border-purple-500 shadow-[0_0_30px_#a855f7]'}`}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute inset-8 rounded-full border-2 border-dotted border-blue-400/20"
      />
      <motion.div
        animate={{ rotate: 180 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute inset-16 rounded-full border-t-2 border-b-2 border-neon-purple/30"
      />
      <div className={`absolute w-20 h-20 rounded-full bg-purple-500/20 blur-xl ${isSubmitting ? 'animate-pulse bg-pink-500/30' : ''}`} />
    </div>
  );
};