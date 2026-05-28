export const PDF_MAX_MARKDOWN_CHARS = 400_000;
export const PDF_EXPORT_TIMEOUT_MS = 120_000;
export const PDF_MAX_CANVAS_PIXELS = 16_000_000;

export type PdfExportErrorCode =
  | 'DOCUMENT_TOO_LARGE'
  | 'EXPORT_TIMEOUT'
  | 'RENDER_FAILED'
  | 'MEMORY_LIMIT'
  | 'UNKNOWN';

export class PdfExportError extends Error {
  readonly code: PdfExportErrorCode;

  constructor(code: PdfExportErrorCode, message: string) {
    super(message);
    this.name = 'PdfExportError';
    this.code = code;
  }
}

export function getPdfExportUserMessage(error: unknown): string {
  if (error instanceof PdfExportError) {
    switch (error.code) {
      case 'DOCUMENT_TOO_LARGE':
        return error.message;
      case 'EXPORT_TIMEOUT':
        return 'PDF export timed out. Try a shorter document or fewer images.';
      case 'MEMORY_LIMIT':
        return 'This document is too large to render as PDF in the browser. Shorten content or split into sections.';
      case 'RENDER_FAILED':
        return 'PDF rendering failed. Check images and complex formatting, then try again.';
      default:
        return 'PDF export failed. Please try again.';
    }
  }
  if (error instanceof Error && /out of memory|allocation failed/i.test(error.message)) {
    return 'Browser ran out of memory while building the PDF. Use a shorter document.';
  }
  return 'PDF export failed. Please try again.';
}
