import React, { useState } from 'react';
import { X, Download, Copy, Check } from 'lucide-react';
import { Meme, MemeCategory } from '../types';

interface MemeLightboxProps {
  meme: Meme | null;
  onClose: () => void;
  onEdit: (meme: Meme) => void;
  onLike: (id: string) => void;
  onCategoryChange: (id: string, newCategory: MemeCategory) => void;
  onUpdateMemeText: (id: string, topText: string, bottomText: string) => void;
}

export const MemeLightbox: React.FC<MemeLightboxProps> = ({
  meme,
  onClose,
  onCategoryChange,
}) => {
  const [copied, setCopied] = useState(false);

  if (!meme) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(meme.imageUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.download = `concrete-xyz-meme-${meme.number}.jpg`;
    link.href = meme.imageUrl;
    link.target = '_blank';
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080a0f]/95 backdrop-blur-md overflow-y-auto selection:bg-[#5b1e95] selection:text-[#f3d99b]">
      <div className="relative w-full max-w-4xl group">
        {/* Outer Glow Frame */}
        <div className="absolute -inset-1 rounded-sm bg-gradient-to-r from-[#5b1e95] via-[#6a23b3] to-[#5b1e95] opacity-80 blur-xl" />

        {/* Inner Intro-Style Box Container */}
        <div className="relative w-full bg-[#080a0f] border-2 border-[#6a23b3]/80 p-4 sm:p-6 shadow-2xl flex flex-col md:flex-row gap-6 overflow-hidden">
          {/* Corner Frame Accents */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#f3d99b] z-20 pointer-events-none" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#f3d99b] z-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#f3d99b] z-20 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#f3d99b] z-20 pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-30 p-2 bg-[#080a0f] text-[#f7f4ec] hover:text-[#f3d99b] border border-[#f3d99b]/40 shadow-xl transition-all cursor-pointer font-mono-code"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Image Display Frame */}
          <div className="relative flex-1 bg-black border border-[#5b1e95]/60 flex items-center justify-center p-3 min-h-[300px] md:min-h-[460px]">
            <img
              src={meme.imageUrl}
              alt={`Meme ${meme.number}`}
              className="max-h-[70vh] w-auto h-auto object-contain shadow-2xl"
            />
          </div>

          {/* Right Controls Panel */}
          <div className="w-full md:w-80 flex flex-col justify-between font-mono-code space-y-6 pt-2">
            <div>
              {/* Header: Number and Category */}
              <div className="flex items-center justify-between gap-3 border-b border-[#6a23b3]/40 pb-4 mb-6">
                <span className="text-2xl font-black text-[#f3d99b]">
                  #{meme.number}
                </span>
                <span className={`text-xs px-3 py-1 font-black uppercase tracking-widest ${
                  meme.category === 'premium'
                    ? 'bg-[#f3d99b] text-[#080a0f]'
                    : meme.category === 'dedication'
                    ? 'bg-[#c084fc] text-[#080a0f]'
                    : meme.category === 'normal'
                    ? 'bg-[#6a23b3] text-[#f7f4ec]'
                    : 'bg-[#5b1e95] text-[#f3d99b]'
                }`}>
                  {meme.category}
                </span>
              </div>

              {/* Tier Category Selector */}
              <div className="p-3 bg-black/60 border border-[#5b1e95]/40 mb-6">
                <span className="text-[10px] uppercase text-[#f7f4ec]/50 block mb-2 font-bold tracking-wider">
                  CHANGE CATEGORY
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
                  <button
                    onClick={() => onCategoryChange(meme.id, 'premium')}
                    className={`py-2 text-[10px] sm:text-xs font-bold uppercase transition-colors ${
                      meme.category === 'premium'
                        ? 'bg-[#f3d99b] text-[#080a0f]'
                        : 'text-[#f7f4ec]/70 hover:bg-[#5b1e95]/40'
                    }`}
                  >
                    PREMIUM
                  </button>
                  <button
                    onClick={() => onCategoryChange(meme.id, 'dedication')}
                    className={`py-2 text-[10px] sm:text-xs font-bold uppercase transition-colors ${
                      meme.category === 'dedication'
                        ? 'bg-[#c084fc] text-[#080a0f]'
                        : 'text-[#f7f4ec]/70 hover:bg-[#5b1e95]/40'
                    }`}
                  >
                    DEDICATION
                  </button>
                  <button
                    onClick={() => onCategoryChange(meme.id, 'normal')}
                    className={`py-2 text-[10px] sm:text-xs font-bold uppercase transition-colors ${
                      meme.category === 'normal'
                        ? 'bg-[#6a23b3] text-[#f7f4ec]'
                        : 'text-[#f7f4ec]/70 hover:bg-[#5b1e95]/40'
                    }`}
                  >
                    NORMAL
                  </button>
                  <button
                    onClick={() => onCategoryChange(meme.id, 'trash')}
                    className={`py-2 text-[10px] sm:text-xs font-bold uppercase transition-colors ${
                      meme.category === 'trash'
                        ? 'bg-[#5b1e95] text-[#f3d99b]'
                        : 'text-[#f7f4ec]/70 hover:bg-[#5b1e95]/40'
                    }`}
                  >
                    TRASH
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons: ONLY Download & Copy Link */}
            <div className="space-y-3 pt-4 border-t border-[#6a23b3]/40">
              <button
                onClick={handleDownload}
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#f3d99b] text-[#080a0f] font-black text-xs uppercase tracking-wider hover:bg-[#f7f4ec] transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>DOWNLOAD</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="w-full flex items-center justify-center gap-2 py-3 bg-black/80 border border-[#5b1e95] text-[#f7f4ec] font-bold text-xs uppercase tracking-wider hover:border-[#f3d99b] hover:text-[#f3d99b] transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-[#f3d99b]" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'COPIED!' : 'COPY LINK'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
