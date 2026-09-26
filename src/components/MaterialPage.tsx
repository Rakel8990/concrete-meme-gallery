import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Map, SkipForward, ArrowRight } from 'lucide-react';

interface MaterialPageProps {
  onBackToIntro: () => void;
  onEnterMap: () => void;
  onSkipToMemes: () => void;
}

export const MaterialPage: React.FC<MaterialPageProps> = ({
  onBackToIntro,
  onEnterMap,
  onSkipToMemes,
}) => {
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Typewriter text parts
  const fullTitle = "Everything is material.";
  const fullSub1 = "Every moment in Concrete becomes part of the culture.";
  const fullSub2 = "And sometimes, it becomes a meme.";
  const fullSub3 = "Nothing goes to waste.";

  const [displayedTitle, setDisplayedTitle] = useState('');
  const [displayedSub1, setDisplayedSub1] = useState('');
  const [displayedSub2, setDisplayedSub2] = useState('');
  const [displayedSub3, setDisplayedSub3] = useState('');

  const [isTitleDone, setIsTitleDone] = useState(false);
  const [isSub1Done, setIsSub1Done] = useState(false);
  const [isSub2Done, setIsSub2Done] = useState(false);
  const [isSub3Done, setIsSub3Done] = useState(false);
  const [showEnterButton, setShowEnterButton] = useState(false);

  // Synthetic click sound for typing effect
  const playKeyClick = () => {
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

      osc.type = 'sine';
      const pitch = 700 + Math.random() * 300;
      osc.frequency.setValueAtTime(pitch, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.025);

      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.025);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.025);
    } catch {
      // Audio context fallback
    }
  };

  // 1. Heading typewriter
  useEffect(() => {
    let index = 0;
    const titleInterval = setInterval(() => {
      if (index <= fullTitle.length) {
        setDisplayedTitle(fullTitle.slice(0, index));
        if (index > 0) playKeyClick();
        index++;
      } else {
        clearInterval(titleInterval);
        setIsTitleDone(true);
      }
    }, 65);

    return () => clearInterval(titleInterval);
  }, []);

  // 2. Subtitle 1 typewriter
  useEffect(() => {
    if (!isTitleDone) return;
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullSub1.length) {
        setDisplayedSub1(fullSub1.slice(0, index));
        if (index > 0) playKeyClick();
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => setIsSub1Done(true), 150);
      }
    }, 35);

    return () => clearInterval(interval);
  }, [isTitleDone]);

  // 3. Subtitle 2 typewriter
  useEffect(() => {
    if (!isSub1Done) return;
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullSub2.length) {
        setDisplayedSub2(fullSub2.slice(0, index));
        if (index > 0) playKeyClick();
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => setIsSub2Done(true), 150);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [isSub1Done]);

  // 4. Subtitle 3 typewriter
  useEffect(() => {
    if (!isSub2Done) return;
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullSub3.length) {
        setDisplayedSub3(fullSub3.slice(0, index));
        if (index > 0) playKeyClick();
        index++;
      } else {
        clearInterval(interval);
        setIsSub3Done(true);
      }
    }, 35);

    return () => clearInterval(interval);
  }, [isSub2Done]);

  // 5. Reveal Enter Map Button after subtitle 3 completes typing
  useEffect(() => {
    if (!isSub3Done) return;
    const timer = setTimeout(() => {
      setShowEnterButton(true);
    }, 350);
    return () => clearTimeout(timer);
  }, [isSub3Done]);

  // Fast forward on click anywhere
  const handleFastForward = () => {
    if (!showEnterButton) {
      setDisplayedTitle(fullTitle);
      setDisplayedSub1(fullSub1);
      setDisplayedSub2(fullSub2);
      setDisplayedSub3(fullSub3);
      setIsTitleDone(true);
      setIsSub1Done(true);
      setIsSub2Done(true);
      setIsSub3Done(true);
      setShowEnterButton(true);
    }
  };

  // Split title: "Everything" / "is material."
  const splitTitleIndex = "Everything\n".length;
  const titlePart1 = displayedTitle.slice(0, Math.min(displayedTitle.length, 10));
  const titlePart2 = displayedTitle.slice(splitTitleIndex);

  return (
    <div
      onClick={handleFastForward}
      className="min-h-screen bg-[#080a0f] text-[#f7f4ec] selection:bg-[#5b1e95] selection:text-[#f3d99b] bg-grid-pattern flex flex-col justify-between relative overflow-x-hidden py-6 px-4 sm:px-6 lg:px-8 cursor-default"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#5b1e95]/20 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#f3d99b]/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Top Header Navigation */}
      <nav className="w-full max-w-6xl mx-auto pt-2 pb-4 flex items-center justify-between z-20">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onBackToIntro();
          }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#5b1e95]/30 border border-[#f3d99b]/40 rounded-full text-xs font-mono-code font-bold text-[#f3d99b] hover:bg-[#5b1e95] hover:text-[#ffffff] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO INTRO</span>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onSkipToMemes();
          }}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1b1e2b]/90 hover:bg-[#f3d99b] text-[#f3d99b] hover:text-[#080a0f] border border-[#f3d99b]/40 hover:border-[#f3d99b] text-xs font-mono-code font-bold tracking-wider uppercase transition-all shadow-lg cursor-pointer"
          aria-label="Skip to meme map"
        >
          <span>SKIP TO MAP</span>
          <SkipForward className="w-3.5 h-3.5" />
        </button>
      </nav>

      {/* Main Centered Content */}
      <main className="w-full max-w-3xl mx-auto my-auto py-10 flex flex-col items-center justify-center text-center space-y-8 z-10">
        {/* Main Title Typewriter */}
        <h1 className="font-display-heading text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] text-[#f7f4ec]">
          <span>{titlePart1}</span>
          <br />
          <span className="text-[#f3d99b]">{titlePart2}</span>
          {!isTitleDone && (
            <span className="inline-block w-3 h-10 bg-[#f3d99b] animate-pulse ml-1 align-baseline" />
          )}
        </h1>

        {/* Subtitles sequential typewriter */}
        <div className="space-y-4 max-w-xl mx-auto text-base sm:text-lg min-h-[100px]">
          {isTitleDone && (
            <p className="font-semibold text-base sm:text-xl text-[#f7f4ec] leading-relaxed">
              <span>{displayedSub1}</span>
              {displayedSub1.length < fullSub1.length && (
                <span className="inline-block w-2 h-4 bg-[#f7f4ec] animate-pulse ml-1 align-middle" />
              )}
            </p>
          )}

          {isSub1Done && (
            <p className="text-[#a855f7] font-bold text-base sm:text-xl leading-relaxed drop-shadow-[0_0_12px_rgba(168,85,247,0.5)]">
              <span>{displayedSub2}</span>
              {displayedSub2.length < fullSub2.length && (
                <span className="inline-block w-2 h-4 bg-[#a855f7] animate-pulse ml-1 align-middle" />
              )}
            </p>
          )}

          {isSub2Done && (
            <p className="text-[#a855f7] font-bold text-base sm:text-xl leading-relaxed drop-shadow-[0_0_12px_rgba(168,85,247,0.5)]">
              <span>{displayedSub3}</span>
              {displayedSub3.length < fullSub3.length && (
                <span className="inline-block w-2 h-4 bg-[#a855f7] animate-pulse ml-1 align-middle" />
              )}
            </p>
          )}
        </div>

        {/* Enter Map Action - Appears only after all lines finish typing */}
        <div className="pt-4 min-h-[64px] flex items-center justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEnterMap();
            }}
            tabIndex={showEnterButton ? 0 : -1}
            className={`inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-[#f3d99b] text-[#080a0f] font-mono-code font-bold text-xs sm:text-sm tracking-widest uppercase transition-all duration-400 ease-out shadow-[0_0_30px_rgba(243,217,155,0.45)] rounded-sm group cursor-pointer ${
              showEnterButton
                ? 'opacity-100 pointer-events-auto translate-y-0 hover:bg-[#ffffff] hover:scale-105'
                : 'opacity-0 pointer-events-none translate-y-3'
            }`}
          >
            <Map className="w-4 h-4 text-[#080a0f]" />
            <span>ENTER MAP</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </main>

      {/* Footer minimal spacer */}
      <footer className="w-full max-w-6xl mx-auto py-2 flex items-center justify-between text-xs font-mono-code text-[#f7f4ec]/40 z-10">
        <span />
        <span />
      </footer>
    </div>
  );
};
