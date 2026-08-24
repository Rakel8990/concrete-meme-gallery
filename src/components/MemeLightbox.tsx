import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Meme } from '../types';

interface MemeLightboxProps { memes: Meme[]; index: number; onClose: () => void; onChange: (index: number) => void; }

export const MemeLightbox: React.FC<MemeLightboxProps> = ({ memes, index, onClose, onChange }) => {
  const [startX, setStartX] = useState<number | null>(null);
  const previousOverflow = useRef('');
  const meme = memes[index];
  useEffect(() => { if (!meme) return; previousOverflow.current = document.body.style.overflow; document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = previousOverflow.current; }; }, [meme]);
  useEffect(() => { const key = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); if (e.key === 'ArrowLeft') onChange((index - 1 + memes.length) % memes.length); if (e.key === 'ArrowRight') onChange((index + 1) % memes.length); }; window.addEventListener('keydown', key); return () => window.removeEventListener('keydown', key); }, [index, memes.length, onChange, onClose]);
  if (!meme) return null;
  const previous = () => onChange((index - 1 + memes.length) % memes.length);
  const next = () => onChange((index + 1) % memes.length);
  return <div className="meme-viewer" role="dialog" aria-modal="true" aria-label={`Viewing meme ${index + 1} of ${memes.length}`} onTouchStart={(e) => setStartX(e.touches[0].clientX)} onTouchEnd={(e) => { if (startX === null) return; const delta = e.changedTouches[0].clientX - startX; if (Math.abs(delta) > 45) delta > 0 ? previous() : next(); setStartX(null); }}>
    <button className="meme-viewer__close" onClick={onClose} aria-label="Close viewer"><X /></button>
    <button className="meme-viewer__arrow meme-viewer__arrow--left" onClick={previous} aria-label="Previous meme"><ChevronLeft /></button>
    <div className="meme-viewer__stage"><img src={meme.imageUrl} alt={meme.title} /><span className="meme-viewer__counter">{String(index + 1).padStart(2, '0')} / {String(memes.length).padStart(2, '0')}</span></div>
    <button className="meme-viewer__arrow meme-viewer__arrow--right" onClick={next} aria-label="Next meme"><ChevronRight /></button>
  </div>;
};
