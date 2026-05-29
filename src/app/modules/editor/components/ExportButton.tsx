import { FC, useEffect, useRef, useState } from 'react';
import { generatePDFFromElement, generatePDFFromMarkdown } from '../../../../services/pdfGenerator';
import {
    getPdfExportUserMessage,
    PDF_MAX_MARKDOWN_CHARS,
} from '../../../../services/pdfErrors';
import { toast } from 'react-toastify';
import { getTheme } from '../../../../themes/themeConfig';
import { AnalyticsService } from '../../../../services/AnalyticsService';
import {
    buildThemedHtmlDocument,
    downloadTextFile,
    EXPORT_FORMAT_META,
    ExportFormat,
    resolveExportBasename,
} from '../lib/exportDocument';

interface ExportButtonProps {
    markdown: string;
    themeId?: string;
    previewRef: React.RefObject<HTMLDivElement>;
    disabled?: boolean;
    exportBaseName?: string;
}

const ExportButton: FC<ExportButtonProps> = ({
    markdown,
    themeId,
    previewRef,
    disabled,
    exportBaseName,
}) => {
    const [isExporting, setIsExporting] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('pdf');
    const rootRef = useRef<HTMLDivElement>(null);

    const theme = getTheme(themeId || 'professional');
    const effectiveThemeId = themeId || 'professional';

    useEffect(() => {
        if (!menuOpen) return;
        const onDoc = (e: MouseEvent) => {
            if (rootRef.current?.contains(e.target as Node)) return;
            setMenuOpen(false);
        };
        document.addEventListener('mousedown', onDoc);
        return () => document.removeEventListener('mousedown', onDoc);
    }, [menuOpen]);

    const runExport = async (format: ExportFormat) => {
        if (format === 'pdf' && markdown.length > PDF_MAX_MARKDOWN_CHARS) {
            toast.error(
                `Document is too large to export (${(markdown.length / 1000).toFixed(0)}k characters). ` +
                    `Maximum is ${(PDF_MAX_MARKDOWN_CHARS / 1000).toFixed(0)}k. Shorten content or split the file.`,
                { autoClose: 8000 }
            );
            return;
        }

        const base = resolveExportBasename(exportBaseName, markdown);
        const meta = EXPORT_FORMAT_META[format];

        try {
            setIsExporting(true);
            AnalyticsService.events.exportDocument(format, effectiveThemeId, markdown.length);

            if (format === 'pdf') {
                const previewRoot = previewRef?.current;
                const iframe = previewRoot?.querySelector('iframe');
                const hasLivePreview = Boolean(
                    iframe?.contentDocument?.getElementById('preview-content')
                );

                if (hasLivePreview && previewRoot) {
                    await generatePDFFromElement(previewRoot, {
                        filename: `${base}.pdf`,
                        themeId: effectiveThemeId,
                    });
                } else {
                    await generatePDFFromMarkdown(markdown, {
                        filename: `${base}.pdf`,
                        themeId: effectiveThemeId,
                    });
                }
            } else if (format === 'markdown') {
                downloadTextFile(markdown, `${base}.md`, meta.mime);
            } else {
                const html = buildThemedHtmlDocument(markdown, effectiveThemeId);
                downloadTextFile(html, `${base}.html`, meta.mime);
            }
        } catch (error) {
            if (format === 'pdf') {
                toast.error(getPdfExportUserMessage(error), { autoClose: 8000 });
            } else {
                toast.error('Export failed. Please try again.', { autoClose: 5000 });
            }
        } finally {
            setIsExporting(false);
        }
    };

    const handlePrimaryExport = () => {
        void runExport(selectedFormat);
    };

    const handlePickFormat = (format: ExportFormat) => {
        setSelectedFormat(format);
        setMenuOpen(false);
        void runExport(format);
    };

    return (
        <div className="export-menu" ref={rootRef}>
            <div className="export-menu-trigger">
                <button
                    type="button"
                    className="export-menu-main btn-export-pdf"
                    onClick={handlePrimaryExport}
                    disabled={isExporting || disabled}
                    title={`Export as ${EXPORT_FORMAT_META[selectedFormat].label}`}
                    style={{
                        background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
                    }}
                >
                    {isExporting ? (
                        <>
                            <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                            />
                            <span>Exporting…</span>
                        </>
                    ) : (
                        <>
                            <i className={`bi ${EXPORT_FORMAT_META[selectedFormat].icon}`} />
                            <span>Export</span>
                        </>
                    )}
                </button>
                <button
                    type="button"
                    className="export-menu-chevron btn-export-pdf"
                    onClick={() => setMenuOpen((o) => !o)}
                    disabled={isExporting || disabled}
                    aria-expanded={menuOpen}
                    aria-haspopup="listbox"
                    title="Choose export format"
                    style={{
                        background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
                    }}
                >
                    <i className={`bi bi-chevron-${menuOpen ? 'up' : 'down'}`} aria-hidden />
                </button>
            </div>

            {menuOpen && (
                <div className="export-menu-dropdown" role="listbox" aria-label="Export format">
                    {(['pdf', 'markdown', 'html'] as const).map((format) => {
                        const meta = EXPORT_FORMAT_META[format];
                        const active = selectedFormat === format;
                        return (
                            <button
                                key={format}
                                type="button"
                                role="option"
                                aria-selected={active}
                                className={`export-menu-item ${active ? 'active' : ''}`}
                                onClick={() => handlePickFormat(format)}
                            >
                                <i className={`bi ${meta.icon}`} aria-hidden />
                                <span>{meta.label}</span>
                                {active && (
                                    <i className="bi bi-check2 export-menu-item-check" aria-hidden />
                                )}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default ExportButton;
