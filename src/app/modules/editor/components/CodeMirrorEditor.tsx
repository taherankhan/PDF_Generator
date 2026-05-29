import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { EditorState } from '@codemirror/state';
import {
  EditorView,
  keymap,
  lineNumbers,
  highlightActiveLineGutter,
  highlightActiveLine,
  drawSelection,
} from '@codemirror/view';
import { markdown } from '@codemirror/lang-markdown';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { syntaxHighlighting, defaultHighlightStyle } from '@codemirror/language';
import type { MarkdownEditorHandle } from '../lib/editorHandle';
import * as actions from '../lib/markdownEditorActions';
import {
  emojiAutocompleteExtension,
  emojiAutocompleteTheme,
} from '../lib/emojiAutocomplete';

const darkEditorTheme = EditorView.theme(
  {
    '&': {
      height: '100%',
      backgroundColor: 'transparent',
    },
    '&.cm-focused': {
      outline: 'none',
    },
    '.cm-scroller': {
      fontFamily: "'Fira Code', 'JetBrains Mono', 'Consolas', monospace",
      lineHeight: '1.65',
    },
    '.cm-content': {
      padding: '20px 12px 20px 4px',
      caretColor: '#8b5cf6',
      color: '#e2e8f0',
    },
    '.cm-cursor, &.cm-focused .cm-cursor': {
      borderLeftColor: '#8b5cf6',
    },
    '.cm-selectionBackground, ::selection': {
      backgroundColor: 'rgba(139, 92, 246, 0.28) !important',
    },
    '&.cm-focused .cm-selectionBackground': {
      backgroundColor: 'rgba(139, 92, 246, 0.32) !important',
    },
    '.cm-gutters': {
      background: '#0a0e18',
      borderRight: '1px solid rgba(255, 255, 255, 0.06)',
      color: '#475569',
    },
    '.cm-activeLineGutter': {
      background: 'rgba(139, 92, 246, 0.08)',
      color: '#94a3b8',
    },
    '.cm-activeLine': {
      background: 'rgba(255, 255, 255, 0.02)',
    },
    '.cm-line': {
      padding: '0 8px 0 4px',
    },
  },
  { dark: true }
);

interface CodeMirrorEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  onOpenEmojiPicker?: () => void;
}

const CodeMirrorEditor = forwardRef<MarkdownEditorHandle, CodeMirrorEditorProps>(
  ({ value, onChange, readOnly, onOpenEmojiPicker }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const viewRef = useRef<EditorView | null>(null);
    const onChangeRef = useRef(onChange);
    const onEmojiRef = useRef(onOpenEmojiPicker);
    const syncingRef = useRef(false);

    useEffect(() => {
      onChangeRef.current = onChange;
    }, [onChange]);

    useEffect(() => {
      onEmojiRef.current = onOpenEmojiPicker;
    }, [onOpenEmojiPicker]);

    useImperativeHandle(ref, () => {
      const getView = () => viewRef.current;

      const withView = <T,>(fn: (view: EditorView) => T): T | undefined => {
        const view = viewRef.current;
        if (!view) return undefined;
        return fn(view);
      };

      return {
        getView,
        focus: () => withView(actions.cmFocus),
        undo: () => withView(actions.cmUndo),
        redo: () => withView(actions.cmRedo),
        wrapSelection: (before, after) =>
          withView((v) => actions.cmWrapSelection(v, before, after)),
        insertText: (text) => withView((v) => actions.cmInsertText(v, text)),
        setHeading: (level) => withView((v) => actions.cmSetHeading(v, level)),
        toggleBold: () => withView(actions.cmToggleBold),
        toggleItalic: () => withView(actions.cmToggleItalic),
        toggleStrikethrough: () => withView(actions.cmToggleStrikethrough),
        toggleInlineCode: () => withView(actions.cmToggleInlineCode),
        insertLink: (label, url) => withView((v) => actions.cmInsertLink(v, label, url)),
        insertTable: () => withView(actions.cmInsertTable),
        toggleTaskList: () => withView(actions.cmInsertTaskList),
        insertHorizontalRule: () => withView(actions.cmInsertHorizontalRule),
        toggleBlockquote: () => withView(actions.cmToggleBlockquote),
        toggleBulletList: () => withView(actions.cmToggleBulletList),
        toggleOrderedList: () => withView(actions.cmToggleOrderedList),
        insertCodeBlock: () => withView(actions.cmInsertCodeBlock),
      };
    });

    useEffect(() => {
      if (!containerRef.current) return;

      const updateListener = EditorView.updateListener.of((update) => {
        if (!update.docChanged) return;
        const next = update.state.doc.toString();
        syncingRef.current = true;
        onChangeRef.current(next);
        queueMicrotask(() => {
          syncingRef.current = false;
        });
      });

      const state = EditorState.create({
        doc: value,
        extensions: [
          lineNumbers(),
          highlightActiveLineGutter(),
          highlightActiveLine(),
          drawSelection(),
          history(),
          markdown(),
          syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
          EditorView.theme(emojiAutocompleteTheme, { dark: true }),
          darkEditorTheme,
          emojiAutocompleteExtension(),
          keymap.of([
            ...defaultKeymap,
            ...historyKeymap,
            {
              key: 'Mod-e',
              run: () => {
                onEmojiRef.current?.();
                return true;
              },
            },
          ]),
          updateListener,
          EditorView.editable.of(!readOnly),
          EditorState.readOnly.of(!!readOnly),
        ],
      });

      const view = new EditorView({
        state,
        parent: containerRef.current,
      });
      viewRef.current = view;

      return () => {
        view.destroy();
        viewRef.current = null;
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps -- mount once
    }, []);

    useEffect(() => {
      const view = viewRef.current;
      if (!view || syncingRef.current) return;
      const current = view.state.doc.toString();
      if (current === value) return;
      view.dispatch({
        changes: { from: 0, to: current.length, insert: value },
      });
    }, [value]);

    return <div className="editor-codemirror-root" ref={containerRef} />;
  }
);

CodeMirrorEditor.displayName = 'CodeMirrorEditor';

export default CodeMirrorEditor;
