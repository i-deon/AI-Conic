import { motion } from 'framer-motion';

interface SliderProps {
  label: string;
  icon: string;
  value: number; 
  onChange: (value: number) => void;
}

export const Slider = ({ label, icon, value, onChange }: SliderProps) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between text-white mb-2">
        <span className="flex items-center gap-2 font-bold">
          <span>{icon}</span> {label}
        </span>
        <span className="font-bold">{value}%</span>
      </div>
      
      <div className="relative w-full h-3 bg-purple-900/50 rounded-full">
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-600 to-pink-500 rounded-full"
          style={{ width: `${value}%` }}
        />
        <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-pink-300 rounded-full shadow-[0_0_10px_#d8b4fe] border-2 border-purple-500 cursor-grab active:cursor-grabbing"
            style={{ left: `calc(${value}% - 10px)` }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }} 
            dragElastic={0}
            dragMomentum={false}
        />
        
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
      </div>
    </div>
  );
};