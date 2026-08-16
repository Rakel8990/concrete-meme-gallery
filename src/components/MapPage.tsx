import React, { useEffect, useMemo, useState } from 'react';
import { Meme, MemeCategory } from '../types';
import { ArrowLeft, Archive, ArrowUpRight, Film, Grid3X3, X } from 'lucide-react';

interface MapPageProps {
  memes: Meme[];
  onBackToMaterial: () => void;
  onSelectCategory: (cat: MemeCategory | 'all') => void;
}

type ModalType = 'archive' | 'outro' | null;

const categoryMeta: Array<{ id: MemeCategory; label: string; eyebrow: string; accent: string }> = [
  { id: 'premium', label: 'Premium', eyebrow: '01 / curated', accent: 'sand' },
  { id: 'dedication', label: 'Dedication', eyebrow: '02 / high effort', accent: 'lilac' },
  { id: 'normal', label: 'Normal', eyebrow: '03 / everyday', accent: 'violet' },
  { id: 'trash', label: 'Trash', eyebrow: '04 / unfiltered', accent: 'plum' },
];

export const MapPage: React.FC<MapPageProps> = ({ memes, onBackToMaterial, onSelectCategory }) => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const totalCount = memes.length;
  const grouped = useMemo(
    () => Object.fromEntries(categoryMeta.map(({ id }) => [id, memes.filter((meme) => meme.category === id)])) as Record<MemeCategory, Meme[]>,
    [memes],
  );

  useEffect(() => {
    if (!activeModal) return;
    const onKeyDown = (event: KeyboardEvent) => event.key === 'Escape' && setActiveModal(null);
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeModal]);

  return (
    <div className="gallery-index min-h-screen bg-[#080a0f] text-[#f7f4ec] bg-grid-pattern pb-16">
      <header className="gallery-index__nav w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-5 flex items-center justify-between gap-4">
        <button onClick={onBackToMaterial} className="gallery-link" aria-label="Back to material">
          <ArrowLeft className="h-4 w-4" /> BACK TO MATERIAL
        </button>
        <button onClick={() => onSelectCategory('all')} className="gallery-all-button">
          <Grid3X3 className="h-4 w-4" /> VIEW ALL <span className="hidden sm:inline">MEMES</span> ({totalCount})
        </button>
      </header>

      <main className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <section className="gallery-index__hero py-14 sm:py-20">
          <div className="max-w-3xl">
            <p className="gallery-kicker">CONCRETE / MEME ARCHIVE / 2026</p>
            <h1 className="gallery-index__title">A collection of<br /><em>internet sediment.</em></h1>
            <p className="gallery-index__intro">Kian&apos;s working archive of memes for Concrete. Pick a vein below and enter the image wall.</p>
          </div>
          <div className="gallery-index__rule" aria-hidden="true" />
          <div className="gallery-index__meta"><span>{String(totalCount).padStart(2, '0')} IMAGES</span><span>4 CATEGORIES</span><span>CURATED BY KIAN</span></div>
        </section>

        <section aria-labelledby="categories-heading" className="pb-20">
          <div className="flex items-end justify-between gap-4 mb-7">
            <div><p className="gallery-kicker">THE IMAGE WALL</p><h2 id="categories-heading" className="gallery-section-title">Choose a category.</h2></div>
            <span className="gallery-index__mark hidden sm:block">SCROLL TO EXPLORE ↘</span>
          </div>
          <div className="gallery-category-grid">
            {categoryMeta.map((category) => {
              const categoryMemes = grouped[category.id];
              const preview = categoryMemes.slice(0, 4);
              return (
                <button key={category.id} onClick={() => onSelectCategory(category.id)} className={`gallery-category gallery-category--${category.accent}`} aria-label={`Open ${category.label} category`}>
                  <span className="gallery-category__label"><small>{category.eyebrow}</small><strong>{category.label}</strong></span>
                  <span className="gallery-category__images" aria-hidden="true">
                    {preview.length ? preview.map((meme, index) => <img key={meme.id} src={meme.imageUrl} alt="" className={`gallery-category__image gallery-category__image--${index + 1}`} />) : <span className="gallery-category__empty">NO IMAGES YET</span>}
                  </span>
                  <span className="gallery-category__arrow"><ArrowUpRight className="h-5 w-5" /></span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="gallery-secondary-grid border-t border-[#f7f4ec]/15 pt-8 pb-14" aria-label="Archive and outro">
          <button onClick={() => setActiveModal('archive')} className="gallery-secondary-card gallery-secondary-card--archive">
            <Archive className="h-7 w-7" /><span><small>THE MAKER</small><strong>KIAN ARCHIVE</strong><em>notes from the curator</em></span><ArrowUpRight className="h-5 w-5" />
          </button>
          <button onClick={() => setActiveModal('outro')} className="gallery-secondary-card gallery-secondary-card--outro">
            <Film className="h-7 w-7" /><span><small>THE LAST FRAME</small><strong>OUTRO</strong><em>sample ending / replace later</em></span><ArrowUpRight className="h-5 w-5" />
          </button>
        </section>
      </main>

      {activeModal && (
        <div className="gallery-modal" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setActiveModal(null)}>
          <div className="gallery-modal__panel" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <button onClick={() => setActiveModal(null)} className="gallery-modal__close" aria-label="Close dialog"><X className="h-5 w-5" /></button>
            {activeModal === 'archive' ? <><p className="gallery-kicker">SAMPLE CONTENT / REPLACE LATER</p><h2 id="modal-title">Kian Archive</h2><p>This is a temporary note from Kian — the person behind the Concrete meme collection. Final biography, links, and process notes can live here when ready.</p><div className="gallery-modal__line">CURATOR / @22KIAN_</div></> : <><p className="gallery-kicker">SAMPLE CONTENT / REPLACE LATER</p><h2 id="modal-title">Outro</h2><p>Thanks for walking through the archive. This ending can become the final word, credits, links, or a video moment for the Concrete community.</p><div className="gallery-modal__line">END OF CURRENT MATERIAL</div></>}
          </div>
        </div>
      )}
    </div>
  );
};
