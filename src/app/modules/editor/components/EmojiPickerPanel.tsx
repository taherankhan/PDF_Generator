import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { EMOJI_CATALOG, EmojiEntry, searchEmojiCatalog } from '../lib/emojiCatalog';

interface EmojiPickerPanelProps {
  open: boolean;
  onClose: () => void;
  onPick: (entry: EmojiEntry) => void;
  anchorRef: React.RefObject<HTMLElement | null>;
}

const EmojiPickerPanel: FC<EmojiPickerPanelProps> = ({ open, onClose, onPick, anchorRef }) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [hovered, setHovered] = useState<EmojiEntry | null>(null);

  const items = useMemo(() => searchEmojiCatalog(query, 90), [query]);

  useEffect(() => {
    if (!open) {
      setQuery('');
      setHovered(null);
      return;
    }
    const t = window.setTimeout(() => searchRef.current?.focus(), 30);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      const target = e.target as Node;
      if (panelRef.current?.contains(target)) return;
      if (anchorRef.current?.contains(target)) return;
      onClose();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose, anchorRef]);

  if (!open) return null;

  const active = hovered ?? items[0] ?? EMOJI_CATALOG[0];

  return (
    <div className="emoji-picker-panel" ref={panelRef} role="dialog" aria-label="Emoji picker">
      <div className="emoji-picker-search-wrap">
        <i className="bi bi-search emoji-picker-search-icon" aria-hidden />
        <input
          ref={searchRef}
          type="search"
          className="emoji-picker-search"
          placeholder="Filter emojis…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
          spellCheck={false}
        />
      </div>
      <div className="emoji-picker-grid" role="listbox">
        {items.map((entry) => (
          <button
            key={entry.shortcode}
            type="button"
            className="emoji-picker-cell"
            role="option"
            title={`:${entry.shortcode}:`}
            onMouseEnter={() => setHovered(entry)}
            onFocus={() => setHovered(entry)}
            onClick={() => {
              onPick(entry);
              onClose();
            }}
          >
            <span className="emoji-picker-glyph" aria-hidden>
              {entry.emoji}
            </span>
          </button>
        ))}
        {!items.length && (
          <p className="emoji-picker-empty">No emojis match &ldquo;{query}&rdquo;</p>
        )}
      </div>
      <footer className="emoji-picker-footer">
        <span className="emoji-picker-footer-name">
          {active ? (
            <>
              <span className="emoji-picker-footer-glyph" aria-hidden>
                {active.emoji}
              </span>
              :{active.shortcode}:
            </>
          ) : (
            '—'
          )}
        </span>
        <span className="emoji-picker-footer-hint">Type :emoji_name in the editor</span>
      </footer>
    </div>
  );
};

export default EmojiPickerPanel;
