import React, { useState } from 'react';
import { Meme, MemeCategory } from '../types';
import { Map, ArrowLeft, LayoutGrid, ChevronRight, User, Film, CheckCircle2, X, ExternalLink } from 'lucide-react';

interface MapPageProps {
  memes: Meme[];
  onBackToMaterial: () => void;
  onSelectCategory: (cat: MemeCategory | 'all') => void;
}

export const MapPage: React.FC<MapPageProps> = ({
  memes,
  onBackToMaterial,
  onSelectCategory,
}) => {
  const [activeModal, setActiveModal] = useState<'kian' | 'outro' | null>(null);

  const totalCount = memes.length;
  const premiumCount = memes.filter((m) => m.category === 'premium').length;
  const dedicationCount = memes.filter((m) => m.category === 'dedication').length;
  const normalCount = memes.filter((m) => m.category === 'normal').length;
  const trashCount = memes.filter((m) => m.category === 'trash').length;

  const mapNodes = [
    {
      id: 'premium',
      type: 'category',
      category: 'premium' as MemeCategory,
      title: 'PREMIUM CUT',
      tag: 'NODE 01',
      color: 'border-[#f3d99b]',
      bg: 'bg-[#f3d99b]/10',
      badgeBg: 'bg-[#f3d99b] text-[#080a0f]',
      count: premiumCount,
      description: 'Hand-picked elite meme artifacts.',
      memes: memes.filter((m) => m.category === 'premium'),
    },
    {
      id: 'dedication',
      type: 'category',
      category: 'dedication' as MemeCategory,
      title: 'DEDICATION CUT',
      tag: 'NODE 02',
      color: 'border-[#c084fc]',
      bg: 'bg-[#c084fc]/10',
      badgeBg: 'bg-[#c084fc] text-[#080a0f]',
      count: dedicationCount,
      description: 'Community obsession & high effort edits.',
      memes: memes.filter((m) => m.category === 'dedication'),
    },
    {
      id: 'normal',
      type: 'category',
      category: 'normal' as MemeCategory,
      title: 'NORMAL CUT',
      tag: 'NODE 03',
      color: 'border-[#6a23b3]',
      bg: 'bg-[#6a23b3]/10',
      badgeBg: 'bg-[#6a23b3] text-[#f7f4ec]',
      count: normalCount,
      description: 'Standard operational memes.',
      memes: memes.filter((m) => m.category === 'normal'),
    },
    {
      id: 'trash',
      type: 'category',
      category: 'trash' as MemeCategory,
      title: 'TRASH CUT',
      tag: 'NODE 04',
      color: 'border-[#5b1e95]',
      bg: 'bg-[#5b1e95]/10',
      badgeBg: 'bg-[#5b1e95] text-[#f3d99b]',
      count: trashCount,
      description: 'Shitposts & experimental chaos.',
      memes: memes.filter((m) => m.category === 'trash'),
    },
    {
      id: 'kian',
      type: 'kian',
      title: 'KIAN ARCHIVE',
      tag: 'NODE 05',
      color: 'border-[#f3d99b]',
      bg: 'bg-[#f3d99b]/15',
      badgeBg: 'bg-[#f3d99b] text-[#080a0f]',
      count: 'CURATOR',
      description: 'Lead Curator @22kian_. Official archive node.',
    },
    {
      id: 'outro',
      type: 'outro',
      title: 'OUTRO STREAM',
      tag: 'NODE 06',
      color: 'border-[#a855f7]',
      bg: 'bg-[#a855f7]/15',
      badgeBg: 'bg-[#a855f7] text-[#080a0f]',
      count: 'TEASER',
      description: 'Upcoming videos, lore & credits.',
    },
  ];

  const handleNodeClick = (node: typeof mapNodes[0]) => {
    if (node.type === 'category') {
      onSelectCategory(node.category);
    } else if (node.type === 'kian') {
      setActiveModal('kian');
    } else if (node.type === 'outro') {
      setActiveModal('outro');
    }
  };

  return (
    <div className="min-h-screen bg-[#080a0f] text-[#f7f4ec] bg-grid-pattern pb-16 relative overflow-x-hidden">
      {/* Top Bar Navigation */}
      <nav className="w-full max-w-7xl mx-auto px-6 lg:px-12 pt-8 pb-4 flex items-center justify-between border-b border-[#f7f4ec]/10 z-10 relative">
        <button
          onClick={onBackToMaterial}
          className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#5b1e95]/30 border border-[#f3d99b]/40 rounded text-xs font-mono-code font-bold text-[#f3d99b] hover:bg-[#5b1e95] hover:text-[#ffffff] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO MATERIAL</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onSelectCategory('all')}
            className="px-4 py-2 bg-[#f3d99b] text-[#080a0f] border border-[#f3d99b] rounded text-xs font-mono-code font-bold hover:bg-white transition-all cursor-pointer flex items-center gap-2 shadow-md"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>VIEW ALL MEMES ({totalCount})</span>
          </button>
        </div>
      </nav>

      {/* Main Map Content Area */}
      <main className="w-full max-w-6xl mx-auto px-6 lg:px-12 pt-8 pb-12">
        {/* Title & Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="font-mono-code text-xs text-[#f3d99b] uppercase tracking-widest flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#f3d99b] animate-pulse" />
              NODE ARCHITECTURE MATRIX
            </div>
            <h1 className="font-display-heading text-3xl sm:text-4xl font-black text-[#f7f4ec] flex items-center gap-3">
              <Map className="w-8 h-8 text-[#f3d99b]" />
              <span>CONCRETE 6-NODE MAP</span>
            </h1>
            <p className="text-xs text-[#f7f4ec]/60 font-mono-code mt-1">
              Select a category node to enter its dedicated meme repository.
            </p>
          </div>

          <div className="font-mono-code text-xs text-[#a855f7] bg-[#5b1e95]/30 px-3.5 py-2 border border-[#a855f7]/40 rounded self-start sm:self-auto font-bold">
            6 ACTIVE NODES READY
          </div>
        </div>

        {/* Map Container with Compact Decreased Box Sizes */}
        <div className="bg-[#080a0f]/90 border-2 border-[#5b1e95]/60 rounded-lg p-6 sm:p-8 relative overflow-hidden shadow-2xl">
          {/* Subtle Map Grid Connecting Lines */}
          <div className="hidden md:block absolute inset-0 pointer-events-none z-0 opacity-30">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <line x1="16%" y1="30%" x2="50%" y2="30%" stroke="#f3d99b" strokeWidth="1.5" strokeDasharray="4 4" />
              <line x1="50%" y1="30%" x2="84%" y2="30%" stroke="#c084fc" strokeWidth="1.5" strokeDasharray="4 4" />
              <line x1="16%" y1="30%" x2="16%" y2="70%" stroke="#6a23b3" strokeWidth="1.5" strokeDasharray="4 4" />
              <line x1="50%" y1="30%" x2="50%" y2="70%" stroke="#f3d99b" strokeWidth="1.5" strokeDasharray="4 4" />
              <line x1="84%" y1="30%" x2="84%" y2="70%" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="4 4" />
              <line x1="16%" y1="70%" x2="50%" y2="70%" stroke="#5b1e95" strokeWidth="1.5" strokeDasharray="4 4" />
              <line x1="50%" y1="70%" x2="84%" y2="70%" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="4 4" />
            </svg>
          </div>

          {/* 6 Map Node Boxes - Compact Decreased Size */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {mapNodes.map((node) => (
              <div
                key={node.id}
                onClick={() => handleNodeClick(node)}
                className={`group relative border-2 ${node.color} ${node.bg} p-4 sm:p-5 rounded-sm backdrop-blur-md cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(243,217,155,0.4)] flex flex-col justify-between min-h-[150px]`}
              >
                {/* Node Top Header */}
                <div>
                  <div className="flex items-center justify-between font-mono-code text-[11px] mb-2">
                    <span className="text-[#f7f4ec]/60 font-bold tracking-wider">{node.tag}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${node.badgeBg}`}>
                      {node.count} {typeof node.count === 'number' ? 'MEMES' : ''}
                    </span>
                  </div>

                  <h3 className="font-display-heading text-xl font-extrabold text-[#f7f4ec] group-hover:text-[#f3d99b] transition-colors mb-1">
                    {node.title}
                  </h3>

                  <p className="text-xs text-[#f7f4ec]/70 font-light leading-relaxed mb-3">
                    {node.description}
                  </p>
                </div>

                {/* Node Footer Button */}
                <div className="pt-2.5 border-t border-[#f7f4ec]/10 flex items-center justify-between font-mono-code text-xs">
                  <span className="text-[#f3d99b] font-bold group-hover:underline flex items-center gap-1">
                    {node.type === 'category' ? 'OPEN CATEGORY' : 'INSPECT BOX'}
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </span>

                  {/* Tiny thumbnails preview */}
                  {node.memes && node.memes.length > 0 && (
                    <div className="flex -space-x-1.5">
                      {node.memes.slice(0, 3).map((m) => (
                        <img
                          key={m.id}
                          src={m.imageUrl}
                          alt={m.title}
                          className="w-5 h-5 rounded-full object-cover border border-[#080a0f]"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* MODAL FOR KIAN BOX */}
      {activeModal === 'kian' && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#080a0f] border-2 border-[#f3d99b] max-w-lg w-full p-6 sm:p-8 rounded-sm shadow-2xl relative font-mono-code text-xs">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-1 text-[#f7f4ec]/60 hover:text-[#f3d99b] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#f3d99b] text-[#080a0f] flex items-center justify-center font-bold text-lg">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display-heading text-xl font-bold text-[#f7f4ec]">KIAN ARCHIVE NODE</h3>
                <span className="text-[#f3d99b]">CURATOR & CREATOR @22KIAN_</span>
              </div>
            </div>

            <p className="text-[#f7f4ec]/80 leading-relaxed font-sans text-sm mb-6">
              Welcome to the Kian Archive Box. Every meme in this vault has been created, curated, and formatted specifically for Concrete DeFi culture.
            </p>

            <div className="space-y-3 bg-[#5b1e95]/20 p-4 border border-[#5b1e95]/60 rounded mb-6 text-xs">
              <div className="flex justify-between border-b border-[#5b1e95]/40 pb-2">
                <span className="text-[#f7f4ec]/60">CURATOR:</span>
                <span className="text-[#f3d99b] font-bold">@22kian_</span>
              </div>
              <div className="flex justify-between border-b border-[#5b1e95]/40 pb-2">
                <span className="text-[#f7f4ec]/60">TOTAL ARCHIVED:</span>
                <span className="text-[#f7f4ec] font-bold">{totalCount} Memes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#f7f4ec]/60">STATUS:</span>
                <span className="text-[#a855f7] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  VERIFIED DEFI CREATOR
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <a
                href="https://x.com/22kian_"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-[#f3d99b] text-[#080a0f] font-bold tracking-wider uppercase hover:bg-white transition-colors inline-flex items-center gap-2"
              >
                <span>FOLLOW @22KIAN_</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* MODAL FOR OUTRO BOX */}
      {activeModal === 'outro' && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#080a0f] border-2 border-[#a855f7] max-w-lg w-full p-6 sm:p-8 rounded-sm shadow-2xl relative font-mono-code text-xs">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-1 text-[#f7f4ec]/60 hover:text-[#a855f7] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#a855f7] text-[#080a0f] flex items-center justify-center font-bold text-lg">
                <Film className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display-heading text-xl font-bold text-[#f7f4ec]">OUTRO STREAM NODE</h3>
                <span className="text-[#a855f7]">UPCOMING EPISODES & LORE</span>
              </div>
            </div>

            <p className="text-[#f7f4ec]/80 leading-relaxed font-sans text-sm mb-6">
              This node holds upcoming lore releases, official video drops, and outro credits for the Concrete meme ecosystem.
            </p>

            <div className="space-y-3 bg-[#5b1e95]/20 p-4 border border-[#5b1e95]/60 rounded mb-6 text-xs">
              <div className="flex justify-between border-b border-[#5b1e95]/40 pb-2">
                <span className="text-[#f7f4ec]/60">NEXT VIDEO DROP:</span>
                <span className="text-[#f3d99b] font-bold">Concrete DeFi Episode #02</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#f7f4ec]/60">RELEASE STATUS:</span>
                <span className="text-[#a855f7] font-bold">IN PRODUCTION</span>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-5 py-2.5 bg-[#a855f7] text-[#080a0f] font-bold tracking-wider uppercase hover:bg-white transition-colors cursor-pointer"
              >
                CLOSE BOX
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
