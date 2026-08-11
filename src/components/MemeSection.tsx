import React, { useState } from 'react';
import { Award, Flame, Trash2, ChevronDown, ChevronRight } from 'lucide-react';
import { Meme, MemeCategory } from '../types';
import { MemeCard } from './MemeCard';

interface MemeSectionProps {
  category: MemeCategory;
  title: string;
  description: string;
  memes: Meme[];
  onView: (meme: Meme) => void;
  onEdit: (meme: Meme) => void;
  onDelete: (id: string) => void;
  onLike: (id: string) => void;
  onCategoryChange: (id: string, newCategory: MemeCategory) => void;
  onOpenAddModalWithCategory?: (cat: MemeCategory) => void;
}

export const MemeSection: React.FC<MemeSectionProps> = ({
  category,
  title,
  description,
  memes,
  onView,
  onEdit,
  onDelete,
  onLike,
  onCategoryChange,
  onOpenAddModalWithCategory,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const getSectionIcon = () => {
    switch (category) {
      case 'premium':
        return <Award className="w-6 h-6 text-amber-400 stroke-[2.5]" />;
      case 'normal':
        return <Flame className="w-6 h-6 text-sky-400 stroke-[2.5]" />;
      case 'trash':
        return <Trash2 className="w-6 h-6 text-rose-400 stroke-[2.5]" />;
    }
  };

  const getSectionBadgeClass = () => {
    switch (category) {
      case 'premium':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'normal':
        return 'bg-sky-500/10 text-sky-400 border-sky-500/30';
      case 'trash':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
    }
  };

  const getHeaderAccent = () => {
    switch (category) {
      case 'premium':
        return 'border-l-4 border-amber-500';
      case 'normal':
        return 'border-l-4 border-sky-500';
      case 'trash':
        return 'border-l-4 border-rose-500';
    }
  };

  return (
    <section className="mb-10">
      {/* Section Header */}
      <div
        className={`bg-slate-900 rounded-xl p-4 sm:p-5 border border-slate-800 shadow-md ${getHeaderAccent()} flex items-center justify-between cursor-pointer select-none`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
            {getSectionIcon()}
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl sm:text-2xl font-black text-slate-100 uppercase tracking-tight">
                {title}
              </h2>
              <span
                className={`px-3 py-0.5 text-xs font-bold rounded-full border ${getSectionBadgeClass()}`}
              >
                {memes.length} {memes.length === 1 ? 'Meme' : 'Memes'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              {description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onOpenAddModalWithCategory && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenAddModalWithCategory(category);
              }}
              className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            >
              + Add to {title.split(' ')[0]}
            </button>
          )}

          <button className="p-2 rounded-lg bg-slate-950 text-slate-400 hover:text-slate-100 transition-colors">
            {isExpanded ? (
              <ChevronDown className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Grid of Memes */}
      {isExpanded && (
        <div className="mt-6">
          {memes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {memes.map((meme) => (
                <MemeCard
                  key={meme.id}
                  meme={meme}
                  onView={onView}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onLike={onLike}
                  onCategoryChange={onCategoryChange}
                />
              ))}
            </div>
          ) : (
            <div className="bg-slate-900/40 border-2 border-dashed border-slate-800 rounded-xl p-8 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-slate-600 mb-3">
                {getSectionIcon()}
              </div>
              <p className="text-slate-400 text-sm font-medium mb-1">
                No memes in {title} yet.
              </p>
              <p className="text-slate-500 text-xs mb-4">
                Extract images from a PDF or click below to add a concrete meme!
              </p>
              {onOpenAddModalWithCategory && (
                <button
                  onClick={() => onOpenAddModalWithCategory(category)}
                  className="px-4 py-2 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors cursor-pointer"
                >
                  + Add First {title.split(' ')[0]} Meme
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
};
