import React, { useState } from 'react';
import { Meme, MemeCategory } from '../types';
import { ArrowLeft, Map, Award, Flame, Trash2, Heart, Maximize2 } from 'lucide-react';
import { MaterialPage } from './MaterialPage';
import { MapPage } from './MapPage';
import { MemeCard } from './MemeCard';

interface GalleryPageProps {
  memes: Meme[];
  onBackToIntro: () => void;
  onSelectMeme: (meme: Meme) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({
  memes,
  onBackToIntro,
  onSelectMeme,
}) => {
  // Navigation steps: 'material' -> 'map' -> 'category'
  const [currentPage, setCurrentPage] = useState<'material' | 'map' | 'category'>('material');
  const [selectedCategory, setSelectedCategory] = useState<MemeCategory | 'all'>('all');
  const [unlockedStep, setUnlockedStep] = useState(0);

  const handleSelectCategoryFromMap = (category: MemeCategory) => {
    setSelectedCategory(category);
    setCurrentPage('category');
    setUnlockedStep((step) => Math.max(step, ['premium', 'dedication', 'normal', 'trash'].indexOf(category) + 1));
  };

  const categoryOrder: Record<MemeCategory, number> = {
    premium: 1,
    dedication: 2,
    normal: 3,
    trash: 4,
  };

  const sortedMemes = [...memes].sort((a, b) => {
    const catDiff = categoryOrder[a.category] - categoryOrder[b.category];
    if (catDiff !== 0) return catDiff;
    return parseInt(a.number, 10) - parseInt(b.number, 10);
  });

  const filteredMemes = selectedCategory === 'all'
    ? sortedMemes
    : sortedMemes.filter((m) => m.category === selectedCategory);

  // Grouped category sections for smooth category scrolling when 'all' is selected
  const premiumMemes = memes.filter((m) => m.category === 'premium');
  const dedicationMemes = memes.filter((m) => m.category === 'dedication');
  const normalMemes = memes.filter((m) => m.category === 'normal');
  const trashMemes = memes.filter((m) => m.category === 'trash');

  if (currentPage === 'material') {
    return (
      <MaterialPage
        onBackToIntro={onBackToIntro}
        onEnterMap={() => setCurrentPage('map')}
        onSkipToMemes={() => {
          setSelectedCategory('all');
          setCurrentPage('category');
        }}
      />
    );
  }

  if (currentPage === 'map') {
    return (
      <MapPage
        memes={memes}
        onBackToMaterial={() => setCurrentPage('material')}
        onSelectCategory={handleSelectCategoryFromMap}
        unlockedStep={unlockedStep}
        onUnlockNext={() => setUnlockedStep((step) => Math.min(step + 1, 5))}
      />
    );
  }

  // CATEGORY GALLERY VIEW (PRESERVING SCROLLING EFFECT & CLEAN MEMES)
  return (
    <div className="min-h-screen bg-[#080a0f] text-[#f7f4ec] selection:bg-[#5b1e95] selection:text-[#f3d99b] bg-grid-pattern pb-24 relative overflow-x-hidden">
      {/* Top Bar Navigation */}
      <nav className="w-full max-w-7xl mx-auto px-6 lg:px-12 pt-8 pb-4 flex items-center justify-between border-b border-[#f7f4ec]/10 sticky top-0 bg-[#080a0f]/95 backdrop-blur-md z-40">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentPage('map')}
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#5b1e95]/30 border border-[#f3d99b]/40 rounded text-xs font-mono-code font-bold text-[#f3d99b] hover:bg-[#5b1e95] hover:text-[#ffffff] transition-colors cursor-pointer"
          >
            <Map className="w-3.5 h-3.5" />
            <span>BACK TO MAP</span>
          </button>
          <button
            onClick={() => setCurrentPage('material')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 bg-transparent text-[#f7f4ec]/60 hover:text-[#f3d99b] text-xs font-mono-code transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Material Stage</span>
          </button>
        </div>

        {/* Category Filter Tabs Bar */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar font-mono-code text-xs">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded transition-all cursor-pointer border ${
              selectedCategory === 'all'
                ? 'bg-[#f3d99b] text-[#080a0f] border-[#f3d99b] font-bold'
                : 'bg-[#080a0f] text-[#f7f4ec]/70 border-[#f7f4ec]/15 hover:border-[#f3d99b]'
            }`}
          >
            ALL ({memes.length})
          </button>
          <button
            onClick={() => setSelectedCategory('premium')}
            className={`px-3 py-1.5 rounded transition-all cursor-pointer border ${
              selectedCategory === 'premium'
                ? 'bg-[#f3d99b] text-[#080a0f] border-[#f3d99b] font-bold'
                : 'bg-[#080a0f] text-[#f7f4ec]/70 border-[#f7f4ec]/15 hover:border-[#f3d99b]'
            }`}
          >
            PREMIUM ({premiumMemes.length})
          </button>
          <button
            onClick={() => setSelectedCategory('dedication')}
            className={`px-3 py-1.5 rounded transition-all cursor-pointer border ${
              selectedCategory === 'dedication'
                ? 'bg-[#c084fc] text-[#080a0f] border-[#c084fc] font-bold'
                : 'bg-[#080a0f] text-[#f7f4ec]/70 border-[#f7f4ec]/15 hover:border-[#c084fc]'
            }`}
          >
            DEDICATION ({dedicationMemes.length})
          </button>
          <button
            onClick={() => setSelectedCategory('normal')}
            className={`px-3 py-1.5 rounded transition-all cursor-pointer border ${
              selectedCategory === 'normal'
                ? 'bg-[#6a23b3] text-[#f7f4ec] border-[#6a23b3] font-bold'
                : 'bg-[#080a0f] text-[#f7f4ec]/70 border-[#f7f4ec]/15 hover:border-[#6a23b3]'
            }`}
          >
            NORMAL ({normalMemes.length})
          </button>
          <button
            onClick={() => setSelectedCategory('trash')}
            className={`px-3 py-1.5 rounded transition-all cursor-pointer border ${
              selectedCategory === 'trash'
                ? 'bg-[#5b1e95] text-[#f3d99b] border-[#5b1e95] font-bold'
                : 'bg-[#080a0f] text-[#f7f4ec]/70 border-[#f7f4ec]/15 hover:border-[#5b1e95]'
            }`}
          >
            TRASH ({trashMemes.length})
          </button>
        </div>
      </nav>

      {/* Main Memes Content Area */}
      <main className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-8">
        {selectedCategory === 'all' ? (
          /* STICKY STACKED CATEGORY SECTIONS WITH SCROLL OVERLAP TRANSITIONS */
          <div className="space-y-16 pb-24 relative">
            {/* Premium Category Section - Sticky Stacked Card 1 */}
            {premiumMemes.length > 0 && (
              <section
                id="section-premium"
                className="sticky top-20 z-10 bg-[#080a0f]/95 border-2 border-[#f3d99b]/60 rounded-xl p-6 sm:p-8 shadow-[0_-10px_35px_rgba(0,0,0,0.85)] backdrop-blur-xl transition-all duration-300 mb-16"
              >
                <div className="flex items-center justify-between border-b border-[#f3d99b]/30 pb-4 mb-8">
                  <div className="flex items-center gap-3">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#f3d99b] shadow-[0_0_12px_#f3d99b]" />
                    <h2 className="font-display-heading text-2xl sm:text-3xl font-black text-[#f3d99b] tracking-tight">
                      PREMIUM CUT ({premiumMemes.length})
                    </h2>
                  </div>
                  <span className="font-mono-code text-xs px-2.5 py-1 rounded bg-[#f3d99b]/10 text-[#f3d99b] border border-[#f3d99b]/30 font-bold">
                    NODE 01
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {premiumMemes.map((meme) => (
                    <MemeCard key={meme.id} meme={meme} onClick={() => onSelectMeme(meme)} />
                  ))}
                </div>
              </section>
            )}

            {/* Dedication Category Section - Sticky Stacked Card 2 */}
            {dedicationMemes.length > 0 && (
              <section
                id="section-dedication"
                className="sticky top-24 z-20 bg-[#080a0f]/95 border-2 border-[#c084fc]/60 rounded-xl p-6 sm:p-8 shadow-[0_-12px_40px_rgba(0,0,0,0.9)] backdrop-blur-xl transition-all duration-300 mb-16"
              >
                <div className="flex items-center justify-between border-b border-[#c084fc]/30 pb-4 mb-8">
                  <div className="flex items-center gap-3">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#c084fc] shadow-[0_0_12px_#c084fc]" />
                    <h2 className="font-display-heading text-2xl sm:text-3xl font-black text-[#c084fc] tracking-tight">
                      DEDICATION CUT ({dedicationMemes.length})
                    </h2>
                  </div>
                  <span className="font-mono-code text-xs px-2.5 py-1 rounded bg-[#c084fc]/10 text-[#c084fc] border border-[#c084fc]/30 font-bold">
                    NODE 02
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {dedicationMemes.map((meme) => (
                    <MemeCard key={meme.id} meme={meme} onClick={() => onSelectMeme(meme)} />
                  ))}
                </div>
              </section>
            )}

            {/* Normal Category Section - Sticky Stacked Card 3 */}
            {normalMemes.length > 0 && (
              <section
                id="section-normal"
                className="sticky top-28 z-30 bg-[#080a0f]/95 border-2 border-[#6a23b3]/60 rounded-xl p-6 sm:p-8 shadow-[0_-14px_45px_rgba(0,0,0,0.95)] backdrop-blur-xl transition-all duration-300 mb-16"
              >
                <div className="flex items-center justify-between border-b border-[#6a23b3]/30 pb-4 mb-8">
                  <div className="flex items-center gap-3">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#6a23b3] shadow-[0_0_12px_#6a23b3]" />
                    <h2 className="font-display-heading text-2xl sm:text-3xl font-black text-[#f7f4ec] tracking-tight">
                      NORMAL CUT ({normalMemes.length})
                    </h2>
                  </div>
                  <span className="font-mono-code text-xs px-2.5 py-1 rounded bg-[#6a23b3]/20 text-[#a855f7] border border-[#6a23b3]/50 font-bold">
                    NODE 03
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {normalMemes.map((meme) => (
                    <MemeCard key={meme.id} meme={meme} onClick={() => onSelectMeme(meme)} />
                  ))}
                </div>
              </section>
            )}

            {/* Trash Category Section - Sticky Stacked Card 4 */}
            {trashMemes.length > 0 && (
              <section
                id="section-trash"
                className="sticky top-32 z-40 bg-[#080a0f]/95 border-2 border-[#5b1e95]/60 rounded-xl p-6 sm:p-8 shadow-[0_-16px_50px_rgba(0,0,0,0.98)] backdrop-blur-xl transition-all duration-300 mb-16"
              >
                <div className="flex items-center justify-between border-b border-[#5b1e95]/30 pb-4 mb-8">
                  <div className="flex items-center gap-3">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#5b1e95] shadow-[0_0_12px_#5b1e95]" />
                    <h2 className="font-display-heading text-2xl sm:text-3xl font-black text-[#f3d99b] tracking-tight">
                      TRASH CUT ({trashMemes.length})
                    </h2>
                  </div>
                  <span className="font-mono-code text-xs px-2.5 py-1 rounded bg-[#5b1e95]/20 text-[#f3d99b] border border-[#5b1e95]/50 font-bold">
                    NODE 04
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {trashMemes.map((meme) => (
                    <MemeCard key={meme.id} meme={meme} onClick={() => onSelectMeme(meme)} />
                  ))}
                </div>
              </section>
            )}
          </div>
        ) : (
          /* FILTERED CATEGORY GRID */
          <div>
            <div className="flex items-center justify-between border-b border-[#f7f4ec]/10 pb-4 mb-6">
              <h2 className="font-display-heading text-2xl font-bold uppercase text-[#f3d99b]">
                {selectedCategory} CUT ({filteredMemes.length})
              </h2>
              <span className="font-mono-code text-xs text-[#f7f4ec]/50">FILTERED VIEW</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredMemes.map((meme) => (
                <MemeCard key={meme.id} meme={meme} onClick={() => onSelectMeme(meme)} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
