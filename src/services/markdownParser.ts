import { marked } from 'marked';

marked.setOptions({
  breaks: true,
  gfm: true,
});

const MERMAID_FENCE = /```mermaid\s*\r?\n([\s\S]*?)```/gi;

/** Replace mermaid fences with raw HTML divs before marked runs */
function injectMermaidDivs(markdown: string): string {
  return markdown.replace(MERMAID_FENCE, (_, code: string) => {
    const body = code.trim();
    return `\n<div class="mermaid">\n${body}\n</div>\n`;
  });
}

/** Fallback if marked still wraps mermaid as code blocks */
function promoteMermaidCodeBlocks(html: string): string {
  return html.replace(
    /<pre[^>]*>\s*<code[^>]*language-mermaid[^>]*>([\s\S]*?)<\/code>\s*<\/pre>/gi,
    (_, encoded: string) => {
      const text = encoded
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"');
      return `<div class="mermaid">${text}</div>`;
    }
  );
}

let mermaidHookInstalled = false;

function installMermaidCodeRenderer(): void {
  if (mermaidHookInstalled) return;
  mermaidHookInstalled = true;

  marked.use({
    renderer: {
      code({ text, lang }) {
        const language = (lang || '').trim().toLowerCase();
        if (language === 'mermaid') {
          return `<div class="mermaid">${text}</div>\n`;
        }
        return false;
      },
    },
  });
}

installMermaidCodeRenderer();

export const parseMarkdown = (markdown: string): string => {
  try {
    const content = markdown.replace(/^\s*---[\s\S]*?---\s*/, '');
    const withMermaid = injectMermaidDivs(content);
    const html = marked.parse(withMermaid) as string;
    return promoteMermaidCodeBlocks(html);
  } catch (error) {
    console.error('Error parsing markdown:', error);
    return '<p>Error parsing markdown</p>';
  }
};

export const sanitizeHtml = (html: string): string => {
  return html;
};
