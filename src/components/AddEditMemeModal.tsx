import React, { useState, useEffect } from 'react';
import { X, Upload, Award, Flame, Trash2, Plus, Check } from 'lucide-react';
import { Meme, MemeCategory } from '../types';
import { isSafeMediaUrl } from '../utils/media';

interface AddEditMemeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (memeData: Partial<Meme>) => void;
  initialMeme?: Meme | null;
  defaultCategory?: MemeCategory;
  existingCount?: number;
}

export const AddEditMemeModal: React.FC<AddEditMemeModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialMeme,
  defaultCategory = 'premium',
  existingCount = 10,
}) => {
  const [number, setNumber] = useState('');
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState<MemeCategory>('premium');
  const [tags, setTags] = useState<string>('');
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [description, setDescription] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (initialMeme) {
      setNumber(initialMeme.number);
      setTitle(initialMeme.title);
      setImageUrl(initialMeme.imageUrl);
      setImagePreview(initialMeme.imageUrl);
      setCategory(initialMeme.category);
      setTags(initialMeme.tags ? initialMeme.tags.join(', ') : '');
      setTopText(initialMeme.topText || '');
      setBottomText(initialMeme.bottomText || '');
      setDescription(initialMeme.description || '');
    } else {
      setNumber(`${existingCount + 1}`);
      setTitle('');
      setImageUrl('');
      setImagePreview('');
      setCategory(defaultCategory);
      setTags('Concrete, Site Work');
      setTopText('');
      setBottomText('');
      setDescription('');
    }
  }, [initialMeme, isOpen, defaultCategory, existingCount]);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setImageUrl(result);
        setImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !imageUrl.trim()) {
      alert('Please provide a title and an image.');
      return;
    }
    if (!isSafeMediaUrl(imageUrl.trim())) {
      alert('Please use a valid image URL or upload an image file.');
      return;
    }

    const tagArray = tags
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    onSave({
      id: initialMeme?.id,
      number: number.trim() || '1',
      title: title.trim(),
      imageUrl: imageUrl.trim(),
      category,
      tags: tagArray,
      topText: topText.trim(),
      bottomText: bottomText.trim(),
      description: description.trim(),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <h2 className="text-xl font-black text-slate-100 flex items-center gap-2">
            {initialMeme ? 'Edit Concrete Meme' : 'Add New Concrete Meme'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-100 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Number Tag */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                Number / ID Tag:
              </label>
              <input
                type="text"
                placeholder="e.g. 1, 8, or dedication"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 font-bold focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Title */}
            <div className="sm:col-span-2">
              <label className="text-xs font-bold text-slate-300 block mb-1">
                Meme Title:
              </label>
              <input
                type="text"
                placeholder="e.g. Ready-Mix Truck Waiting on Site"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Classification Tier Selection */}
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-2">
              Classification Tier:
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setCategory('premium')}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  category === 'premium'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500 shadow-md'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                }`}
              >
                <Award className="w-4 h-4 text-amber-400" />
                Premium
              </button>

              <button
                type="button"
                onClick={() => setCategory('normal')}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  category === 'normal'
                    ? 'bg-sky-500/20 text-sky-300 border-sky-500 shadow-md'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                }`}
              >
                <Flame className="w-4 h-4 text-sky-400" />
                Normal
              </button>

              <button
                type="button"
                onClick={() => setCategory('trash')}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  category === 'trash'
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500 shadow-md'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                }`}
              >
                <Trash2 className="w-4 h-4 text-rose-400" />
                Trash
              </button>
            </div>
          </div>

          {/* Image Source (URL or Upload) */}
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              Image Source:
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="url"
                placeholder="Paste Image URL (https://...)"
                value={imageUrl.startsWith('data:') ? '' : imageUrl}
                onChange={(e) => {
                  setImageUrl(e.target.value);
                  setImagePreview(e.target.value);
                }}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
              />

              <label className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold cursor-pointer transition-colors">
                <Upload className="w-4 h-4 text-amber-400" />
                <span>Upload Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Image Preview Box */}
          {imagePreview && (
            <div className="relative aspect-[16/9] max-h-48 rounded-xl bg-slate-950 overflow-hidden border border-slate-800 flex items-center justify-center">
              <img
                src={imagePreview}
                alt="Preview"
                className="h-full w-auto object-contain"
              />
              {(topText || bottomText) && (
                <div className="absolute inset-0 p-2 flex flex-col justify-between text-center uppercase font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] text-xs">
                  <span>{topText}</span>
                  <span>{bottomText}</span>
                </div>
              )}
            </div>
          )}

          {/* Top & Bottom Meme Overlay Text */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-slate-400 block mb-1">
                TOP OVERLAY TEXT:
              </label>
              <input
                type="text"
                placeholder="e.g. WHEN THE INSPECTOR ARRIVES"
                value={topText}
                onChange={(e) => setTopText(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 font-bold uppercase focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-400 block mb-1">
                BOTTOM OVERLAY TEXT:
              </label>
              <input
                type="text"
                placeholder="e.g. AND EVERYTHING IS PERFECT"
                value={bottomText}
                onChange={(e) => setBottomText(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 font-bold uppercase focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Tags & Description */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                Tags (comma separated):
              </label>
              <input
                type="text"
                placeholder="Slump Test, Rebar, Finishing"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                Description / Context:
              </label>
              <input
                type="text"
                placeholder="Background story or site details..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span>{initialMeme ? 'Save Changes' : 'Add to Gallery'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
