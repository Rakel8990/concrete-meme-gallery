import React, { useRef } from 'react';
import { Maximize2, Play } from 'lucide-react';
import { Meme } from '../types';

interface MemeCardProps {
  meme: Meme;
  onClick: (meme: Meme) => void;
  index?: number;
}

export const MemeCard: React.FC<MemeCardProps> = ({ meme, onClick, index }) => {
  const isVideo = meme.mediaType === 'video' || !!meme.videoUrl || meme.imageUrl.endsWith('.mp4');
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const currentNum = parseInt(meme.number || '1', 10);
  const nextNum = currentNum < 48 ? (currentNum + 1).toString().padStart(2, '0') : null;
  // Sequential flowing wave across the grid (repeats smoothly)
  const staggerDelay = `${((currentNum - 1) % 6) * -0.45}s`;

  // Staggered entrance timing when entering the gallery (cascading wave capped at 16)
  const entranceDelay = index !== undefined ? `${Math.min(index, 16) * 45}ms` : undefined;

  return (
    <div
      id={`meme-card-${meme.id}`}
      style={entranceDelay ? { animationDelay: entranceDelay } : undefined}
      className="masonry-tile meme-floating-card gallery-stagger-item group relative block w-full text-left cursor-pointer select-none"
      onClick={() => onClick(meme)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(meme);
        }
      }}
      aria-label={`Open meme #${meme.number}: ${meme.title}`}
    >
      {/* Floating Atmospheric Shadow underneath */}
      <div className="meme-float-shadow" aria-hidden="true" />

      {/* Inter-Card Connecting Light Line: Horizontal (Flowing continuously between memes) */}
      <div className="meme-bridge-h" aria-hidden="true">
        <div className="meme-bridge-track-h">
          <div
            className="meme-bridge-beam-h"
            style={{ animationDelay: staggerDelay }}
          />
        </div>
      </div>

      {/* Inter-Card Connecting Light Line: Vertical (Flowing continuously down between memes) */}
      <div className="meme-bridge-v" aria-hidden="true">
        <div className="meme-bridge-track-v">
          <div
            className="meme-bridge-beam-v"
            style={{ animationDelay: staggerDelay }}
          />
        </div>
      </div>

      {/* Row-End Jumper Conduit (Loops energy around the corner to the next row) */}
      <div className="meme-bridge-elbow" aria-hidden="true">
        <div className="meme-bridge-elbow-pulse" />
      </div>

      {/* Pure Floating Media (No boxes, no frames, weightless presence) */}
      <div className="relative w-full rounded-2xl overflow-hidden shadow-[0_12px_36px_rgba(0,0,0,0.7)] group-hover:shadow-[0_24px_65px_rgba(0,0,0,0.92),0_0_30px_rgba(243,217,155,0.2)] group-hover:scale-[1.03] transition-all duration-400 ease-out">
        {isVideo ? (
          <div className="relative w-full overflow-hidden bg-black/85">
            <video
              ref={videoRef}
              src={meme.videoUrl || meme.imageUrl}
              preload="metadata"
              muted
              loop
              playsInline
              className="block w-full h-auto object-cover"
            />
            <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-sm border border-purple-400/30 text-purple-200 text-[9px] font-mono-code font-bold pointer-events-none shadow">
              <Play className="w-2 h-2 fill-current" />
              <span>VIDEO</span>
            </div>
          </div>
        ) : (
          <img
            src={meme.imageUrl}
            alt={meme.title}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="block w-full h-auto object-cover"
          />
        )}
      </div>

      {/* Floating Clean Caption & Next Conduit */}
      <div className="pt-2 px-1 flex items-center justify-between gap-1.5 sm:gap-2 font-mono-code text-[10px] sm:text-[11px] relative z-10">
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-[#f3d99b] shadow-[0_0_6px_#f3d99b] animate-pulse" />
          <span className="text-[#f3d99b] font-bold">#{meme.number.padStart(2, '0')}</span>
          <span className="text-zinc-300 font-medium truncate max-w-[70px] sm:max-w-[130px] group-hover:text-white transition-colors">
            {meme.title}
          </span>
        </div>

        {/* Flowing Laser Line Connecting to the Next Node */}
        <div className="flex-1 flex items-center gap-1 min-w-[20px]">
          <div className="relative flex-1 h-[1px] bg-white/[0.08] rounded-full overflow-hidden min-w-[12px]">
            <div
              className="absolute top-0 bottom-0 w-6 bg-gradient-to-r from-transparent via-[#f3d99b] to-[#c084fc] shadow-[0_0_4px_#f3d99b]"
              style={{
                animation: 'conduit-flow 2.2s linear infinite',
                animationDelay: staggerDelay,
              }}
            />
          </div>
          {nextNum ? (
            <span className="text-[8px] sm:text-[9px] text-zinc-500 font-bold tracking-wider shrink-0 group-hover:text-[#f3d99b] transition-colors">
              ➔ #{nextNum}
            </span>
          ) : (
            <span className="text-[8px] sm:text-[9px] text-[#f3d99b] font-bold tracking-wider shrink-0">
              END
            </span>
          )}
        </div>

        <Maximize2 className="w-3.5 h-3.5 text-zinc-500 group-hover:text-[#f3d99b] shrink-0 transition-colors group-hover:scale-110" />
      </div>
    </div>
  );
};
