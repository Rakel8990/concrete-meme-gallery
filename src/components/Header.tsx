import React from 'react';
import {
  FileUp,
  Plus,
  Sparkles,
  Download,
  Upload,
  Search,
  Filter,
  Layers,
  Flame,
  Award,
  Trash2,
} from 'lucide-react';
import { MemeCategory, SortOption } from '../types';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: MemeCategory | 'all';
  setSelectedCategory: (cat: MemeCategory | 'all') => void;
  sortOption: SortOption;
  setSortOption: (sort: SortOption) => void;
  onOpenPdfModal: () => void;
  onOpenAddModal: () => void;
  onOpenGeneratorModal: () => void;
  onExportGallery: () => void;
  onImportGallery: (e: React.ChangeEvent<HTMLInputElement>) => void;
  stats: {
    total: number;
    premium: number;
    normal: number;
    trash: number;
  };
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  sortOption,
  setSortOption,
  onOpenPdfModal,
  onOpenAddModal,
  onOpenGeneratorModal,
  onExportGallery,
  onImportGallery,
  stats,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Top bar: Brand & Action Buttons */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-300 p-0.5 shadow-lg shadow-amber-500/20">
              <div className="h-full w-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <span className="text-2xl" role="img" aria-label="Concrete Slab">
                  🧱
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
                  CONCRETE <span className="text-amber-400">MEME GALLERY</span>
                </h1>
                <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  PRO WORK
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 font-medium">
                Numbered & Classified Gallery • Extract Images from PDF • Site Work Humor
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              id="extract-pdf-btn"
              onClick={onOpenPdfModal}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-sm hover:from-amber-400 hover:to-orange-400 transition-all shadow-lg shadow-amber-500/20 active:scale-95 cursor-pointer"
            >
              <FileUp className="w-4 h-4 stroke-[2.5]" />
              <span>Extract PDF to Web</span>
            </button>

            <button
              id="ai-meme-gen-btn"
              onClick={onOpenGeneratorModal}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 text-sm font-semibold transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Meme Generator</span>
            </button>

            <button
              id="add-meme-btn"
              onClick={onOpenAddModal}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 text-sm font-semibold transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Meme</span>
            </button>

            {/* Gallery Export/Import */}
            <div className="flex items-center bg-slate-800/80 rounded-lg p-0.5 border border-slate-700">
              <button
                onClick={onExportGallery}
                title="Export Gallery Backup (JSON)"
                className="p-2 text-slate-400 hover:text-slate-100 transition-colors"
              >
                <Download className="w-4 h-4" />
              </button>
              <label
                title="Import Gallery (JSON)"
                className="p-2 text-slate-400 hover:text-slate-100 transition-colors cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                <input
                  type="file"
                  accept=".json"
                  onChange={onImportGallery}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Stats Summary Bar */}
        <div className="mt-4 pt-3 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 sm:gap-4 font-semibold text-slate-300">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-slate-700 text-white font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-slate-400" />
              <span>All ({stats.total})</span>
            </button>

            <button
              onClick={() => setSelectedCategory('premium')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors ${
                selectedCategory === 'premium'
                  ? 'bg-amber-500/20 text-amber-400 font-bold border border-amber-500/40'
                  : 'text-amber-400/80 hover:text-amber-300'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Premium ({stats.premium})</span>
            </button>

            <button
              onClick={() => setSelectedCategory('normal')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors ${
                selectedCategory === 'normal'
                  ? 'bg-sky-500/20 text-sky-300 font-bold border border-sky-500/40'
                  : 'text-sky-400/80 hover:text-sky-300'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-sky-400" />
              <span>Normal ({stats.normal})</span>
            </button>

            <button
              onClick={() => setSelectedCategory('trash')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors ${
                selectedCategory === 'trash'
                  ? 'bg-rose-500/20 text-rose-300 font-bold border border-rose-500/40'
                  : 'text-rose-400/80 hover:text-rose-300'
              }`}
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-400" />
              <span>Trash ({stats.trash})</span>
            </button>
          </div>

          {/* Quick info note */}
          <div className="hidden lg:flex items-center gap-2 text-slate-400 italic">
            <span>Numbered #1-#10, #dedication pre-categorized in Premium!</span>
          </div>
        </div>

        {/* Search & Sort Row */}
        <div className="mt-3 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search concrete memes by title, number (#1, #8), tag, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-300"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span>Sort:</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="bg-transparent text-slate-200 text-xs font-semibold focus:outline-none cursor-pointer"
              >
                <option value="number-asc" className="bg-slate-900">
                  Number (#1 → #10)
                </option>
                <option value="number-desc" className="bg-slate-900">
                  Number (#10 → #1)
                </option>
                <option value="likes-desc" className="bg-slate-900">
                  Most Liked 🔥
                </option>
                <option value="recent" className="bg-slate-900">
                  Recently Added
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
