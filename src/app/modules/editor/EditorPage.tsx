import { FC, useState, useRef, useEffect, ChangeEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import MarkdownEditor from "./components/MarkdownEditor";
import PreviewPane from "./components/PreviewPane";
import ExportButton from "./components/ExportButton";
import ThemeSelector from "./components/ThemeSelector";
import ShareLinkButton from "./components/ShareLinkButton";
import EditorViewToggle from "./components/EditorViewToggle";
import ContentBlocksModal from "./components/ContentBlocksModal";
import type { MarkdownEditorHandle } from "./lib/editorHandle";
import "./EditorPage.css";
import { AnalyticsService } from "../../../services/AnalyticsService";
import {
    decodeSharePayload,
    fetchSharePayloadFromDb,
    normalizeShareTitle,
    type SharePayload,
} from "../../../services/shareLinkService";
import { toast } from "react-toastify";
import { getSupabase } from "../../../services/supabaseClient";
import type { EditorViewMode } from "./lib/editorHandle";
import { loadEditorDraft, loadStoredTitle, saveEditorDraft } from "./lib/editorDraft";

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
    const [documentTitle, setDocumentTitle] = useState(() => loadStoredTitle());
    const [viewMode, setViewMode] = useState<EditorViewMode>("split");
    const [fullScreenPane, setFullScreenPane] = useState<"editor" | "preview" | null>(null);
    const previewRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const editorRef = useRef<MarkdownEditorHandle>(null);
    const [snippetsOpen, setSnippetsOpen] = useState(false);
    const draftHydratedRef = useRef(false);

    const shareId = searchParams.get("share");

    const markdownRef = useRef(markdownContent);
    const themeRef = useRef(selectedTheme);
    const titleRef = useRef(documentTitle);
    const lastSyncedPayload = useRef<SharePayload>({
        content: defaultMarkdown,
        theme: "professional",
        title: "",
    });

    const applySharePayload = (payload: SharePayload) => {
        setMarkdownContent(payload.content);
        if (payload.theme) setSelectedTheme(payload.theme);
        const title = normalizeShareTitle(payload.title);
        setDocumentTitle(title);
        lastSyncedPayload.current = {
            content: payload.content,
            theme: payload.theme || "professional",
            title,
        };
    };

    const buildSharePayload = (): SharePayload => ({
        content: markdownContent,
        theme: selectedTheme,
        title: documentTitle,
    });
    const skipShareLoadRef = useRef<string | null>(null);
    const loadedShareIdsRef = useRef<Set<string>>(new Set());
    const suppressRemoteUntilRef = useRef(0);

    useEffect(() => {
        markdownRef.current = markdownContent;
    }, [markdownContent]);

    useEffect(() => {
        themeRef.current = selectedTheme;
    }, [selectedTheme]);

    useEffect(() => {
        titleRef.current = documentTitle;
    }, [documentTitle]);

    useEffect(() => {
        if (draftHydratedRef.current) return;
        if (shareId) {
            draftHydratedRef.current = true;
            return;
        }
        const hashPayload = decodeSharePayload();
        if (hashPayload) {
            draftHydratedRef.current = true;
            return;
        }
        draftHydratedRef.current = true;
        const draft = loadEditorDraft();
        if (!draft) return;
        setMarkdownContent(draft.content);
        setDebouncedMarkdown(draft.content);
        if (draft.title) setDocumentTitle(draft.title);
        if (draft.theme) setSelectedTheme(draft.theme);
        lastSyncedPayload.current = {
            content: draft.content,
            theme: draft.theme,
            title: draft.title,
        };
        AnalyticsService.events.editorDraftRestore();
        toast.info("Restored your last local draft.", { autoClose: 2500 });
    }, [shareId]);

    useEffect(() => {
        const handler = setTimeout(() => {
            saveEditorDraft({
                content: markdownContent,
                title: documentTitle,
                theme: selectedTheme,
                savedAt: Date.now(),
            });
        }, 800);
        return () => clearTimeout(handler);
    }, [markdownContent, documentTitle, selectedTheme]);

    const notifyRemoteUpdate = (message: string) => {
        if (Date.now() < suppressRemoteUntilRef.current) return;
        const toastId = shareId ? `share-remote-${shareId}` : "share-remote";
        if (toast.isActive(toastId)) return;
        toast.info(message, { toastId, autoClose: 3000 });
    };

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
                        const newTitle = normalizeShareTitle(
                            payload.new.title as string | undefined
                        );

                        if (Date.now() < suppressRemoteUntilRef.current) {
                            lastSyncedPayload.current = {
                                content: newContent,
                                theme: newTheme,
                                title: newTitle,
                            };
                            return;
                        }

                        const matchesSynced =
                            newContent === lastSyncedPayload.current.content &&
                            newTheme === lastSyncedPayload.current.theme &&
                            newTitle === normalizeShareTitle(lastSyncedPayload.current.title);
                        const matchesLocal =
                            newContent === markdownRef.current &&
                            newTheme === themeRef.current &&
                            newTitle === normalizeShareTitle(titleRef.current);

                        if (matchesSynced || matchesLocal) return;

                        setMarkdownContent(newContent);
                        setSelectedTheme(newTheme);
                        setDocumentTitle(newTitle);
                        lastSyncedPayload.current = {
                            content: newContent,
                            theme: newTheme,
                            title: newTitle,
                        };
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

    useEffect(() => {
        if (!shareId) return;

        const interval = setInterval(async () => {
            try {
                const payload = await fetchSharePayloadFromDb(shareId);
                if (!payload) return;

                const remoteTitle = normalizeShareTitle(payload.title);
                const isCloudUpdated =
                    payload.content !== lastSyncedPayload.current.content ||
                    payload.theme !== lastSyncedPayload.current.theme ||
                    remoteTitle !== normalizeShareTitle(lastSyncedPayload.current.title);

                if (!isCloudUpdated) return;

                const hasLocalEdits =
                    markdownRef.current !== lastSyncedPayload.current.content ||
                    themeRef.current !== lastSyncedPayload.current.theme ||
                    normalizeShareTitle(titleRef.current) !==
                        normalizeShareTitle(lastSyncedPayload.current.title);

                if (hasLocalEdits) return;

                applySharePayload(payload);
            } catch (err) {
                console.error("Error polling for database updates:", err);
            }
        }, 4000);

        return () => clearInterval(interval);
    }, [shareId]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedMarkdown(markdownContent);
        }, 300);
        return () => {
            clearTimeout(handler);
        };
    }, [markdownContent]);

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
                    applySharePayload(payload);
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

    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        e.target.value = '';
        if (!file) return;

        const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
        const allowed = ['md', 'markdown', 'txt', 'text'];
        if (!allowed.includes(ext) && !file.type.startsWith('text/')) {
            toast.error('Upload a .md, .markdown, or .txt file.');
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            const text = typeof reader.result === 'string' ? reader.result : '';
            setMarkdownContent(text);
            const base = file.name.replace(/\.[^.]+$/, '');
            if (base) setDocumentTitle(base);
            AnalyticsService.events.editorFileUpload(ext || file.type || 'unknown');
            toast.success(`Loaded ${file.name}`);
        };
        reader.onerror = () => toast.error('Could not read file.');
        reader.readAsText(file);
    };

    const layoutModeClass =
        fullScreenPane === 'editor'
            ? 'layout-mode-edit'
            : fullScreenPane === 'preview'
              ? 'layout-mode-preview'
              : `layout-mode-${viewMode}`;

    const showEditorPane = fullScreenPane !== 'preview' && (fullScreenPane === 'editor' || viewMode !== 'preview');
    const showPreviewPane = fullScreenPane !== 'editor' && (fullScreenPane === 'preview' || viewMode !== 'edit');

    return (
        <div className="editor-page">
            <div className={`editor-toolbar ${fullScreenPane ? 'd-none' : ''}`}>
                <div className="toolbar-left">
                    <button
                        className="btn-icon btn-back"
                        onClick={() => navigate('/')}
                        title="Back to Home"
                        type="button"
                    >
                        <i className="bi bi-arrow-left"></i>
                    </button>
                    <div className="toolbar-divider"></div>
                    <input
                        type="text"
                        className="editor-doc-title-input"
                        value={documentTitle}
                        onChange={(e) => setDocumentTitle(e.target.value)}
                        placeholder="Untitled document"
                        aria-label="Document title"
                    />
                </div>

                <div className="toolbar-right">
                    <EditorViewToggle mode={viewMode} onChange={setViewMode} />
                    <button
                        type="button"
                        className="editor-upload-btn"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <i className="bi bi-upload" aria-hidden />
                        <span className="editor-upload-label">Upload .md</span>
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".md,.markdown,.txt,text/plain,text/markdown"
                        className="visually-hidden"
                        onChange={handleFileUpload}
                    />
                    <div className="toolbar-divider" aria-hidden />
                    <button
                        type="button"
                        className="btn-snippets"
                        onClick={() => setSnippetsOpen(true)}
                        title="Content blocks and snippets"
                    >
                        <i className="bi bi-grid-3x3-gap" aria-hidden />
                        <span className="btn-snippets-label">Snippets</span>
                    </button>
                    <ShareLinkButton
                        payload={buildSharePayload()}
                        shareId={shareId || undefined}
                        onShareIdChange={handleShareIdChange}
                        onSaveSuccess={(saved) => {
                            lastSyncedPayload.current = {
                                content: saved.content,
                                theme: saved.theme || "professional",
                                title: normalizeShareTitle(saved.title),
                            };
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
                        exportBaseName={documentTitle}
                    />
                </div>
            </div>

            <ContentBlocksModal
                open={snippetsOpen}
                onClose={() => setSnippetsOpen(false)}
                onInsert={(text) => {
                    editorRef.current?.insertText(text);
                    editorRef.current?.focus();
                }}
            />

            <div className={`editor-content ${fullScreenPane ? 'top-0' : ''}`}>
                <div
                    className={`editor-layout layout-split ${layoutModeClass} ${fullScreenPane ? 'layout-fullscreen' : ''}`}
                >
                    {showEditorPane && (
                        <div
                            className={`editor-pane ${fullScreenPane === 'editor' ? 'w-100 border-0' : ''}`}
                        >
                            <MarkdownEditor
                                ref={editorRef}
                                value={markdownContent}
                                onChange={setMarkdownContent}
                                isFullScreen={fullScreenPane === 'editor'}
                                onToggleFullScreen={() => toggleFullScreen('editor')}
                            />
                        </div>
                    )}

                    {showPreviewPane && (
                        <div
                            className={`preview-pane ${fullScreenPane === 'preview' ? 'w-100 border-0' : ''}`}
                        >
                            <PreviewPane
                                ref={previewRef}
                                markdown={debouncedMarkdown}
                                themeId={selectedTheme}
                                isFullScreen={fullScreenPane === 'preview'}
                                onToggleFullScreen={() => toggleFullScreen('preview')}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditorPage;
