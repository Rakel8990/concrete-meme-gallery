import React, { useEffect, useMemo, useState } from 'react';
import { Meme, MemeCategory } from '../types';
import { ArrowLeft, ArrowUpRight, Film, Sparkles, X, Compass, Lock, Unlock } from 'lucide-react';
import { ArchiveModal } from './ArchiveModal';

interface MapPageProps {
  memes: Meme[];
  onBackToMaterial: () => void;
  onSelectCategory: (cat: MemeCategory) => void;
  onOpenOutro?: () => void;
  unlockedStep: number;
  onUnlockNext: () => void;
  isArchiveUnlocked?: boolean;
  onUnlockArchive?: () => void;
}

type ModalType = 'archive' | 'outro' | null;
const categoryMeta: Array<{ id: MemeCategory; label: string; eyebrow: string; accent: string; position: string; step: number }> = [
  { id: 'premium', label: 'Premium', eyebrow: '01 / curated', accent: 'sand', position: 'map-node--north', step: 1 },
  { id: 'dedication', label: 'Dedication', eyebrow: '02 / high effort', accent: 'lilac', position: 'map-node--east', step: 2 },
  { id: 'normal', label: 'Normal', eyebrow: '03 / everyday', accent: 'violet', position: 'map-node--south', step: 3 },
  { id: 'trash', label: 'Trash', eyebrow: '04 / unfiltered', accent: 'plum', position: 'map-node--west', step: 4 },
];

export const MapPage: React.FC<MapPageProps> = ({
  memes,
  onBackToMaterial,
  onSelectCategory,
  onOpenOutro,
  unlockedStep,
  onUnlockNext,
  isArchiveUnlocked = false,
  onUnlockArchive,
}) => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const isUnlocked = Boolean(isArchiveUnlocked);

  const grouped = useMemo(
    () => Object.fromEntries(categoryMeta.map(({ id }) => [id, memes.filter((meme) => meme.category === id)])) as Record<MemeCategory, Meme[]>,
    [memes]
  );

  useEffect(() => {
    if (!activeModal) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setActiveModal(null); };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [activeModal]);

  const handleCircleClick = () => {
    onUnlockArchive?.();
    onUnlockNext();
    setActiveModal('archive');
  };

  const handleNodeClick = (catId: MemeCategory) => {
    if (!isUnlocked) {
      handleCircleClick();
      return;
    }
    onSelectCategory(catId);
  };

  const handleOutroClick = () => {
    if (!isUnlocked) {
      handleCircleClick();
      return;
    }
    if (onOpenOutro) {
      onOpenOutro();
    } else {
      setActiveModal('outro');
    }
  };

  return (
    <div className="map-screen bg-grid-pattern">
      <header className="map-topbar">
        <button onClick={onBackToMaterial} className="map-back"><ArrowLeft /> BACK TO MATERIAL</button>
        {isUnlocked ? (
          <span className="map-progress flex items-center gap-1.5 text-emerald-400 font-mono-code text-[11px] tracking-widest border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 rounded-full shadow-[0_0_15px_rgba(52,211,153,0.2)]">
            <Unlock className="w-3.5 h-3.5 text-emerald-400" />
            ALL ROUTES UNLOCKED
          </span>
        ) : (
          <span className="map-progress flex items-center gap-1.5 text-amber-300 font-mono-code text-[11px] tracking-widest border border-amber-500/30 bg-amber-500/10 px-3 py-1 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.2)] animate-pulse">
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            OPEN KIAN ARCHIVE TO UNLOCK ROUTES
          </span>
        )}
      </header>
      <main className="map-stage" aria-label="Kian Archive route map">
        {/* Flowing energy lines from Central Source outward to outer box edges */}
        <div className={`map-connectors ${!isUnlocked ? 'opacity-35 grayscale-[50%]' : 'opacity-100'} transition-all duration-700`} aria-hidden="true">
          <div className="connector-branch connector-branch--north">
            <div className="connector-beam" />
            <div className="connector-wave" />
          </div>
          <div className="connector-branch connector-branch--east">
            <div className="connector-beam" />
            <div className="connector-wave" />
          </div>
          <div className="connector-branch connector-branch--south">
            <div className="connector-beam" />
            <div className="connector-wave" />
          </div>
          <div className="connector-branch connector-branch--west">
            <div className="connector-beam" />
            <div className="connector-wave" />
          </div>
          <div className="map-source-dot" />
        </div>

        {/* Central Hub Circle */}
        <button
          className={`map-hub ${!isUnlocked ? 'map-hub--pulse-invite ring-2 ring-[#f3d99b]/60' : ''}`}
          onClick={handleCircleClick}
          aria-label="Open Kian Archive introduction"
          title={!isUnlocked ? 'Click to open archive and unlock all routes' : 'View Kian Archive'}
        >
          <span className="map-hub__mark">K</span>
          <strong>KIAN ARCHIVE</strong>
          <small>{isUnlocked ? 'CLICK TO VIEW' : 'CLICK TO UNLOCK'}</small>
          <span className="map-hub__count">{isUnlocked ? 'ARCHIVE UNLOCKED' : 'INTRO / UNLOCK'}</span>
        </button>

        {/* 4 Category Boxes: Locked until archive is opened */}
        {categoryMeta.map((category) => {
          return (
            <button
              key={category.id}
              className={`map-node ${category.position} map-node--${category.accent} ${!isUnlocked ? 'map-node--locked' : ''}`}
              onClick={() => handleNodeClick(category.id)}
              aria-label={`${category.label} memes ${!isUnlocked ? '(Locked - open archive first)' : ''}`}
              title={!isUnlocked ? 'Locked — Open Kian Archive to access' : undefined}
            >
              {/* Continuous rounding perimeter beam around the box */}
              <svg className="node-perimeter-beam" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <rect
                  x="1"
                  y="1"
                  width="98"
                  height="98"
                  rx="1"
                  pathLength="100"
                  className="node-perimeter-beam__rect"
                />
              </svg>
              <span className="map-node__copy">
                <strong>{category.label}</strong>
                {isUnlocked ? (
                  <em>OPEN</em>
                ) : (
                  <em className="flex items-center gap-1 text-zinc-400 font-bold">
                    <Lock className="w-2.5 h-2.5 text-amber-400" /> LOCKED
                  </em>
                )}
              </span>
              {isUnlocked ? (
                <ArrowUpRight className="map-node__arrow" />
              ) : (
                <Lock className="map-node__arrow w-3.5 h-3.5 text-zinc-400" />
              )}
            </button>
          );
        })}

        {/* Outro box - Locked until archive is opened */}
        <button
          className={`map-outro group ${isUnlocked ? 'map-outro--open' : 'map-outro--locked'}`}
          onClick={handleOutroClick}
          aria-label={`Open Final Outro ${!isUnlocked ? '(Locked - open archive first)' : ''}`}
          title={!isUnlocked ? 'Locked — Open Kian Archive to access' : undefined}
        >
          {/* Ambient outer pulsing halo (unlocked only) */}
          {isUnlocked && (
            <div className="absolute -inset-1 rounded-sm bg-gradient-to-r from-[#f3d99b]/30 via-[#c084fc]/40 to-[#f3d99b]/30 opacity-60 blur-md group-hover:opacity-100 group-hover:blur-lg transition-all duration-500 pointer-events-none" />
          )}

          {/* Continuous rounding perimeter beam */}
          <svg className="node-perimeter-beam" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <rect
              x="1"
              y="1"
              width="98"
              height="98"
              rx="1"
              pathLength="100"
              className="node-perimeter-beam__rect outro-perimeter-rect"
            />
          </svg>

          {/* Icon with animated sheen */}
          <div className={`relative z-10 p-1.5 rounded ${isUnlocked ? 'bg-[#5b1e95]/40 border border-[#f3d99b]/30 text-[#f3d99b] group-hover:scale-110 group-hover:bg-[#f3d99b] group-hover:text-[#080a0f]' : 'bg-zinc-800/80 border border-white/10 text-zinc-400'} transition-all duration-300 shadow`}>
            {isUnlocked ? <Film className="w-4 h-4" /> : <Lock className="w-4 h-4 text-amber-400/90" />}
          </div>

          <span className="relative z-10 flex flex-col gap-0.5 text-left">
            <span className="flex items-center gap-1.5">
              {isUnlocked ? (
                <>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f3d99b] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#f3d99b]" />
                  </span>
                  <small className="text-[#f3d99b] font-mono-code font-bold tracking-widest text-[9px] uppercase">FINAL STOP</small>
                </>
              ) : (
                <small className="text-zinc-400 font-mono-code font-bold tracking-widest text-[9px] uppercase flex items-center gap-1">
                  <Lock className="w-2.5 h-2.5 text-amber-400/90" /> LOCKED
                </small>
              )}
            </span>
            <strong className={`font-display-heading font-black text-sm tracking-wide ${isUnlocked ? 'text-white group-hover:text-[#f3d99b]' : 'text-zinc-400'} transition-colors`}>
              OUTRO
            </strong>
          </span>

          <div className="relative z-10 ml-1 text-[#f3d99b] group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300">
            {isUnlocked ? <ArrowUpRight className="w-4 h-4" /> : <Lock className="w-3.5 h-3.5 text-zinc-500" />}
          </div>
        </button>
      </main>

      {/* Archive Modal */}
      <ArchiveModal
        isOpen={activeModal === 'archive'}
        onClose={() => setActiveModal(null)}
      />

      {/* Outro Modal: Ultra-Premium Chassis */}
      {activeModal === 'outro' && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in"
          role="presentation"
          onMouseDown={(event) => event.target === event.currentTarget && setActiveModal(null)}
        >
          {/* Ambient background soft multi-tone halo */}
          <div className="absolute w-[600px] h-[450px] rounded-full bg-gradient-to-br from-[#9333ea]/20 via-[#6a23b3]/15 to-[#f3d99b]/15 blur-[120px] pointer-events-none" />

          {/* Ultra-Premium Obsidian Dossier Chassis - Wider format */}
          <div
            className="relative w-full max-w-2xl sm:max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-gradient-to-b from-[#18112b]/98 via-[#0e091b]/98 to-[#06040b] border border-white/[0.14] shadow-[0_30px_90px_-20px_rgba(0,0,0,0.95),0_0_40px_rgba(168,85,247,0.22),inset_0_1px_2px_rgba(255,255,255,0.15)] p-7 sm:p-10 text-left"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Top specular hairline highlight */}
            <div className="absolute inset-x-10 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

            {/* Machined Circular Close Button */}
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 sm:top-7 sm:right-7 w-9 h-9 rounded-full border border-white/15 hover:border-white/40 bg-white/[0.04] hover:bg-white/[0.12] text-zinc-400 hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-[0_2px_12px_rgba(0,0,0,0.6)] active:scale-95 z-10"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-6 pt-1">
              <h2
                id="modal-title"
                className="font-display-heading text-2xl sm:text-3xl font-black text-[#f7f4ec] tracking-tight leading-snug drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)] pr-12"
              >
                Final Outro & Reflections
              </h2>

              <div className="p-4 sm:p-5 rounded-2xl bg-[#140e24]/70 border border-white/[0.08] shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
                <p className="text-zinc-200 font-sans text-sm sm:text-base leading-relaxed font-medium">
                  You made it through every layer of the archive. This final space holds the final words and reflections of the journey.
                </p>
              </div>

              <div className="p-4 sm:p-4.5 rounded-2xl bg-gradient-to-r from-[#261044]/90 via-[#170a2d]/95 to-[#0d0519] border border-[#a855f7]/40 shadow-[0_4px_25px_rgba(0,0,0,0.6),0_0_25px_rgba(168,85,247,0.2),inset_0_1px_1.5px_rgba(216,180,254,0.3)] flex items-center justify-between gap-3">
                <span className="font-sans font-semibold text-[#eedeff] text-sm sm:text-base tracking-wide">
                  The Concrete Archive is now complete.
                </span>
                <span className="text-xl sm:text-2xl leading-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] shrink-0">
                  🗿
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
