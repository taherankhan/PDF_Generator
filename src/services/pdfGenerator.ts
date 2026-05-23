import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { parseMarkdown } from './markdownParser';
import { getTheme, applyThemeToHTML } from '../themes/themeConfig';
import Prism from 'prismjs';

export interface PDFOptions {
  filename?: string;
  themeId?: string;
}

const defaultOptions: PDFOptions = {
  filename: 'document.pdf',
  themeId: 'professional',
};

/**
 * Generate PDF from markdown content
 * Uses html2canvas + jsPDF with Prism.js syntax highlighting to match preview
 */
export const generatePDFFromMarkdown = async (
  markdown: string,
  options: PDFOptions = {}
): Promise<void> => {
  const opts = { ...defaultOptions, ...options };
  
  // Get theme
  const theme = getTheme(opts.themeId || 'professional');
  
  // Parse markdown to HTML
  const htmlContent = parseMarkdown(markdown);
  const themedHtml = applyThemeToHTML(htmlContent, theme);
  
  console.log('Generating PDF...');
  console.log('Theme:', theme.name);
  console.log('Markdown length:', markdown.length);
  
  // Create a temporary container matching preview pane styles
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.left = '-9999px';
  container.style.top = '0';
  container.style.width = '794px'; // A4 width in pixels at 96 DPI
  container.style.padding = '40px';
  container.style.backgroundColor = theme.colors.background;
  container.style.color = theme.colors.text;
  container.style.fontFamily = theme.fonts.body;
  container.style.fontSize = theme.fontSize.base;
  container.style.lineHeight = theme.spacing.lineHeight;
  container.style.overflow = 'visible';
  container.className = 'pdf-export-container';
  container.innerHTML = themedHtml;
  
  // Add Prism Tomorrow theme styles to match preview exactly
  const prismStyles = document.createElement('style');
  prismStyles.textContent = `
    /* Prism Tomorrow Theme - matching preview */
    .pdf-export-container pre[class*="language-"] {
      background: #2d2d30;
      border-radius: 6px;
      padding: 16px;
      margin: 16px 0;
      overflow-x: auto;
      color: #ccc;
      text-shadow: none;
      font-family: 'Courier New', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
      font-size: ${theme.fontSize.code};
      line-height: 1.5;
      direction: ltr;
      text-align: left;
      white-space: pre;
      word-spacing: normal;
      word-break: normal;
      word-wrap: normal;
      tab-size: 4;
      hyphens: none;
    }
    
    .pdf-export-container code[class*="language-"] {
      background: transparent;
      color: #ccc;
      text-shadow: none;
      font-family: 'Courier New', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
      font-size: ${theme.fontSize.code};
      line-height: 1.5;
    }
    
    .pdf-export-container :not(pre) > code {
      background: ${theme.colors.codeBackground};
      color: ${theme.colors.codeText};
      padding: 2px 6px;
      border-radius: 3px;
      font-family: 'Courier New', Consolas, Monaco, monospace;
      font-size: ${theme.fontSize.code};
    }
    
    /* Prism Token Colors - Tomorrow Theme */
    .pdf-export-container .token.comment,
    .pdf-export-container .token.block-comment,
    .pdf-export-container .token.prolog,
    .pdf-export-container .token.doctype,
    .pdf-export-container .token.cdata {
      color: #999;
    }
    
    .pdf-export-container .token.punctuation {
      color: #ccc;
    }
    
    .pdf-export-container .token.tag,
    .pdf-export-container .token.attr-name,
    .pdf-export-container .token.namespace,
    .pdf-export-container .token.deleted {
      color: #e2777a;
    }
    
    .pdf-export-container .token.function-name {
      color: #6196cc;
    }
    
    .pdf-export-container .token.boolean,
    .pdf-export-container .token.number,
    .pdf-export-container .token.function {
      color: #f08d49;
    }
    
    .pdf-export-container .token.property,
    .pdf-export-container .token.class-name,
    .pdf-export-container .token.constant,
    .pdf-export-container .token.symbol {
      color: #f8c555;
    }
    
    .pdf-export-container .token.selector,
    .pdf-export-container .token.important,
    .pdf-export-container .token.atrule,
    .pdf-export-container .token.keyword,
    .pdf-export-container .token.builtin {
      color: #cc99cd;
    }
    
    .pdf-export-container .token.string,
    .pdf-export-container .token.char,
    .pdf-export-container .token.attr-value,
    .pdf-export-container .token.regex,
    .pdf-export-container .token.variable {
      color: #7ec699;
    }
    
    .pdf-export-container .token.operator,
    .pdf-export-container .token.entity,
    .pdf-export-container .token.url {
      color: #67cdcc;
    }
    
    .pdf-export-container .token.important,
    .pdf-export-container .token.bold {
      font-weight: bold;
    }
    
    .pdf-export-container .token.italic {
      font-style: italic;
    }
    
    .pdf-export-container .token.entity {
      cursor: help;
    }
    
    .pdf-export-container .token.inserted {
      color: green;
    }
  `;
  
  document.head.appendChild(prismStyles);
  document.body.appendChild(container);
  
  console.log('Container created, applying syntax highlighting...');
  
  try {
    // Apply Prism syntax highlighting like preview does
    Prism.highlightAllUnder(container);
    
    // Wait for rendering and highlighting to complete
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log('Starting html2canvas conversion...');
    
    // Convert HTML to canvas with optimized settings
    const canvas = await html2canvas(container, {
      scale: 1.5, // Reduced from 2 to keep file size reasonable
      useCORS: true,
      allowTaint: false,
      backgroundColor: theme.colors.background,
      logging: true, // Enable to see what's happening
      windowWidth: 794,
      windowHeight: container.scrollHeight,
    });
    
    console.log('Canvas created:', canvas.width, 'x', canvas.height);
    
    // Calculate PDF dimensions
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    console.log('Creating PDF...');
    
    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });
    
    let heightLeft = imgHeight;
    let position = 0;
    
    // Convert canvas to image with reduced quality for smaller file size
    const imgData = canvas.toDataURL('image/jpeg', 0.98);
    
    console.log('Image data created, length:', imgData.length);
    
    // Add first page
    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    
    // Add additional pages if needed
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    
    console.log('Saving PDF:', opts.filename);
    
    // Save PDF
    pdf.save(opts.filename || 'document.pdf');
    
    console.log('PDF saved successfully!');
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  } finally {
    // Clean up
    document.body.removeChild(container);
    document.head.removeChild(prismStyles);
  }
};

/**
 * Generate PDF from HTML element (the actual preview pane)
 * This captures the preview exactly as rendered with all styles
 */
export const generatePDFFromElement = async (
  element: HTMLElement,
  options: PDFOptions = {}
): Promise<void> => {
  const opts = { ...defaultOptions, ...options };
  const theme = getTheme(opts.themeId || 'professional');
  
  console.log('Generating PDF from preview element...');

  // Handle Iframe source (PreviewPane refactor)
  let sourceElement: HTMLElement = element;
  let iframeStyles: string = '';

  const iframe = element.querySelector('iframe');
  if (iframe && iframe.contentDocument) {
      console.log('Detected Iframe preview, extracting content...');
      const iframeBody = iframe.contentDocument.body;
      const previewContent = iframeBody.querySelector('#preview-content') as HTMLElement;
      
      if (previewContent) {
          sourceElement = previewContent;
      } else {
          sourceElement = iframeBody; // Fallback
      }

      // Extract styles from iframe head (including linked stylesheets)
      const styleElements = iframe.contentDocument.head.querySelectorAll('style, link[rel="stylesheet"]');
      
      const stylePromises = Array.from(styleElements).map(async (style) => {
          if (style.tagName.toLowerCase() === 'style') {
              return style.innerHTML;
          } else if (style.tagName.toLowerCase() === 'link' && (style as HTMLLinkElement).rel === 'stylesheet') {
              try {
                  const href = (style as HTMLLinkElement).href;
                  // Skip internal/blob URLs if needed, but try fetching everything
                  const response = await fetch(href);
                  return await response.text();
              } catch (e) {
                  console.warn('Failed to load stylesheet for PDF:', (style as HTMLLinkElement).href);
                  return '';
              }
          }
          return '';
      });

      const loadedStyles = await Promise.all(stylePromises);
      iframeStyles = loadedStyles.join('\n');
  }
  
  // Create a sandbox iframe for PDF generation
  const sandboxFrame = document.createElement('iframe');
  sandboxFrame.style.position = 'fixed';
  sandboxFrame.style.left = '-9999px';
  sandboxFrame.style.top = '0';
  sandboxFrame.style.width = '794px'; // A4 width
  sandboxFrame.style.height = '1123px'; // A4 height
  sandboxFrame.style.border = 'none';
  document.body.appendChild(sandboxFrame);

  try {
      const sandboxDoc = sandboxFrame.contentDocument;
      if (!sandboxDoc) throw new Error('Could not access sandbox iframe document');

      // Write content to sandbox
      sandboxDoc.open();
      sandboxDoc.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <style>
                * { box-sizing: border-box; }
                
                body {
                    margin: 0;
                    padding: 0;
                    font-family: ${theme.fonts.body};
                    color: ${theme.colors.text};
                    background-color: ${theme.colors.background};
                }
                
                /* List & Text Styles */
                ul, ol { padding-left: 30px; margin: 10px 0; }
                li { margin: 5px 0; }
                p { margin: ${theme.spacing.paragraphMargin} 0; line-height: ${theme.spacing.lineHeight}; }
                
                /* Tables & Code */
                table { border-collapse: collapse; width: 100%; margin: 12px 0 16px; }
                th, td { border: 1px solid ${theme.colors.tableBorder}; padding: 8px 12px; }
                th { background-color: ${theme.colors.tableHeaderBg}; font-weight: bold; }
                pre { margin: 12px 0 16px; padding: 12px; background-color: ${theme.colors.codeBackground}; border-radius: 6px; }
                code { font-family: ${theme.fonts.code}; }
                
                /* Links */
                a { color: ${theme.colors.links}; text-decoration: none; }

                /* Headings - Default styles (can be overridden) */
                h1, h2, h3, h4, h5, h6 {
                    font-weight: bold;
                    margin-top: ${theme.spacing.headingMargin};
                    margin-bottom: ${theme.spacing.paragraphMargin};
                    padding-bottom: 0;
                    line-height: 1.2;
                }
                
                /* Prevent page breaks (Critical - keep !important) */
                h1, h2, h3, h4, h5, h6, pre, code, table, tr, blockquote, ul, ol {
                    page-break-inside: avoid !important;
                    break-inside: avoid !important;
                }
                
                h1, h2, h3, h4, h5, h6 {
                    page-break-after: avoid !important;
                    break-after: avoid !important;
                }

                /* User Custom Styles (Injected last to override defaults) */
                ${iframeStyles}
            </style>
        </head>
        <body>
            <div id="print-wrapper" style="padding: 20mm; min-height: 100vh; box-sizing: border-box;">
                <div id="pdf-content">
                    ${sourceElement.innerHTML}
                </div>
            </div>
        </body>
        </html>
      `);
      sandboxDoc.close();

      // Wait for resources in sandbox to load
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const wrapper = sandboxDoc.body;

    // Handle images: Convert to Base64 (Proxy Logic)
    const images = wrapper.querySelectorAll('img');
    const imagePromises = Array.from(images).map(async (img) => {
        const originalSrc = img.src;
        
        try {
            // Helper to fetch and convert to base64
            const toBase64 = async (url: string): Promise<string> => {
                const response = await fetch(url);
                const blob = await response.blob();
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result as string);
                    reader.onerror = reject;
                    reader.readAsDataURL(blob);
                });
            };

            let base64Data = '';
            try {
                base64Data = await toBase64(originalSrc);
            } catch (e) {
                // Try via allorigins proxy
                const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(originalSrc)}`;
                base64Data = await toBase64(proxyUrl);
            }

            // Replace image source with Base64 data
            if (base64Data) {
                img.src = base64Data;
                img.removeAttribute('crossorigin'); 
            }
        } catch (error) {
            console.warn('Failed to load image for PDF:', originalSrc);
             img.crossOrigin = "anonymous";
        }
    });
    
    // Wait for all image processing
    await Promise.race([
        Promise.all(imagePromises),
        new Promise(resolve => setTimeout(resolve, 5000))
    ]);

    console.log('Starting html2canvas conversion...');
    
    // Convert sandbox wrapper to canvas (ensures margins are captured)
    const printWrapper = sandboxDoc.getElementById('print-wrapper');
    if (!printWrapper) throw new Error('Print wrapper not found');

    const canvas = await html2canvas(printWrapper, {
        scale: 2, // High quality
        useCORS: true,
        allowTaint: true,
        logging: false,
        windowWidth: 794,
        width: 794,
        backgroundColor: theme.colors.background
    });

    // Calculate PDF dimensions
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    console.log('Creating PDF...');
    
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });
    
    let heightLeft = imgHeight;
    let position = 0;
    
    // Add first page
    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    
    // Add additional pages if needed
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    
    console.log('Saving PDF:', opts.filename);
    pdf.save(opts.filename || 'document.pdf');
    console.log('PDF saved successfully!');
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  } finally {
    if (document.body.contains(sandboxFrame)) {
        document.body.removeChild(sandboxFrame);
    }
  }
};
