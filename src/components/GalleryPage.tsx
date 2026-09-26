import React, { useMemo, useState } from 'react';
import { ArrowLeft, FolderArchive } from 'lucide-react';
import { Meme, MemeCategory } from '../types';
import { MaterialPage } from './MaterialPage';
import { MapPage } from './MapPage';
import { MemeCard } from './MemeCard';
import { TrashPage } from './TrashPage';
import { OutroPage } from './OutroPage';
import { ArchiveModal } from './ArchiveModal';

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

const isVideoMeme = (m: Meme) =>
  m.mediaType === 'video' || !!m.videoUrl || (typeof m.imageUrl === 'string' && m.imageUrl.endsWith('.mp4'));

export const GalleryPage: React.FC<GalleryPageProps> = ({ memes, onBackToIntro, onSelectMeme }) => {
  const [currentPage, setCurrentPage] = useState<'material' | 'map' | 'category' | 'outro'>('material');
  const [selectedCategory, setSelectedCategory] = useState<MemeCategory | 'all'>('all');
  const [premiumSubFilter, setPremiumSubFilter] = useState<'all' | 'videos' | 'images'>('all');
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  // Premium (step 1) is unlocked from the start
  const [unlockedStep, setUnlockedStep] = useState(1);

  // Archive unlock status: all maps and outro open after user opens the archive
  const [isArchiveUnlocked, setIsArchiveUnlocked] = useState<boolean>(() => {
    try {
      return localStorage.getItem('concrete_archive_unlocked') === 'true';
    } catch {
      return false;
    }
  });

  const handleUnlockArchive = () => {
    setIsArchiveUnlocked(true);
    try {
      localStorage.setItem('concrete_archive_unlocked', 'true');
    } catch {
      // safe
    }
  };

  const ordered = useMemo(() => [...memes].sort((a, b) => Number(a.number) - Number(b.number)), [memes]);
  const visible = selectedCategory === 'all' ? ordered : ordered.filter((m) => m.category === selectedCategory);

  // Dedicated Premium sub-categories: Videos stay at top, Images underneath
  const premiumVideos = useMemo(
    () => ordered.filter((m) => m.category === 'premium' && isVideoMeme(m)),
    [ordered]
  );
  const premiumImages = useMemo(
    () => ordered.filter((m) => m.category === 'premium' && !isVideoMeme(m)),
    [ordered]
  );
  const allPremiumMemes = useMemo(
    () => [...premiumVideos, ...premiumImages],
    [premiumVideos, premiumImages]
  );

  // When a user opens a category, immediately unlock the NEXT category in sequence:
  const handleCategory = (category: MemeCategory) => {
    setSelectedCategory(category);
    setPremiumSubFilter('all');
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
        isArchiveUnlocked={isArchiveUnlocked}
        onUnlockArchive={handleUnlockArchive}
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
    <div className="gallery-page gallery-page-enter">
      <nav className="gallery-index__nav gallery-toolbar gallery-header-enter">
        <div className="gallery-toolbar__links">
          <button className="gallery-link" onClick={() => setCurrentPage('map')}>
            <ArrowLeft aria-hidden="true" /> BACK TO MAP
          </button>
          <button
            type="button"
            className="gallery-link gallery-link--archive flex items-center gap-1.5 text-[#f3d99b] hover:text-white transition-colors cursor-pointer"
            onClick={() => {
              handleUnlockArchive();
              setIsArchiveOpen(true);
            }}
            aria-label="Open Kian Archive origin log"
          >
            <FolderArchive className="w-3.5 h-3.5" /> ARCHIVE
          </button>
        </div>

        {selectedCategory === 'premium' && (
          <div className="gallery-filters">
            <button
              type="button"
              className={premiumSubFilter === 'all' ? 'is-active' : ''}
              onClick={() => setPremiumSubFilter('all')}
            >
              ALL
            </button>
            <button
              type="button"
              className={premiumSubFilter === 'videos' ? 'is-active' : ''}
              onClick={() => setPremiumSubFilter('videos')}
            >
              VIDEOS
            </button>
            <button
              type="button"
              className={premiumSubFilter === 'images' ? 'is-active' : ''}
              onClick={() => setPremiumSubFilter('images')}
            >
              IMAGES
            </button>
          </div>
        )}
      </nav>

      <main className="gallery-main">
        {selectedCategory === 'premium' ? (
          <>
            <div className="gallery-heading-row gallery-header-enter">
              <h1 className="gallery-section-title">PREMIUM MEMES</h1>
              <span className="gallery-count">{visible.length} FILES</span>
            </div>

            {/* Videos Section at Top */}
            {(premiumSubFilter === 'all' || premiumSubFilter === 'videos') && (
              <section className="mb-10">
                <div className="gallery-heading-row mb-4 border-b border-white/10 pb-2 gallery-header-enter">
                  <h2 className="gallery-section-title text-base">VIDEOS</h2>
                  <span className="gallery-count">{premiumVideos.length}</span>
                </div>

                <div className="masonry-grid grid grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-6 items-start">
                  {premiumVideos.map((videoMeme, vIdx) => {
                    const list = premiumSubFilter === 'videos' ? premiumVideos : allPremiumMemes;
                    const targetIndex = vIdx;
                    return (
                      <MemeCard
                        key={videoMeme.id}
                        meme={videoMeme}
                        index={vIdx}
                        onClick={() => onSelectMeme(videoMeme, list, targetIndex)}
                      />
                    );
                  })}
                </div>
              </section>
            )}

            {/* Images Section Underneath */}
            {(premiumSubFilter === 'all' || premiumSubFilter === 'images') && (
              <section className="mb-10">
                <div className="gallery-heading-row mb-4 border-b border-white/10 pb-2 gallery-header-enter">
                  <h2 className="gallery-section-title text-base">IMAGES</h2>
                  <span className="gallery-count">{premiumImages.length}</span>
                </div>

                <div className="masonry-grid grid grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-6 items-start">
                  {premiumImages.map((meme, imgIdx) => {
                    const list = premiumSubFilter === 'images' ? premiumImages : allPremiumMemes;
                    const targetIndex = premiumSubFilter === 'images' ? imgIdx : premiumVideos.length + imgIdx;
                    return (
                      <MemeCard
                        key={meme.id}
                        meme={meme}
                        index={premiumSubFilter === 'images' ? imgIdx : premiumVideos.length + imgIdx}
                        onClick={() => onSelectMeme(meme, list, targetIndex)}
                      />
                    );
                  })}
                </div>
              </section>
            )}
          </>
        ) : (
          <>
            <div className="gallery-heading-row gallery-header-enter">
              <h1 className="gallery-section-title">
                {selectedCategory === 'all' ? 'All memes' : `${selectedCategory.toUpperCase()} MEMES`}
              </h1>
              <span className="gallery-count">{visible.length} FILES</span>
            </div>
            <div className="masonry-grid grid grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-6 items-start">
              {visible.map((meme, index) => (
                <MemeCard
                  key={meme.id}
                  meme={meme}
                  index={index}
                  onClick={() => onSelectMeme(meme, visible, index)}
                />
              ))}
            </div>
          </>
        )}

        <div className="gallery-footer-nav">
          <button className="gallery-footer-btn" onClick={() => setCurrentPage('map')}>
            <ArrowLeft className="w-4 h-4" /> RETURN TO ROUTE MAP
          </button>
        </div>
      </main>

      {/* Archive Origin Dossier Modal */}
      <ArchiveModal
        isOpen={isArchiveOpen}
        onClose={() => setIsArchiveOpen(false)}
      />
    </div>
  );
};
