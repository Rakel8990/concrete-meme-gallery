import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, SkipForward, ArrowRight } from 'lucide-react';

interface IntroPageProps {
  onEnterGallery: () => void;
  videoUrl: string | null;
  onUploadVideo: (url: string) => void;
}

export const IntroPage: React.FC<IntroPageProps> = ({
  onEnterGallery,
  videoUrl,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0); // 0 to 1
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Default intro stickman fight animation video
  const sampleVideoUrl = 'https://files.catbox.moe/fmrpp0.mp4';
  const currentVideo = videoUrl || sampleVideoUrl;

  // Typewriter effect state
  const fullTitle = "Memes made for Concrete...";
  const fullSubtitle = "Or at least, I tried to make it a little more fun";
  const fullBanner = "Concrete vs. every problem DeFi throws at it";

  const [displayedTitle, setDisplayedTitle] = useState('');
  const [displayedSubtitle, setDisplayedSubtitle] = useState('');
  const [displayedBanner, setDisplayedBanner] = useState('');

  const [isTitleDone, setIsTitleDone] = useState(false);
  const [isSubtitleDone, setIsSubtitleDone] = useState(false);
  const [isBannerDone, setIsBannerDone] = useState(false);
  const [showVideoBox, setShowVideoBox] = useState(false);

  const handleSkip = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    onEnterGallery();
  };

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

  // 1. Title typewriter (70ms per char)
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
    }, 70);

    return () => clearInterval(titleInterval);
  }, []);

  // 2. Subtitle typewriter (50ms per char)
  useEffect(() => {
    if (!isTitleDone) return;
    let index = 0;
    const subtitleInterval = setInterval(() => {
      if (index <= fullSubtitle.length) {
        setDisplayedSubtitle(fullSubtitle.slice(0, index));
        if (index > 0) playKeyClick();
        index++;
      } else {
        clearInterval(subtitleInterval);
        // Pause for 1.2s before banner typing begins
        setTimeout(() => {
          setIsSubtitleDone(true);
        }, 1200);
      }
    }, 50);

    return () => clearInterval(subtitleInterval);
  }, [isTitleDone]);

  // 3. Banner text typewriter (75ms per char)
  useEffect(() => {
    if (!isSubtitleDone) return;
    let index = 0;
    const bannerInterval = setInterval(() => {
      if (index <= fullBanner.length) {
        setDisplayedBanner(fullBanner.slice(0, index));
        if (index > 0) playKeyClick();
        index++;
      } else {
        clearInterval(bannerInterval);
        setIsBannerDone(true);
        // 3 SECONDS PAUSE after banner typing ends before showing video box
        setTimeout(() => {
          setShowVideoBox(true);
        }, 3000);
      }
    }, 75);

    return () => clearInterval(bannerInterval);
  }, [isSubtitleDone]);

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

  // Split title for gold accent on "Concrete..."
  const prefixLength = 11; // "Memes made "
  const titlePrefix = displayedTitle.slice(0, prefixLength);
  const titleGold = displayedTitle.slice(prefixLength);

  // Split banner for yellow accent on "Concrete"
  const bannerConcreteLength = 8; // "Concrete"
  const bannerYellow = displayedBanner.slice(0, bannerConcreteLength);
  const bannerRest = displayedBanner.slice(bannerConcreteLength);

  return (
    <div className="min-h-screen bg-[#080a0f] text-[#f7f4ec] bg-grid-pattern flex flex-col justify-center selection:bg-[#5b1e95] selection:text-[#f3d99b] relative overflow-x-hidden py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-[#5b1e95]/20 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-[#f3d99b]/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Top action: skip button - visible immediately on page open */}
      <div className="absolute top-5 right-5 sm:top-7 sm:right-8 z-20">
        <button
          onClick={handleSkip}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1b1e2b]/90 hover:bg-[#f3d99b] text-[#f3d99b] hover:text-[#080a0f] border border-[#f3d99b]/40 hover:border-[#f3d99b] text-xs font-mono-code font-bold tracking-wider uppercase transition-all shadow-lg cursor-pointer"
          aria-label="Skip to meme gallery"
        >
          <span>SKIP TO GALLERY</span>
          <SkipForward className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Hero Container */}
      <main className="w-full max-w-[1400px] mx-auto px-2 sm:px-6 lg:px-12 py-6 lg:py-10 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column - Hero Text */}
        <div className="lg:col-span-5 flex flex-col items-start justify-center space-y-8 min-h-[360px]">
          {/* Typewriter Heading */}
          <h1 className="font-display-heading text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] text-[#f7f4ec] min-h-[160px]">
            <span>{titlePrefix}</span>
            <span className="text-[#f3d99b]">{titleGold}</span>
            {!isTitleDone && <span className="inline-block w-3 h-10 bg-[#f3d99b] animate-pulse ml-1 align-baseline" />}
          </h1>

          {/* Typewriter Subtitle */}
          <div className="space-y-4 min-h-[90px]">
            {isTitleDone && (
              <p className="text-xl sm:text-2xl lg:text-3xl text-[#a855f7] font-display-heading font-black max-w-xl leading-snug tracking-normal drop-shadow-[0_0_18px_rgba(106,35,179,0.9)]">
                {displayedSubtitle}
                {displayedSubtitle.length < fullSubtitle.length && (
                  <span className="inline-block w-2.5 h-6 bg-[#a855f7] animate-pulse ml-1 align-middle" />
                )}
              </p>
            )}
          </div>

          {/* If video finishes, prompt to proceed */}
          {isVideoEnded && (
            <div className="pt-2 animate-in fade-in zoom-in-95 duration-500">
              <button
                onClick={onEnterGallery}
                className="group relative inline-flex items-center gap-4 px-8 py-4 bg-[#f3d99b] hover:bg-white text-[#080a0f] font-mono-code font-black text-sm tracking-widest uppercase transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-[0_0_30px_rgba(243,217,155,0.5)]"
              >
                <span>ENTER GALLERY</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          )}
        </div>

        {/* Right Column - Video Player Frame & Unified Controls */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center lg:items-end w-full space-y-3">
          
          {/* Top Video Description Banner */}
          <div className={`w-full max-w-xl lg:max-w-2xl flex items-center font-mono-code text-xs bg-[#5b1e95]/30 border border-[#6a23b3]/60 px-4 py-2.5 rounded-sm tracking-wider uppercase shadow-lg min-h-[42px] transition-all duration-500 ${isSubtitleDone ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <span className="font-bold text-[#f7f4ec] text-xs sm:text-sm">
              <span className="text-[#f3d99b]">{bannerYellow}</span>
              <span>{bannerRest}</span>
              {!isBannerDone && (
                <span className="inline-block w-2 h-4 bg-[#f3d99b] animate-pulse ml-1 align-middle" />
              )}
            </span>
          </div>

          {/* Video Player Box - Layout space reserved from start so banner never shifts */}
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
                  <linearGradient id="countdownGlow" x1="0%" y1="0%" x2="100%" y2="100%">
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
                  stroke="url(#countdownGlow)"
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
                  src={currentVideo}
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

          {/* Consolidated Media Controls Bar (Play/Pause & Volume) */}
          <div className={`flex items-center gap-3 bg-[#080a0f]/95 backdrop-blur-md px-4 py-2 border border-[#f3d99b]/50 rounded-full shadow-[0_0_20px_rgba(243,217,155,0.2)] transition-all duration-500 min-h-[48px] ${showVideoBox ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            {/* Play / Pause Toggle */}
            <button
              onClick={togglePlay}
              className="px-3 py-1.5 rounded-full bg-[#f3d99b] hover:bg-white text-[#080a0f] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5 font-mono-code font-bold text-xs shadow uppercase"
              title={isPlaying ? "Pause Video" : "Play Video"}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span>PAUSE</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>PLAY</span>
                </>
              )}
            </button>

            {/* Mute / Unmute Toggle */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 rounded-full bg-[#5b1e95] hover:bg-[#6a23b3] text-[#f7f4ec] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center border border-[#f3d99b]/40 shadow"
              title={isMuted ? "Unmute Audio" : "Mute Audio"}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
          </div>

        </div>
      </main>
    </div>
  );
};
