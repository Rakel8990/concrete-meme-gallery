import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X, Map } from 'lucide-react';
import { Meme } from '../types';

interface MemeLightboxProps {
  memes: Meme[];
  index: number;
  onClose: () => void;
  onChange: (index: number) => void;
  onBackToMap?: () => void;
}

export const MemeLightbox: React.FC<MemeLightboxProps> = ({
  memes,
  index,
  onClose,
  onChange,
  onBackToMap,
}) => {
  const [startX, setStartX] = useState<number | null>(null);
  const previousOverflow = useRef('');
  const meme = memes[index];

  const hasPrevious = index > 0;
  const hasNext = index < memes.length - 1;
  const isLastImage = index === memes.length - 1 && memes.length > 0;
  const isVideo = meme?.mediaType === 'video' || !!meme?.videoUrl || meme?.imageUrl?.endsWith('.mp4');

  useEffect(() => {
    if (!meme) return;
    previousOverflow.current = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow.current;
    };
  }, [meme]);

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrevious) onChange(index - 1);
      if (e.key === 'ArrowRight' && hasNext) onChange(index + 1);
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, [index, hasPrevious, hasNext, memes.length, onChange, onClose]);

  if (!meme) return null;

  const previous = () => {
    if (hasPrevious) {
      onChange(index - 1);
    }
  };

  const next = () => {
    if (hasNext) {
      onChange(index + 1);
    }
  };

  const handleReturnToMap = () => {
    if (onBackToMap) {
      onBackToMap();
    } else {
      onClose();
    }
  };

  return (
    <div
      className="meme-viewer"
      role="dialog"
      aria-modal="true"
      aria-label={`Viewing meme ${index + 1} of ${memes.length}`}
      onTouchStart={(e) => setStartX(e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (startX === null) return;
        const delta = e.changedTouches[0].clientX - startX;
        if (Math.abs(delta) > 45) {
          if (delta > 0) previous();
          else if (hasNext) next();
        }
        setStartX(null);
      }}
    >
      <button className="meme-viewer__close" onClick={onClose} aria-label="Close viewer">
        <X />
      </button>

      {hasPrevious && (
        <button
          className="meme-viewer__arrow meme-viewer__arrow--left"
          onClick={previous}
          aria-label="Previous meme"
        >
          <ChevronLeft />
        </button>
      )}

      <div className="meme-viewer__stage">
        {isVideo ? (
          <video
            key={meme.id}
            src={meme.videoUrl || meme.imageUrl}
            controls
            autoPlay
            playsInline
            loop
            className="max-w-full max-h-[calc(100svh-6.5rem)] w-auto h-auto rounded border border-[#6a23b3]/40 shadow-2xl bg-black"
          />
        ) : (
          <img src={meme.imageUrl} alt={meme.title} />
        )}
        <div className="meme-viewer__bottom-info flex items-center justify-center gap-3">
          <span className="meme-viewer__counter">
            {String(index + 1).padStart(2, '0')} / {String(memes.length).padStart(2, '0')}
          </span>
          <span className="text-zinc-400 font-mono-code text-[11px] font-bold tracking-wider uppercase bg-black/60 px-2 py-0.5 rounded border border-white/10 max-w-[280px] sm:max-w-md truncate">
            #{meme.number} {meme.title}
          </span>
        </div>
      </div>

      {hasNext && (
        <button
          className="meme-viewer__arrow meme-viewer__arrow--right"
          onClick={next}
          aria-label="Next meme"
        >
          <ChevronRight />
        </button>
      )}
    </div>
  );
};

