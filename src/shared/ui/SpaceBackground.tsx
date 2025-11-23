import { motion } from 'framer-motion';
import React from 'react';

const Star = ({ delay, size }: { delay: number; size: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 1.2, 1, 0.8] }}
    transition={{
      duration: Math.random() * 4 + 3,
      repeat: Infinity,
      delay: delay,
      ease: "easeInOut"
    }}
    style={{
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      width: size,
      height: size,
    }}
    className="absolute bg-white rounded-full shadow-[0_0_2px_rgba(255,255,255,0.9)]"
  />
);

export const SpaceBackground = ({ children }: { children: React.ReactNode }) => {
  const stars = Array.from({ length: 50 }).map((_, i) => (
    <Star key={i} delay={Math.random() * 5} size={Math.random() > 0.9 ? 2.5 : 1.5} />
  ));

  return (
    <div className="relative w-full h-screen bg-atlas-bg overflow-hidden text-white font-sans">
      
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#0B1026] to-[#020617] z-0" />
      
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none" 
        style={{ 
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', 
            backgroundSize: '80px 80px' 
        }} 
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] border border-white/5 rounded-full pointer-events-none" />

      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-atlas-blue/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-atlas-gold/5 rounded-full blur-[100px]" />

      <div className="absolute inset-0 z-0">
        {stars}
      </div>

      <div className="relative z-10 w-full h-full flex flex-col">
        {children}
      </div>
    </div>
  );
};