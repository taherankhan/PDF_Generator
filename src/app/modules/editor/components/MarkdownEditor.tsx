import { FC, ChangeEvent } from 'react';

interface MarkdownEditorProps {
    value: string;
    onChange: (value: string) => void;
    isFullScreen?: boolean;
    onToggleFullScreen?: () => void;
}

const MarkdownEditor: FC<MarkdownEditorProps> = ({ value, onChange, isFullScreen, onToggleFullScreen }) => {
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        onChange(e.target.value);
    };

    const wordCount = value.split(/\s+/).filter(Boolean).length;
    const lineCount = value.split('\n').length;

    return (
        <div className="h-100 d-flex flex-column">
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
                            <i className={`bi ${isFullScreen ? 'bi-fullscreen-exit' : 'bi-arrows-fullscreen'}`}></i>
                        </button>
                    )}
                </div>
            </div>
            <div className="editor-textarea-wrap">
                <textarea
                    className="editor-textarea"
                    value={value}
                    onChange={handleChange}
                    placeholder="# Start writing your markdown here...

## Features
- **Bold text**
- *Italic text*
- [Links](https://example.com)
- Code blocks
- And more!

```javascript
console.log('Hello, World!');
```"
                    spellCheck={false}
                />
            </div>
        </div>
    );
};

export default MarkdownEditor;
