import { marked } from 'marked';

// Configure marked options
marked.setOptions({
  breaks: true,
  gfm: true,
});

/**
 * Parse markdown to HTML
 */
export const parseMarkdown = (markdown: string): string => {
  try {
    // Strip YAML frontmatter if present (handles leading whitespace)
    const content = markdown.replace(/^\s*---[\s\S]*?---\s*/, '');
    return marked.parse(content) as string;
  } catch (error) {
    console.error('Error parsing markdown:', error);
    return '<p>Error parsing markdown</p>';
  }
};

/**
 * Sanitize HTML (basic - for production use DOMPurify)
 */
export const sanitizeHtml = (html: string): string => {
  // For now, return as-is. In production, use DOMPurify
  return html;
};
