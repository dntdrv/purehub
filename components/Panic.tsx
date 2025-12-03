import React, { useState, useEffect } from 'react';
import { PANIC_QUOTES } from '../services/content';
import { X, Zap } from 'lucide-react';

interface PanicProps {
  onClose: () => void;
}

const Panic: React.FC<PanicProps> = ({ onClose }) => {
  const [advice, setAdvice] = useState("");
  const [breathingStep, setBreathingStep] = useState(0);

  useEffect(() => {
    // Random quote from static list
    setAdvice(PANIC_QUOTES[Math.floor(Math.random() * PANIC_QUOTES.length)]);

    const breathInterval = setInterval(() => {
        setBreathingStep(prev => (prev + 1) % 3);
    }, 4000); 

    return () => clearInterval(breathInterval);
  }, []);

  const getBreathText = () => {
      if (breathingStep === 0) return "Inhale";
      if (breathingStep === 1) return "Hold";
      return "Exhale";
  }

  const getBreathScale = () => {
      if (breathingStep === 0) return "scale-150";
      if (breathingStep === 1) return "scale-150";
      return "scale-100";
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#001d36] flex flex-col items-center justify-center p-6 text-white">
      <button 
        onClick={onClose} 
        className="absolute top-8 right-8 p-4 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
      >
        <X className="w-8 h-8" />
      </button>

      <div className="w-full max-w-md space-y-16 text-center flex flex-col items-center">
        
        {/* Breathing Circle */}
        <div className="relative flex items-center justify-center h-64 w-64">
            <div className={`absolute w-40 h-40 bg-[#d1e4ff]/20 rounded-full blur-2xl transition-transform duration-[4000ms] ease-in-out ${getBreathScale()}`}></div>
            <div className={`absolute w-32 h-32 border-[6px] border-[#d1e4ff]/40 rounded-full transition-transform duration-[4000ms] ease-in-out ${getBreathScale()}`}></div>
            <span className="relative z-10 text-3xl font-light tracking-[0.2em] uppercase text-[#d1e4ff]">
                {getBreathText()}
            </span>
        </div>

        <div className="space-y-6">
            <Zap className="w-10 h-10 text-yellow-400 mx-auto" />
            <h2 className="text-2xl font-serif leading-relaxed px-4">
                "{advice}"
            </h2>
        </div>

        <button 
            onClick={onClose}
            className="w-full max-w-xs bg-[#d1e4ff] text-[#001d36] py-5 rounded-[24px] font-bold text-xl hover:bg-white transition-colors"
        >
            I am Ready
        </button>
      </div>
    </div>
  );
};

export default Panic;
