import { FC, useState, useRef, useEffect } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import MarkdownEditor from "./components/MarkdownEditor";
import PreviewPane from "./components/PreviewPane";
import ExportButton from "./components/ExportButton";
import ThemeSelector from "./components/ThemeSelector";
import ShareLinkButton from "./components/ShareLinkButton";
import "./EditorPage.css";
import { AnalyticsService } from "../../../services/AnalyticsService";
import { decodeSharePayload, fetchSharePayloadFromDb } from "../../../services/shareLinkService";
import { toast } from "react-toastify";
import { supabase } from "../../../services/supabaseClient";

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
    const [searchParams, setSearchParams] = useSearchParams();
    const [markdownContent, setMarkdownContent] = useState(defaultMarkdown);
    const [debouncedMarkdown, setDebouncedMarkdown] = useState(defaultMarkdown);
    const [selectedTheme, setSelectedTheme] = useState("professional");
    const [fullScreenPane, setFullScreenPane] = useState<"editor" | "preview" | null>(null);
    const previewRef = useRef<HTMLDivElement>(null);

    const shareId = searchParams.get("share");

    const markdownRef = useRef(markdownContent);
    const themeRef = useRef(selectedTheme);
    const lastSyncedPayload = useRef({ content: defaultMarkdown, theme: "professional" });

    useEffect(() => {
        markdownRef.current = markdownContent;
    }, [markdownContent]);

    useEffect(() => {
        themeRef.current = selectedTheme;
    }, [selectedTheme]);

    useEffect(() => {
        AnalyticsService.trackPageView("/editor");
    }, []);

    // Supabase Realtime subscription for live updates
    useEffect(() => {
        if (!shareId) return;

        const channel = supabase
            .channel(`live-document-${shareId}`)
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'shares',
                    filter: `id=eq.${shareId}`
                },
                (payload) => {
                    if (payload.new) {
                        const newContent = payload.new.content;
                        const newTheme = payload.new.theme;
                        const hasChanges = newContent !== markdownRef.current || newTheme !== themeRef.current;
                        
                        if (hasChanges) {
                            setMarkdownContent(newContent);
                            if (newTheme) setSelectedTheme(newTheme);
                            lastSyncedPayload.current = { content: newContent, theme: newTheme || "professional" };
                            toast.info("Document updated live by another user!");
                        }
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [shareId]);

    // Polling fallback check for live updates (e.g. when database replication is not active)
    useEffect(() => {
        if (!shareId) return;

        const interval = setInterval(async () => {
            try {
                const payload = await fetchSharePayloadFromDb(shareId);
                if (!payload) return;

                const isCloudUpdated = payload.content !== lastSyncedPayload.current.content ||
                                      payload.theme !== lastSyncedPayload.current.theme;

                if (isCloudUpdated) {
                    const hasLocalEdits = markdownRef.current !== lastSyncedPayload.current.content ||
                                          themeRef.current !== lastSyncedPayload.current.theme;

                    if (!hasLocalEdits) {
                        setMarkdownContent(payload.content);
                        if (payload.theme) setSelectedTheme(payload.theme);
                        lastSyncedPayload.current = {
                            content: payload.content,
                            theme: payload.theme || "professional"
                        };
                        toast.info("Document updated live from cloud!");
                    }
                }
            } catch (err) {
                console.error("Error polling for database updates:", err);
            }
        }, 4000);

        return () => clearInterval(interval);
    }, [shareId]);

    // Debounce preview rendering to fix typing lag
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedMarkdown(markdownContent);
        }, 300);
        return () => {
            clearTimeout(handler);
        };
    }, [markdownContent]);

    // Hydrate from shared link (Supabase database or legacy hash) on mount
    useEffect(() => {
        const shareId = searchParams.get("share");
        if (shareId) {
            const loadSharedDoc = async () => {
                const loadingToast = toast.loading("Loading document from cloud database...");
                try {
                    const payload = await fetchSharePayloadFromDb(shareId);
                    if (payload) {
                        setMarkdownContent(payload.content);
                        if (payload.theme) setSelectedTheme(payload.theme);
                        lastSyncedPayload.current = {
                            content: payload.content,
                            theme: payload.theme || "professional"
                        };
                        toast.update(loadingToast, {
                            render: "Document loaded successfully!",
                            type: "success",
                            isLoading: false,
                            autoClose: 3000
                        });
                    } else {
                        toast.update(loadingToast, {
                            render: "Could not find document or invalid share ID.",
                            type: "error",
                            isLoading: false,
                            autoClose: 4000
                        });
                    }
                } catch (error) {
                    console.error("❌ Failed to fetch shared document from Supabase. Check DNS propagation or project status.", error);
                    toast.update(loadingToast, {
                        render: "Failed to load document from cloud.",
                        type: "error",
                        isLoading: false,
                        autoClose: 4000
                    });
                }
            };
            loadSharedDoc();
        } else {
            // Fallback: Hydrate from legacy shared link hash on mount if present
            const payload = decodeSharePayload();
            if (payload) {
                setMarkdownContent(payload.content);
                if (payload.theme) setSelectedTheme(payload.theme);
                lastSyncedPayload.current = {
                    content: payload.content,
                    theme: payload.theme || "professional"
                };
                toast.info("Opened from legacy shared link.");
            }
        }
    }, [searchParams, location.hash]);

    const toggleFullScreen = (pane: 'editor' | 'preview') => {
        setFullScreenPane(current => {
            const newState = current === pane ? null : pane;
            AnalyticsService.events.toggleFullScreen(pane, newState === pane);
            return newState;
        });
    };

    const handleShareIdChange = (newId: string) => {
        setSearchParams({ share: newId });
    };

    return (
        <div className="editor-page">
            {/* Compact Professional Toolbar */}
            <div className={`editor-toolbar ${fullScreenPane ? 'd-none' : ''}`}>
                <div className="toolbar-left">
                    <button
                        className="btn-icon btn-back"
                        onClick={() => navigate('/')}
                        title="Back to Home"
                    >
                        <i className="bi bi-arrow-left"></i>
                    </button>
                    <div className="toolbar-divider"></div>
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
                        shareId={shareId || undefined}
                        onShareIdChange={handleShareIdChange}
                        onSaveSuccess={(savedContent, savedTheme) => {
                            lastSyncedPayload.current = { content: savedContent, theme: savedTheme };
                        }}
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
