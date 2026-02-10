import React, { useState } from 'react';
import { RoomType } from '../types';
import { MapPin } from 'lucide-react';

const HouseMap: React.FC = () => {
  const [activeRoom, setActiveRoom] = useState<string | null>(null);

  const rooms = [
    { id: 'gate', name: RoomType.GATE, desc: '바깥 세상과 집을 잇는 경계. 낡았지만 튼튼한 나무 대문.', x: 50, y: 10 },
    { id: 'servant', name: RoomType.SERVANT, desc: '사월이와 삼돌이가 머무는 곳. 작지만 사람 사는 온기가 느껴지는 방.', x: 50, y: 25 },
    { id: 'sarang', name: RoomType.SARANG, desc: '부모님이 기거하시는 곳. 엄격하고 조용한 분위기.', x: 20, y: 45 },
    { id: 'yard', name: RoomType.YARD, desc: '집의 중심. 사월이가 빗자루질을 하며 콧노래를 부르는 공간.', x: 50, y: 45 },
    { id: 'toilet', name: RoomType.TOILET, desc: '뒷간. 밤에 가면 조금 무서울지도 모릅니다.', x: 80, y: 45 },
    { id: 'anchae', name: RoomType.ANCHAE, desc: '당신(User)이 머무는 방. 사월이가 가장 자주 훔쳐보는 곳.', x: 50, y: 65 },
    { id: 'kitchen', name: RoomType.KITCHEN, desc: '맛있는 밥 냄새와 장독대의 정겨움이 있는 곳.', x: 50, y: 85 },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-hanji-dark/30 border-2 border-double border-wood rounded-lg relative overflow-hidden">
      <div className="absolute top-2 left-2 text-wood/50 text-xs font-serif flex items-center gap-1">
        <MapPin size={12} /> 한양 집 구조도
      </div>

      <div className="relative h-[400px] w-full mt-4">
        {/* Connection Lines (Simulated with simple SVG) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-wood/30" strokeWidth="2">
          <line x1="50%" y1="10%" x2="50%" y2="25%" />
          <line x1="50%" y1="25%" x2="50%" y2="45%" />
          
          <line x1="50%" y1="45%" x2="20%" y2="45%" />
          <line x1="50%" y1="45%" x2="80%" y2="45%" />
          <line x1="50%" y1="45%" x2="50%" y2="65%" />
          
          <line x1="50%" y1="65%" x2="50%" y2="85%" />
        </svg>

        {rooms.map((room) => (
          <button
            key={room.id}
            onClick={() => setActiveRoom(room.id)}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300
              ${activeRoom === room.id ? 'scale-110 z-20' : 'scale-100 z-10 hover:scale-105'}
            `}
            style={{ left: `${room.x}%`, top: `${room.y}%` }}
          >
            <div className={`
              px-4 py-2 border border-wood text-sm font-serif font-bold shadow-sm flex flex-col items-center gap-1
              ${activeRoom === room.id ? 'bg-wood text-hanji' : 'bg-hanji text-wood'}
            `}>
              <span>{room.name}</span>
            </div>
          </button>
        ))}
        
        {/* Context Modal / Tooltip */}
        {activeRoom && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-11/12 bg-white/90 border border-wood p-4 shadow-lg text-center z-30 animate-[fadeIn_0.3s_ease-out]">
                <h4 className="font-bold text-denggi mb-1">{rooms.find(r => r.id === activeRoom)?.name}</h4>
                <p className="text-sm text-ink/80 keep-all">{rooms.find(r => r.id === activeRoom)?.desc}</p>
                <button 
                    onClick={(e) => { e.stopPropagation(); setActiveRoom(null); }}
                    className="mt-2 text-xs text-wood/60 hover:text-wood underline"
                >
                    닫기
                </button>
            </div>
        )}
      </div>
      
      <div className="text-center mt-4 text-xs text-wood/60">
        * 장소를 누르면 설명을 볼 수 있구만유.
      </div>
    </div>
  );
};

export default HouseMap;