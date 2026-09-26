import React, { useEffect } from 'react';
import { X, Calendar, Sparkles, Target, Compass } from 'lucide-react';

interface ArchiveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchiveModal: React.FC<ArchiveModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Archive details"
    >
      {/* Ambient background soft multi-tone halo */}
      <div className="absolute w-[600px] h-[450px] rounded-full bg-gradient-to-br from-[#9333ea]/20 via-[#6a23b3]/15 to-[#f3d99b]/15 blur-[120px] pointer-events-none" />

      {/* Ultra-Premium Obsidian Dossier Chassis - Wider format */}
      <div className="relative w-full max-w-2xl sm:max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-gradient-to-b from-[#18112b]/98 via-[#0e091b]/98 to-[#06040b] border border-white/[0.14] shadow-[0_30px_90px_-20px_rgba(0,0,0,0.95),0_0_40px_rgba(168,85,247,0.22),inset_0_1px_2px_rgba(255,255,255,0.15)] p-7 sm:p-10 text-left">
        {/* Top specular hairline highlight */}
        <div className="absolute inset-x-10 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

        {/* Machined Circular Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 sm:top-7 sm:right-7 w-9 h-9 rounded-full border border-white/15 hover:border-white/40 bg-white/[0.04] hover:bg-white/[0.12] text-zinc-400 hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-[0_2px_12px_rgba(0,0,0,0.6)] active:scale-95 z-10"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Content Body */}
        <div className="space-y-6 pt-3 sm:pt-2">
          {/* Structured Spec Grid Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
            {/* Started Card */}
            <div className="p-4 rounded-2xl bg-[#140e24]/70 border border-white/[0.08] hover:border-white/[0.16] shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] transition-colors">
              <div className="flex items-center gap-2 text-[#f3d99b] font-mono-code text-[11px] font-black tracking-[0.2em] uppercase mb-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#f3d99b]" />
                <span>STARTED</span>
              </div>
              <p className="text-zinc-100 font-semibold text-sm sm:text-base font-sans">
                March 2026
              </p>
            </div>

            {/* Inspired By Card */}
            <div className="p-4 rounded-2xl bg-[#140e24]/70 border border-white/[0.08] hover:border-white/[0.16] shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] transition-colors">
              <div className="flex items-center gap-2 text-[#f3d99b] font-mono-code text-[11px] font-black tracking-[0.2em] uppercase mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#f3d99b]" />
                <span>INSPIRED BY</span>
              </div>
              <p className="text-zinc-100 font-semibold text-sm sm:text-base font-sans leading-snug">
                Toji’s article on memes in crypto
              </p>
            </div>

            {/* Purpose Card - Full Width Span */}
            <div className="sm:col-span-2 p-4 sm:p-5 rounded-2xl bg-[#140e24]/70 border border-white/[0.08] hover:border-white/[0.16] shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] transition-colors">
              <div className="flex items-center gap-2 text-[#f3d99b] font-mono-code text-[11px] font-black tracking-[0.2em] uppercase mb-1.5">
                <Target className="w-3.5 h-3.5 text-[#f3d99b]" />
                <span>PURPOSE</span>
              </div>
              <p className="text-zinc-200 text-sm sm:text-base leading-relaxed font-sans font-medium">
                Contributing to Concrete through memes, ideas, and DeFi culture.
              </p>
            </div>
          </div>

          {/* Narrative Callout Block */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#21113b]/60 via-[#150a28]/60 to-transparent border-l-2 border-[#c084fc] flex items-center gap-3">
            <Compass className="w-5 h-5 text-[#c084fc] shrink-0" />
            <p className="text-sm sm:text-base text-zinc-200 font-sans italic leading-relaxed">
              Started with one idea. Turned into a collection.
            </p>
          </div>

          {/* Illuminated Signature Footer */}
          <div className="p-4 sm:p-4.5 rounded-2xl bg-gradient-to-r from-[#261044]/90 via-[#170a2d]/95 to-[#0d0519] border border-[#a855f7]/40 shadow-[0_4px_25px_rgba(0,0,0,0.6),0_0_25px_rgba(168,85,247,0.2),inset_0_1px_1.5px_rgba(216,180,254,0.3)] flex items-center justify-between gap-3">
            <span className="font-sans font-semibold text-[#eedeff] text-sm sm:text-base tracking-wide">
              A little record of my time with Concrete.
            </span>
            <span className="text-xl sm:text-2xl leading-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] shrink-0">
              🗿
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

