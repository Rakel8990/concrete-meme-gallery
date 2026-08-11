import React, { useState } from 'react';
import {
  Heart,
  Edit2,
  Maximize2,
  Trash2,
  MoreVertical,
  Award,
  Flame,
  ArrowRightLeft,
} from 'lucide-react';
import { Meme, MemeCategory } from '../types';

interface MemeCardProps {
  meme: Meme;
  onView?: (meme: Meme) => void;
  onClick?: (meme: Meme) => void;
  onEdit?: (meme: Meme) => void;
  onDelete?: (id: string) => void;
  onLike?: (id: string) => void;
  onCategoryChange?: (id: string, newCategory: MemeCategory) => void;
}

export const MemeCard: React.FC<MemeCardProps> = ({
  meme,
  onView,
  onClick,
  onEdit,
  onDelete,
  onLike,
  onCategoryChange,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleCardClick = () => {
    if (onClick) onClick(meme);
    else if (onView) onView(meme);
  };

  const getCategoryBadge = (cat: MemeCategory) => {
    switch (cat) {
      case 'premium':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold text-xs backdrop-blur-md">
            <Award className="w-3 h-3 text-amber-400" />
            Premium
          </span>
        );
      case 'dedication':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold text-xs backdrop-blur-md">
            <Award className="w-3 h-3 text-purple-400" />
            Dedication
          </span>
        );
      case 'normal':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/40 font-semibold text-xs backdrop-blur-md">
            <Flame className="w-3 h-3 text-sky-400" />
            Normal
          </span>
        );
      case 'trash':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 font-semibold text-xs backdrop-blur-md">
            <Trash2 className="w-3 h-3 text-rose-400" />
            Trash
          </span>
        );
    }
  };

  return (
    <div
      id={`meme-card-${meme.id}`}
      className="group relative bg-[#080a0f] rounded-lg border border-[#5b1e95]/40 hover:border-[#f3d99b]/60 overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl flex flex-col justify-between"
    >
      {/* Top Banner overlay with Number & Category Badges */}
      <div className="relative aspect-[16/11] min-h-[240px] sm:min-h-[280px] w-full bg-black overflow-hidden cursor-pointer" onClick={handleCardClick}>
        {/* Number Badge */}
        <div className="absolute top-2.5 left-2.5 z-10">
          <span className="px-2 py-0.5 rounded bg-[#080a0f]/90 text-[#f3d99b] font-mono-code font-bold text-xs border border-[#f3d99b]/40 backdrop-blur-md">
            #{meme.number}
          </span>
        </div>

        {/* Category Badge */}
        <div className="absolute top-2.5 right-2.5 z-10">
          {getCategoryBadge(meme.category)}
        </div>

        {/* Meme Image */}
        {!imageError ? (
          <img
            src={meme.imageUrl}
            alt={meme.title}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-[#080a0f] text-slate-500 text-center">
            <span className="text-3xl mb-2">🧱</span>
            <p className="text-xs font-semibold text-slate-400">{meme.title}</p>
          </div>
        )}

        {/* Meme Text Overlay if edited */}
        {(meme.topText || meme.bottomText) && (
          <div className="absolute inset-0 p-3 flex flex-col justify-between pointer-events-none text-center uppercase font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] tracking-wider leading-tight text-xs sm:text-sm">
            <span>{meme.topText}</span>
            <span>{meme.bottomText}</span>
          </div>
        )}

        {/* Hover overlay with View icon */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button className="p-2.5 rounded-full bg-[#f3d99b] text-[#080a0f] font-bold shadow-xl transform scale-90 group-hover:scale-100 transition-transform cursor-pointer">
            <Maximize2 className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* Card Content Details */}
      <div className="p-3.5 flex-1 flex flex-col justify-between bg-[#080a0f]">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-bold text-[#f7f4ec] text-sm leading-snug group-hover:text-[#f3d99b] transition-colors line-clamp-1">
              {meme.title}
            </h3>

            {(onEdit || onDelete || onCategoryChange) && (
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMenu(!showMenu);
                  }}
                  className="p-1 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <MoreVertical className="w-3.5 h-3.5" />
                </button>

                {showMenu && (
                  <div
                    className="absolute right-0 top-6 z-20 w-44 bg-[#080a0f] border border-[#5b1e95]/60 rounded shadow-xl py-1 text-xs text-slate-300 font-mono-code"
                    onMouseLeave={() => setShowMenu(false)}
                  >
                    <button
                      onClick={() => {
                        setShowMenu(false);
                        handleCardClick();
                      }}
                      className="w-full text-left px-3 py-1.5 hover:bg-[#5b1e95]/30 flex items-center gap-2"
                    >
                      <Maximize2 className="w-3.5 h-3.5 text-[#f3d99b]" />
                      <span>View Lightbox</span>
                    </button>

                    {onEdit && (
                      <button
                        onClick={() => {
                          setShowMenu(false);
                          onEdit(meme);
                        }}
                        className="w-full text-left px-3 py-1.5 hover:bg-[#5b1e95]/30 flex items-center gap-2"
                      >
                        <Edit2 className="w-3.5 h-3.5 text-slate-400" />
                        <span>Edit Details</span>
                      </button>
                    )}

                    {onCategoryChange && (
                      <>
                        <div className="my-1 border-t border-[#5b1e95]/40" />
                        <div className="px-3 py-1 text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1">
                          <ArrowRightLeft className="w-3 h-3" /> Move Tier:
                        </div>
                        {meme.category !== 'premium' && (
                          <button
                            onClick={() => {
                              setShowMenu(false);
                              onCategoryChange(meme.id, 'premium');
                            }}
                            className="w-full text-left px-3 py-1 hover:bg-[#5b1e95]/30 text-[#f3d99b]"
                          >
                            → Premium
                          </button>
                        )}
                        {meme.category !== 'dedication' && (
                          <button
                            onClick={() => {
                              setShowMenu(false);
                              onCategoryChange(meme.id, 'dedication');
                            }}
                            className="w-full text-left px-3 py-1 hover:bg-[#5b1e95]/30 text-purple-400"
                          >
                            → Dedication
                          </button>
                        )}
                        {meme.category !== 'normal' && (
                          <button
                            onClick={() => {
                              setShowMenu(false);
                              onCategoryChange(meme.id, 'normal');
                            }}
                            className="w-full text-left px-3 py-1 hover:bg-[#5b1e95]/30 text-sky-400"
                          >
                            → Normal
                          </button>
                        )}
                        {meme.category !== 'trash' && (
                          <button
                            onClick={() => {
                              setShowMenu(false);
                              onCategoryChange(meme.id, 'trash');
                            }}
                            className="w-full text-left px-3 py-1 hover:bg-[#5b1e95]/30 text-rose-400"
                          >
                            → Trash
                          </button>
                        )}
                      </>
                    )}

                    {onDelete && (
                      <>
                        <div className="my-1 border-t border-[#5b1e95]/40" />
                        <button
                          onClick={() => {
                            setShowMenu(false);
                            onDelete(meme.id);
                          }}
                          className="w-full text-left px-3 py-1.5 hover:bg-rose-950/50 text-rose-400 flex items-center gap-2"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Card Footer */}
        <div className="pt-2.5 mt-2 border-t border-[#f7f4ec]/10 flex items-center justify-between text-xs font-mono-code text-[#f7f4ec]/60">
          <button
            onClick={() => onLike && onLike(meme.id)}
            className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#5b1e95]/20 hover:bg-rose-500/10 text-[#f7f4ec]/80 hover:text-rose-400 border border-[#5b1e95]/40 transition-colors cursor-pointer"
          >
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500/40" />
            <span className="font-bold">{meme.likes}</span>
          </button>

          <button
            onClick={handleCardClick}
            className="text-[11px] text-[#f3d99b] hover:underline font-bold flex items-center gap-1 cursor-pointer"
          >
            <span>VIEW</span>
            <Maximize2 className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
