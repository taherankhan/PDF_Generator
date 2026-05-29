const MERMAID_CDN =
  'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';

const MERMAID_INIT = `{
  startOnLoad: false,
  theme: 'neutral',
  securityLevel: 'loose',
  fontFamily: 'Inter, system-ui, sans-serif'
}`;

export const MERMAID_DIAGRAM_STYLES = `
.mermaid {
  display: flex;
  justify-content: center;
  margin: 1.25rem 0;
  max-width: 100%;
  overflow-x: auto;
}
.mermaid svg {
  max-width: 100%;
  height: auto;
}
`;

function unrenderedMermaidNodes(doc: Document): HTMLElement[] {
  return Array.from(doc.querySelectorAll<HTMLElement>('.mermaid')).filter(
    (el) => !el.querySelector('svg')
  );
}

let bundledInitialized = false;

/**
 * Render diagrams in any document using the bundled mermaid package (PDF / off-screen export).
 */
export async function renderMermaidInDocument(doc: Document): Promise<void> {
  const nodes = unrenderedMermaidNodes(doc);
  if (!nodes.length) return;

  const { default: mermaid } = await import('mermaid');
  if (!bundledInitialized) {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'neutral',
      securityLevel: 'loose',
      fontFamily: 'Inter, system-ui, sans-serif',
    });
    bundledInitialized = true;
  }

  try {
    await mermaid.run({ nodes, suppressErrors: false });
  } catch (error) {
    console.error('Mermaid render failed:', error);
    nodes.forEach((el) => {
      if (!el.querySelector('svg')) {
        el.innerHTML =
          '<pre style="color:#b91c1c;font-size:12px;">Diagram could not be rendered.</pre>';
      }
    });
  }
}

/** Wait for layout after SVG injection (PDF capture) */
export function waitForMermaidPaint(ms = 400): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Inline module for preview iframe.
 */
export function mermaidPreviewScriptTag(): string {
  return `<script type="module">
import mermaid from '${MERMAID_CDN}';
try {
  mermaid.initialize(${MERMAID_INIT});
  const nodes = [...document.querySelectorAll('.mermaid')].filter((el) => !el.querySelector('svg'));
  if (nodes.length) await mermaid.run({ nodes, suppressErrors: false });
} catch (err) {
  console.error('[preview] Mermaid failed', err);
}
</script>`;
}

/**
 * Scripts for downloaded .html exports (opens in browser with live render).
 */
export function mermaidHtmlExportScriptTag(): string {
  return `<script type="module">
import mermaid from '${MERMAID_CDN}';
mermaid.initialize(${MERMAID_INIT});
const nodes = [...document.querySelectorAll('.mermaid')].filter((el) => !el.querySelector('svg'));
if (nodes.length) await mermaid.run({ nodes });
</script>`;
}
