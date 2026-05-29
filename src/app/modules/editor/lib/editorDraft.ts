import { DRAFT_STORAGE_KEY, EditorDraftPayload, TITLE_STORAGE_KEY } from './editorHandle';

export function loadEditorDraft(): EditorDraftPayload | null {
  try {
    const raw = localStorage.getItem(DRAFT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<EditorDraftPayload>;
    if (typeof parsed.content !== 'string') return null;
    return {
      content: parsed.content,
      title: typeof parsed.title === 'string' ? parsed.title : '',
      theme: typeof parsed.theme === 'string' ? parsed.theme : 'professional',
      savedAt: typeof parsed.savedAt === 'number' ? parsed.savedAt : 0,
    };
  } catch {
    return null;
  }
}

export function saveEditorDraft(payload: EditorDraftPayload): void {
  try {
    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(payload));
    if (payload.title) {
      localStorage.setItem(TITLE_STORAGE_KEY, payload.title);
    }
  } catch {
    /* quota or private mode */
  }
}

export function loadStoredTitle(): string {
  try {
    return localStorage.getItem(TITLE_STORAGE_KEY) ?? '';
  } catch {
    return '';
  }
}
