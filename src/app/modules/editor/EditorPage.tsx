import { FC, useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MarkdownEditor from "./components/MarkdownEditor";
import PreviewPane from "./components/PreviewPane";
import ExportButton from "./components/ExportButton";
import ThemeSelector from "./components/ThemeSelector";
import ShareLinkButton from "./components/ShareLinkButton";
import "./EditorPage.css";
import { AnalyticsService } from "../../../services/AnalyticsService";
import { decodeSharePayload } from "../../../services/shareLinkService";
import { toast } from "react-toastify";

const defaultMarkdown = `# Welcome to Markdown to PDF Converter

## Getting Started

This is a **live markdown editor** with real-time preview. Write your markdown on the left, and see it rendered on the right.

### Features

- ✅ Live markdown editing
- ✅ Real-time preview
- ✅ Syntax highlighting
- ✅ Beautiful themes
- ✅ Custom styling options
- ✅ Export to PDF

### Example Code Block

\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}

greet('World');
\`\`\`

### Example Table

| Feature | Status |
|---------|--------|
| Live editing | ✅ |
| Real-time preview | ✅ |
| Syntax highlighting | ✅ |
| Beautiful themes | ✅ |
| Custom styling options | ✅ |
| Export to PDF | ✅ |

## Links and Images

Visit [Google](https://www.google.com) for more information.

---

**Start editing** this markdown to see the magic happen! 🎉
`;

const EditorPage: FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [markdownContent, setMarkdownContent] = useState(defaultMarkdown);
    const [debouncedMarkdown, setDebouncedMarkdown] = useState(defaultMarkdown);
    const [selectedTheme, setSelectedTheme] = useState("professional");
    const [fullScreenPane, setFullScreenPane] = useState<"editor" | "preview" | null>(null);
    const previewRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        AnalyticsService.trackPageView("/editor");
    }, []);

    // Debounce preview rendering to fix typing lag
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedMarkdown(markdownContent);
        }, 300);
        return () => {
            clearTimeout(handler);
        };
    }, [markdownContent]);

    // Hydrate from shared link (hash) on mount / when hash is present
    useEffect(() => {
        const payload = decodeSharePayload();
        if (payload) {
            setMarkdownContent(payload.content);
            if (payload.theme) setSelectedTheme(payload.theme);
            toast.info("Opened from shared link. You can view and export to PDF.");
        }
    }, [location.hash]);

    const toggleFullScreen = (pane: 'editor' | 'preview') => {
        setFullScreenPane(current => {
            const newState = current === pane ? null : pane;
            AnalyticsService.events.toggleFullScreen(pane, newState === pane);
            return newState;
        });
    };

    return (
        <div className="editor-page">
            {/* Compact Professional Toolbar */}
            <div className={`editor-toolbar ${fullScreenPane ? 'd-none' : ''}`}>
                <div className="toolbar-left">
                    <button
                        className="btn-icon"
                        onClick={() => navigate('/')}
                        title="Back to Home"
                    >
                        <i className="bi bi-arrow-left"></i>
                    </button>
                    <div className="toolbar-title">
                        <h1>
                            <i className="bi bi-file-earmark-text me-2"></i>
                            Markdown to PDF
                        </h1>
                    </div>
                </div>

                <div className="toolbar-right">
                    <ShareLinkButton
                        payload={{ content: markdownContent, theme: selectedTheme }}
                    />
                    <ThemeSelector
                        selectedTheme={selectedTheme}
                        onThemeChange={setSelectedTheme}
                    />
                    <ExportButton
                        markdown={markdownContent}
                        themeId={selectedTheme}
                        previewRef={previewRef}
                    />
                </div>
            </div>

            {/* Main Content */}
            <div className={`editor-content ${fullScreenPane ? 'top-0' : ''}`}>
                <div className={`editor-layout ${fullScreenPane ? 'layout-fullscreen' : 'layout-split'}`}>
                    <div className={`editor-pane ${fullScreenPane === 'preview' ? 'd-none' : ''} ${fullScreenPane === 'editor' ? 'w-100 border-0' : ''}`}>
                        <MarkdownEditor
                            value={markdownContent}
                            onChange={setMarkdownContent}
                            isFullScreen={fullScreenPane === 'editor'}
                            onToggleFullScreen={() => toggleFullScreen('editor')}
                        />
                    </div>

                    <div className={`preview-pane ${fullScreenPane === 'editor' ? 'd-none' : ''} ${fullScreenPane === 'preview' ? 'w-100 border-0' : ''}`}>
                        <PreviewPane
                            ref={previewRef}
                            markdown={debouncedMarkdown}
                            themeId={selectedTheme}
                            isFullScreen={fullScreenPane === 'preview'}
                            onToggleFullScreen={() => toggleFullScreen('preview')}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditorPage;
