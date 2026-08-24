import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, ArrowDown, Volume2, VolumeX, SkipForward, ArrowRight } from 'lucide-react';

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Default intro stickman fight animation video
  const sampleVideoUrl = 'https://files.catbox.moe/fmrpp0.mp4';
  const currentVideo = videoUrl || sampleVideoUrl;

  // Typewriter effect state
  const fullTitle = "Memes made Concrete...";
  const fullSubtitle = "Or at least, I tried to make it a little more fun";
  const fullBanner = "Concrete vs. every problem DeFi throws at it";

  const [displayedTitle, setDisplayedTitle] = useState('');
  const [displayedSubtitle, setDisplayedSubtitle] = useState('');
  const [displayedBanner, setDisplayedBanner] = useState('');

  const [isTitleDone, setIsTitleDone] = useState(false);
  const [isSubtitleDone, setIsSubtitleDone] = useState(false);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const handleSkip = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    onEnterGallery();
  };

  // Synthetic click sound for typing effect
  const playKeyClick = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
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
      // Slight pitch variation for authentic mechanical typing feel
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
      // Audio context fallbacks
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
        // Pause for 1.2s so users can read before banner typing begins
        setTimeout(() => {
          setIsSubtitleDone(true);
        }, 1200);
      }
    }, 50);

    return () => clearInterval(subtitleInterval);
  }, [isTitleDone]);

  // 3. Banner text typewriter (Starts after subtitle pause is done, 75ms)
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
        setIsTypingComplete(true);
      }
    }, 75);

    return () => clearInterval(bannerInterval);
  }, [isSubtitleDone]);

  // Start video playback once ALL typing completes
  useEffect(() => {
    if (isTypingComplete && videoRef.current) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Fallback if browser policy requires user interaction
        setIsPlaying(false);
      });
    }
  }, [isTypingComplete]);

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

  // Split title for gold accent on "Concrete..."
  const prefixLength = 11; // "Memes made "
  const titlePrefix = displayedTitle.slice(0, prefixLength);
  const titleGold = displayedTitle.slice(prefixLength);

  // Split banner for yellow accent on "Concrete"
  const bannerConcreteLength = 8; // "Concrete"
  const bannerYellow = displayedBanner.slice(0, bannerConcreteLength);
  const bannerRest = displayedBanner.slice(bannerConcreteLength);

  return (
    <div className="min-h-screen bg-[#080a0f] text-[#f7f4ec] bg-grid-pattern flex flex-col justify-center selection:bg-[#5b1e95] selection:text-[#f3d99b] relative overflow-x-hidden py-12">
      {/* Top HUD bar with Quick Skip Video button */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-8 z-30">
        <button
          onClick={handleSkip}
          className="group inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 bg-[#080a0f]/80 hover:bg-[#f3d99b] text-[#f3d99b] hover:text-[#080a0f] border border-[#f3d99b]/40 hover:border-[#f3d99b] font-mono-code font-bold text-xs tracking-widest uppercase rounded-sm transition-all duration-200 shadow-[0_0_15px_rgba(243,217,155,0.15)] hover:shadow-[0_0_20px_rgba(243,217,155,0.4)] cursor-pointer"
          title="Skip video and enter gallery directly"
        >
          <span>SKIP VIDEO</span>
          <SkipForward className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* Main Hero Container */}
      <main className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 py-6 lg:py-10 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
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

          {/* CTA Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {isVideoEnded ? (
              <div className="animate-fade-in">
                <button
                  onClick={onEnterGallery}
                  className="group relative inline-flex items-center gap-4 px-8 py-4 bg-[#f3d99b] text-[#080a0f] font-mono-code font-bold text-sm tracking-widest uppercase transition-all duration-300 hover:bg-[#ffffff] hover:scale-105 active:scale-95 cursor-pointer shadow-[0_0_25px_rgba(243,217,155,0.5)]"
                >
                  <span>ENTER GALLERY</span>
                  <ArrowDown className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-1" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleSkip}
                className="group inline-flex items-center gap-2.5 px-5 py-2.5 bg-[#5b1e95]/40 hover:bg-[#5b1e95] text-[#f7f4ec] hover:text-[#f3d99b] border border-[#6a23b3] hover:border-[#f3d99b] font-mono-code font-semibold text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer rounded-sm"
              >
                <span>Skip to Gallery</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            )}
          </div>
        </div>

        {/* Right Column - Video Player Frame & Controls */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center lg:items-end w-full space-y-3">
          {/* Top Video Description Banner - appears when subtitle is done */}
          {isSubtitleDone && (
            <div className="w-full max-w-xl lg:max-w-2xl flex items-center font-mono-code text-xs bg-[#5b1e95]/30 border border-[#6a23b3]/60 px-4 py-2.5 rounded-sm tracking-wider uppercase shadow-lg min-h-[42px] transition-all duration-500">
              <span className="font-bold text-[#f7f4ec] text-xs sm:text-sm">
                <span className="text-[#f3d99b]">{bannerYellow}</span>
                <span>{bannerRest}</span>
                {!isTypingComplete && (
                  <span className="inline-block w-2 h-4 bg-[#f3d99b] animate-pulse ml-1 align-middle" />
                )}
              </span>
            </div>
          )}

          {/* Video Player Box - appears when banner starts typing */}
          {isSubtitleDone && (
            <div className="relative w-full max-w-xl lg:max-w-2xl aspect-video group transition-all duration-700">
              {/* Outer Purple Gradient Glow Frame */}
              <div className="absolute -inset-1 rounded-sm bg-gradient-to-r from-[#5b1e95] via-[#6a23b3] to-[#5b1e95] opacity-60 blur-xl group-hover:opacity-100 transition-opacity duration-500" />

              {/* Inner Container */}
              <div className="relative w-full h-full bg-[#080a0f] border-2 border-[#6a23b3]/80 p-2 sm:p-3 shadow-2xl flex flex-col justify-between overflow-hidden">
                {/* Corner Frame Accents */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#f3d99b] z-20 pointer-events-none" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#f3d99b] z-20 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#f3d99b] z-20 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#f3d99b] z-20 pointer-events-none" />

                {/* Video Screen Box */}
                <div className="relative w-full h-full bg-black border border-[#5b1e95]/60 flex items-center justify-center overflow-hidden">
                  <video
                    ref={videoRef}
                    src={currentVideo}
                    muted={isMuted}
                    playsInline
                    className="w-full h-full object-contain bg-black"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onEnded={() => {
                      setIsPlaying(false);
                      setIsVideoEnded(true);
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Minimal Compact Controls Bar OUTSIDE the video box */}
          {isSubtitleDone && (
            <div className="flex items-center gap-2 bg-[#080a0f]/90 backdrop-blur-md px-3 py-1.5 border border-[#f3d99b]/40 rounded-full shadow-xl">
              {/* Play / Pause Toggle Button */}
              <button
                onClick={togglePlay}
                className="p-1.5 rounded-full bg-[#f3d99b] text-[#080a0f] hover:scale-110 active:scale-95 transition-transform cursor-pointer flex items-center justify-center shadow"
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause className="w-3 h-3 fill-current" />
                ) : (
                  <Play className="w-3 h-3 fill-current" />
                )}
              </button>

              {/* Mute / Unmute Toggle Button */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-1.5 rounded-full bg-[#5b1e95] text-[#f7f4ec] hover:scale-110 active:scale-95 transition-transform cursor-pointer flex items-center justify-center border border-[#f3d99b]/40 shadow"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? (
                  <VolumeX className="w-3 h-3" />
                ) : (
                  <Volume2 className="w-3 h-3" />
                )}
              </button>

              {/* Skip video button in controls bar */}
              <button
                onClick={handleSkip}
                className="px-2.5 py-1 rounded-full bg-[#1b1e2b] hover:bg-[#f3d99b] text-[#f3d99b] hover:text-[#080a0f] border border-[#f3d99b]/30 hover:border-[#f3d99b] text-[10px] font-mono-code font-bold tracking-wider uppercase transition-all cursor-pointer flex items-center gap-1 shadow"
                title="Skip video & enter gallery"
              >
                <span>SKIP</span>
                <SkipForward className="w-2.5 h-2.5" />
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

