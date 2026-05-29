import { parseMarkdown } from '../../../../services/markdownParser';
import {
  MERMAID_DIAGRAM_STYLES,
  mermaidHtmlExportScriptTag,
} from '../../../../services/renderMermaidInDocument';
import { applyThemeToHTML, getTheme } from '../../../../themes/themeConfig';

export type ExportFormat = 'pdf' | 'markdown' | 'html';

const sanitizeBasename = (s: string) =>
  s.trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').slice(0, 80) || 'document';

export function resolveExportBasename(
  exportBaseName: string | undefined,
  markdown: string
): string {
  if (exportBaseName?.trim()) {
    return sanitizeBasename(exportBaseName);
  }
  const firstHeading = markdown.match(/^#\s+(.+)$/m);
  if (firstHeading) {
    return sanitizeBasename(firstHeading[1]);
  }
  return 'document';
}

export function downloadTextFile(content: string, filename: string, mime: string): void {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.rel = 'noopener';
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export function buildThemedHtmlDocument(markdown: string, themeId: string): string {
  const theme = getTheme(themeId);
  const bodyHtml = applyThemeToHTML(parseMarkdown(markdown), theme);
  const title = resolveExportBasename(undefined, markdown);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.28.0/themes/prism-tomorrow.min.css">
  <style>${MERMAID_DIAGRAM_STYLES}</style>
</head>
<body>
${bodyHtml}
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.28.0/prism.min.js"></script>
${mermaidHtmlExportScriptTag()}
</body>
</html>`;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export const EXPORT_FORMAT_META: Record<
  ExportFormat,
  { label: string; extension: string; mime: string; icon: string }
> = {
  pdf: {
    label: 'PDF',
    extension: 'pdf',
    mime: 'application/pdf',
    icon: 'bi-file-earmark-pdf',
  },
  markdown: {
    label: 'Markdown',
    extension: 'md',
    mime: 'text/markdown;charset=utf-8',
    icon: 'bi-file-earmark-text',
  },
  html: {
    label: 'HTML',
    extension: 'html',
    mime: 'text/html;charset=utf-8',
    icon: 'bi-filetype-html',
  },
};
