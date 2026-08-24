import React, { useEffect, useMemo, useState } from 'react';
import { Meme, MemeCategory } from '../types';
import { ArrowLeft, ArrowUpRight, Film, Lock, X } from 'lucide-react';

interface MapPageProps {
  memes: Meme[];
  onBackToMaterial: () => void;
  onSelectCategory: (cat: MemeCategory) => void;
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

export const MapPage: React.FC<MapPageProps> = ({ memes, onBackToMaterial, onSelectCategory, unlockedStep, onUnlockNext }) => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const grouped = useMemo(() => Object.fromEntries(categoryMeta.map(({ id }) => [id, memes.filter((meme) => meme.category === id)])) as Record<MemeCategory, Meme[]>, [memes]);

  useEffect(() => {
    if (!activeModal) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setActiveModal(null); };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [activeModal]);

  const archiveOpen = () => setActiveModal('archive');
  const outroUnlocked = unlockedStep >= 5;

  return (
    <div className="map-screen bg-grid-pattern">
      <header className="map-topbar">
        <button onClick={onBackToMaterial} className="map-back"><ArrowLeft /> BACK TO MATERIAL</button>
        <span className="map-progress">{Math.min(unlockedStep, 5)} / 5 UNLOCKED</span>
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

        <button className="map-hub" onClick={archiveOpen} aria-label="Open Kian Archive introduction">
          <span className="map-hub__mark">K</span><strong>KIAN ARCHIVE</strong><small>START HERE</small><span className="map-hub__count">INTRO / 00</span>
        </button>

        {categoryMeta.map((category) => {
          const unlocked = unlockedStep >= category.step;
          return (
            <button
              key={category.id}
              className={`map-node ${category.position} map-node--${category.accent} ${!unlocked ? 'map-node--locked' : ''}`}
              onClick={() => unlocked && onSelectCategory(category.id)}
              disabled={!unlocked}
              aria-label={`${unlocked ? 'Open' : 'Locked'} ${category.label} memes`}
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
                <em>{unlocked ? 'OPEN' : 'LOCKED'}</em>
              </span>
              {unlocked ? <ArrowUpRight className="map-node__arrow" /> : <Lock className="map-node__arrow" />}
            </button>
          );
        })}
        <button className={`map-outro ${outroUnlocked ? 'map-outro--open' : ''}`} disabled={!outroUnlocked} onClick={() => setActiveModal('outro')} aria-label={`${outroUnlocked ? 'Open' : 'Locked'} Outro`}><Film /><span><small>FINAL STOP</small><strong>OUTRO</strong></span>{outroUnlocked ? <ArrowUpRight /> : <Lock />}</button>
      </main>
      {activeModal && <div className="gallery-modal" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setActiveModal(null)}><div className="gallery-modal__panel" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button onClick={() => setActiveModal(null)} className="gallery-modal__close" aria-label="Close dialog"><X /></button><p className="gallery-kicker">{activeModal === 'archive' ? 'WELCOME / START HERE' : 'THE END / REPLACE LATER'}</p><h2 id="modal-title">{activeModal === 'archive' ? 'Kian Archive' : 'Outro'}</h2><p>{activeModal === 'archive' ? 'A small introduction to the person, process, and collection behind Concrete. This space is ready for Kian’s story and archive notes.' : 'You made it through every layer of the archive. This final space can hold credits, a film, links, or the last word.'}</p>{activeModal === 'archive' ? <button className="map-modal-action" onClick={() => { onUnlockNext(); setActiveModal(null); }}>UNLOCK PREMIUM <ArrowUpRight /></button> : <div className="gallery-modal__line">END OF CURRENT MATERIAL</div>}</div></div>}
    </div>
  );
};
