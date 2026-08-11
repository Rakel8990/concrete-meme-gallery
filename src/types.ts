export type MemeCategory = 'premium' | 'dedication' | 'normal' | 'trash';

export interface Meme {
  id: string;
  number: string; // e.g. "1", "2", "8", "dedication"
  title: string;
  imageUrl: string;
  category: MemeCategory;
  tags: string[];
  topText?: string;
  bottomText?: string;
  description?: string;
  likes: number;
  createdAt: string;
}

export interface PdfExtractedImage {
  id: string;
  pageNumber: number;
  dataUrl: string;
  selected: boolean;
  assignedNumber: string;
  assignedTitle: string;
  assignedCategory: MemeCategory;
}

export type SortOption = 'number-asc' | 'number-desc' | 'likes-desc' | 'recent';
