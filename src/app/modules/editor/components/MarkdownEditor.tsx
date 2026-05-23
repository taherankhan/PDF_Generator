import { FC, ChangeEvent } from 'react';
import { KTIcon } from '../../../../admin/helpers';

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

    const insertMarkdown = (before: string, after: string = '') => {
        const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = value.substring(start, end);
        const newText = value.substring(0, start) + before + selectedText + after + value.substring(end);

        onChange(newText);

        // Set cursor position after insertion
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
        }, 0);
    };

    return (
        <div className="h-100 d-flex flex-column">
            <div className="d-flex justify-content-end align-items-center mb-2 px-3 pt-2 text-muted small flex-shrink-0">
                <div className="d-flex align-items-center me-3">
                    <span>{value.length} chars</span>
                    <span className="mx-2">•</span>
                    <span>{value.split(/\s+/).filter(Boolean).length} words</span>
                    <span className="mx-2">•</span>
                    <span>{value.split('\n').length} lines</span>
                </div>
                {onToggleFullScreen && (
                    <button
                        className="btn btn-sm btn-icon-small"
                        onClick={onToggleFullScreen}
                        title={isFullScreen ? "Exit Full Screen" : "Full Screen"}
                        style={{ width: '24px', height: '24px', padding: 0 }}
                    >
                        <i className={`bi ${isFullScreen ? 'bi-fullscreen-exit' : 'bi-arrows-fullscreen'}`}></i>
                    </button>
                )}
            </div>
            <textarea
                className="form-control font-monospace flex-grow-1 border-0 rounded-0 p-3"
                style={{
                    resize: 'none',
                    fontSize: '14px',
                    lineHeight: '1.6',
                }}
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
```
"
            />
        </div>
    );
};

export default MarkdownEditor;
