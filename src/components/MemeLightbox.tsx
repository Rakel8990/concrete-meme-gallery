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
        <img src={meme.imageUrl} alt={meme.title} />
        <div className="meme-viewer__bottom-info">
          <span className="meme-viewer__counter">
            {String(index + 1).padStart(2, '0')} / {String(memes.length).padStart(2, '0')}
          </span>
          {isLastImage && (
            <button
              onClick={handleReturnToMap}
              className="meme-viewer__stage-map-btn"
              title="Return to route map"
            >
              <Map className="w-3.5 h-3.5" />
              <span>RETURN TO MAP</span>
            </button>
          )}
        </div>
      </div>

      {hasNext ? (
        <button
          className="meme-viewer__arrow meme-viewer__arrow--right"
          onClick={next}
          aria-label="Next meme"
        >
          <ChevronRight />
        </button>
      ) : (
        <button
          className="meme-viewer__map-nav-btn"
          onClick={handleReturnToMap}
          aria-label="Return to route map"
          title="Return to route map"
        >
          <Map className="w-4 h-4" />
          <span>MAP</span>
        </button>
      )}
    </div>
  );
};

