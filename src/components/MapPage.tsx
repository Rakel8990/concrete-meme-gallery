import React, { useEffect, useMemo, useState } from 'react';
import { Meme, MemeCategory } from '../types';
import { ArrowLeft, ArrowUpRight, Film, Sparkles, X } from 'lucide-react';

interface MapPageProps {
  memes: Meme[];
  onBackToMaterial: () => void;
  onSelectCategory: (cat: MemeCategory) => void;
  onOpenOutro?: () => void;
  unlockedStep: number;
  onUnlockNext: () => void;
}

type ModalType = 'archive' | 'outro' | null;
const categoryMeta: Array<{ id: MemeCategory; label: string; eyebrow: string; accent: string; position: string; step: number }> = [
  { id: 'premium', label: 'Premium', eyebrow: '01 / curated', accent: 'sand', position: 'map-node--north', step: 1 },
  { id: 'dedication', label: 'Dedication', eyebrow: '02 / high effort', accent: 'lilac', position: 'map-node--east', step: 2 },
  { id: 'normal', label: 'Normal', eyebrow: '03 / everyday', accent: 'violet', position: 'map-node--south', step: 3 },
  { id: 'trash', label: 'Trash', eyebrow: '04 / unfiltered', accent: 'plum', position: 'map-node--west', step: 4 },
];

export const MapPage: React.FC<MapPageProps> = ({ memes, onBackToMaterial, onSelectCategory, onOpenOutro, unlockedStep, onUnlockNext }) => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const grouped = useMemo(() => Object.fromEntries(categoryMeta.map(({ id }) => [id, memes.filter((meme) => meme.category === id)])) as Record<MemeCategory, Meme[]>, [memes]);

  useEffect(() => {
    if (!activeModal) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setActiveModal(null); };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [activeModal]);

  // Outro is unlocked if unlockedStep >= 2 or user interacted with any box/circle
  const outroUnlocked = unlockedStep >= 2 || hasInteracted;

  const handleCircleClick = () => {
    setHasInteracted(true);
    onUnlockNext();
    setActiveModal('archive');
  };

  const handleNodeClick = (catId: MemeCategory) => {
    setHasInteracted(true);
    onUnlockNext();
    onSelectCategory(catId);
  };

  return (
    <div className="map-screen bg-grid-pattern">
      <header className="map-topbar">
        <button onClick={onBackToMaterial} className="map-back"><ArrowLeft /> BACK TO MATERIAL</button>
        <span className="map-progress">ALL CATEGORIES UNLOCKED</span>
      </header>
      <main className="map-stage" aria-label="Kian Archive route map">
        {/* Flowing energy lines from Central Source outward to outer box edges */}
        <div className="map-connectors" aria-hidden="true">
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
        <button className="map-hub" onClick={handleCircleClick} aria-label="Open Kian Archive introduction">
          <span className="map-hub__mark">K</span>
          <strong>KIAN ARCHIVE</strong>
          <small>CLICK TO OPEN</small>
          <span className="map-hub__count">INTRO / 00</span>
        </button>

        {/* 4 Category Boxes: ALL UNLOCKED */}
        {categoryMeta.map((category) => {
          return (
            <button
              key={category.id}
              className={`map-node ${category.position} map-node--${category.accent}`}
              onClick={() => handleNodeClick(category.id)}
              aria-label={`Open ${category.label} memes`}
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
                <em>OPEN</em>
              </span>
              <ArrowUpRight className="map-node__arrow" />
            </button>
          );
        })}

        {/* Outro box - Enhanced with perimeter light beam, glowing aura, and live beacon */}
        <button
          className={`map-outro group ${outroUnlocked ? 'map-outro--open' : ''}`}
          onClick={() => {
            if (onOpenOutro) {
              onOpenOutro();
            } else {
              setActiveModal('outro');
            }
          }}
          aria-label="Open Final Outro"
        >
          {/* Ambient outer pulsing halo */}
          <div className="absolute -inset-1 rounded-sm bg-gradient-to-r from-[#f3d99b]/30 via-[#c084fc]/40 to-[#f3d99b]/30 opacity-60 blur-md group-hover:opacity-100 group-hover:blur-lg transition-all duration-500 pointer-events-none" />

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
          <div className="relative z-10 p-1.5 rounded bg-[#5b1e95]/40 border border-[#f3d99b]/30 text-[#f3d99b] group-hover:scale-110 group-hover:bg-[#f3d99b] group-hover:text-[#080a0f] transition-all duration-300 shadow">
            <Film className="w-4 h-4" />
          </div>

          <span className="relative z-10 flex flex-col gap-0.5 text-left">
            <span className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f3d99b] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#f3d99b]" />
              </span>
              <small className="text-[#f3d99b] font-mono-code font-bold tracking-widest text-[9px] uppercase">FINAL STOP</small>
            </span>
            <strong className="text-white font-display-heading font-black text-sm tracking-wide group-hover:text-[#f3d99b] transition-colors">OUTRO</strong>
          </span>

          <div className="relative z-10 ml-1 text-[#f3d99b] group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300">
            {outroUnlocked ? <ArrowUpRight className="w-4 h-4" /> : <Sparkles className="w-4 h-4 animate-pulse" />}
          </div>
        </button>
      </main>

      {activeModal && (
        <div
          className="gallery-modal"
          role="presentation"
          onMouseDown={(event) => event.target === event.currentTarget && setActiveModal(null)}
        >
          <div className="gallery-modal__panel" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <button onClick={() => setActiveModal(null)} className="gallery-modal__close" aria-label="Close dialog">
              <X />
            </button>
            <p className="gallery-kicker">{activeModal === 'archive' ? 'WELCOME / START HERE' : 'THE END / REPLACE LATER'}</p>
            <h2 id="modal-title">{activeModal === 'archive' ? 'Kian Archive' : 'Outro'}</h2>
            <p>
              {activeModal === 'archive'
                ? 'A small introduction to the person, process, and collection behind Concrete. This space is ready for Kian’s story and archive notes.'
                : 'You made it through every layer of the archive. This final space holds the final words and reflections.'}
            </p>
            {activeModal === 'archive' ? (
              <button
                className="map-modal-action"
                onClick={() => {
                  onUnlockNext();
                  setActiveModal(null);
                  if (onOpenOutro) {
                    onOpenOutro();
                  }
                }}
              >
                PROCEED TO OUTRO <ArrowUpRight />
              </button>
            ) : (
              <div className="gallery-modal__line">END OF CURRENT MATERIAL</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
