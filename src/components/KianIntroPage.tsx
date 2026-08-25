import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, SkipForward } from 'lucide-react';

interface KianIntroPageProps {
  onContinue: () => void;
}

export const KianIntroPage: React.FC<KianIntroPageProps> = ({ onContinue }) => {
  const line1 = "Hi, I'm Kian.";
  const line2 = "creator and Concrete maxi";
  const line3 = "This is what happened.";

  // Note paragraphs inside the clean white box
  const noteP1 = "I wasn't planning to make a meme gallery.";
  const noteP2 = "I came across @crypttoji's article about why memes matter in crypto, and it got me thinking about how I could contribute to Concrete in my own way.";
  const noteP3 = "So I started making memes.";
  const noteP4 = "Not because every moment needed a serious post, but because sometimes the best way to understand a culture is to laugh at it.";
  const noteP5 = "This is what came out of it.";

  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [text3, setText3] = useState('');

  // Box typing texts
  const [boxP1, setBoxP1] = useState('');
  const [boxP2, setBoxP2] = useState('');
  const [boxP3, setBoxP3] = useState('');
  const [boxP4, setBoxP4] = useState('');
  const [boxP5, setBoxP5] = useState('');

  // Sequencer steps:
  // 1: Type Line 1 ("Hi, I'm Kian.")
  // 2: Type Line 2 ("creator, Concrete maxi" in BOLD)
  // 3: Type Line 3 ("This is what happened." at top of box area)
  // 4: 3-second delay, then clean white box appears
  // 5: Type Box P1 (Purple Bold)
  // 6: Type Box P2
  // 7: Type Box P3 (Purple Bold)
  // 8: Type Box P4
  // 9: Type Box P5 (Purple Bold)
  // 10: Enter button appears underneath the box
  const [currentStep, setCurrentStep] = useState<number>(1);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Keystroke sound synthesizer
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

  // STEP 1: Line 1
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
        setTimeout(() => setCurrentStep(2), 500);
      }
    }, 70);
    return () => clearInterval(interval);
  }, [currentStep]);

  // STEP 2: Line 2 ("creator, Concrete maxi")
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
        setTimeout(() => setCurrentStep(3), 600);
      }
    }, 60);
    return () => clearInterval(interval);
  }, [currentStep]);

  // STEP 3: Line 3 ("This is what happened.")
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
        // 3-SECOND DELAY before box appears
        setTimeout(() => {
          setCurrentStep(4);
        }, 3000);
      }
    }, 60);
    return () => clearInterval(interval);
  }, [currentStep]);

  // STEP 4: White Box appears -> start typing inside it
  useEffect(() => {
    if (currentStep !== 4) return;
    const timer = setTimeout(() => {
      setCurrentStep(5);
    }, 600);
    return () => clearTimeout(timer);
  }, [currentStep]);

  // STEP 5: Inside Box P1 ("I wasn't planning to make a meme gallery.")
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
    }, 55);
    return () => clearInterval(interval);
  }, [currentStep]);

  // STEP 6: Inside Box P2 ("I came across Toji's article...")
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
    }, 40);
    return () => clearInterval(interval);
  }, [currentStep]);

  // STEP 7: Inside Box P3 ("So I started making memes.")
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
    }, 55);
    return () => clearInterval(interval);
  }, [currentStep]);

  // STEP 8: Inside Box P4 ("Not because every moment needed a serious post...")
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
        setTimeout(() => setCurrentStep(9), 400);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [currentStep]);

  // STEP 9: Inside Box P5 ("This is what came out of it.")
  useEffect(() => {
    if (currentStep !== 9) return;
    let idx = 0;
    const interval = setInterval(() => {
      idx++;
      if (idx <= noteP5.length) {
        setBoxP5(noteP5.slice(0, idx));
        playKeySound();
      } else {
        clearInterval(interval);
        // 5-second delay after box typing ends before showing enter button
        setTimeout(() => setCurrentStep(10), 5000);
      }
    }, 55);
    return () => clearInterval(interval);
  }, [currentStep]);

  // Click anywhere to fast-forward immediately
  const handleInstantSkip = () => {
    setText1(line1);
    setText2(line2);
    setText3(line3);
    setBoxP1(noteP1);
    setBoxP2(noteP2);
    setBoxP3(noteP3);
    setBoxP4(noteP4);
    setBoxP5(noteP5);
    setCurrentStep(10);
  };

  const prefixLength = 8; // "Hi, I'm "
  const line1Prefix = text1.slice(0, prefixLength);
  const line1Gold = text1.slice(prefixLength);

  return (
    <div
      className="min-h-screen bg-[#080a0f] text-[#f7f4ec] bg-grid-pattern flex flex-col justify-center selection:bg-[#5b1e95] selection:text-[#f3d99b] relative overflow-x-hidden py-10 px-4 sm:px-6 lg:px-8"
      onClick={handleInstantSkip}
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-[#5b1e95]/20 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-[#f3d99b]/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Top action: skip button */}
      <div className="absolute top-5 right-5 sm:top-7 sm:right-8 z-20">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onContinue();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1b1e2b]/90 hover:bg-[#f3d99b] text-[#f3d99b] hover:text-[#080a0f] border border-[#f3d99b]/40 hover:border-[#f3d99b] text-xs font-mono-code font-bold tracking-wider uppercase transition-all shadow-lg cursor-pointer"
          aria-label="Skip intro to video page"
        >
          <span>SKIP INTRO</span>
          <SkipForward className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Dual Stage Container */}
      <main className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center z-10">
        
        {/* Left Column (5 cols): Identity */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
          <div className="space-y-4">
            {/* Step 1: Line 1 */}
            {currentStep >= 1 && (
              <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl tracking-tight text-[#f7f4ec] leading-tight min-h-[50px] sm:min-h-[60px]">
                <span>{line1Prefix}</span>
                <span className="text-[#f3d99b] drop-shadow-[0_0_12px_rgba(243,217,155,0.4)]">{line1Gold}</span>
                {currentStep === 1 && (
                  <span className="inline-block w-2.5 h-7 sm:h-9 bg-[#f3d99b] animate-pulse ml-1 align-middle" />
                )}
              </h1>
            )}

            {/* Step 2: Line 2 - Bold "creator, Concrete maxi" */}
            {currentStep >= 2 && (
              <p className="text-xl sm:text-2xl md:text-3xl text-[#c084fc] font-bold tracking-tight leading-relaxed drop-shadow-[0_0_10px_rgba(168,85,247,0.5)] min-h-[42px]">
                <span>{text2}</span>
                {currentStep === 2 && (
                  <span className="inline-block w-2.5 h-6 sm:h-7 bg-[#c084fc] animate-pulse ml-1 align-middle" />
                )}
              </p>
            )}
          </div>
        </div>

        {/* Right Column (7 cols): Header + Clean White Box + Enter Button Directly Underneath */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center space-y-4 w-full">
          
          {/* Step 3: Top Text above the box: "This is what happened." */}
          <div className="w-full max-w-xl lg:max-w-2xl min-h-[36px] flex items-center justify-start">
            {currentStep >= 3 && (
              <p className="font-heading font-black text-xl sm:text-2xl text-[#f3d99b] tracking-tight drop-shadow-[0_0_12px_rgba(243,217,155,0.4)] animate-in fade-in slide-in-from-top-2 duration-300">
                <span>{text3}</span>
                {currentStep === 3 && (
                  <span className="inline-block w-2.5 h-6 bg-[#f3d99b] animate-pulse ml-1.5 align-middle" />
                )}
              </p>
            )}
          </div>

          {/* Step 4+: Pure Clean White Box with Purple Bold Lines */}
          {currentStep >= 4 && (
            <div className="w-full max-w-xl lg:max-w-2xl bg-white text-[#111827] rounded-sm p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-500 min-h-[320px] flex flex-col justify-between">
              
              <div className="space-y-4">
                {/* Paragraph 1: Bold Purple Lead */}
                {currentStep >= 5 && (
                  <p className="font-heading text-xl sm:text-2xl font-black text-[#6a23b3] tracking-tight leading-snug">
                    <span>{boxP1}</span>
                    {currentStep === 5 && (
                      <span className="inline-block w-2.5 h-6 bg-[#6a23b3] animate-pulse ml-1 align-middle" />
                    )}
                  </p>
                )}

                {/* Paragraph 2: Rich, bold & crisp black text with bold clickable @crypttoji link to X */}
                {currentStep >= 6 && (
                  <p className="text-zinc-950 text-base sm:text-[17px] font-semibold leading-relaxed">
                    {(() => {
                      const p1Len = 14; // "I came across "
                      const linkLen = 10; // "@crypttoji"
                      const totalLinkEnd = p1Len + linkLen;

                      if (boxP2.length <= p1Len) {
                        return (
                          <>
                            <span>{boxP2}</span>
                            {currentStep === 6 && (
                              <span className="inline-block w-2 h-5 bg-zinc-950 animate-pulse ml-1 align-middle" />
                            )}
                          </>
                        );
                      } else if (boxP2.length <= totalLinkEnd) {
                        const part1 = boxP2.slice(0, p1Len);
                        const linkPart = boxP2.slice(p1Len);
                        return (
                          <>
                            <span>{part1}</span>
                            <a
                              href="https://x.com/crypttoji"
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="font-black text-[#6a23b3] hover:text-[#4c1582] underline decoration-[#6a23b3]/50 hover:decoration-[#6a23b3] underline-offset-2 transition-colors inline-flex items-baseline cursor-pointer"
                              title="Visit @crypttoji on X"
                            >
                              {linkPart}
                            </a>
                            {currentStep === 6 && (
                              <span className="inline-block w-2 h-5 bg-[#6a23b3] animate-pulse ml-1 align-middle" />
                            )}
                          </>
                        );
                      } else {
                        const part1 = boxP2.slice(0, p1Len);
                        const part2 = boxP2.slice(totalLinkEnd);
                        return (
                          <>
                            <span>{part1}</span>
                            <a
                              href="https://x.com/crypttoji"
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="font-black text-[#6a23b3] hover:text-[#4c1582] underline decoration-[#6a23b3]/50 hover:decoration-[#6a23b3] underline-offset-2 transition-colors inline-flex items-baseline cursor-pointer"
                              title="Visit @crypttoji on X"
                            >
                              @crypttoji
                            </a>
                            <span>{part2}</span>
                            {currentStep === 6 && (
                              <span className="inline-block w-2 h-5 bg-zinc-950 animate-pulse ml-1 align-middle" />
                            )}
                          </>
                        );
                      }
                    })()}
                  </p>
                )}

                {/* Paragraph 3: Bold Purple */}
                {currentStep >= 7 && (
                  <p className="text-[#6a23b3] font-black text-lg sm:text-xl tracking-tight">
                    <span>{boxP3}</span>
                    {currentStep === 7 && (
                      <span className="inline-block w-2 h-5 bg-[#6a23b3] animate-pulse ml-1 align-middle" />
                    )}
                  </p>
                )}

                {/* Paragraph 4: Rich, bold & crisp black text */}
                {currentStep >= 8 && (
                  <p className="text-zinc-950 text-base sm:text-[17px] font-semibold leading-relaxed">
                    <span>{boxP4}</span>
                    {currentStep === 8 && (
                      <span className="inline-block w-2 h-5 bg-zinc-950 animate-pulse ml-1 align-middle" />
                    )}
                  </p>
                )}

                {/* Paragraph 5: Bold Purple Conclusion */}
                {currentStep >= 9 && (
                  <div className="pt-3 border-t border-zinc-200">
                    <p className="font-heading font-black text-base sm:text-lg text-[#6a23b3] tracking-wide">
                      <span>{boxP5}</span>
                      {currentStep === 9 && (
                        <span className="inline-block w-2.5 h-5 bg-[#6a23b3] animate-pulse ml-1 align-middle" />
                      )}
                    </p>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* Step 10: Enter Button placed directly UNDER the box with reserved space so the box never shifts or shakes */}
          <div className="w-full max-w-xl lg:max-w-2xl flex justify-center sm:justify-start pt-3 min-h-[64px]">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (currentStep >= 10) {
                  onContinue();
                }
              }}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-sm bg-[#f3d99b] hover:bg-white text-[#080a0f] font-mono-code text-xs sm:text-sm font-black tracking-widest uppercase transition-all duration-700 shadow-[0_0_25px_rgba(243,217,155,0.35)] hover:shadow-[0_0_35px_rgba(243,217,155,0.6)] cursor-pointer group ${
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
