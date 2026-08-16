import React, { useEffect, useMemo, useState } from 'react';
import { Meme, MemeCategory } from '../types';
import { ArrowLeft, ArrowUpRight, Archive, Film, Grid3X3, X } from 'lucide-react';

interface MapPageProps {
  memes: Meme[];
  onBackToMaterial: () => void;
  onSelectCategory: (cat: MemeCategory | 'all') => void;
}

type ModalType = 'archive' | 'outro' | null;

const categoryMeta: Array<{ id: MemeCategory; label: string; eyebrow: string; accent: string; position: string }> = [
  { id: 'premium', label: 'Premium', eyebrow: '01 / curated', accent: 'sand', position: 'map-node--north' },
  { id: 'dedication', label: 'Dedication', eyebrow: '02 / high effort', accent: 'lilac', position: 'map-node--east' },
  { id: 'normal', label: 'Normal', eyebrow: '03 / everyday', accent: 'violet', position: 'map-node--south' },
  { id: 'trash', label: 'Trash', eyebrow: '04 / unfiltered', accent: 'plum', position: 'map-node--west' },
];

export const MapPage: React.FC<MapPageProps> = ({ memes, onBackToMaterial, onSelectCategory }) => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const grouped = useMemo(() => Object.fromEntries(categoryMeta.map(({ id }) => [id, memes.filter((meme) => meme.category === id)])) as Record<MemeCategory, Meme[]>, [memes]);

  useEffect(() => {
    if (!activeModal) return;
    const onKeyDown = (event: KeyboardEvent) => event.key === 'Escape' && setActiveModal(null);
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeModal]);

  return (
    <div className="map-screen bg-grid-pattern">
      <header className="map-topbar">
        <button onClick={onBackToMaterial} className="map-back"><ArrowLeft /> BACK TO MATERIAL</button>
        <div className="map-brand"><span className="map-brand__dot" /> CONCRETE / MEME MAP</div>
        <button onClick={() => onSelectCategory('all')} className="map-view-all"><Grid3X3 /> VIEW ALL ({memes.length})</button>
      </header>

      <main className="map-stage" aria-label="Concrete meme map">
        <div className="map-heading"><p>CONCRETE / 2026</p><h1>Choose your<br /><em>route.</em></h1><span>Four veins. One archive.<br />Curated by Kian.</span></div>
        <div className="map-legend"><span><i className="legend-line" /> CONNECTED ARCHIVE</span><span>{String(memes.length).padStart(2, '0')} MEMES</span></div>

        <svg className="map-roads" viewBox="0 0 1000 650" preserveAspectRatio="none" aria-hidden="true">
          <path d="M500 325 C500 215 500 160 500 78" /><path d="M500 325 C635 325 735 325 875 325" /><path d="M500 325 C500 445 500 500 500 580" /><path d="M500 325 C365 325 265 325 125 325" />
          <circle cx="500" cy="325" r="5" /><circle cx="500" cy="78" r="4" /><circle cx="875" cy="325" r="4" /><circle cx="500" cy="580" r="4" /><circle cx="125" cy="325" r="4" />
        </svg>

        <div className="map-hub"><span className="map-hub__mark">C</span><strong>CONCRETE</strong><small>MEME ARCHIVE</small><span className="map-hub__count">{String(memes.length).padStart(2, '0')} IMAGES</span></div>

        {categoryMeta.map((category) => {
          const preview = grouped[category.id].slice(0, 3);
          return <button key={category.id} className={`map-node ${category.position} map-node--${category.accent}`} onClick={() => onSelectCategory(category.id)} aria-label={`Open ${category.label} memes`}>
            <span className="map-node__images">{preview.length ? preview.map((meme) => <img key={meme.id} src={meme.imageUrl} alt="" />) : <span>NO MEMES</span>}</span>
            <span className="map-node__copy"><small>{category.eyebrow}</small><strong>{category.label}</strong></span><ArrowUpRight className="map-node__arrow" />
          </button>;
        })}

        <div className="map-footer-links"><button onClick={() => setActiveModal('archive')}><Archive /> KIAN ARCHIVE <ArrowUpRight /></button><button onClick={() => setActiveModal('outro')}><Film /> OUTRO <ArrowUpRight /></button></div>
      </main>

      {activeModal && <div className="gallery-modal" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setActiveModal(null)}><div className="gallery-modal__panel" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button onClick={() => setActiveModal(null)} className="gallery-modal__close" aria-label="Close dialog"><X /></button><p className="gallery-kicker">SAMPLE CONTENT / REPLACE LATER</p><h2 id="modal-title">{activeModal === 'archive' ? 'Kian Archive' : 'Outro'}</h2><p>{activeModal === 'archive' ? 'A temporary note from Kian — the person behind the Concrete meme collection. Final biography, links, and process notes can live here when ready.' : 'Thanks for walking through the archive. This ending can become the final word, credits, links, or a video moment for the Concrete community.'}</p><div className="gallery-modal__line">{activeModal === 'archive' ? 'CURATOR / @22KIAN_' : 'END OF CURRENT MATERIAL'}</div></div></div>}
    </div>
  );
};
