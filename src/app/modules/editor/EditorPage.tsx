import { FC, useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import MarkdownEditor from "./components/MarkdownEditor";
import PreviewPane from "./components/PreviewPane";
import ExportButton from "./components/ExportButton";
import ThemeSelector from "./components/ThemeSelector";
import ShareLinkButton from "./components/ShareLinkButton";
import "./EditorPage.css";
import { AnalyticsService } from "../../../services/AnalyticsService";
import { decodeSharePayload, fetchSharePayloadFromDb } from "../../../services/shareLinkService";
import { toast } from "react-toastify";
import { getSupabase } from "../../../services/supabaseClient";

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
    const skipShareLoadRef = useRef<string | null>(null);
    const loadedShareIdsRef = useRef<Set<string>>(new Set());
    const suppressRemoteUntilRef = useRef(0);

    useEffect(() => {
        markdownRef.current = markdownContent;
    }, [markdownContent]);

    useEffect(() => {
        themeRef.current = selectedTheme;
    }, [selectedTheme]);

    const notifyRemoteUpdate = (message: string) => {
        if (Date.now() < suppressRemoteUntilRef.current) return;
        const toastId = shareId ? `share-remote-${shareId}` : "share-remote";
        if (toast.isActive(toastId)) return;
        toast.info(message, { toastId, autoClose: 3000 });
    };

    // Supabase Realtime subscription for live updates (client loaded on demand)
    useEffect(() => {
        if (!shareId) return;

        let cancelled = false;
        let subscription: { remove: () => void } | null = null;

        void getSupabase().then((supabase) => {
            if (cancelled) return;

            const channel = supabase
                .channel(`live-document-${shareId}`)
                .on(
                    'postgres_changes',
                    {
                        event: 'UPDATE',
                        schema: 'public',
                        table: 'shares',
                        filter: `id=eq.${shareId}`,
                    },
                    (payload) => {
                        if (!payload.new) return;

                        const newContent = payload.new.content as string;
                        const newTheme = (payload.new.theme as string) || 'professional';

                        if (Date.now() < suppressRemoteUntilRef.current) {
                            lastSyncedPayload.current = { content: newContent, theme: newTheme };
                            return;
                        }

                        const matchesSynced =
                            newContent === lastSyncedPayload.current.content &&
                            newTheme === lastSyncedPayload.current.theme;
                        const matchesLocal =
                            newContent === markdownRef.current && newTheme === themeRef.current;

                        if (matchesSynced || matchesLocal) return;

                        setMarkdownContent(newContent);
                        setSelectedTheme(newTheme);
                        lastSyncedPayload.current = { content: newContent, theme: newTheme };
                        notifyRemoteUpdate('Document updated live by another user!');
                    }
                )
                .subscribe();

            subscription = {
                remove: () => {
                    void supabase.removeChannel(channel);
                },
            };

            if (cancelled) {
                subscription.remove();
                subscription = null;
            }
        });

        return () => {
            cancelled = true;
            subscription?.remove();
        };
    }, [shareId]);

    // Polling fallback — silent sync only (realtime handles user-facing toast)
    useEffect(() => {
        if (!shareId) return;

        const interval = setInterval(async () => {
            try {
                const payload = await fetchSharePayloadFromDb(shareId);
                if (!payload) return;

                const isCloudUpdated = payload.content !== lastSyncedPayload.current.content ||
                                      payload.theme !== lastSyncedPayload.current.theme;

                if (!isCloudUpdated) return;

                const hasLocalEdits = markdownRef.current !== lastSyncedPayload.current.content ||
                                      themeRef.current !== lastSyncedPayload.current.theme;

                if (hasLocalEdits) return;

                setMarkdownContent(payload.content);
                if (payload.theme) setSelectedTheme(payload.theme);
                lastSyncedPayload.current = {
                    content: payload.content,
                    theme: payload.theme || "professional"
                };
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

    // Hydrate from shared link on shareId change (once per id)
    useEffect(() => {
        if (!shareId) return;

        if (skipShareLoadRef.current === shareId) {
            skipShareLoadRef.current = null;
            loadedShareIdsRef.current.add(shareId);
            return;
        }

        if (loadedShareIdsRef.current.has(shareId)) return;

        const toastId = `share-load-${shareId}`;
        if (toast.isActive(toastId)) return;

        let cancelled = false;

        const loadSharedDoc = async () => {
            toast.loading("Loading document from cloud database...", { toastId });
            try {
                const payload = await fetchSharePayloadFromDb(shareId);
                if (cancelled) return;

                if (payload) {
                    setMarkdownContent(payload.content);
                    if (payload.theme) setSelectedTheme(payload.theme);
                    lastSyncedPayload.current = {
                        content: payload.content,
                        theme: payload.theme || "professional"
                    };
                    loadedShareIdsRef.current.add(shareId);
                    toast.update(toastId, {
                        render: "Document loaded successfully!",
                        type: "success",
                        isLoading: false,
                        autoClose: 3000
                    });
                } else {
                    toast.update(toastId, {
                        render: "Could not find document or invalid share ID.",
                        type: "error",
                        isLoading: false,
                        autoClose: 4000
                    });
                }
            } catch (error) {
                if (cancelled) return;
                console.error("❌ Failed to fetch shared document from Supabase.", error);
                toast.update(toastId, {
                    render: "Failed to load document from cloud.",
                    type: "error",
                    isLoading: false,
                    autoClose: 4000
                });
            }
        };

        loadSharedDoc();
        return () => {
            cancelled = true;
        };
    }, [shareId]);

    // Legacy hash links (no share id)
    useEffect(() => {
        if (shareId) return;
        const payload = decodeSharePayload();
        if (!payload) return;

        setMarkdownContent(payload.content);
        if (payload.theme) setSelectedTheme(payload.theme);
        lastSyncedPayload.current = {
            content: payload.content,
            theme: payload.theme || "professional"
        };
        toast.info("Opened from legacy shared link.");
    }, [shareId]);

    const toggleFullScreen = (pane: 'editor' | 'preview') => {
        setFullScreenPane(current => {
            const newState = current === pane ? null : pane;
            AnalyticsService.events.toggleFullScreen(pane, newState === pane);
            return newState;
        });
    };

    const handleShareIdChange = (newId: string, options?: { skipLoad?: boolean }) => {
        if (options?.skipLoad) {
            skipShareLoadRef.current = newId;
        }
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
                            suppressRemoteUntilRef.current = Date.now() + 5000;
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
