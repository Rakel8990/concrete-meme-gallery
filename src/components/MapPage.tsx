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
        <div className="map-brand"><span className="map-brand__dot" /> KIAN ARCHIVE / ROUTE MAP</div>
        <span className="map-progress">{Math.min(unlockedStep, 5)} / 5 UNLOCKED</span>
      </header>
      <main className="map-stage" aria-label="Kian Archive route map">
        <div className="map-energy map-energy--north" aria-hidden="true" /><div className="map-energy map-energy--east" aria-hidden="true" /><div className="map-energy map-energy--south" aria-hidden="true" /><div className="map-energy map-energy--west" aria-hidden="true" />
        <svg className="map-roads" viewBox="0 0 1000 650" preserveAspectRatio="none" aria-hidden="true">
          <path d="M500 325 C500 215 500 160 500 78" /><path d="M500 325 C635 325 735 325 875 325" /><path d="M500 325 C500 445 500 500 500 580" /><path d="M500 325 C365 325 265 325 125 325" />
          <circle cx="500" cy="325" r="5" />
        </svg>
        <button className="map-hub" onClick={archiveOpen} aria-label="Open Kian Archive introduction">
          <span className="map-hub__mark">K</span><strong>KIAN ARCHIVE</strong><small>START HERE</small><span className="map-hub__count">INTRO / 00</span>
        </button>
        {categoryMeta.map((category) => {
          const unlocked = unlockedStep >= category.step;
          return <button key={category.id} className={`map-node ${category.position} map-node--${category.accent} ${!unlocked ? 'map-node--locked' : ''}`} onClick={() => unlocked && onSelectCategory(category.id)} disabled={!unlocked} aria-label={`${unlocked ? 'Open' : 'Locked'} ${category.label} memes`}>
            <span className="map-node__copy"><small>{category.eyebrow}</small><strong>{category.label}</strong><em>{unlocked ? 'OPEN' : 'LOCKED'}</em></span>{unlocked ? <ArrowUpRight className="map-node__arrow" /> : <Lock className="map-node__arrow" />}
          </button>;
        })}
        <button className={`map-outro ${outroUnlocked ? 'map-outro--open' : ''}`} disabled={!outroUnlocked} onClick={() => setActiveModal('outro')} aria-label={`${outroUnlocked ? 'Open' : 'Locked'} Outro`}><Film /><span><small>FINAL STOP</small><strong>OUTRO</strong></span>{outroUnlocked ? <ArrowUpRight /> : <Lock />}</button>
      </main>
      {activeModal && <div className="gallery-modal" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setActiveModal(null)}><div className="gallery-modal__panel" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button onClick={() => setActiveModal(null)} className="gallery-modal__close" aria-label="Close dialog"><X /></button><p className="gallery-kicker">{activeModal === 'archive' ? 'WELCOME / START HERE' : 'THE END / REPLACE LATER'}</p><h2 id="modal-title">{activeModal === 'archive' ? 'Kian Archive' : 'Outro'}</h2><p>{activeModal === 'archive' ? 'A small introduction to the person, process, and collection behind Concrete. This space is ready for Kian’s story and archive notes.' : 'You made it through every layer of the archive. This final space can hold credits, a film, links, or the last word.'}</p>{activeModal === 'archive' ? <button className="map-modal-action" onClick={() => { onUnlockNext(); setActiveModal(null); }}>UNLOCK PREMIUM <ArrowUpRight /></button> : <div className="gallery-modal__line">END OF CURRENT MATERIAL</div>}</div></div>}
    </div>
  );
};
