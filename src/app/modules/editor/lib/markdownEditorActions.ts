import { EditorView } from '@codemirror/view';
import { undo, redo } from '@codemirror/commands';

export function cmFocus(view: EditorView): void {
  view.focus();
}

export function cmUndo(view: EditorView): void {
  undo(view);
}

export function cmRedo(view: EditorView): void {
  redo(view);
}

export function cmReplaceSelection(
  view: EditorView,
  insert: string,
  selection?: { anchor: number; head?: number }
): void {
  const { from, to } = view.state.selection.main;
  view.dispatch({
    changes: { from, to, insert },
    selection: selection ?? { anchor: from + insert.length },
  });
}

export function cmWrapSelection(view: EditorView, before: string, after: string): void {
  const { from, to } = view.state.selection.main;
  const selected = view.state.sliceDoc(from, to);
  if (selected) {
    const wrapped = `${before}${selected}${after}`;
    cmReplaceSelection(view, wrapped, {
      anchor: from + before.length,
      head: from + before.length + selected.length,
    });
  } else {
    cmReplaceSelection(view, `${before}${after}`, {
      anchor: from + before.length,
      head: from + before.length,
    });
  }
}

export function cmInsertText(view: EditorView, text: string): void {
  const { from, to } = view.state.selection.main;
  view.dispatch({
    changes: { from, to, insert: text },
    selection: { anchor: from + text.length },
  });
}

export function cmSetHeading(view: EditorView, level: 1 | 2 | 3 | 4 | 5 | 6): void {
  const pos = view.state.selection.main.from;
  const line = view.state.doc.lineAt(pos);
  const text = line.text.replace(/^#{1,6}\s+/, '');
  const prefix = `${'#'.repeat(level)} `;
  view.dispatch({
    changes: { from: line.from, to: line.to, insert: prefix + text },
    selection: { anchor: line.from + prefix.length },
  });
}

export function cmToggleBold(view: EditorView): void {
  cmWrapSelection(view, '**', '**');
}

export function cmToggleItalic(view: EditorView): void {
  cmWrapSelection(view, '*', '*');
}

export function cmToggleStrikethrough(view: EditorView): void {
  cmWrapSelection(view, '~~', '~~');
}

export function cmToggleInlineCode(view: EditorView): void {
  cmWrapSelection(view, '`', '`');
}

export function cmInsertLink(view: EditorView, label: string, url: string): void {
  const safeLabel = label.trim() || url;
  cmInsertText(view, `[${safeLabel}](${url})`);
}

export function cmInsertTable(view: EditorView): void {
  const table = `| Column 1 | Column 2 | Column 3 |
| -------- | -------- | -------- |
| Cell     | Cell     | Cell     |
| Cell     | Cell     | Cell     |
`;
  cmInsertText(view, `\n${table}\n`);
}

export function cmInsertTaskList(view: EditorView): void {
  const pos = view.state.selection.main.from;
  const line = view.state.doc.lineAt(pos);
  const prefix = '- [ ] ';
  if (line.text.startsWith(prefix)) {
    view.dispatch({
      changes: { from: line.from, to: line.from + prefix.length, insert: '- ' },
    });
  } else {
    const text = line.text.replace(/^[-*+]\s+/, '');
    view.dispatch({
      changes: { from: line.from, to: line.to, insert: prefix + text },
      selection: { anchor: line.from + prefix.length },
    });
  }
}

export function cmInsertHorizontalRule(view: EditorView): void {
  cmInsertText(view, '\n\n---\n\n');
}

export function cmToggleBlockquote(view: EditorView): void {
  const pos = view.state.selection.main.from;
  const line = view.state.doc.lineAt(pos);
  const text = line.text.replace(/^>\s?/, '');
  const prefix = '> ';
  if (line.text.startsWith('>')) {
    view.dispatch({
      changes: { from: line.from, to: line.to, insert: text },
    });
  } else {
    view.dispatch({
      changes: { from: line.from, to: line.to, insert: prefix + text },
    });
  }
}

export function cmToggleBulletList(view: EditorView): void {
  const pos = view.state.selection.main.from;
  const line = view.state.doc.lineAt(pos);
  const text = line.text.replace(/^[-*+]\s+/, '');
  const prefix = '- ';
  view.dispatch({
    changes: { from: line.from, to: line.to, insert: prefix + text },
    selection: { anchor: line.from + prefix.length },
  });
}

export function cmToggleOrderedList(view: EditorView): void {
  const pos = view.state.selection.main.from;
  const line = view.state.doc.lineAt(pos);
  const text = line.text.replace(/^\d+\.\s+/, '');
  const prefix = '1. ';
  view.dispatch({
    changes: { from: line.from, to: line.to, insert: prefix + text },
    selection: { anchor: line.from + prefix.length },
  });
}

export function cmInsertCodeBlock(view: EditorView): void {
  const { from, to } = view.state.selection.main;
  const selected = view.state.sliceDoc(from, to);
  const block = selected
    ? `\n\`\`\`\n${selected}\n\`\`\`\n`
    : '\n```\n\n```\n';
  cmReplaceSelection(view, block, selected ? undefined : { anchor: from + 5, head: from + 5 });
}

export const TABLE_TEMPLATE = `| Column 1 | Column 2 |
| -------- | -------- |
| Cell     | Cell     |
`;

export const TASK_LIST_LINE = '- [ ] ';
