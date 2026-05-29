import type { EditorView } from '@codemirror/view';

export type EditorViewMode = 'edit' | 'split' | 'preview';

export interface MarkdownEditorHandle {
  getView: () => EditorView | null;
  focus: () => void;
  undo: () => void;
  redo: () => void;
  wrapSelection: (before: string, after: string) => void;
  insertText: (text: string) => void;
  setHeading: (level: 1 | 2 | 3 | 4 | 5 | 6) => void;
  toggleBold: () => void;
  toggleItalic: () => void;
  toggleStrikethrough: () => void;
  toggleInlineCode: () => void;
  insertLink: (label: string, url: string) => void;
  insertTable: () => void;
  toggleTaskList: () => void;
  insertHorizontalRule: () => void;
  toggleBlockquote: () => void;
  toggleBulletList: () => void;
  toggleOrderedList: () => void;
  insertCodeBlock: () => void;
}

export const DRAFT_STORAGE_KEY = 'md2pdfx:editor-draft';
export const TITLE_STORAGE_KEY = 'md2pdfx:editor-title';

export interface EditorDraftPayload {
  content: string;
  title: string;
  theme: string;
  savedAt: number;
}
