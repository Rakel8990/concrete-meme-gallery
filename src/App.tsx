import React, { lazy, Suspense, useState, useEffect } from 'react';
import { IntroPage } from './components/IntroPage';
import { GalleryPage } from './components/GalleryPage';
import { MemeLightbox } from './components/MemeLightbox';
import { INITIAL_MEMES } from './data/initialMemes';
import { Meme, MemeCategory } from './types';
import { saveItem, getItem } from './utils/storage';
import { safeMediaUrl, safeVideoUrl, sanitizeMemes } from './utils/media';

const PdfExtractorModal = lazy(() => import('./components/PdfExtractorModal').then((module) => ({ default: module.PdfExtractorModal })));

const STORAGE_KEY = 'concrete_xyz_meme_gallery_v6';
const VIDEO_STORAGE_KEY = 'concrete_xyz_intro_video';

export default function App() {
  const [activePage, setActivePage] = useState<'intro' | 'gallery'>('intro');
  
  // Memes state with initial PDF concrete.xyz memes & new additions
  const [memes, setMemes] = useState<Meme[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = sanitizeMemes<Meme>(JSON.parse(saved));
        const existingIds = new Set(parsed.map((m) => m.id));
        const missing = INITIAL_MEMES.filter((m) => !existingIds.has(m.id));
        if (missing.length > 0) {
          return [...missing, ...parsed];
        }
        return parsed;
      }
    } catch (e) {
      console.warn('LocalStorage read skipped:', e);
    }
    return INITIAL_MEMES;
  });

  // Async load from IndexedDB on initial mount if available
  useEffect(() => {
    getItem<Meme[]>(STORAGE_KEY).then((saved) => {
      const validSaved = sanitizeMemes<Meme>(saved);
      if (validSaved.length > 0) {
        const existingIds = new Set(validSaved.map((m) => m.id));
        const missing = INITIAL_MEMES.filter((m) => !existingIds.has(m.id));
        setMemes(missing.length > 0 ? [...missing, ...validSaved] : validSaved);
      }
    });
  }, []);

  // Intro Video URL state
  const [videoUrl, setVideoUrl] = useState<string>(() => {
    try {
      return safeVideoUrl(localStorage.getItem(VIDEO_STORAGE_KEY), 'https://files.catbox.moe/fmrpp0.mp4');
    } catch {
      return 'https://files.catbox.moe/fmrpp0.mp4';
    }
  });

  useEffect(() => {
    getItem<string>(VIDEO_STORAGE_KEY).then((saved) => {
      if (saved) {
        setVideoUrl(safeVideoUrl(saved, 'https://files.catbox.moe/fmrpp0.mp4'));
      }
    });
  }, []);

  // Lightbox & Modal States
  const [selectedMeme, setSelectedMeme] = useState<Meme | null>(null);
  const [viewerMemes, setViewerMemes] = useState<Meme[]>([]);
  const [viewerIndex, setViewerIndex] = useState(0);
  const [lightboxBackToMap, setLightboxBackToMap] = useState<(() => void) | null>(null);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  // Persist memes to storage without quota crash
  useEffect(() => {
    saveItem(STORAGE_KEY, memes);
  }, [memes]);

  // Persist video URL
  const handleUploadVideo = (url: string) => {
    const safeUrl = safeVideoUrl(url, 'https://files.catbox.moe/fmrpp0.mp4');
    setVideoUrl(safeUrl);
    saveItem(VIDEO_STORAGE_KEY, safeUrl);
  };

  // Actions
  const handleLike = (id: string) => {
    setMemes((prev) =>
      prev.map((m) => (m.id === id ? { ...m, likes: m.likes + 1 } : m))
    );
    if (selectedMeme && selectedMeme.id === id) {
      setSelectedMeme((prev) => (prev ? { ...prev, likes: prev.likes + 1 } : null));
    }
  };

  const handleCategoryChange = (id: string, newCategory: MemeCategory) => {
    setMemes((prev) =>
      prev.map((m) => (m.id === id ? { ...m, category: newCategory } : m))
    );
    if (selectedMeme && selectedMeme.id === id) {
      setSelectedMeme((prev) => (prev ? { ...prev, category: newCategory } : null));
    }
  };

  const handleUpdateMemeText = (id: string, topText: string, bottomText: string) => {
    setMemes((prev) =>
      prev.map((m) => (m.id === id ? { ...m, topText, bottomText } : m))
    );
  };

  const handleImportPdfMemes = (newMemes: Meme[]) => {
    const validMemes = sanitizeMemes<Meme>(newMemes);
    setMemes((prev) => sanitizeMemes<Meme>([...validMemes, ...prev]));
  };

  const handleAddMeme = (memeData: Partial<Meme>) => {
    const newMeme: Meme = {
      id: `meme-${Date.now()}`,
      number: memeData.number || `${memes.length + 1}`,
      title: memeData.title || 'Untitled Concrete Meme',
      imageUrl: safeMediaUrl(memeData.imageUrl),
      category: memeData.category || 'premium',
      tags: memeData.tags || ['Concrete'],
      topText: memeData.topText || '',
      bottomText: memeData.bottomText || '',
      description: memeData.description || '',
      likes: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setMemes((prev) => [newMeme, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#080a0f] text-[#f7f4ec] font-sans">
      {activePage === 'intro' ? (
        <IntroPage
          onEnterGallery={() => setActivePage('gallery')}
          videoUrl={videoUrl}
          onUploadVideo={handleUploadVideo}
        />
      ) : (
        <GalleryPage
          memes={memes}
          onBackToIntro={() => setActivePage('intro')}
          onSelectMeme={(m, list, index, backToMap) => {
            setSelectedMeme(m);
            setViewerMemes(list);
            setViewerIndex(index);
            setLightboxBackToMap(() => backToMap);
          }}
        />
      )}

      {/* Lightbox for viewing high-res meme */}
      <MemeLightbox
        memes={selectedMeme ? viewerMemes : []}
        index={viewerIndex}
        onClose={() => {
          setSelectedMeme(null);
          setLightboxBackToMap(null);
        }}
        onChange={(index) => {
          setViewerIndex(index);
          setSelectedMeme(viewerMemes[index] ?? null);
        }}
        onBackToMap={lightboxBackToMap ? () => {
          setSelectedMeme(null);
          lightboxBackToMap();
          setLightboxBackToMap(null);
        } : undefined}
      />

      {/* PDF Extraction Modal */}
      <Suspense fallback={null}>
        <PdfExtractorModal
          isOpen={isPdfModalOpen}
          onClose={() => setIsPdfModalOpen(false)}
          onImportMemes={handleImportPdfMemes}
        />
      </Suspense>
    </div>
  );
}
