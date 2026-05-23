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

    // Update iframe content when HTML or theme changes
    useEffect(() => {
        const iframe = iframeRef.current;
        if (!iframe) return;

        const doc = iframe.contentDocument;
        if (!doc) return;

        // Create the full HTML document with styles
        const fullContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <style>
                    /* Base Reset */
                    body { margin: 0; padding: 0; overflow-x: hidden; }
                    /* Prism Theme */
                    ${Prism.languages.javascript ? '' : '' /* Just to trigger import usage if needed, but we need the CSS content */}
                </style>
                <!-- Inject Prism CSS from parent (we'll fetch it or use a style tag) -->
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.28.0/themes/prism-tomorrow.min.css">
                <style>
                    /* Custom Scrollbar for the iframe */
                    ::-webkit-scrollbar { width: 8px; height: 8px; }
                    ::-webkit-scrollbar-track { background: transparent; }
                    ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
                    ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
                </style>
            </head>
            <body>
                <div id="preview-content" style="padding: 24px;">
                    ${themedHtml}
                </div>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.28.0/prism.min.js"></script>
            </body>
            </html>
        `;

        doc.open();
        doc.write(fullContent);
        doc.close();

        // Adjust height to fit content (optional, but good for auto-growing preview)
        // For now, we want it to scroll within the fixed pane, so we'll just let it be.

    }, [themedHtml]);

    return (
        <div className="h-100 d-flex flex-column">
            <div className="border-bottom px-4 py-3 d-flex justify-content-between align-items-center" style={{ backgroundColor: theme.colors.background }}>
                <h6 className="mb-0 fw-bold text-muted">PREVIEW</h6>
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
            <div
                className="flex-grow-1 overflow-hidden"
                style={{ backgroundColor: theme.colors.background }}
                ref={(node) => {
                    // Forward the wrapper div ref if needed, but for PDF we specifically need the iframe or its content
                    if (typeof ref === 'function') {
                        // We'll pass the wrapper div for now, but ExportButton needs to handle iframe
                        ref(node);
                    } else if (ref) {
                        (ref as any).current = node;
                    }
                }}
            >
                <iframe
                    ref={iframeRef}
                    title="Markdown Preview"
                    style={{
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        backgroundColor: theme.colors.background
                    }}
                    sandbox="allow-scripts allow-same-origin"
                />
            </div>
        </div>
    );
});

PreviewPane.displayName = 'PreviewPane';

export default PreviewPane;
