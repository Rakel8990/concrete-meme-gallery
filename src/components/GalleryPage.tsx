import React, { useMemo, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Meme, MemeCategory } from '../types';
import { MaterialPage } from './MaterialPage';
import { MapPage } from './MapPage';
import { MemeCard } from './MemeCard';
import { TrashPage } from './TrashPage';
import { OutroPage } from './OutroPage';

interface GalleryPageProps {
  memes: Meme[];
  onBackToIntro: () => void;
  onSelectMeme: (meme: Meme, list: Meme[], index: number, onBackToMap?: () => void) => void;
}

const categories: { id: MemeCategory; label: string }[] = [
  { id: 'premium', label: 'Premium' },
  { id: 'dedication', label: 'Dedication' },
  { id: 'normal', label: 'Normal' },
  { id: 'trash', label: 'Trash' },
];

export const GalleryPage: React.FC<GalleryPageProps> = ({ memes, onBackToIntro, onSelectMeme }) => {
  const [currentPage, setCurrentPage] = useState<'material' | 'map' | 'category' | 'outro'>('material');
  const [selectedCategory, setSelectedCategory] = useState<MemeCategory | 'all'>('all');
  // Premium (step 1) is unlocked from the start
  const [unlockedStep, setUnlockedStep] = useState(1);
  const ordered = useMemo(() => [...memes].sort((a, b) => Number(a.number) - Number(b.number)), [memes]);
  const visible = selectedCategory === 'all' ? ordered : ordered.filter((m) => m.category === selectedCategory);

  // When a user opens a category, immediately unlock the NEXT category in sequence:
  // Premium (idx 0) -> unlocks Dedication (step 2)
  // Dedication (idx 1) -> unlocks Normal (step 3)
  // Normal (idx 2) -> unlocks Trash (step 4)
  // Trash (idx 3) -> unlocks Outro (step 5)
  const handleCategory = (category: MemeCategory) => {
    setSelectedCategory(category);
    setCurrentPage('category');
    const catIndex = categories.findIndex((c) => c.id === category);
    if (catIndex !== -1) {
      setUnlockedStep((prev) => Math.max(prev, catIndex + 2));
    }
  };

  if (currentPage === 'material') {
    return (
      <MaterialPage
        onBackToIntro={onBackToIntro}
        onEnterMap={() => setCurrentPage('map')}
        onSkipToMemes={() => setCurrentPage('map')}
      />
    );
  }

  if (currentPage === 'map') {
    return (
      <MapPage
        memes={memes}
        onBackToMaterial={() => setCurrentPage('material')}
        onSelectCategory={handleCategory}
        onOpenOutro={() => {
          setUnlockedStep(5);
          setCurrentPage('outro');
        }}
        unlockedStep={unlockedStep}
        onUnlockNext={() => setUnlockedStep((s) => Math.min(s + 1, 5))}
      />
    );
  }

  if (currentPage === 'outro') {
    return (
      <OutroPage
        onBackToMap={() => setCurrentPage('map')}
        onRestartIntro={onBackToIntro}
      />
    );
  }

  // Single page full-screen experience for Trash (no headers, no footers, no scroll)
  if (selectedCategory === 'trash') {
    return <TrashPage onBackToMap={() => setCurrentPage('map')} />;
  }

  return (
    <div className="gallery-page">
      <nav className="gallery-index__nav gallery-toolbar">
        <div className="gallery-toolbar__links">
          <button className="gallery-link" onClick={() => setCurrentPage('map')}>
            <ArrowLeft aria-hidden="true" /> BACK TO MAP
          </button>
        </div>
      </nav>
      <main className="gallery-main">
        <div className="gallery-heading-row">
          <h1 className="gallery-section-title">
            {selectedCategory === 'all' ? 'All memes' : `${selectedCategory.toUpperCase()} MEMES`}
          </h1>
          <span className="gallery-count">{visible.length} FILES</span>
        </div>
        <div className="masonry-grid">
          {visible.map((meme, index) => (
            <MemeCard
              key={meme.id}
              meme={meme}
              onClick={() => onSelectMeme(meme, visible, index, () => setCurrentPage('map'))}
            />
          ))}
        </div>

        <div className="gallery-footer-nav">
          <button className="gallery-footer-btn" onClick={() => setCurrentPage('map')}>
            <ArrowLeft className="w-4 h-4" /> RETURN TO ROUTE MAP
          </button>
        </div>
      </main>
    </div>
  );
};

