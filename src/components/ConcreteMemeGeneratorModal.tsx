import React, { useState } from 'react';
import { Sparkles, X, Award, Flame, Trash2, Check, RefreshCw } from 'lucide-react';
import { Meme, MemeCategory } from '../types';

interface ConcreteMemeGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMeme: (newMeme: Meme) => void;
  currentCount: number;
}

const PRESET_CONCRETE_MEMES = [
  {
    title: 'The Slump Test Betrayal',
    topText: 'SPECCED AT 4-INCH SLUMP',
    bottomText: 'ARRIVES LOOKING LIKE LIQUID GRAVEL',
    category: 'premium' as MemeCategory,
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80',
    tags: ['Slump Test', 'Batch Plant'],
  },
  {
    title: 'Inspector Eye Angle',
    topText: 'INSPECTOR CHECKING REBAR CLEARANCE',
    bottomText: 'FROM INSIDE HIS AIR-CONDITIONED TRUCK',
    category: 'premium' as MemeCategory,
    imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
    tags: ['Rebar', 'Inspection'],
  },
  {
    title: 'The Rain Radar Illusion',
    topText: 'WEATHER APP SAYS 0% CHANCE OF RAIN',
    bottomText: 'FIRST CHUTE DROPS AND STORM HEADS OVERHEAD',
    category: 'premium' as MemeCategory,
    imageUrl: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=800&q=80',
    tags: ['Rain', 'Site Luck'],
  },
  {
    title: 'Friday 4:30 PM Pour',
    topText: 'WHEN THE DISPATCHER SAYS 15 MINUTES',
    bottomText: 'BUT THE TRUCK WAS BATCHED IN ANOTHER STATE',
    category: 'normal' as MemeCategory,
    imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
    tags: ['Ready Mix', 'Friday'],
  },
  {
    title: 'Formwork Over-confidence',
    topText: 'FORMS ARE 100% SECURE BRO',
    bottomText: 'FAMOUS LAST WORDS BEFORE CORNER BLOWOUT',
    category: 'trash' as MemeCategory,
    imageUrl: 'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&w=800&q=80',
    tags: ['Blowout', 'Formwork'],
  },
  {
    title: 'The Cat Footprint Stamp',
    topText: 'FRESHLY BROOMED CONCRETE',
    bottomText: 'CERTIFIED CAT APPROVED FOOTPRINTS',
    category: 'trash' as MemeCategory,
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80',
    tags: ['Pawprints', 'Site Life'],
  },
];

export const ConcreteMemeGeneratorModal: React.FC<ConcreteMemeGeneratorModalProps> = ({
  isOpen,
  onClose,
  onAddMeme,
  currentCount,
}) => {
  const [selectedPreset, setSelectedPreset] = useState(PRESET_CONCRETE_MEMES[0]);
  const [customTop, setCustomTop] = useState(PRESET_CONCRETE_MEMES[0].topText);
  const [customBottom, setCustomBottom] = useState(PRESET_CONCRETE_MEMES[0].bottomText);
  const [customTitle, setCustomTitle] = useState(PRESET_CONCRETE_MEMES[0].title);
  const [category, setCategory] = useState<MemeCategory>(PRESET_CONCRETE_MEMES[0].category);
  const [assignedNumber, setAssignedNumber] = useState<string>(`${currentCount + 1}`);

  if (!isOpen) return null;

  const handleSelectPreset = (preset: typeof PRESET_CONCRETE_MEMES[0]) => {
    setSelectedPreset(preset);
    setCustomTop(preset.topText);
    setCustomBottom(preset.bottomText);
    setCustomTitle(preset.title);
    setCategory(preset.category);
  };

  const handleCreate = () => {
    const newMeme: Meme = {
      id: `meme-gen-${Date.now()}`,
      number: assignedNumber || `${currentCount + 1}`,
      title: customTitle,
      imageUrl: selectedPreset.imageUrl,
      category: category,
      tags: [...selectedPreset.tags, 'Generated'],
      topText: customTop,
      bottomText: customBottom,
      description: 'Created with Concrete Meme Generator',
      likes: 1,
      createdAt: new Date().toISOString().split('T')[0],
    };

    onAddMeme(newMeme);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <Sparkles className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-100 flex items-center gap-2">
                Concrete Work Meme Generator
              </h2>
              <p className="text-xs text-slate-400">
                Pick a concrete humor preset or customize text to generate numbered memes!
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-100 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Preset Chips */}
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-2">
              Select Concrete Humor Concept:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {PRESET_CONCRETE_MEMES.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectPreset(preset)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedPreset.title === preset.title
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <p className="text-xs font-bold truncate">{preset.title}</p>
                  <span className="text-[10px] text-slate-500 capitalize">
                    {preset.category} Meme
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Live Meme Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="relative aspect-[4/3] rounded-xl bg-slate-950 overflow-hidden border border-slate-800 flex items-center justify-center">
              <img
                src={selectedPreset.imageUrl}
                alt="Preset Preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 p-3 flex flex-col justify-between text-center uppercase font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] text-xs sm:text-sm tracking-wider">
                <span>{customTop}</span>
                <span>{customBottom}</span>
              </div>
            </div>

            {/* Editing Controls */}
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  Assigned Number:
                </label>
                <input
                  type="text"
                  value={assignedNumber}
                  onChange={(e) => setAssignedNumber(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-100 font-bold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  Meme Title:
                </label>
                <input
                  type="text"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  TOP TEXT:
                </label>
                <input
                  type="text"
                  value={customTop}
                  onChange={(e) => setCustomTop(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-100 uppercase font-bold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  BOTTOM TEXT:
                </label>
                <input
                  type="text"
                  value={customBottom}
                  onChange={(e) => setCustomBottom(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-100 uppercase font-bold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  Target Tier:
                </label>
                <div className="grid grid-cols-3 gap-1">
                  <button
                    type="button"
                    onClick={() => setCategory('premium')}
                    className={`py-1.5 text-xs font-bold rounded-lg ${
                      category === 'premium'
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-slate-950 text-slate-400'
                    }`}
                  >
                    Premium
                  </button>
                  <button
                    type="button"
                    onClick={() => setCategory('normal')}
                    className={`py-1.5 text-xs font-bold rounded-lg ${
                      category === 'normal'
                        ? 'bg-sky-500 text-slate-950'
                        : 'bg-slate-950 text-slate-400'
                    }`}
                  >
                    Normal
                  </button>
                  <button
                    type="button"
                    onClick={() => setCategory('trash')}
                    className={`py-1.5 text-xs font-bold rounded-lg ${
                      category === 'trash'
                        ? 'bg-rose-500 text-slate-950'
                        : 'bg-slate-950 text-slate-400'
                    }`}
                  >
                    Trash
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-slate-800 bg-slate-950 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-slate-200"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 cursor-pointer"
          >
            <Check className="w-4 h-4 stroke-[2.5]" />
            <span>Add Generated Meme</span>
          </button>
        </div>
      </div>
    </div>
  );
};
