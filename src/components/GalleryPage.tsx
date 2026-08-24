import React, { useMemo, useState } from 'react';
import { ArrowLeft, Map } from 'lucide-react';
import { Meme, MemeCategory } from '../types';
import { MaterialPage } from './MaterialPage';
import { MapPage } from './MapPage';
import { MemeCard } from './MemeCard';

interface GalleryPageProps {
  memes: Meme[];
  onBackToIntro: () => void;
  onSelectMeme: (meme: Meme, list: Meme[], index: number) => void;
}

const categories: { id: MemeCategory; label: string }[] = [
  { id: 'premium', label: 'Premium' }, { id: 'dedication', label: 'Dedication' },
  { id: 'normal', label: 'Normal' }, { id: 'trash', label: 'Trash' },
];

export const GalleryPage: React.FC<GalleryPageProps> = ({ memes, onBackToIntro, onSelectMeme }) => {
  const [currentPage, setCurrentPage] = useState<'material' | 'map' | 'category'>('material');
  const [selectedCategory, setSelectedCategory] = useState<MemeCategory | 'all'>('all');
  const [unlockedStep, setUnlockedStep] = useState(0);
  const ordered = useMemo(() => [...memes].sort((a, b) => Number(a.number) - Number(b.number)), [memes]);
  const visible = selectedCategory === 'all' ? ordered : ordered.filter((m) => m.category === selectedCategory);
  const handleCategory = (category: MemeCategory) => { setSelectedCategory(category); setCurrentPage('category'); setUnlockedStep((s) => Math.max(s, categories.findIndex((c) => c.id === category) + 1)); };

  if (currentPage === 'material') return <MaterialPage onBackToIntro={onBackToIntro} onEnterMap={() => setCurrentPage('map')} onSkipToMemes={() => { setSelectedCategory('all'); setCurrentPage('category'); }} />;
  if (currentPage === 'map') return <MapPage memes={memes} onBackToMaterial={() => setCurrentPage('material')} onSelectCategory={handleCategory} unlockedStep={unlockedStep} onUnlockNext={() => setUnlockedStep((s) => Math.min(s + 1, 5))} />;

  return (
    <div className="gallery-page">
      <nav className="gallery-index__nav gallery-toolbar">
        <div className="gallery-toolbar__links"><button className="gallery-link" onClick={() => setCurrentPage('map')}><Map aria-hidden="true" /> BACK TO MAP</button><button className="gallery-link gallery-link--muted" onClick={() => setCurrentPage('material')}><ArrowLeft aria-hidden="true" /> MATERIAL</button></div>
        <div className="gallery-filters" role="tablist" aria-label="Meme categories"><button className={selectedCategory === 'all' ? 'is-active' : ''} onClick={() => setSelectedCategory('all')}>ALL</button>{categories.map((c) => <button key={c.id} className={selectedCategory === c.id ? 'is-active' : ''} onClick={() => setSelectedCategory(c.id)}>{c.label.toUpperCase()}</button>)}</div>
      </nav>
      <main className="gallery-main"><p className="gallery-kicker">KIAN ARCHIVE / MEME INDEX</p><div className="gallery-heading-row"><h1 className="gallery-section-title">{selectedCategory === 'all' ? 'All memes' : `${selectedCategory} memes`}</h1><span className="gallery-count">{visible.length} FILES</span></div><div className="masonry-grid">{visible.map((meme, index) => <MemeCard key={meme.id} meme={meme} onClick={() => onSelectMeme(meme, visible, index)} />)}</div></main>
    </div>
  );
};
