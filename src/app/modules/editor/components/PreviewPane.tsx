import { FC, useEffect, useRef, forwardRef } from 'react';
import { parseMarkdown } from '../../../../services/markdownParser';
import { getTheme, applyThemeToHTML } from '../../../../themes/themeConfig';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';

interface PreviewPaneProps {
    markdown: string;
    themeId?: string;
    isFullScreen?: boolean;
    onToggleFullScreen?: () => void;
}

const PreviewPane = forwardRef<HTMLDivElement, PreviewPaneProps>(({ markdown, themeId = 'professional', isFullScreen, onToggleFullScreen }, ref) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const theme = getTheme(themeId);

    const html = parseMarkdown(markdown);
    const themedHtml = applyThemeToHTML(html, theme);

    useEffect(() => {
        const iframe = iframeRef.current;
        if (!iframe) return;

        const doc = iframe.contentDocument;
        if (!doc) return;

        const fullContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <style>
                    body { margin: 0; padding: 0; overflow-x: hidden; }
                </style>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.28.0/themes/prism-tomorrow.min.css">
                <style>
                    ::-webkit-scrollbar { width: 8px; height: 8px; }
                    ::-webkit-scrollbar-track { background: transparent; }
                    ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
                    ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
                </style>
            </head>
            <body>
                <div id="preview-content" style="padding: 28px;">
                    ${themedHtml}
                </div>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.28.0/prism.min.js"></script>
            </body>
            </html>
        `;

        doc.open();
        doc.write(fullContent);
        doc.close();
    }, [themedHtml]);

    return (
        <div className="h-100 d-flex flex-column preview-pane-body">
            <div
                className="preview-pane-header"
                style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
            >
                <div className="preview-pane-label">
                    <i className="bi bi-eye"></i>
                    Preview
                    <span className="preview-theme-badge">{theme.name}</span>
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
            <div
                className="preview-iframe-wrap"
                ref={(node) => {
                    if (typeof ref === 'function') {
                        ref(node);
                    } else if (ref) {
                        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
                    }
                }}
            >
                <iframe
                    ref={iframeRef}
                    title="Markdown Preview"
                    className="preview-iframe"
                    style={{ backgroundColor: theme.colors.background }}
                    sandbox="allow-scripts allow-same-origin"
                />
            </div>
        </div>
    );
});

PreviewPane.displayName = 'PreviewPane';

export default PreviewPane;
