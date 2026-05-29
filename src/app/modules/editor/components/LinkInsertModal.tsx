import { FC, FormEvent, useEffect, useRef, useState } from 'react';

interface LinkInsertModalProps {
  open: boolean;
  initialLabel?: string;
  initialUrl?: string;
  onClose: () => void;
  onConfirm: (label: string, url: string) => void;
}

const LinkInsertModal: FC<LinkInsertModalProps> = ({
  open,
  initialLabel = '',
  initialUrl = 'https://',
  onClose,
  onConfirm,
}) => {
  const [label, setLabel] = useState(initialLabel);
  const [url, setUrl] = useState(initialUrl);
  const urlRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    setLabel(initialLabel);
    setUrl(initialUrl || 'https://');
    const t = window.setTimeout(() => urlRef.current?.focus(), 50);
    return () => window.clearTimeout(t);
  }, [open, initialLabel, initialUrl]);

  if (!open) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedUrl = url.trim();
    if (!trimmedUrl) return;
    onConfirm(label.trim(), trimmedUrl);
    onClose();
  };

  return (
    <div className="editor-modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="editor-modal"
        role="dialog"
        aria-labelledby="link-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="link-modal-title" className="editor-modal-title">
          Insert link
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="editor-modal-label">
            Text
            <input
              type="text"
              className="editor-modal-input"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Link label"
              autoComplete="off"
            />
          </label>
          <label className="editor-modal-label">
            URL
            <input
              ref={urlRef}
              type="url"
              className="editor-modal-input"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              required
            />
          </label>
          <div className="editor-modal-actions">
            <button type="button" className="editor-modal-btn secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="editor-modal-btn primary">
              Insert
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LinkInsertModal;
