import React, { useState, useEffect } from 'react';

interface IntroScreenProps {
  onEnter: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onEnter }) => {
  const [stage, setStage] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  // Sequence the appearance of text elements
  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 800),  // Year
      setTimeout(() => setStage(2), 1800), // Season
      setTimeout(() => setStage(3), 2800), // Title
      setTimeout(() => setStage(4), 3800), // Button
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleEnter = () => {
    setIsFadingOut(true);
    setTimeout(onEnter, 1000); // Wait for fade out animation
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-[#1a1510] text-[#dcd6c8] font-serif overflow-hidden transition-opacity duration-1000 ${isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      
      {/* Background Texture (Subtle Noise) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
      
      {/* Container */}
      <div className="relative w-full h-full max-w-4xl mx-auto p-12 flex flex-col items-center justify-center">
        
        {/* Right Vertical Text: Year */}
        <div className={`absolute top-20 right-10 md:right-20 writing-vertical text-xl md:text-2xl tracking-[0.5em] text-white/40 transition-all duration-1000 ${stage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          光武 九年
        </div>

        {/* Left Vertical Text: Season */}
        <div className={`absolute bottom-20 left-10 md:left-20 writing-vertical text-xl md:text-2xl tracking-[0.5em] text-white/40 transition-all duration-1000 delay-300 ${stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          乙巳年 秋
        </div>

        {/* Center Title */}
        <div className={`text-center transition-all duration-1000 transform ${stage >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 blur-sm'}`}>
          <h1 className="text-7xl md:text-9xl font-black mb-6 tracking-tighter text-[#e8e4d9] drop-shadow-2xl">
            四 月
          </h1>
          <p className="text-sm md:text-lg text-white/50 tracking-[0.3em] font-light">
            잊혀진 계절의 기록
          </p>
        </div>

        {/* Enter Button (Stamp Style) */}
        <div className={`absolute bottom-32 transition-all duration-1000 ${stage >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <button 
            onClick={handleEnter}
            className="group relative px-8 py-3 overflow-hidden rounded border border-[#a84a3e]/30 hover:border-[#a84a3e] transition-colors duration-500"
          >
            <span className="absolute inset-0 w-full h-full bg-[#a84a3e]/10 group-hover:bg-[#a84a3e]/20 transition-colors duration-500"></span>
            <span className="relative text-[#a84a3e] font-bold tracking-widest text-lg group-hover:text-[#c45d50] transition-colors">
              기억 펼치기
            </span>
            {/* Corner decors */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#a84a3e]"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#a84a3e]"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#a84a3e]"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#a84a3e]"></div>
          </button>
        </div>

      </div>

      <style>{`
        .writing-vertical {
          writing-mode: vertical-rl;
          text-orientation: upright;
        }
      `}</style>
    </div>
  );
};

export default IntroScreen;
