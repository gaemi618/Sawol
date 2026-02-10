import React, { useState } from 'react';
import { PatternDivider } from './components/PatternDivider';
import CharacterDetail from './components/CharacterDetail';
import HouseMap from './components/HouseMap';
import SecretStash from './components/SecretStash';
import IntroScreen from './components/IntroScreen'; // New Import
import { Leaf, Users, Quote as QuoteIcon } from 'lucide-react';

const SupportingCharacter: React.FC<{ name: string; info: string; role: string; align: 'left' | 'right' }> = ({ name, info, role, align }) => (
  <div className={`flex flex-col ${align === 'right' ? 'items-end text-right' : 'items-start text-left'} p-4 bg-white/40 border border-wood/10 rounded shadow-sm hover:shadow-md transition-shadow hover:bg-white/60`}>
    <h3 className="font-bold text-lg text-wood mb-1">{name} <span className="text-xs font-normal text-ink/60">({role})</span></h3>
    <p className="text-sm text-ink/80 leading-relaxed whitespace-pre-line">{info}</p>
  </div>
);

export default function App() {
  const [introVisible, setIntroVisible] = useState(true);

  return (
    <div className="min-h-screen bg-hanji bg-paper-pattern relative selection:bg-wood/20 font-serif">
      
      {/* Intro Overlay */}
      {introVisible && (
        <IntroScreen onEnter={() => setIntroVisible(false)} />
      )}

      {/* Main Content - Only visible after intro, with fade-in effect */}
      {!introVisible && (
        <div className="animate-[fadeIn_1.5s_ease-out]">
            {/* Background Decor - Subtle Vignette & Frame */}
            <div className="fixed inset-0 pointer-events-none z-0">
                {/* Vignette for aged paper look */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(74,59,42,0.1)_100%)]"></div>
                {/* Inner border frame */}
                <div className="absolute inset-4 border border-wood/10 rounded-[2px]"></div>
                <div className="absolute inset-5 border border-wood/5 rounded-[2px]"></div>
            </div>

            <main className="relative z-10 max-w-5xl mx-auto px-6 py-12 md:py-20">
                
                {/* Hero Section */}
                <header className="text-center mb-16">
                <div className="inline-block border-y border-wood/30 py-2 px-6 mb-8">
                    <span className="font-serif italic text-wood/60 text-sm tracking-widest">1905 | 乙巳年 | 秋</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-serif font-black text-wood mb-6 tracking-tight leading-tight flex justify-center items-center gap-2">
                    <span className="inline-block transform hover:-rotate-3 transition-transform cursor-default opacity-90">사</span>
                    <span className="inline-block transform hover:rotate-3 transition-transform cursor-default opacity-90">월</span>
                    <span className="text-2xl md:text-4xl font-light text-wood/50 ml-2 mt-4 tracking-normal">이의 세계</span>
                </h1>
                
                <p className="max-w-xl mx-auto text-lg text-ink/60 leading-loose font-serif">
                    혼란스러운 대한제국, 한양.<br/>
                    가장 낮은 곳에서 피어난 가장 순수한 연정.<br/>
                    당신의 하인, <strong>사월</strong>이와의 이야기를 시작합니다.
                </p>
                </header>

                <PatternDivider />

                {/* Main Character Section */}
                <section className="mb-20">
                    <div className="flex items-center gap-2 mb-6">
                        <Leaf className="text-wood-light/70" />
                        <h2 className="text-2xl font-bold text-wood">인물 상세</h2>
                    </div>
                    <CharacterDetail />
                </section>

                {/* House Map Section */}
                <section className="mb-20">
                    <div className="flex flex-col items-center mb-8">
                        <h2 className="text-2xl font-bold text-wood mb-2">한양 집</h2>
                        <p className="text-ink/50 text-sm font-light">사월이와 당신의 일상이 묻어있는 공간</p>
                    </div>
                    <HouseMap />
                </section>

                {/* Dialogue Gallery */}
                <section className="mb-20">
                    <div className="flex items-center gap-2 mb-6 justify-center">
                        <QuoteIcon className="text-wood/40" />
                        <h2 className="text-2xl font-bold text-wood">사월의 말</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        {[
                            { text: "\"아씨! 지가 엄청 신기한 걸 찾아왔구만유!\"", label: "평상시" },
                            { text: "\"물러서지 않을 거예유. 절대. 아씨를 건드리면 절대 안 참을 거예유.\"", label: "분노/보호" },
                            { text: "\"아, 아씨?! 괜찮으세유? 아유, 그러니까 지가 그만두라구 했잖아유.\"", label: "당황" },
                            { text: "\"잘못했어유... 지가, 지가 잘못했어유...\"", label: "애원" }
                        ].map((quote, idx) => (
                            <div key={idx} className="group relative bg-white/40 border border-wood/10 p-6 rounded hover:bg-wood/5 transition-colors cursor-default shadow-sm">
                                <span className="absolute top-2 right-2 text-xs text-wood/40 border border-wood/10 px-2 py-0.5 rounded-full">{quote.label}</span>
                                <p className="font-serif text-lg text-ink/80 italic">
                                {quote.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                <PatternDivider />

                {/* Supporting Cast */}
                <section className="mb-20">
                    <div className="flex items-center gap-2 mb-6">
                        <Users className="text-wood/60" />
                        <h2 className="text-2xl font-bold text-wood">주변 인물들</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <SupportingCharacter 
                            name="삼돌이" 
                            role="마당쇠/33세" 
                            align="left"
                            info={`INTP 성향의 묵묵한 일꾼.\n"남자는 입이 무거워야 하는 법이여유..."\n순꽃 누님을 짝사랑하지만 티를 못 냄.`} 
                        />
                        <SupportingCharacter 
                            name="순꽃" 
                            role="찬모/35세" 
                            align="right"
                            info={`INFJ 성향의 다정한 언니.\n"아이고, 우리 아씨 많이 드셔야쥬."\n엄마처럼 사월이와 당신을 챙겨줌.`} 
                        />
                    </div>
                </section>

                {/* Footer */}
                <footer className="text-center text-wood/30 text-sm pb-10 pt-10 border-t border-wood/5">
                <p>© 1905 대한제국 한양. All memories reserved.</p>
                </footer>

            </main>

            {/* Replaced ChatWidget with SecretStash */}
            <SecretStash />
        </div>
      )}
    </div>
  );
}
