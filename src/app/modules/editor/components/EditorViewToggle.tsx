import { FC } from 'react';
import type { EditorViewMode } from '../lib/editorHandle';
import { AnalyticsService } from '../../../../services/AnalyticsService';

interface EditorViewToggleProps {
  mode: EditorViewMode;
  onChange: (mode: EditorViewMode) => void;
  disabled?: boolean;
}

const modes: { id: EditorViewMode; label: string; icon: string }[] = [
  { id: 'edit', label: 'Edit', icon: 'bi-pencil-square' },
  { id: 'split', label: 'Split', icon: 'bi-layout-split' },
  { id: 'preview', label: 'Preview', icon: 'bi-eye' },
];

const EditorViewToggle: FC<EditorViewToggleProps> = ({ mode, onChange, disabled }) => {
  return (
    <div className={`editor-view-toggle ${disabled ? 'is-disabled' : ''}`} role="group" aria-label="Editor layout">
      {modes.map((m) => (
        <button
          key={m.id}
          type="button"
          className={`editor-view-toggle-btn ${mode === m.id ? 'active' : ''}`}
          disabled={disabled}
          title={m.label}
          aria-pressed={mode === m.id}
          onClick={() => {
            onChange(m.id);
            AnalyticsService.events.editorViewMode(m.id);
          }}
        >
          <i className={`bi ${m.icon}`} aria-hidden />
          <span className="editor-view-toggle-label">{m.label}</span>
        </button>
      ))}
    </div>
  );
};

export default EditorViewToggle;
