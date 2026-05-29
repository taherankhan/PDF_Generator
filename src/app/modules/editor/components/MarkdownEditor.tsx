import { forwardRef, useCallback, useRef, useState } from 'react';
import type { MarkdownEditorHandle } from '../lib/editorHandle';
import CodeMirrorEditor from './CodeMirrorEditor';
import EditorFormatToolbar from './EditorFormatToolbar';
import LinkInsertModal from './LinkInsertModal';

interface MarkdownEditorProps {
    value: string;
    onChange: (value: string) => void;
    isFullScreen?: boolean;
    onToggleFullScreen?: () => void;
}

const MarkdownEditor = forwardRef<MarkdownEditorHandle, MarkdownEditorProps>(({
    value,
    onChange,
    isFullScreen,
    onToggleFullScreen,
}, ref) => {
    const handleRef = useRef<MarkdownEditorHandle | null>(null);
    const setEditorHandle = useCallback(
        (handle: MarkdownEditorHandle | null) => {
            handleRef.current = handle;
            if (typeof ref === 'function') ref(handle);
            else if (ref) ref.current = handle;
        },
        [ref]
    );
    const [linkOpen, setLinkOpen] = useState(false);
    const [emojiOpen, setEmojiOpen] = useState(false);

    const wordCount = value.split(/\s+/).filter(Boolean).length;
    const lineCount = value.split('\n').length;

    return (
        <div className="h-100 d-flex flex-column editor-markdown-pane">
            <EditorFormatToolbar
                editorRef={handleRef}
                onRequestLink={() => setLinkOpen(true)}
                emojiOpen={emojiOpen}
                onEmojiOpenChange={setEmojiOpen}
            />
            <div className="editor-pane-header">
                <div className="editor-pane-label">
                    <i className="bi bi-markdown"></i>
                    Editor
                </div>
                <div className="d-flex align-items-center gap-2">
                    <div className="editor-pane-stats">
                        <span>{value.length} chars</span>
                        <span>{wordCount} words</span>
                        <span>{lineCount} lines</span>
                    </div>
                    {onToggleFullScreen && (
                        <button
                            className="btn-pane-action"
                            onClick={onToggleFullScreen}
                            title={isFullScreen ? 'Exit Full Screen' : 'Full Screen'}
                            type="button"
                        >
                            <i
                                className={`bi ${isFullScreen ? 'bi-fullscreen-exit' : 'bi-arrows-fullscreen'}`}
                            ></i>
                        </button>
                    )}
                </div>
            </div>
            <div className="editor-textarea-wrap editor-codemirror-wrap">
                <CodeMirrorEditor
                    ref={setEditorHandle}
                    value={value}
                    onChange={onChange}
                    onOpenEmojiPicker={() => setEmojiOpen(true)}
                />
            </div>
            <LinkInsertModal
                open={linkOpen}
                onClose={() => setLinkOpen(false)}
                onConfirm={(label, url) => {
                    handleRef.current?.insertLink(label, url);
                    handleRef.current?.focus();
                }}
            />
        </div>
    );
});

MarkdownEditor.displayName = 'MarkdownEditor';

export default MarkdownEditor;
