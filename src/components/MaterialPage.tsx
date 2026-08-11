import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Map, Play, Pause, Volume2, VolumeX, Film, ChevronRight } from 'lucide-react';

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
  // Typing effect for "Everything is material."
  const headingLine1 = "Everything";
  const headingLine2 = "is material.";
  const [typedLine1, setTypedLine1] = useState('');
  const [typedLine2, setTypedLine2] = useState('');
  const [isLine1Done, setIsLine1Done] = useState(false);
  const [isHeadingDone, setIsHeadingDone] = useState(false);

  // Sequential visibility states
  const [showVideoBox, setShowVideoBox] = useState(false);
  const [showEnterMapBtn, setShowEnterMapBtn] = useState(false);

  // Upcoming sample video state
  const sampleUpcomingVideo = 'https://files.catbox.moe/fmrpp0.mp4';
  const [isSamplePlaying, setIsSamplePlaying] = useState(false);
  const [isSampleMuted, setIsSampleMuted] = useState(true);
  const sampleVideoRef = useRef<HTMLVideoElement>(null);

  // Typewriter effect logic
  useEffect(() => {
    let index = 0;
    const interval1 = setInterval(() => {
      if (index <= headingLine1.length) {
        setTypedLine1(headingLine1.slice(0, index));
        index++;
      } else {
        clearInterval(interval1);
        setIsLine1Done(true);
      }
    }, 60);

    return () => clearInterval(interval1);
  }, []);

  useEffect(() => {
    if (!isLine1Done) return;
    let index = 0;
    const interval2 = setInterval(() => {
      if (index <= headingLine2.length) {
        setTypedLine2(headingLine2.slice(0, index));
        index++;
      } else {
        clearInterval(interval2);
        setIsHeadingDone(true);
      }
    }, 60);

    return () => clearInterval(interval2);
  }, [isLine1Done]);

  // Sequence video box and enter map button after typewriter completes
  useEffect(() => {
    if (isHeadingDone) {
      const timer1 = setTimeout(() => setShowVideoBox(true), 250);
      const timer2 = setTimeout(() => setShowEnterMapBtn(true), 600);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [isHeadingDone]);

  const toggleSamplePlay = () => {
    if (!sampleVideoRef.current) return;
    if (isSamplePlaying) {
      sampleVideoRef.current.pause();
      setIsSamplePlaying(false);
    } else {
      sampleVideoRef.current.play();
      setIsSamplePlaying(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#080a0f] text-[#f7f4ec] selection:bg-[#5b1e95] selection:text-[#f3d99b] bg-grid-pattern flex flex-col justify-between relative overflow-hidden">
      {/* Top Header Bar */}
      <nav className="w-full max-w-7xl mx-auto px-6 lg:px-12 pt-8 pb-4 flex items-center justify-between border-b border-[#f7f4ec]/10 z-10">
        <button
          onClick={onBackToIntro}
          className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#5b1e95]/30 border border-[#f3d99b]/40 rounded text-xs font-mono-code font-bold text-[#f3d99b] hover:bg-[#5b1e95] hover:text-[#ffffff] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO INTRO</span>
        </button>

        <div className="font-mono-code text-xs text-[#f3d99b] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#f3d99b] animate-pulse" />
          <span>MATERIAL STAGE</span>
          <button
            onClick={onSkipToMemes}
            className="ml-4 text-xs underline text-[#f7f4ec]/60 hover:text-[#f3d99b] transition-colors cursor-pointer"
          >
            Skip to Memes →
          </button>
        </div>
      </nav>

      {/* Hero Section: Typewriter Heading & Upcoming Video Stream */}
      <main className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-12 my-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center z-10">
        <div className="lg:col-span-7 space-y-6">
          <div className="font-mono-code text-xs text-[#f3d99b] uppercase tracking-widest flex items-center gap-2">
            CONCRETE ARCHIVE MANIFESTO
          </div>

          <h1 className="font-display-heading text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none text-[#f7f4ec] min-h-[140px]">
            <span>{typedLine1}</span>
            <br />
            <span className="text-[#f3d99b]">{typedLine2}</span>
            {!isHeadingDone && (
              <span className="inline-block w-3 h-10 bg-[#f3d99b] animate-pulse ml-1 align-baseline" />
            )}
          </h1>

          <p className="text-sm sm:text-base text-[#f7f4ec]/70 font-light max-w-xl leading-relaxed">
            Every meme, reaction, and shitpost is a brick in the Concrete ecosystem. Proceed into the 6-Node Map Matrix to navigate categories and creator archives.
          </p>

          {/* Enter Map Action Button */}
          {showEnterMapBtn && (
            <div className="pt-4 animate-fade-in flex items-center gap-4">
              <button
                onClick={onEnterMap}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-[#f3d99b] text-[#080a0f] font-mono-code font-bold text-sm tracking-widest uppercase transition-all duration-300 hover:bg-[#ffffff] hover:scale-105 cursor-pointer shadow-[0_0_25px_rgba(243,217,155,0.4)] rounded-sm"
              >
                <Map className="w-4 h-4 text-[#080a0f]" />
                <span>ENTER MAP (6 NODES)</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          )}
        </div>

        {/* Upcoming Video Box */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          {showVideoBox && (
            <div className="w-full max-w-md bg-[#080a0f] border-2 border-[#6a23b3] p-4 shadow-2xl relative group transition-all duration-500 animate-fade-in rounded-sm">
              <div className="flex items-center justify-between font-mono-code text-[11px] text-[#f3d99b] uppercase tracking-wider mb-2.5 border-b border-[#6a23b3]/60 pb-2">
                <span className="flex items-center gap-1.5 font-bold">
                  <Film className="w-3.5 h-3.5 text-[#f3d99b]" />
                  UPCOMING VIDEO STREAM
                </span>
                <span className="text-[#a855f7] text-[10px] bg-[#5b1e95]/40 px-2 py-0.5 rounded font-bold">
                  SAMPLE TEASER
                </span>
              </div>

              {/* Video Player Frame */}
              <div className="relative aspect-video bg-black border border-[#5b1e95]/80 overflow-hidden rounded-sm flex items-center justify-center">
                <video
                  ref={sampleVideoRef}
                  src={sampleUpcomingVideo}
                  muted={isSampleMuted}
                  playsInline
                  loop
                  className="w-full h-full object-cover"
                  onPlay={() => setIsSamplePlaying(true)}
                  onPause={() => setIsSamplePlaying(false)}
                />

                {!isSamplePlaying && (
                  <button
                    onClick={toggleSamplePlay}
                    className="absolute inset-0 bg-black/50 hover:bg-black/30 flex items-center justify-center transition-colors cursor-pointer group-hover:scale-105"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#f3d99b] text-[#080a0f] flex items-center justify-center shadow-lg">
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    </div>
                  </button>
                )}

                <div className="absolute bottom-2 right-2 flex items-center gap-1.5 bg-black/80 backdrop-blur-md p-1 rounded border border-[#f3d99b]/30">
                  <button
                    onClick={toggleSamplePlay}
                    className="p-1 text-[#f3d99b] hover:text-white cursor-pointer"
                  >
                    {isSamplePlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                  </button>
                  <button
                    onClick={() => setIsSampleMuted(!isSampleMuted)}
                    className="p-1 text-[#f3d99b] hover:text-white cursor-pointer"
                  >
                    {isSampleMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                  </button>
                </div>
              </div>

              <div className="mt-2.5 text-[11px] font-mono-code text-[#f7f4ec]/60 flex items-center justify-between">
                <span>CONCRETE DEFI WARFARE #02</span>
                <span className="text-[#f3d99b] font-bold">COMING SOON</span>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer bar */}
      <footer className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-4 border-t border-[#f7f4ec]/10 flex items-center justify-between text-xs font-mono-code text-[#f7f4ec]/40 z-10">
        <span>CONCRETE DEFI ARCHIVE v2.0</span>
        <span>MATERIAL STAGE</span>
      </footer>
    </div>
  );
};
