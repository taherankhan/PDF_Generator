import { FC, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { BUILTIN_SNIPPETS } from '../lib/builtinSnippets';
import { SNIPPET_CATEGORY_META, SnippetCategoryId } from '../lib/snippetTypes';
import { AnalyticsService } from '../../../../services/AnalyticsService';

export interface SnippetListItem {
  id: string;
  title: string;
  description: string;
  content: string;
  category: SnippetCategoryId;
  tags: string[];
}

interface ContentBlocksModalProps {
  open: boolean;
  onClose: () => void;
  onInsert: (markdown: string) => void;
}

function matchesSearch(item: SnippetListItem, q: string): boolean {
  if (!q) return true;
  const hay = `${item.title} ${item.description} ${item.tags.join(' ')} ${item.content}`.toLowerCase();
  return hay.includes(q);
}

const FILTER_CATEGORIES: SnippetCategoryId[] = [
  'all',
  'code',
  'documentation',
  'diagrams',
  'tables',
  'templates',
];

const ContentBlocksModal: FC<ContentBlocksModalProps> = ({ open, onClose, onInsert }) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<SnippetCategoryId>('all');

  const allItems: SnippetListItem[] = useMemo(
    () =>
      BUILTIN_SNIPPETS.map((s) => ({
        id: s.id,
        title: s.title,
        description: s.description,
        content: s.content,
        category: s.category,
        tags: s.tags,
      })),
    []
  );

  const counts = useMemo(() => {
    const c: Record<SnippetCategoryId, number> = {
      all: allItems.length,
      code: 0,
      documentation: 0,
      diagrams: 0,
      tables: 0,
      templates: 0,
    };
    for (const item of allItems) {
      if (item.category !== 'all') {
        c[item.category]++;
      }
    }
    return c;
  }, [allItems]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return allItems.filter((item) => {
      if (category !== 'all' && item.category !== category) return false;
      return matchesSearch(item, q);
    });
  }, [allItems, category, search]);

  if (!open) return null;

  const handleReset = () => {
    setSearch('');
    setCategory('all');
  };

  const insertSnippet = (item: SnippetListItem) => {
    const block = item.content.endsWith('\n') ? item.content : `${item.content}\n`;
    onInsert(block.startsWith('\n') ? block : `\n${block}`);
    AnalyticsService.events.editorSnippetInsert(item.category);
    toast.success(`Inserted “${item.title}”`);
    onClose();
  };

  const copySnippet = async (item: SnippetListItem) => {
    try {
      await navigator.clipboard.writeText(item.content);
      toast.success('Copied to clipboard');
    } catch {
      toast.error('Could not copy');
    }
  };

  return (
    <div className="content-blocks-backdrop" role="presentation" onClick={onClose}>
      <div
        className="content-blocks-modal"
        role="dialog"
        aria-labelledby="content-blocks-title"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="content-blocks-header">
          <div className="content-blocks-title-wrap">
            <i className="bi bi-grid-3x3-gap content-blocks-title-icon" aria-hidden />
            <h2 id="content-blocks-title">Content Blocks</h2>
          </div>
          <div className="content-blocks-header-actions">
            <button
              type="button"
              className="content-blocks-icon-btn"
              title="Reset filters"
              onClick={handleReset}
            >
              <i className="bi bi-arrow-counterclockwise" aria-hidden />
            </button>
            <button
              type="button"
              className="content-blocks-icon-btn"
              title="Close"
              onClick={onClose}
            >
              <i className="bi bi-x-lg" aria-hidden />
            </button>
          </div>
        </header>

        <div className="content-blocks-search-wrap">
          <i className="bi bi-search" aria-hidden />
          <input
            type="search"
            className="content-blocks-search"
            placeholder="Search snippets…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
        </div>

        <div className="content-blocks-categories" role="tablist">
          {FILTER_CATEGORIES.map((cat) => {
            const meta = SNIPPET_CATEGORY_META[cat];
            const active = category === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={active}
                className={`content-blocks-category ${active ? 'active' : ''}`}
                onClick={() => setCategory(cat)}
              >
                <i className={`bi ${meta.icon}`} aria-hidden />
                <span>
                  {meta.label} ({counts[cat]})
                </span>
              </button>
            );
          })}
        </div>

        <div className="content-blocks-list">
          {filtered.length === 0 ? (
            <p className="content-blocks-empty">No snippets match your search.</p>
          ) : (
            filtered.map((item) => (
              <article key={item.id} className="content-blocks-card">
                <div className="content-blocks-card-head">
                  <i className="bi bi-file-earmark-text" aria-hidden />
                  <h3>{item.title}</h3>
                </div>
                <p className="content-blocks-card-desc">{item.description}</p>
                <pre className="content-blocks-preview">
                  <code>
                    {item.content.trim().slice(0, 420)}
                    {item.content.length > 420 ? '…' : ''}
                  </code>
                </pre>
                <div className="content-blocks-tags">
                  {item.tags.slice(0, 4).map((tag) => (
                    <span key={tag} className="content-blocks-tag">
                      {tag}
                    </span>
                  ))}
                  {item.tags.length > 4 && (
                    <span className="content-blocks-tag">+{item.tags.length - 4}</span>
                  )}
                </div>
                <div className="content-blocks-card-actions">
                  <button
                    type="button"
                    className="content-blocks-btn-insert"
                    onClick={() => insertSnippet(item)}
                  >
                    <i className="bi bi-plus-lg" aria-hidden />
                    Insert
                  </button>
                  <button
                    type="button"
                    className="content-blocks-btn-copy"
                    onClick={() => void copySnippet(item)}
                  >
                    <i className="bi bi-clipboard" aria-hidden />
                    Copy
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentBlocksModal;
