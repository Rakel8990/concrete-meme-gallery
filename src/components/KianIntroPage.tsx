import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, SkipForward } from 'lucide-react';

interface KianIntroPageProps {
  onContinue: () => void;
  onBackToGate?: () => void;
}

export const KianIntroPage: React.FC<KianIntroPageProps> = ({ onContinue, onBackToGate }) => {
  const line1 = "Hi, I'm Kian.";
  const line2 = "creator, Concrete maxi.";
  const line3 = "Why this gallery?";

  const noteP1 = "I wanted one place to keep the Concrete memes I’ve made instead of letting them disappear into the timeline.";
  const noteP2 = "I actually got into making memes after reading @crypttoji’s article about why memes matter in crypto.";
  const noteP3 = "It’s also a small piece of my Concrete history.";
  const noteP4 = "Something we can look back at someday and see how far we came. 🗿";

  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [text3, setText3] = useState('');

  const [boxP1, setBoxP1] = useState('');
  const [boxP2, setBoxP2] = useState('');
  const [boxP3, setBoxP3] = useState('');
  const [boxP4, setBoxP4] = useState('');

  // 1: line1
  // 2: line2
  // 3: line3 ("Why this gallery?")
  // 4: box mount
  // 5: boxP1
  // 6: boxP2
  // 7: boxP3
  // 8: boxP4
  // 10: enter button
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isFlippedToVertical, setIsFlippedToVertical] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const flipAnimationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
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

  // STEP 1: Line 1 typing
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

  // STEP 2: Line 2 typing
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
        // After this typing effect ends, wait 1.6s (1600ms):
        pauseTimeoutRef.current = setTimeout(() => {
          // Then flip it to vertical:
          setIsFlippedToVertical(true);
          // Then after the flip animation (1000ms), why this gallery continues:
          flipAnimationTimeoutRef.current = setTimeout(() => {
            setCurrentStep(3);
          }, 1000);
        }, 1600);
      }
    }, 40);
    return () => {
      clearInterval(interval);
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
      if (flipAnimationTimeoutRef.current) clearTimeout(flipAnimationTimeoutRef.current);
    };
  }, [currentStep]);

  // STEP 3: Line 3 typing ("Why this gallery?")
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
        // Flow directly into paragraph 1 seamlessly (no jarring box delay)
        setTimeout(() => setCurrentStep(5), 250);
      }
    }, 45);
    return () => clearInterval(interval);
  }, [currentStep]);

  // STEP 4: (Deprecated box mount, bypass straight to 5)
  useEffect(() => {
    if (currentStep !== 4) return;
    setCurrentStep(5);
  }, [currentStep]);

  // STEP 5: Inside Box P1
  useEffect(() => {
    if (currentStep !== 5) return;
    let idx = 0;
    const interval = setInterval(() => {
      idx++;
      if (idx <= noteP1.length) {
        setBoxP1(noteP1.slice(0, idx));
        playKeySound();
      } else {
        clearInterval(interval);
        setTimeout(() => setCurrentStep(6), 400);
      }
    }, 25);
    return () => clearInterval(interval);
  }, [currentStep]);

  // STEP 6: Inside Box P2 with @crypttoji
  useEffect(() => {
    if (currentStep !== 6) return;
    let idx = 0;
    const interval = setInterval(() => {
      idx++;
      if (idx <= noteP2.length) {
        setBoxP2(noteP2.slice(0, idx));
        playKeySound();
      } else {
        clearInterval(interval);
        setTimeout(() => setCurrentStep(7), 400);
      }
    }, 25);
    return () => clearInterval(interval);
  }, [currentStep]);

  // STEP 7: Inside Box P3
  useEffect(() => {
    if (currentStep !== 7) return;
    let idx = 0;
    const interval = setInterval(() => {
      idx++;
      if (idx <= noteP3.length) {
        setBoxP3(noteP3.slice(0, idx));
        playKeySound();
      } else {
        clearInterval(interval);
        setTimeout(() => setCurrentStep(8), 400);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [currentStep]);

  // STEP 8: Inside Box P4
  useEffect(() => {
    if (currentStep !== 8) return;
    let idx = 0;
    const interval = setInterval(() => {
      idx++;
      if (idx <= noteP4.length) {
        setBoxP4(noteP4.slice(0, idx));
        playKeySound();
      } else {
        clearInterval(interval);
        setTimeout(() => setCurrentStep(10), 250);
      }
    }, 25);
    return () => clearInterval(interval);
  }, [currentStep]);

  // STEP 9: (Deprecated legacy delay, kept for fallback safety to go straight to 10)
  useEffect(() => {
    if (currentStep !== 9) return;
    setCurrentStep(10);
  }, [currentStep]);

  // Click anywhere to fast-forward immediately
  const handleInstantSkip = () => {
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    if (flipAnimationTimeoutRef.current) clearTimeout(flipAnimationTimeoutRef.current);
    setText1(line1);
    setText2(line2);
    setText3(line3);
    setBoxP1(noteP1);
    setBoxP2(noteP2);
    setBoxP3(noteP3);
    setBoxP4(noteP4);
    setIsFlippedToVertical(true);
    setCurrentStep(10);
  };

  const prefixLength = 8; // "Hi, I'm "
  const line1Prefix = text1.slice(0, prefixLength);
  const line1Gold = text1.slice(prefixLength);

  // Link parsing helper inside typewriter stream
  const renderBoldTextWithLink = (text: string, currentStepText: string, stepNum: number) => {
    const linkToken = "@crypttoji’s";
    const displayName = "@crypttoji’s";
    
    if (!text.includes(linkToken)) {
      return (
        <>
          <span>{currentStepText}</span>
          {currentStep === stepNum && (
            <span className="inline-block w-2 h-5 bg-[#c084fc] animate-pulse ml-1 align-middle" />
          )}
        </>
      );
    }

    const tokenIdx = text.indexOf(linkToken);
    const tokenEnd = tokenIdx + linkToken.length;

    if (currentStepText.length <= tokenIdx) {
      return (
        <>
          <span>{currentStepText}</span>
          {currentStep === stepNum && (
            <span className="inline-block w-2 h-5 bg-[#c084fc] animate-pulse ml-1 align-middle" />
          )}
        </>
      );
    } else if (currentStepText.length <= tokenEnd) {
      const part1 = currentStepText.slice(0, tokenIdx);
      const linkPart = currentStepText.slice(tokenIdx);
      return (
        <>
          <span>{part1}</span>
          <a
            href="https://x.com/crypttoji"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="font-bold text-[#c084fc] hover:text-[#f3d99b] underline decoration-[#c084fc]/50 hover:decoration-[#f3d99b] underline-offset-2 transition-colors inline-flex items-baseline cursor-pointer"
            title="Visit @crypttoji on X"
          >
            {linkPart}
          </a>
          {currentStep === stepNum && (
            <span className="inline-block w-2 h-5 bg-[#c084fc] animate-pulse ml-1 align-middle" />
          )}
        </>
      );
    } else {
      const part1 = currentStepText.slice(0, tokenIdx);
      const part2 = currentStepText.slice(tokenEnd);
      return (
        <>
          <span>{part1}</span>
          <a
            href="https://x.com/crypttoji"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="font-bold text-[#c084fc] hover:text-[#f3d99b] underline decoration-[#c084fc]/50 hover:decoration-[#f3d99b] underline-offset-2 transition-colors inline-flex items-baseline cursor-pointer"
            title="Visit @crypttoji on X"
          >
            {displayName}
          </a>
          <span>{part2}</span>
          {currentStep === stepNum && (
            <span className="inline-block w-2 h-5 bg-[#c084fc] animate-pulse ml-1 align-middle" />
          )}
        </>
      );
    }
  };

  return (
    <div
      className="min-h-screen bg-[#080a0f] text-[#f7f4ec] bg-grid-pattern flex flex-col justify-center selection:bg-[#5b1e95] selection:text-[#f3d99b] relative overflow-x-hidden pt-20 pb-12 px-4 sm:pt-14 sm:pb-12 sm:px-6 lg:px-8"
      onClick={handleInstantSkip}
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-[#5b1e95]/20 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-[#f3d99b]/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Top action: back to gate & skip button */}
      <div className="absolute top-4 right-4 sm:top-7 sm:right-8 z-20 flex items-center gap-2 sm:gap-2.5">
        {onBackToGate && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onBackToGate();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-full bg-[#1b1e2b]/90 hover:bg-[#6a23b3] text-purple-300 hover:text-white border border-[#8b5cf6]/40 hover:border-[#8b5cf6] text-[11px] sm:text-xs font-mono-code font-bold tracking-wider uppercase transition-all shadow-lg cursor-pointer"
            aria-label="Back"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK</span>
          </button>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onContinue();
          }}
          className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-full bg-[#1b1e2b]/90 hover:bg-[#f3d99b] text-[#f3d99b] hover:text-[#080a0f] border border-[#f3d99b]/40 hover:border-[#f3d99b] text-[11px] sm:text-xs font-mono-code font-bold tracking-wider uppercase transition-all shadow-lg cursor-pointer"
          aria-label="Skip intro to video page"
        >
          <span>SKIP INTRO</span>
          <SkipForward className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Dual Stage Container: Always flex layout with justify-center, perfectly centered */}
      <main className="w-full max-w-7xl mx-auto z-10 flex flex-col md:flex-row items-center justify-center min-h-[60vh] sm:min-h-[70vh] gap-6 md:gap-10 lg:gap-14 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]">
        
        {/* Identity Rail: Smoothly glides from center to left as right side opens, and rotator flips 3D to vertical on PC */}
        <div className={`intro-rail ${isFlippedToVertical ? 'intro-rail--flipped' : 'intro-rail--unflipped'}`}>
          <div className={`intro-identity-rotator ${isFlippedToVertical ? 'intro-identity-rotator--flipped' : 'intro-identity-rotator--unflipped'}`}>
            {/* Step 1: Line 1 */}
            {currentStep >= 1 && (
              <h1 className="font-heading font-black text-2xl sm:text-4xl md:text-5xl tracking-tight text-[#f7f4ec] leading-tight whitespace-nowrap min-h-[38px] sm:min-h-[50px] md:min-h-[60px]">
                <span>{line1Prefix}</span>
                <span className="text-[#f3d99b] drop-shadow-[0_0_12px_rgba(243,217,155,0.4)]">{line1Gold}</span>
                {currentStep === 1 && (
                  <span className="inline-block w-2 sm:w-2.5 h-6 sm:h-7 md:h-9 bg-[#f3d99b] animate-pulse ml-1 align-middle" />
                )}
              </h1>
            )}

            {/* Step 2: Line 2 - Tagline without "shitposter" */}
            {currentStep >= 2 && (
              <p className="text-base sm:text-xl md:text-2xl lg:text-3xl text-[#c084fc] font-bold tracking-tight leading-relaxed drop-shadow-[0_0_10px_rgba(168,85,247,0.5)] whitespace-nowrap min-h-[28px] sm:min-h-[38px]">
                <span>{text2}</span>
                {currentStep === 2 && (
                  <span className="inline-block w-2 sm:w-2.5 h-4 sm:h-6 md:h-7 bg-[#c084fc] animate-pulse ml-1 align-middle" />
                )}
              </p>
            )}
          </div>
        </div>

        {/* Right Section: Header + Flowing Manifesto Text + Enter Button (seamless dark canvas) */}
        <div
          className={`flex flex-col items-start justify-center space-y-4 sm:space-y-5 w-full transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isFlippedToVertical
              ? 'max-w-xl md:max-w-2xl opacity-100 translate-x-0 scale-100 pointer-events-auto'
              : 'max-w-0 opacity-0 translate-x-12 scale-95 overflow-hidden pointer-events-none'
          }`}
        >
          {/* Step 3: Top Text: "Why this gallery?" */}
          <div className="w-full min-h-[32px] sm:min-h-[36px] flex items-center justify-start">
            {currentStep >= 3 && (
              <h2 className="font-heading font-black text-xl sm:text-2xl md:text-3xl text-[#f3d99b] tracking-tight drop-shadow-[0_0_12px_rgba(243,217,155,0.4)] animate-in fade-in slide-in-from-top-2 duration-300">
                <span>{text3}</span>
                {currentStep === 3 && (
                  <span className="inline-block w-2 sm:w-2.5 h-5 sm:h-6 md:h-7 bg-[#f3d99b] animate-pulse ml-1.5 align-middle" />
                )}
              </h2>
            )}
          </div>

          {/* Manifesto Paragraphs: Clean, dark, and seamless directly on dark canvas */}
          <div className="space-y-3.5 sm:space-y-4 w-full">
            {/* Paragraph 1: Bold Lavender Lead */}
            {currentStep >= 5 && (
              <p className="font-heading text-lg sm:text-xl md:text-2xl font-bold text-[#c084fc] tracking-tight leading-snug drop-shadow-[0_0_10px_rgba(192,132,252,0.35)] animate-in fade-in duration-300">
                <span>{boxP1}</span>
                {currentStep === 5 && (
                  <span className="inline-block w-2 sm:w-2.5 h-5 sm:h-6 bg-[#c084fc] animate-pulse ml-1 align-middle" />
                )}
              </p>
            )}

            {/* Paragraph 2: Soft cream text with glowing @crypttoji link */}
            {currentStep >= 6 && (
              <p className="text-[#f7f4ec]/85 text-sm sm:text-base md:text-lg font-medium leading-relaxed animate-in fade-in duration-300">
                {renderBoldTextWithLink(noteP2, boxP2, 6)}
              </p>
            )}

            {/* Paragraph 3: Warm Sand accent */}
            {currentStep >= 7 && (
              <p className="text-[#f3d99b] font-bold text-base sm:text-lg md:text-xl tracking-tight drop-shadow-[0_0_8px_rgba(243,217,155,0.3)] animate-in fade-in duration-300">
                <span>{boxP3}</span>
                {currentStep === 7 && (
                  <span className="inline-block w-2 h-5 bg-[#f3d99b] animate-pulse ml-1 align-middle" />
                )}
              </p>
            )}

            {/* Paragraph 4: Final reflection with 🗿 badge */}
            {currentStep >= 8 && (
              <div className="pt-2.5 sm:pt-3 border-t border-white/10 animate-in fade-in duration-300">
                <p className="text-[#f7f4ec]/90 text-sm sm:text-base md:text-lg font-semibold leading-relaxed">
                  <span>{boxP4}</span>
                  {currentStep === 8 && (
                    <span className="inline-block w-2 sm:w-2.5 h-4 sm:h-5 bg-[#f7f4ec] animate-pulse ml-1 align-middle" />
                  )}
                </p>
              </div>
            )}
          </div>

          {/* Step 10: Enter Gallery Button */}
          <div className="w-full flex justify-center sm:justify-start pt-2 sm:pt-3 min-h-[58px] sm:min-h-[64px]">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (currentStep >= 10) {
                  onContinue();
                }
              }}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 sm:px-8 py-3.5 rounded-full border-2 border-[#f3d99b] hover:border-[#fbe2a8] bg-[#f3d99b] hover:bg-white text-[#080a0f] font-mono-code text-xs sm:text-sm font-black tracking-widest uppercase transition-all duration-300 ease-out shadow-[0_0_25px_rgba(243,217,155,0.4)] hover:shadow-[0_0_40px_rgba(243,217,155,0.7)] cursor-pointer group ${
                currentStep >= 10
                  ? 'opacity-100 pointer-events-auto translate-y-0'
                  : 'opacity-0 pointer-events-none translate-y-1'
              }`}
            >
              <span>ENTER GALLERY</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

        </div>

      </main>
    </div>
  );
};
