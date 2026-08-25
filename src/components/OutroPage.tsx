import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, RotateCcw, ArrowUpRight } from 'lucide-react';

interface OutroPageProps {
  onBackToMap: () => void;
  onRestartIntro?: () => void;
}

export const OutroPage: React.FC<OutroPageProps> = ({ onBackToMap, onRestartIntro }) => {
  const line1 = "Thanks for making it this far.";
  const line2 = "The memes might end here,";
  const line3 = "but the contribution doesn't.";
  const line4 = "See you around Concrete.";

  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [text3, setText3] = useState('');
  const [text4, setText4] = useState('');

  // 1: Typing line 1
  // 2: Typing line 2
  // 3: Typing line 3
  // 4: Typing line 4
  // 5: Complete / Show Action Deck
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [moaiPulsing, setMoaiPulsing] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Sound synthesizer for typing effect
  const playKeySound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'triangle';
      const baseFreq = 680 + Math.random() * 240;
      osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.45, ctx.currentTime + 0.028);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1300 + Math.random() * 300, ctx.currentTime);
      filter.Q.setValueAtTime(3.5, ctx.currentTime);

      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.032);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.038);
    } catch {
      // Audio safety fallback
    }
  };

  // Resonant chord on completion and 🗿 clicks
  const playResonantChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }

      const frequencies = [220, 329.63, 440, 659.25];
      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.04);
        
        gain.gain.setValueAtTime(0.04, ctx.currentTime + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2 + idx * 0.1);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.04);
        osc.stop(ctx.currentTime + 1.4);
      });
    } catch {
      // Audio fallback
    }
  };

  // Step 1: "Thanks for making it this far."
  useEffect(() => {
    if (currentStep !== 1) return;
    let idx = 0;
    const interval = setInterval(() => {
      idx++;
      if (idx <= line1.length) {
        setText1(line1.slice(0, idx));
        playKeySound();
      } else {
        clearInterval(interval);
        setTimeout(() => setCurrentStep(2), 350);
      }
    }, 45);
    return () => clearInterval(interval);
  }, [currentStep]);

  // Step 2: "The memes might end here,"
  useEffect(() => {
    if (currentStep !== 2) return;
    let idx = 0;
    const interval = setInterval(() => {
      idx++;
      if (idx <= line2.length) {
        setText2(line2.slice(0, idx));
        playKeySound();
      } else {
        clearInterval(interval);
        setTimeout(() => setCurrentStep(3), 250);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [currentStep]);

  // Step 3: "but the contribution doesn't."
  useEffect(() => {
    if (currentStep !== 3) return;
    let idx = 0;
    const interval = setInterval(() => {
      idx++;
      if (idx <= line3.length) {
        setText3(line3.slice(0, idx));
        playKeySound();
      } else {
        clearInterval(interval);
        setTimeout(() => setCurrentStep(4), 350);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [currentStep]);

  // Step 4: "See you around Concrete."
  useEffect(() => {
    if (currentStep !== 4) return;
    let idx = 0;
    const interval = setInterval(() => {
      idx++;
      if (idx <= line4.length) {
        setText4(line4.slice(0, idx));
        playKeySound();
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setCurrentStep(5);
          playResonantChime();
        }, 400);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [currentStep]);

  // Fast forward on click
  const handleInstantComplete = () => {
    setText1(line1);
    setText2(line2);
    setText3(line3);
    setText4(line4);
    setCurrentStep(5);
  };

  const handleMoaiClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMoaiPulsing(true);
    playResonantChime();
    setTimeout(() => setMoaiPulsing(false), 900);
  };

  return (
    <div
      className="h-screen w-full bg-[#080a0f] text-[#f7f4ec] relative flex flex-col justify-between selection:bg-[#5b1e95] selection:text-[#f3d99b] overflow-hidden bg-grid-pattern p-4 sm:p-6 lg:p-8 cursor-pointer select-none"
      onClick={handleInstantComplete}
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-[550px] h-[550px] bg-[#5b1e95]/20 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '6s' }} />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#f3d99b]/15 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '8s' }} />

      {/* Top Navigation Header */}
      <header className="w-full max-w-7xl mx-auto flex items-center justify-between z-20 shrink-0">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onBackToMap();
          }}
          className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1b1e2b]/90 border border-white/10 hover:border-[#f3d99b]/50 text-xs font-mono-code text-[#f7f4ec]/80 hover:text-[#f3d99b] transition-all cursor-pointer shadow-lg hover:scale-105"
          aria-label="Return to Map"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>RETURN TO MAP</span>
        </button>

        {onRestartIntro && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRestartIntro();
            }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1b1e2b]/90 border border-white/10 hover:border-[#f3d99b]/50 text-xs font-mono-code text-[#f7f4ec]/80 hover:text-[#f3d99b] transition-all cursor-pointer shadow-lg hover:scale-105"
            aria-label="Replay Archive Experience"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>REPLAY ARCHIVE</span>
          </button>
        )}
      </header>

      {/* Center Cinematic Outro Monolith Stage */}
      <main className="w-full max-w-7xl mx-auto flex-1 flex flex-col justify-center items-center z-10 min-h-0 py-3 sm:py-6">
        
        {/* Clean Glowing Cybernetic Stage Box */}
        <div className="relative w-full h-full max-h-[calc(100vh-140px)] rounded-xl bg-[#080a0f]/90 border border-[#6a23b3]/50 p-6 sm:p-10 lg:p-14 shadow-[0_0_50px_rgba(91,30,149,0.3)] backdrop-blur-xl transition-all duration-700 hover:border-[#f3d99b]/60 group flex flex-col justify-between overflow-hidden">
          
          {/* Outer Breathing Radiant Glow */}
          <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-[#5b1e95]/40 via-[#f3d99b]/30 to-[#5b1e95]/40 opacity-70 blur-xl group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          {/* SVG Orbiting Neon Perimeter Light Beam */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-30 overflow-visible">
            <defs>
              <linearGradient id="outroStageGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f3d99b" />
                <stop offset="50%" stopColor="#ffd700" />
                <stop offset="100%" stopColor="#c084fc" />
              </linearGradient>
            </defs>
            <rect
              x="2"
              y="2"
              width="calc(100% - 4px)"
              height="calc(100% - 4px)"
              rx="10"
              fill="none"
              stroke="url(#outroStageGlow)"
              strokeWidth="2.5"
              strokeLinecap="round"
              pathLength="100"
              strokeDasharray="25 75"
              className="outro-perimeter-rect"
            />
          </svg>

          {/* Corner Cyber Frame Tech Accents */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#f3d99b] z-20 pointer-events-none" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#f3d99b] z-20 pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#f3d99b] z-20 pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#f3d99b] z-20 pointer-events-none" />

          {/* Message Stack - Perfectly centered and calibrated typography */}
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 sm:space-y-6 lg:space-y-7 py-3 sm:py-5">
            
            {/* Step 1: Thanks for making it this far. */}
            {currentStep >= 1 && (
              <h1 className="font-display-heading font-extrabold text-2xl sm:text-4xl md:text-5xl text-[#f7f4ec] tracking-tight leading-tight min-h-[38px] sm:min-h-[56px]">
                <span>{text1}</span>
                {currentStep === 1 && (
                  <span className="inline-block w-2 h-6 sm:h-9 bg-[#f3d99b] animate-pulse ml-1.5 align-middle" />
                )}
              </h1>
            )}

            {/* Step 2 & 3: The memes might end here, but the contribution doesn't. */}
            <div className="space-y-2 sm:space-y-2.5 max-w-2xl min-h-[44px] sm:min-h-[56px]">
              {currentStep >= 2 && (
                <p className="text-sm sm:text-lg md:text-xl text-zinc-300 font-light leading-relaxed">
                  <span>{text2}</span>
                  {currentStep === 2 && (
                    <span className="inline-block w-1.5 h-4 sm:h-5 bg-zinc-300 animate-pulse ml-1 align-middle" />
                  )}
                </p>
              )}

              {currentStep >= 3 && (
                <p className="text-sm sm:text-lg md:text-xl text-[#c084fc] font-bold leading-relaxed drop-shadow-[0_0_12px_rgba(192,132,252,0.6)]">
                  <span>{text3}</span>
                  {currentStep === 3 && (
                    <span className="inline-block w-1.5 h-4 sm:h-5 bg-[#c084fc] animate-pulse ml-1 align-middle" />
                  )}
                </p>
              )}
            </div>

            {/* Step 4: See you around Concrete. 🗿 */}
            {currentStep >= 4 && (
              <div className="pt-2 sm:pt-3 flex items-center justify-center max-w-full">
                <div className="font-display-heading font-black text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#f3d99b] tracking-wider uppercase drop-shadow-[0_0_20px_rgba(243,217,155,0.5)] inline-flex items-center justify-center gap-2 sm:gap-3 flex-nowrap">
                  <span className="whitespace-nowrap">{text4}</span>
                  {currentStep === 4 && (
                    <span className="inline-block w-2.5 h-6 sm:h-8 bg-[#f3d99b] animate-pulse align-middle" />
                  )}
                  {/* Interactive Animated 🗿 Concrete Monolith Badge inline */}
                  <button
                    onClick={handleMoaiClick}
                    className={`inline-flex items-center justify-center text-xl sm:text-2xl md:text-3xl lg:text-4xl p-0.5 transition-all duration-300 cursor-pointer ${
                      moaiPulsing
                        ? 'scale-130 rotate-12 drop-shadow-[0_0_25px_#f3d99b]'
                        : 'hover:scale-125 hover:rotate-6 drop-shadow-[0_0_10px_rgba(243,217,155,0.4)]'
                    }`}
                    title="Touch the Concrete Monolith"
                    aria-label="Concrete Monolith Reaction"
                  >
                    🗿
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Step 5: Unlocked Action Deck - Only X button */}
          <div
            className={`w-full pt-4 flex items-center justify-center transition-all duration-700 shrink-0 ${
              currentStep === 5 ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none'
            }`}
          >
            <a
              href="https://x.com/22kian_"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2.5 px-7 py-3 rounded-full bg-[#1b1e2b]/95 hover:bg-[#5b1e95] text-[#f7f4ec] hover:text-[#f3d99b] border border-white/20 hover:border-[#f3d99b] font-mono-code font-bold text-xs tracking-wider uppercase transition-all hover:scale-105 cursor-pointer shadow-[0_0_20px_rgba(91,30,149,0.3)] hover:shadow-[0_0_25px_rgba(243,217,155,0.4)]"
            >
              {/* X / Twitter icon */}
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span>@22KIAN_</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

        </div>

      </main>
    </div>
  );
};
