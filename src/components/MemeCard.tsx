import React from 'react';
import { Maximize2 } from 'lucide-react';
import { Meme } from '../types';

interface MemeCardProps {
  meme: Meme;
  onClick: (meme: Meme) => void;
}

export const MemeCard: React.FC<MemeCardProps> = ({ meme, onClick }) => (
  <button
    id={`meme-card-${meme.id}`}
    type="button"
    className="masonry-tile group"
    onClick={() => onClick(meme)}
    aria-label={`Open ${meme.title}`}
  >
    <img src={meme.imageUrl} alt={meme.title} loading="lazy" referrerPolicy="no-referrer" />
    <span className="masonry-tile__caption">
      <span>#{meme.number}</span>
      <Maximize2 aria-hidden="true" />
    </span>
  </button>
);
