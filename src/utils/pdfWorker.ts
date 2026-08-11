import * as pdfjsLib from 'pdfjs-dist';

// Set standard PDF.js worker source from CDN to avoid bundler resolution issues
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version || '4.10.38'}/pdf.worker.min.mjs`;

export interface ExtractedPdfPage {
  pageNumber: number;
  dataUrl: string;
}

/**
 * Renders all pages of a PDF file into high-resolution PNG data URLs
 */
export async function extractImagesFromPdfFile(
  file: File,
  onProgress?: (current: number, total: number) => void
): Promise<ExtractedPdfPage[]> {
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  const pdfDoc = await loadingTask.promise;
  const numPages = pdfDoc.numPages;
  const results: ExtractedPdfPage[] = [];

  for (let i = 1; i <= numPages; i++) {
    if (onProgress) {
      onProgress(i, numPages);
    }

    try {
      const page = await pdfDoc.getPage(i);
      const viewport = page.getViewport({ scale: 1.5 }); // High definition 1.5x scale

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      if (!context) continue;

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      // Render white background first
      context.fillStyle = '#FFFFFF';
      context.fillRect(0, 0, canvas.width, canvas.height);

      const renderContext = {
        canvasContext: context,
        canvas: canvas,
        viewport: viewport,
      };

      await page.render(renderContext).promise;
      const dataUrl = canvas.toDataURL('image/png');

      results.push({
        pageNumber: i,
        dataUrl,
      });
    } catch (err) {
      console.error(`Error rendering page ${i}:`, err);
    }
  }

  return results;
}
