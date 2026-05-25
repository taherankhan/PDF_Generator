import { FC, useState } from 'react';
import { generatePDFFromElement } from '../../../../services/pdfGenerator';
import { toast } from 'react-toastify';
import { getTheme } from '../../../../themes/themeConfig';

import { AnalyticsService } from '../../../../services/AnalyticsService';

interface ExportButtonProps {
    markdown: string;
    themeId?: string;
    previewRef: React.RefObject<HTMLDivElement>;
    disabled?: boolean;
}

const ExportButton: FC<ExportButtonProps> = ({ markdown, themeId, previewRef, disabled }) => {
    const [isExporting, setIsExporting] = useState(false);

    const handleExport = async () => {
        if (!previewRef?.current) return;

        try {
            setIsExporting(true);

            // Track Export Event
            AnalyticsService.events.exportPDF(themeId || 'professional', markdown.length);

            // Generate filename based on first heading or default
            let filename = 'document.pdf';
            const firstHeading = markdown.match(/^#\s+(.+)$/m);
            if (firstHeading) {
                filename = `${firstHeading[1].trim().replace(/[^\w\s-]/g, '')}.pdf`;
            }

            await generatePDFFromElement(previewRef.current, {
                filename,
                themeId
            });

            // Success toast removed as per request
        } catch (error) {
            console.error('Export failed:', error);
            toast.error('Failed to export PDF');
        } finally {
            setIsExporting(false);
        }
    };

    const theme = getTheme(themeId || 'professional');
    const buttonStyle = {
        background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
        border: 'none',
        color: '#ffffff', // Always white text on colored gradient
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: `0 4px 6px -1px ${theme.colors.primary}66`, // Colored shadow
        padding: '0 20px',
        height: '40px',
        borderRadius: '10px',
        fontSize: '0.875rem',
        fontWeight: 600,
        cursor: isExporting || disabled ? 'not-allowed' : 'pointer',
        opacity: isExporting || disabled ? 0.7 : 1,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    };

    return (
        <button
            onClick={handleExport}
            disabled={isExporting || disabled}
            style={buttonStyle}
            onMouseOver={(e) => {
                if (!isExporting && !disabled) {
                    e.currentTarget.style.transform = 'translateY(-1px) scale(1.02)';
                    e.currentTarget.style.boxShadow = `0 6px 8px -1px ${theme.colors.primary}88`;
                }
            }}
            onMouseOut={(e) => {
                if (!isExporting && !disabled) {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = `0 4px 6px -1px ${theme.colors.primary}66`;
                }
            }}
            onMouseDown={(e) => {
                if (!isExporting && !disabled) {
                    e.currentTarget.style.transform = 'translateY(0) scale(0.98)';
                }
            }}
            onMouseUp={(e) => {
                if (!isExporting && !disabled) {
                    e.currentTarget.style.transform = 'translateY(-1px) scale(1.02)';
                }
            }}
        >
            {isExporting ? (
                <>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    <span>Exporting...</span>
                </>
            ) : (
                <>
                    <i className="bi bi-file-earmark-pdf-fill"></i>
                    <span>Export PDF</span>
                </>
            )}
        </button>
    );
};

export default ExportButton;
