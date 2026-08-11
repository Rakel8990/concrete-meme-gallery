import React, { useState } from 'react';
import {
  FileUp,
  X,
  CheckSquare,
  Square,
  Award,
  Flame,
  Trash2,
  Sparkles,
  Loader2,
  CheckCircle2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { extractImagesFromPdfFile, ExtractedPdfPage } from '../utils/pdfWorker';
import { Meme, MemeCategory } from '../types';

interface PdfExtractorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportMemes: (newMemes: Meme[]) => void;
}

export const PdfExtractorModal: React.FC<PdfExtractorModalProps> = ({
  isOpen,
  onClose,
  onImportMemes,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [extractedPages, setExtractedPages] = useState<
    {
      id: string;
      pageNumber: number;
      dataUrl: string;
      selected: boolean;
      assignedNumber: string;
      title: string;
      category: MemeCategory;
    }[]
  >([]);
  const [defaultCategory, setDefaultCategory] = useState<MemeCategory>('premium');
  const [startNumber, setStartNumber] = useState<number>(15);

  if (!isOpen) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    if (selectedFile.type !== 'application/pdf') {
      alert('Please upload a valid PDF file.');
      return;
    }

    setFile(selectedFile);
    setIsProcessing(true);
    setExtractedPages([]);

    try {
      const pages: ExtractedPdfPage[] = await extractImagesFromPdfFile(
        selectedFile,
        (current, total) => setProgress({ current, total })
      );

      const formatted = pages.map((p, idx) => ({
        id: `pdf-page-${Date.now()}-${p.pageNumber}`,
        pageNumber: p.pageNumber,
        dataUrl: p.dataUrl,
        selected: true,
        assignedNumber: `${startNumber + idx}`,
        title: `Concrete Work #${startNumber + idx} (PDF Page ${p.pageNumber})`,
        category: defaultCategory,
      }));

      setExtractedPages(formatted);
    } catch (err) {
      console.error('Failed to extract PDF:', err);
      alert('Could not extract images from PDF. Please try another PDF file.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleToggleSelect = (id: string) => {
    setExtractedPages((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const handleSelectAll = (select: boolean) => {
    setExtractedPages((prev) =>
      prev.map((item) => ({ ...item, selected: select }))
    );
  };

  const handleApplyCategoryToAll = (cat: MemeCategory) => {
    setDefaultCategory(cat);
    setExtractedPages((prev) =>
      prev.map((item) => ({ ...item, category: cat }))
    );
  };

  const handleImport = () => {
    const selectedItems = extractedPages.filter((item) => item.selected);
    if (selectedItems.length === 0) {
      alert('Please select at least one page to import.');
      return;
    }

    const newMemes: Meme[] = selectedItems.map((item) => ({
      id: `meme-pdf-${Date.now()}-${item.pageNumber}`,
      number: item.assignedNumber,
      title: item.title,
      imageUrl: item.dataUrl,
      category: item.category,
      tags: ['PDF Extract', 'Concrete Work', `Page ${item.pageNumber}`],
      description: `Extracted from PDF: ${file?.name || 'Document'} (Page ${item.pageNumber})`,
      likes: 0,
      createdAt: new Date().toISOString().split('T')[0],
    }));

    onImportMemes(newMemes);

    // Confetti celebration!
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // fallback
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <FileUp className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-100 flex items-center gap-2">
                PDF Image Extractor
                <span className="px-2 py-0.5 text-xs font-bold bg-amber-500/20 text-amber-400 rounded-full border border-amber-500/30">
                  WEB ENGINE
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Upload any PDF file to automatically extract all pages/images into numbered meme cards.
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

        {/* Modal Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* File Upload Drop Area */}
          {!file && (
            <div className="border-2 border-dashed border-amber-500/40 hover:border-amber-500 bg-slate-950/60 rounded-xl p-8 text-center transition-colors">
              <input
                type="file"
                accept=".pdf"
                id="pdf-input"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="pdf-input"
                className="flex flex-col items-center justify-center cursor-pointer"
              >
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4 border border-amber-500/20 shadow-lg">
                  <FileUp className="w-8 h-8 stroke-[2]" />
                </div>
                <h3 className="text-lg font-bold text-slate-100 mb-1">
                  Upload PDF to Extract Images
                </h3>
                <p className="text-xs text-slate-400 max-w-md mb-4">
                  Select your concrete work portfolio, specs PDF, or meme PDF. Every page will be converted into high-res images ready for classification!
                </p>
                <span className="px-5 py-2.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-sm hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20">
                  Choose PDF File
                </span>
              </label>
            </div>
          )}

          {/* Processing State */}
          {isProcessing && (
            <div className="p-8 bg-slate-950 rounded-xl border border-slate-800 text-center space-y-4">
              <div className="inline-flex p-3 rounded-full bg-amber-500/10 text-amber-400 mb-2 animate-bounce">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
              <h3 className="text-base font-bold text-slate-100">
                Processing PDF Pages...
              </h3>
              <p className="text-xs text-slate-400">
                Rendering page {progress.current} of {progress.total}
              </p>

              {/* Progress bar */}
              <div className="w-full max-w-xs mx-auto bg-slate-800 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-amber-500 h-full transition-all duration-300"
                  style={{
                    width: `${
                      progress.total > 0
                        ? (progress.current / progress.total) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>
          )}

          {/* Results Extracted Grid */}
          {!isProcessing && extractedPages.length > 0 && (
            <div className="space-y-4">
              {/* Batch Settings Bar */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-xs">
                  <span className="font-bold text-slate-200">
                    Extracted {extractedPages.length} Pages
                  </span>
                  <button
                    onClick={() => handleSelectAll(true)}
                    className="text-amber-400 hover:underline font-semibold"
                  >
                    Select All
                  </button>
                  <span className="text-slate-600">•</span>
                  <button
                    onClick={() => handleSelectAll(false)}
                    className="text-slate-400 hover:underline"
                  >
                    Deselect All
                  </button>
                </div>

                {/* Target Category Selector */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-semibold">
                    Set Tier for All:
                  </span>
                  <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-800">
                    <button
                      onClick={() => handleApplyCategoryToAll('premium')}
                      className={`px-2.5 py-1 text-xs font-bold rounded flex items-center gap-1 ${
                        defaultCategory === 'premium'
                          ? 'bg-amber-500 text-slate-950 shadow'
                          : 'text-amber-400 hover:bg-slate-800'
                      }`}
                    >
                      <Award className="w-3 h-3" />
                      Premium
                    </button>
                    <button
                      onClick={() => handleApplyCategoryToAll('normal')}
                      className={`px-2.5 py-1 text-xs font-bold rounded flex items-center gap-1 ${
                        defaultCategory === 'normal'
                          ? 'bg-sky-500 text-slate-950 shadow'
                          : 'text-sky-400 hover:bg-slate-800'
                      }`}
                    >
                      <Flame className="w-3 h-3" />
                      Normal
                    </button>
                    <button
                      onClick={() => handleApplyCategoryToAll('trash')}
                      className={`px-2.5 py-1 text-xs font-bold rounded flex items-center gap-1 ${
                        defaultCategory === 'trash'
                          ? 'bg-rose-500 text-slate-950 shadow'
                          : 'text-rose-400 hover:bg-slate-800'
                      }`}
                    >
                      <Trash2 className="w-3 h-3" />
                      Trash
                    </button>
                  </div>
                </div>
              </div>

              {/* Extracted Image Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-[50vh] overflow-y-auto p-1">
                {extractedPages.map((item, idx) => (
                  <div
                    key={item.id}
                    onClick={() => handleToggleSelect(item.id)}
                    className={`relative rounded-xl border overflow-hidden cursor-pointer transition-all ${
                      item.selected
                        ? 'border-amber-500 bg-slate-900 ring-2 ring-amber-500/30'
                        : 'border-slate-800 bg-slate-950 opacity-60'
                    }`}
                  >
                    {/* Checkbox indicator */}
                    <div className="absolute top-2 left-2 z-10">
                      {item.selected ? (
                        <CheckSquare className="w-5 h-5 text-amber-500 fill-amber-500/20" />
                      ) : (
                        <Square className="w-5 h-5 text-slate-500" />
                      )}
                    </div>

                    {/* Number Badge */}
                    <div className="absolute top-2 right-2 z-10">
                      <span className="px-2 py-0.5 text-[10px] font-black rounded bg-slate-950/90 text-amber-400 border border-amber-500/40">
                        #{item.assignedNumber}
                      </span>
                    </div>

                    <div className="aspect-[4/3] bg-slate-950 overflow-hidden">
                      <img
                        src={item.dataUrl}
                        alt={`Page ${item.pageNumber}`}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="p-2 bg-slate-900 border-t border-slate-800 text-xs">
                      <input
                        type="text"
                        value={item.title}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => {
                          const val = e.target.value;
                          setExtractedPages((prev) =>
                            prev.map((p) =>
                              p.id === item.id ? { ...p, title: val } : p
                            )
                          );
                        }}
                        className="w-full bg-slate-950 border border-slate-800 rounded px-1.5 py-1 text-[11px] text-slate-200 focus:outline-none focus:border-amber-500"
                      />

                      <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-400">
                        <span>Page {item.pageNumber}</span>
                        <select
                          value={item.category}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => {
                            const val = e.target.value as MemeCategory;
                            setExtractedPages((prev) =>
                              prev.map((p) =>
                                p.id === item.id ? { ...p, category: val } : p
                              )
                            );
                          }}
                          className="bg-slate-950 text-slate-300 rounded border border-slate-800 px-1 py-0.5"
                        >
                          <option value="premium">Premium</option>
                          <option value="normal">Normal</option>
                          <option value="trash">Trash</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-5 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            {extractedPages.filter((p) => p.selected).length} items ready to import
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>

            {extractedPages.length > 0 && (
              <button
                onClick={handleImport}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 fill-slate-950" />
                <span>Import to Web Gallery</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
