import React, { useState } from 'react';
import { BookOpen, Image as ImageIcon, X, Lock, ChevronLeft, ChevronRight } from 'lucide-react';

type Mode = 'menu' | 'diary' | 'photo';

const PHOTOS = [
    { id: 'p1', url: 'https://i.postimg.cc/3Jdxz9RB/80.png', desc: "아씨께서 몰래 찍으신 사진...", rotate: 'rotate-1' },
    { id: 'p2', url: 'https://i.postimg.cc/Cx8Lx1bg/81.png', desc: "가을의 나", rotate: '-rotate-2' },
    { id: 'p3', url: 'https://i.postimg.cc/RZtVZFw4/82.png', desc: "으으 부끄러워유", rotate: 'rotate-3' },
    { id: 'p4', url: 'https://i.postimg.cc/g2hk2J3p/83.png', desc: "겨울의 나... 추워", rotate: '-rotate-1' },
    { id: 'p5', url: 'https://i.postimg.cc/4xcNxdpf/84.png', desc: "노란 나비! 음청 신기해유", rotate: 'rotate-2' },
];

const DIARY_ENTRIES = [
    {
        id: 'd1',
        date: '1903年 1月 3日',
        content: `성년이 되는 해. 나리께서 밤에 불러 가보니, 온 세상이 캄캄했다.\n나의 흰 색이 검은 색으로 물드는 날.`,
        hiddenText: "살고싶지 않아",
        isTrauma: true
    },
    {
        id: 'd2',
        date: '1904年 4月 15日',
        content: `어여쁜 아씨께서 버려진 날 거둬주셨다.\n머리칼은 왜 저리 이쁘대? 반할 것 같다.`,
        isTrauma: false
    },
    {
        id: 'd3',
        date: '1904年 4月 16日',
        content: `아씨께서 내 이름을 붙여주셨다! 사월, 나의 이름은 사월.\n아아, 기쁘다. 평생 간직할 소중한 이름.`,
        isTrauma: false
    },
    {
        id: 'd4',
        date: '1904年 6月 20日',
        content: `여름에 고뿔이라니, 아씨께서 고뿔에 걸리셨다.\n나는 고뿔이 너무 싫다. 기침을 하면 모두가 떠나가니까.\n하지만 나는 아씨의 곁을 지킬 것이다. 귀한 약재를 구해야 겠다.`,
        isTrauma: false
    },
    {
        id: 'd5',
        date: '1904年 12月 20日',
        content: `으 추워버라. 아씨의 볼과 코가 붉어진 게 너무...\n이 감정은 뭘까. 심장이 두근거린다. 나쁜 감정.`,
        isTrauma: false
    }
];

const SecretStash: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<Mode>('menu');
  
  // Diary State
  const [currentDiaryIdx, setCurrentDiaryIdx] = useState(0);
  
  // Photo Album State
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0);

  const openStash = () => {
    setIsOpen(true);
    setMode('menu');
  };

  const closeStash = () => {
    setIsOpen(false);
    setMode('menu');
    setCurrentDiaryIdx(0); // Reset diary to beginning
  };

  const nextPhoto = () => {
    if (currentPhotoIdx < PHOTOS.length - 1) {
        setCurrentPhotoIdx(prev => prev + 1);
    }
  };

  const prevPhoto = () => {
    if (currentPhotoIdx > 0) {
        setCurrentPhotoIdx(prev => prev - 1);
    }
  };

  const nextDiary = () => {
    if (currentDiaryIdx < DIARY_ENTRIES.length - 1) {
        setCurrentDiaryIdx(prev => prev + 1);
    }
  };

  const prevDiary = () => {
    if (currentDiaryIdx > 0) {
        setCurrentDiaryIdx(prev => prev - 1);
    }
  };

  const currentDiary = DIARY_ENTRIES[currentDiaryIdx];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-serif">
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-hanji border-2 border-wood shadow-2xl rounded-lg overflow-hidden flex flex-col h-[550px] animate-[slideUp_0.3s_ease-out] relative">
            
            {/* Background Texture for the container */}
            <div className="absolute inset-0 bg-paper-pattern opacity-50 pointer-events-none"></div>

            {/* Header */}
            <div className="bg-wood text-hanji p-3 flex justify-between items-center z-10 shadow-md shrink-0">
                <div className="flex items-center gap-2">
                <Lock size={14} className="text-wood-light" />
                <span className="font-bold text-sm tracking-widest">사월의 비밀 상자</span>
                </div>
                <button onClick={closeStash} className="hover:text-denggi transition-colors">
                <X size={18} />
                </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-hidden p-6 relative z-10 flex flex-col justify-center items-center">
                
                {/* MENU MODE */}
                {mode === 'menu' && (
                    <div className="grid grid-cols-1 gap-4 w-full px-4 animate-[fadeIn_0.3s]">
                        <button 
                            onClick={() => setMode('diary')}
                            className="group flex flex-col items-center justify-center p-6 bg-white/60 border border-wood/20 rounded hover:bg-wood/10 hover:border-wood transition-all"
                        >
                            <BookOpen size={32} className="text-wood mb-3 group-hover:scale-110 transition-transform" />
                            <span className="font-bold text-wood">일기장 훔쳐보기</span>
                            <span className="text-xs text-ink/50 mt-1">1903년부터의 기록들</span>
                        </button>

                        <button 
                            onClick={() => setMode('photo')}
                            className="group flex flex-col items-center justify-center p-6 bg-white/60 border border-wood/20 rounded hover:bg-wood/10 hover:border-wood transition-all"
                        >
                            <ImageIcon size={32} className="text-denggi mb-3 group-hover:scale-110 transition-transform" />
                            <span className="font-bold text-denggi">사진 훔쳐보기</span>
                            <span className="text-xs text-ink/50 mt-1">품 속에 간직한 5장의 사진</span>
                        </button>
                    </div>
                )}

                {/* DIARY MODE */}
                {mode === 'diary' && (
                    <div className="w-full h-full flex flex-col animate-[fadeIn_0.5s]">
                        <div className={`flex-1 p-6 shadow-inner relative custom-scrollbar overflow-hidden transition-all duration-500 border border-wood/10
                            ${currentDiary.isTrauma ? 'bg-black/10' : 'bg-white/40'}
                        `}>
                             {/* Vertical writing line guides */}
                             <div className="absolute inset-0 pointer-events-none opacity-10" style={{ backgroundImage: 'linear-gradient(to right, transparent 95%, #5c4033 95%)', backgroundSize: '40px 100%' }}></div>
                             
                             {/* Trauma Effects */}
                             {currentDiary.isTrauma && (
                                <>
                                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-felt.png')] opacity-30 pointer-events-none mix-blend-multiply"></div>
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-black/20 to-transparent blur-xl pointer-events-none"></div>
                                    <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none"></div>
                                </>
                             )}

                             <div className="relative h-full flex flex-col">
                                 <div className={`text-right text-sm mb-6 border-b pb-2 tracking-widest font-serif
                                     ${currentDiary.isTrauma ? 'text-wood-light/60 border-wood/20' : 'text-wood/60 border-wood/20'}
                                 `}>
                                     {currentDiary.date}
                                 </div>
                                 
                                 <p className={`leading-loose whitespace-pre-wrap font-serif text-lg transition-all duration-700
                                    ${currentDiary.isTrauma 
                                        ? 'text-ink/60 blur-[0.5px] scale-[0.98] translate-x-1 font-light italic' 
                                        : 'text-ink/80'}
                                 `}>
                                     {currentDiary.content}
                                 </p>

                                 {currentDiary.hiddenText && (
                                     <div className="absolute bottom-4 right-2 transform rotate-2">
                                         <span className="font-serif text-xs text-red-900/40 tracking-widest blur-[1px] select-none font-bold">
                                             {currentDiary.hiddenText}
                                         </span>
                                     </div>
                                 )}
                             </div>
                        </div>

                        {/* Controls */}
                        <div className="mt-4 flex justify-between items-center px-2 shrink-0">
                            <button 
                                onClick={prevDiary} 
                                disabled={currentDiaryIdx === 0}
                                className="p-2 text-wood hover:bg-wood/10 rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronLeft size={20} />
                            </button>

                            <div className="text-xs text-wood/40 font-mono">
                                {currentDiaryIdx + 1} / {DIARY_ENTRIES.length}
                            </div>

                            <button 
                                onClick={nextDiary}
                                disabled={currentDiaryIdx === DIARY_ENTRIES.length - 1}
                                className="p-2 text-wood hover:bg-wood/10 rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                        
                        <div className="text-center mt-2">
                             <button onClick={() => setMode('menu')} className="text-xs text-wood/60 hover:text-wood underline">
                                &larr; 덮어두기
                            </button>
                        </div>
                    </div>
                )}

                {/* PHOTO MODE */}
                {mode === 'photo' && (
                    <div className="w-full h-full flex flex-col items-center justify-between animate-[fadeIn_0.5s]">
                        
                        {/* Photo Display Area */}
                        <div className="relative w-full flex-1 flex items-center justify-center perspective-1000">
                             {PHOTOS.map((photo, index) => {
                                 const isCurrent = index === currentPhotoIdx;
                                 const isPrev = index < currentPhotoIdx;
                                 const isNext = index > currentPhotoIdx;
                                 
                                 // Stack logic
                                 if (index > currentPhotoIdx + 1 || index < currentPhotoIdx - 1) return null; // Only render adjacent for performance

                                 return (
                                    <div 
                                        key={photo.id}
                                        className={`absolute transition-all duration-500 ease-in-out transform
                                            ${isCurrent ? `z-20 scale-100 opacity-100 ${photo.rotate}` : ''}
                                            ${isPrev ? 'z-10 -translate-x-full rotate-[-20deg] opacity-0' : ''}
                                            ${isNext ? 'z-10 translate-x-12 rotate-[5deg] scale-90 opacity-0' : ''} // Hidden but ready
                                        `}
                                    >
                                        <div className="bg-white p-3 shadow-xl border border-gray-200 w-56 group cursor-pointer">
                                            <div className="w-full h-64 bg-gray-200 overflow-hidden relative">
                                                <img 
                                                    src={photo.url} 
                                                    alt="사월이의 사진" 
                                                    className="w-full h-full object-cover grayscale brightness-90 contrast-125 group-hover:grayscale-0 group-hover:brightness-100 group-hover:contrast-100 transition-all duration-[3000ms] ease-in-out"
                                                />
                                                <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_40px_rgba(0,0,0,0.3)]"></div>
                                                <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/dust.png')]"></div>
                                            </div>
                                            <div className="mt-3 text-center min-h-[1.5rem]">
                                                <span className="font-handwriting text-wood/80 text-sm italic font-bold">
                                                    "{photo.desc}"
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                 );
                             })}
                        </div>

                        {/* Navigation Controls */}
                        <div className="w-full flex justify-between items-center px-4 mt-2 shrink-0">
                            <button 
                                onClick={prevPhoto} 
                                disabled={currentPhotoIdx === 0}
                                className="p-2 rounded-full hover:bg-wood/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-wood"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            
                            <div className="text-xs text-wood/40 font-mono">
                                {currentPhotoIdx + 1} / {PHOTOS.length}
                            </div>

                            <button 
                                onClick={nextPhoto}
                                disabled={currentPhotoIdx === PHOTOS.length - 1}
                                className="p-2 rounded-full hover:bg-wood/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-wood"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </div>

                        <button onClick={() => setMode('menu')} className="mt-4 text-xs text-wood/60 hover:text-wood underline shrink-0">
                            제자리에 돌려놓기
                        </button>
                    </div>
                )}
            </div>
        </div>
      )}

      {!isOpen && (
        <button 
            onClick={openStash}
            className="group flex items-center gap-3 bg-wood text-hanji px-5 py-4 rounded-full shadow-lg hover:bg-wood-light transition-all hover:scale-105 active:scale-95 border border-hanji/10"
        >
            <div className="flex flex-col items-end">
                <span className="text-xs text-hanji/60 font-light">사월이 몰래...</span>
                <span className="text-sm font-bold">비밀 상자 열기</span>
            </div>
            <Lock size={20} className="text-denggi group-hover:unlock" />
        </button>
      )}
    </div>
  );
};

export default SecretStash;