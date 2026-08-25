import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Map, Play, Pause, Volume2, VolumeX, SkipForward, ArrowRight } from 'lucide-react';

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
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0); // 0 to 1
  const [showEnterMapBtn, setShowEnterMapBtn] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Video source for Material Page
  const materialVideoUrl = 'https://files.catbox.moe/cf9qsz.mp4';

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
  const [showVideoBox, setShowVideoBox] = useState(false);

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
        setTimeout(() => setIsSub1Done(true), 200);
      }
    }, 40);

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
        setTimeout(() => setIsSub2Done(true), 200);
      }
    }, 35);

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
        // 3 SECONDS delay after subtitle typing ends before showing video box
        setTimeout(() => {
          setShowVideoBox(true);
        }, 3000);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [isSub2Done]);

  // Start video playback once showVideoBox triggers
  useEffect(() => {
    if (showVideoBox && videoRef.current) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  }, [showVideoBox]);

  // When video starts playing, reveal the ENTER MAP button after 5 seconds
  useEffect(() => {
    if (showVideoBox) {
      const timer = setTimeout(() => {
        setShowEnterMapBtn(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showVideoBox]);

  // Also ensure enter button is shown if video ends
  useEffect(() => {
    if (isVideoEnded) {
      setShowEnterMapBtn(true);
    }
  }, [isVideoEnded]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const prog = videoRef.current.currentTime / videoRef.current.duration;
      setVideoProgress(Math.min(1, Math.max(0, prog)));
    }
  };

  // Title split: "Everything" / "is material."
  const splitTitleIndex = 11; // "Everything "
  const titlePart1 = displayedTitle.slice(0, splitTitleIndex);
  const titlePart2 = displayedTitle.slice(splitTitleIndex);

  return (
    <div className="min-h-screen bg-[#080a0f] text-[#f7f4ec] selection:bg-[#5b1e95] selection:text-[#f3d99b] bg-grid-pattern flex flex-col justify-between relative overflow-x-hidden py-6 px-4 sm:px-6 lg:px-8">
      
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-[#5b1e95]/20 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-[#f3d99b]/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Top Header Navigation */}
      <nav className="w-full max-w-7xl mx-auto pt-2 pb-4 flex items-center justify-between z-20">
        <button
          onClick={onBackToIntro}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#5b1e95]/30 border border-[#f3d99b]/40 rounded-full text-xs font-mono-code font-bold text-[#f3d99b] hover:bg-[#5b1e95] hover:text-[#ffffff] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO INTRO</span>
        </button>

        {/* Skip button visible immediately upon opening page - Redirects to Map */}
        <button
          onClick={onSkipToMemes}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1b1e2b]/90 hover:bg-[#f3d99b] text-[#f3d99b] hover:text-[#080a0f] border border-[#f3d99b]/40 hover:border-[#f3d99b] text-xs font-mono-code font-bold tracking-wider uppercase transition-all shadow-lg cursor-pointer"
          aria-label="Skip to meme map"
        >
          <span>SKIP TO MAP</span>
          <SkipForward className="w-3.5 h-3.5" />
        </button>
      </nav>

      {/* Main Content Grid */}
      <main className="w-full max-w-7xl mx-auto my-auto py-6 lg:py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center z-10">
        
        {/* Left Column: Heading, Subtitles */}
        <div className="lg:col-span-5 flex flex-col items-start justify-center space-y-6 min-h-[340px]">
          
          {/* Main Title Typewriter */}
          <h1 className="font-display-heading text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] text-[#f7f4ec] min-h-[140px]">
            <span>{titlePart1}</span>
            <br />
            <span className="text-[#f3d99b]">{titlePart2}</span>
            {!isTitleDone && (
              <span className="inline-block w-3 h-10 bg-[#f3d99b] animate-pulse ml-1 align-baseline" />
            )}
          </h1>

          {/* Subtitles sequential typewriter */}
          <div className="space-y-3 min-h-[120px] text-sm sm:text-base">
            {isTitleDone && (
              <p className="font-semibold text-base sm:text-lg text-[#f7f4ec] leading-relaxed">
                <span>{displayedSub1}</span>
                {displayedSub1.length < fullSub1.length && (
                  <span className="inline-block w-2 h-4 bg-[#f7f4ec] animate-pulse ml-1 align-middle" />
                )}
              </p>
            )}

            {isSub1Done && (
              <p className="text-[#a855f7] font-bold text-base sm:text-lg leading-relaxed drop-shadow-[0_0_12px_rgba(168,85,247,0.5)]">
                <span>{displayedSub2}</span>
                {displayedSub2.length < fullSub2.length && (
                  <span className="inline-block w-2 h-4 bg-[#a855f7] animate-pulse ml-1 align-middle" />
                )}
              </p>
            )}

            {isSub2Done && (
              <p className="text-[#a855f7] font-bold text-base sm:text-lg leading-relaxed drop-shadow-[0_0_12px_rgba(168,85,247,0.5)]">
                <span>{displayedSub3}</span>
                {displayedSub3.length < fullSub3.length && (
                  <span className="inline-block w-2 h-4 bg-[#a855f7] animate-pulse ml-1 align-middle" />
                )}
              </p>
            )}
          </div>

        </div>

        {/* Right Column: Video Box + Media Controls + Enter Button Under Video */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center lg:items-end w-full space-y-3.5">

          {/* Video Player Box - Layout space reserved from start so nothing shifts */}
          <div className={`relative w-full max-w-xl lg:max-w-2xl aspect-video group transition-all duration-700 ${showVideoBox ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-[0.98] pointer-events-none'}`}>
            
            {/* Outer Purple Ambient Glow */}
            <div className="absolute -inset-1.5 rounded-sm bg-gradient-to-r from-[#5b1e95] via-[#6a23b3] to-[#5b1e95] opacity-70 blur-xl group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Inner Container */}
            <div className="relative w-full h-full bg-[#080a0f] border border-[#6a23b3]/50 p-2 sm:p-2.5 shadow-2xl flex flex-col justify-between overflow-hidden rounded-sm">
              
              {/* SVG Countdown Light rounding the perimeter of the box */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-30 overflow-visible"
                style={{ filter: 'drop-shadow(0 0 6px #f3d99b) drop-shadow(0 0 14px rgba(243, 217, 155, 0.7))' }}
              >
                <defs>
                  <linearGradient id="countdownGlowMaterial" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f3d99b" />
                    <stop offset="50%" stopColor="#ffd700" />
                    <stop offset="100%" stopColor="#c084fc" />
                  </linearGradient>
                </defs>
                {/* Subtle track outline */}
                <rect
                  x="2"
                  y="2"
                  width="calc(100% - 4px)"
                  height="calc(100% - 4px)"
                  rx="2"
                  fill="none"
                  stroke="#ffffff"
                  strokeOpacity="0.08"
                  strokeWidth="2.5"
                />
                {/* Active glowing countdown perimeter beam */}
                <rect
                  x="2"
                  y="2"
                  width="calc(100% - 4px)"
                  height="calc(100% - 4px)"
                  rx="2"
                  fill="none"
                  stroke="url(#countdownGlowMaterial)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  pathLength="100"
                  strokeDasharray="100"
                  strokeDashoffset={100 - (videoProgress * 100)}
                  style={{
                    transition: isPlaying ? 'stroke-dashoffset 0.15s linear' : 'none'
                  }}
                />
              </svg>

              {/* Corner Frame Tech Accents */}
              <div className="absolute top-1 left-1 w-3.5 h-3.5 border-t-2 border-l-2 border-[#f3d99b] z-20 pointer-events-none" />
              <div className="absolute top-1 right-1 w-3.5 h-3.5 border-t-2 border-r-2 border-[#f3d99b] z-20 pointer-events-none" />
              <div className="absolute bottom-1 left-1 w-3.5 h-3.5 border-b-2 border-l-2 border-[#f3d99b] z-20 pointer-events-none" />
              <div className="absolute bottom-1 right-1 w-3.5 h-3.5 border-b-2 border-r-2 border-[#f3d99b] z-20 pointer-events-none" />

              {/* Video Screen Box */}
              <div className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden rounded-xs">
                <video
                  ref={videoRef}
                  src={materialVideoUrl}
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-contain bg-black"
                  onTimeUpdate={handleTimeUpdate}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => {
                    setIsPlaying(false);
                    setIsVideoEnded(true);
                    setVideoProgress(1);
                  }}
                />
              </div>
            </div>
          </div>

          {/* Under Video Controls Bar & Enter Map Button - Enter on left, Play/Mute on right */}
          <div className="w-full max-w-xl lg:max-w-2xl flex items-center justify-between gap-2.5 sm:gap-3 min-h-[48px]">
            
            {/* Enter Map Button - placed on the left side, appears 5s after video starts playing */}
            <button
              onClick={() => {
                if (showEnterMapBtn) {
                  onEnterMap();
                }
              }}
              className={`inline-flex items-center justify-center gap-2 px-5 py-2 bg-[#f3d99b] text-[#080a0f] font-mono-code font-bold text-xs tracking-widest uppercase transition-all duration-700 hover:bg-[#ffffff] hover:scale-105 cursor-pointer shadow-[0_0_25px_rgba(243,217,155,0.4)] rounded-sm group ${
                showEnterMapBtn
                  ? 'opacity-100 pointer-events-auto translate-y-0'
                  : 'opacity-0 pointer-events-none translate-y-1'
              }`}
            >
              <Map className="w-3.5 h-3.5 text-[#080a0f]" />
              <span>ENTER MAP</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Consolidated Media Controls Bar (Play/Pause & Volume) - on right side */}
            <div className={`flex items-center gap-1.5 bg-[#080a0f]/95 backdrop-blur-md px-2.5 py-1.5 border border-[#f3d99b]/40 rounded-full shadow-[0_0_15px_rgba(243,217,155,0.15)] transition-all duration-500 ${showVideoBox ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
              {/* Play / Pause Toggle */}
              <button
                onClick={togglePlay}
                className="px-2.5 py-1 rounded-full bg-[#f3d99b] hover:bg-white text-[#080a0f] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1 font-mono-code font-bold text-[11px] shadow uppercase"
                title={isPlaying ? "Pause Video" : "Play Video"}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3 h-3 fill-current" />
                    <span>PAUSE</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3 fill-current" />
                    <span>PLAY</span>
                  </>
                )}
              </button>

              {/* Mute / Unmute Toggle */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-1.5 rounded-full bg-[#5b1e95] hover:bg-[#6a23b3] text-[#f7f4ec] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center border border-[#f3d99b]/40 shadow"
                title={isMuted ? "Unmute Audio" : "Mute Audio"}
              >
                {isMuted ? (
                  <VolumeX className="w-3.5 h-3.5" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5" />
                )}
              </button>
            </div>

          </div>

        </div>
      </main>

      {/* Footer minimal line */}
      <footer className="w-full max-w-7xl mx-auto py-2 flex items-center justify-between text-xs font-mono-code text-[#f7f4ec]/40 z-10">
        <span />
        <span />
      </footer>
    </div>
  );
};
