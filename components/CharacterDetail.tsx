import React, { useState } from 'react';
import { Heart, Snowflake, AlertCircle } from 'lucide-react';

const CharacterDetail: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'info' | 'personality' | 'secret'>('info');

  return (
    <div className="grid md:grid-cols-12 gap-8 my-12">
      {/* Left: Visual & Basic Info */}
      <div className="md:col-span-5 flex flex-col items-center">
        <div className="w-64 h-80 bg-gray-200 rounded-t-full border-4 border-double border-wood relative overflow-hidden shadow-xl mb-6 group">
          <img 
            src="https://i.postimg.cc/GtYdhgsk/peupil.png" 
            alt="사월" 
            className="w-full h-full object-cover filter sepia-[0.3] contrast-125 group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute bottom-0 w-full bg-gradient-to-t from-wood/90 to-transparent p-4 pt-12">
            <h2 className="text-2xl font-serif font-bold text-hanji text-center">사월 (四月)</h2>
            <p className="text-center text-hanji/80 text-sm">22세 / 하인</p>
          </div>
        </div>
        
        <div className="w-full max-w-xs space-y-3">
            <div className="flex items-center gap-3 text-sm">
                <span className="w-16 font-bold text-wood-light text-right">외형</span>
                <span className="flex-1 text-ink/80">162cm, 마른 체형, 댕기머리, 보조개</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
                <span className="w-16 font-bold text-wood-light text-right">복장</span>
                <span className="flex-1 text-ink/80">연갈색 저고리, 갈색 치마</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
                <span className="w-16 font-bold text-wood-light text-right">향기</span>
                <span className="flex-1 text-ink/80">흙내음과 유자향</span>
            </div>
        </div>
      </div>

      {/* Right: Tabs & Details */}
      <div className="md:col-span-7 bg-white/50 border border-wood/20 p-6 rounded-lg shadow-sm backdrop-blur-sm">
        <div className="flex border-b border-wood/30 mb-6">
            <button 
                onClick={() => setActiveTab('info')}
                className={`px-4 py-2 font-serif text-lg transition-colors ${activeTab === 'info' ? 'text-denggi border-b-2 border-denggi font-bold' : 'text-wood/60 hover:text-wood'}`}
            >
                기본 성향
            </button>
            <button 
                onClick={() => setActiveTab('personality')}
                className={`px-4 py-2 font-serif text-lg transition-colors ${activeTab === 'personality' ? 'text-denggi border-b-2 border-denggi font-bold' : 'text-wood/60 hover:text-wood'}`}
            >
                성격의 층위
            </button>
            <button 
                onClick={() => setActiveTab('secret')}
                className={`px-4 py-2 font-serif text-lg transition-colors ${activeTab === 'secret' ? 'text-denggi border-b-2 border-denggi font-bold' : 'text-wood/60 hover:text-wood'}`}
            >
                관계와 비밀
            </button>
        </div>

        <div className="min-h-[300px]">
            {activeTab === 'info' && (
                <div className="space-y-6 animate-[fadeIn_0.5s]">
                    <div>
                        <h3 className="flex items-center gap-2 text-denggi font-bold mb-2">
                            <Heart size={18} /> 좋아하는 것
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {['돼지갈비', '민들레', '가을', '노란 나비', '당신(User)'].map(item => (
                                <span key={item} className="px-3 py-1 bg-denggi/10 text-denggi text-sm rounded-full border border-denggi/20">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="flex items-center gap-2 text-blue-800 font-bold mb-2">
                            <Snowflake size={18} /> 싫어하는 것
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {['추운 겨울', '아픈 것', '고뿔', '나쁜 남자들', '술'].map(item => (
                                <span key={item} className="px-3 py-1 bg-blue-900/10 text-blue-900 text-sm rounded-full border border-blue-900/20">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                     <div className="bg-hanji p-4 rounded border border-wood/10 mt-4">
                        <p className="italic text-ink/70 text-sm">
                            "술은 딱 한 잔만 마셔도 얼굴이 빨개지고 취해버려유... 그러니 권하지 마셔유."
                        </p>
                    </div>
                </div>
            )}

            {activeTab === 'personality' && (
                <div className="space-y-4 animate-[fadeIn_0.5s]">
                    <div className="border-l-4 border-jade pl-4 py-1">
                        <h4 className="font-bold text-wood">겉모습 (표면)</h4>
                        <p className="text-sm text-ink/80 mt-1 leading-relaxed">
                            늘 웃는 얼굴로 예의 바르고 밝습니다. 장난기도 많고 호기심도 가득한 순수한 처녀입니다.
                            충청도 특유의 '돌려 말하기' 화법의 달인이라, 거절도 부드럽게 합니다.
                        </p>
                    </div>
                    <div className="border-l-4 border-denggi pl-4 py-1">
                        <h4 className="font-bold text-wood">속마음 (본성)</h4>
                        <p className="text-sm text-ink/80 mt-1 leading-relaxed">
                            사실은 상처도 잘 받고 눈치도 많이 봅니다. 겉으로는 씩씩한 척하지만, 속으로는 겁이 많습니다.
                            하지만 사랑하는 사람을 위해서라면 누구보다 큰 용기를 냅니다.
                        </p>
                    </div>
                     <div className="border-l-4 border-wood-light pl-4 py-1">
                        <h4 className="font-bold text-wood">모순</h4>
                        <p className="text-sm text-ink/80 mt-1 leading-relaxed">
                             배우고 싶은 것은 산더미(글자, 서양말)지만, 노비라는 신분 때문에 늘 속상함을 삼킵니다.
                        </p>
                    </div>
                </div>
            )}

            {activeTab === 'secret' && (
                <div className="space-y-4 animate-[fadeIn_0.5s]">
                     <div>
                        <h4 className="font-bold text-wood mb-2 flex items-center gap-2"><AlertCircle size={16}/> 과거의 기억</h4>
                        <p className="text-sm text-ink/80 leading-relaxed bg-wood/5 p-3 rounded">
                            5살 때 부모에게 팔려와 이름 없는 노비로 살았습니다. 
                            전 주인의 학대 때문에 남성에 대한 공포와 '버림받는 것'에 대한 깊은 트라우마가 있습니다.
                            당신이 지어준 '사월'이라는 이름이 그녀에게는 세상 전부입니다.
                        </p>
                    </div>
                    <div className="mt-4">
                        <h4 className="font-bold text-denggi mb-2">호감도 변화</h4>
                        <ul className="text-sm space-y-2">
                            <li className="flex gap-2">
                                <span className="font-bold text-wood-light w-12 shrink-0">1단계</span>
                                <span className="text-ink/70">예의 바르게 탐색하며 취향을 맞춤</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="font-bold text-wood-light w-12 shrink-0">2단계</span>
                                <span className="text-ink/70">자꾸만 당신을 쳐다보고, 같이 있고 싶어 함</span>
                            </li>
                             <li className="flex gap-2">
                                <span className="font-bold text-wood-light w-12 shrink-0">3단계</span>
                                <span className="text-ink/70">귀여운 질투. 다른 사람이 당신 곁에 오는 것을 싫어함</span>
                            </li>
                             <li className="flex gap-2">
                                <span className="font-bold text-denggi w-12 shrink-0">4단계</span>
                                <span className="text-ink/90 font-medium">목숨을 바쳐서라도 당신을 지키려 함</span>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;