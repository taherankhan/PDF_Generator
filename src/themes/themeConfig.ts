export interface Theme {
  id: string;
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    headings: string;
    links: string;
    codeBackground: string;
    codeText: string;
    quoteBorder: string;
    quoteText: string;
    tableBorder: string;
    tableHeaderBg: string;
  };
  fonts: {
    body: string;
    headings: string;
    code: string;
  };
  fontSize: {
    base: string;
    h1: string;
    h2: string;
    h3: string;
    h4: string;
    code: string;
  };
  spacing: {
    lineHeight: string;
    paragraphMargin: string;
    headingMargin: string;
  };
}

export const themes: Record<string, Theme> = {
  professional: {
    id: 'professional',
    name: 'Professional',
    description: 'Clean and corporate design for business documents',
    colors: {
      primary: '#2563eb',
      secondary: '#1e40af',
      accent: '#3b82f6',
      background: '#ffffff',
      text: '#1e293b',
      headings: '#0f172a',
      links: '#2563eb',
      codeBackground: '#f1f5f9',
      codeText: '#334155',
      quoteBorder: '#2563eb',
      quoteText: '#475569',
      tableBorder: '#e2e8f0',
      tableHeaderBg: '#f8fafc',
    },
    fonts: {
      body: "'Inter', 'Segoe UI', sans-serif",
      headings: "'Inter', 'Segoe UI', sans-serif",
      code: "'Fira Code', 'Courier New', monospace",
    },
    fontSize: {
      base: '14px',
      h1: '32px',
      h2: '24px',
      h3: '20px',
      h4: '18px',
      code: '13px',
    },
    spacing: {
      lineHeight: '1.6',
      paragraphMargin: '12px',
      headingMargin: '20px',
    },
  },
  
  academic: {
    id: 'academic',
    name: 'Academic',
    description: 'Formal serif design for research papers and academic documents',
    colors: {
      primary: '#1e293b',
      secondary: '#0f172a',
      accent: '#6366f1',
      background: '#fffef9',
      text: '#1c1917',
      headings: '#0c0a09',
      links: '#4338ca',
      codeBackground: '#f5f5f4',
      codeText: '#292524',
      quoteBorder: '#a8a29e',
      quoteText: '#44403c',
      tableBorder: '#d6d3d1',
      tableHeaderBg: '#fafaf9',
    },
    fonts: {
      body: "'Merriweather', 'Georgia', serif",
      headings: "'Merriweather', 'Georgia', serif",
      code: "'Courier New', monospace",
    },
    fontSize: {
      base: '14px',
      h1: '28px',
      h2: '22px',
      h3: '18px',
      h4: '16px',
      code: '12px',
    },
    spacing: {
      lineHeight: '1.8',
      paragraphMargin: '14px',
      headingMargin: '18px',
    },
  },
  
  minimal: {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean and simple design with lots of whitespace',
    colors: {
      primary: '#18181b',
      secondary: '#27272a',
      accent: '#71717a',
      background: '#fafafa',
      text: '#3f3f46',
      headings: '#09090b',
      links: '#18181b',
      codeBackground: '#f4f4f5',
      codeText: '#27272a',
      quoteBorder: '#d4d4d8',
      quoteText: '#52525b',
      tableBorder: '#e4e4e7',
      tableHeaderBg: '#fafafa',
    },
    fonts: {
      body: "'Helvetica Neue', 'Arial', sans-serif",
      headings: "'Helvetica Neue', 'Arial', sans-serif",
      code: "'Monaco', 'Courier New', monospace",
    },
    fontSize: {
      base: '15px',
      h1: '36px',
      h2: '26px',
      h3: '20px',
      h4: '17px',
      code: '13px',
    },
    spacing: {
      lineHeight: '1.7',
      paragraphMargin: '16px',
      headingMargin: '24px',
    },
  },
  
  creative: {
    id: 'creative',
    name: 'Creative',
    description: 'Colorful and modern design with vibrant accents',
    colors: {
      primary: '#db2777',
      secondary: '#be185d',
      accent: '#f59e0b',
      background: '#fffbf7',
      text: '#292524',
      headings: '#9d174d',
      links: '#0891b2',
      codeBackground: '#fff7ed',
      codeText: '#c2410c',
      quoteBorder: '#f59e0b',
      quoteText: '#57534e',
      tableBorder: '#fed7aa',
      tableHeaderBg: '#ffedd5',
    },
    fonts: {
      body: "'Poppins', 'Roboto', sans-serif",
      headings: "'Poppins', 'Roboto', sans-serif",
      code: "'Source Code Pro', monospace",
    },
    fontSize: {
      base: '14px',
      h1: '34px',
      h2: '26px',
      h3: '21px',
      h4: '18px',
      code: '13px',
    },
    spacing: {
      lineHeight: '1.65',
      paragraphMargin: '13px',
      headingMargin: '22px',
    },
  },
  
  dark: {
    id: 'dark',
    name: 'Dark',
    description: 'Dark theme with light text for reduced eye strain',
    colors: {
      primary: '#8b5cf6',
      secondary: '#6c63ff',
      accent: '#06b6d4',
      background: '#0c0f17',
      text: '#cbd5e1',
      headings: '#f1f5f9',
      links: '#a78bfa',
      codeBackground: '#151a27',
      codeText: '#6ee7b7',
      quoteBorder: '#6c63ff',
      quoteText: '#94a3b8',
      tableBorder: '#1e293b',
      tableHeaderBg: '#111827',
    },
    fonts: {
      body: "'Roboto', 'Arial', sans-serif",
      headings: "'Roboto', 'Arial', sans-serif",
      code: "'JetBrains Mono', 'Consolas', monospace",
    },
    fontSize: {
      base: '14px',
      h1: '32px',
      h2: '24px',
      h3: '20px',
      h4: '18px',
      code: '13px',
    },
    spacing: {
      lineHeight: '1.6',
      paragraphMargin: '12px',
      headingMargin: '20px',
    },
  },

  resume: {
    id: 'resume',
    name: 'Resume',
    description: 'Professional layout optimized for CVs and resumes',
    colors: {
      primary: '#1e3a5f',
      secondary: '#152a45',
      accent: '#0ea5e9',
      background: '#ffffff',
      text: '#334155',
      headings: '#0f172a',
      links: '#0284c7',
      codeBackground: '#f8fafc',
      codeText: '#1e293b',
      quoteBorder: '#1e3a5f',
      quoteText: '#64748b',
      tableBorder: '#e2e8f0',
      tableHeaderBg: '#f1f5f9',
    },
    fonts: {
      body: "'Calibri', 'Open Sans', sans-serif",
      headings: "'Georgia', 'Times New Roman', serif", // Classy serif headings
      code: "'Consolas', monospace",
    },
    fontSize: {
      base: '11pt', // Standard resume font size
      h1: '24pt',   // Name
      h2: '16pt',   // Section Headers (Experience, Education)
      h3: '13pt',   // Job Titles
      h4: '11pt',   // Subtitles
      code: '10pt',
    },
    spacing: {
      lineHeight: '1.4', // Tighter line height for resumes
      paragraphMargin: '8px',
      headingMargin: '12px', // Compact spacing
    },
  },
};

export const getTheme = (themeId: string): Theme => {
  return themes[themeId] || themes.professional;
};

export const applyThemeToHTML = (html: string, theme: Theme): string => {
  const style = `
    <style>
      body {
        font-family: ${theme.fonts.body};
        font-size: ${theme.fontSize.base};
        line-height: ${theme.spacing.lineHeight};
        color: ${theme.colors.text};
        background-color: ${theme.colors.background};
      }
      h1 {
        font-family: ${theme.fonts.headings};
        font-size: ${theme.fontSize.h1};
        color: ${theme.colors.headings};
        margin: ${theme.spacing.headingMargin} 0;
      }
      h2 {
        font-family: ${theme.fonts.headings};
        font-size: ${theme.fontSize.h2};
        color: ${theme.colors.headings};
        margin: ${theme.spacing.headingMargin} 0;
      }
      h3 {
        font-family: ${theme.fonts.headings};
        font-size: ${theme.fontSize.h3};
        color: ${theme.colors.headings};
        margin: ${theme.spacing.headingMargin} 0;
      }
      h4 {
        font-family: ${theme.fonts.headings};
        font-size: ${theme.fontSize.h4};
        color: ${theme.colors.headings};
        margin: ${theme.spacing.headingMargin} 0;
      }
      p {
        margin: ${theme.spacing.paragraphMargin} 0;
      }
      a {
        color: ${theme.colors.links};
        text-decoration: none;
      }
      code {
        font-family: ${theme.fonts.code};
        font-size: ${theme.fontSize.code};
        background-color: ${theme.colors.codeBackground};
        color: ${theme.colors.codeText};
        padding: 2px 6px;
        border-radius: 3px;
      }
      pre {
        background-color: ${theme.colors.codeBackground};
        padding: 16px;
        border-radius: 6px;
        overflow-x: auto;
      }
      pre code {
        background: none;
        padding: 0;
      }
      blockquote {
        border-left: 4px solid ${theme.colors.quoteBorder};
        padding-left: 16px;
        margin: 16px 0;
        color: ${theme.colors.quoteText};
      }
      table {
        border-collapse: collapse;
        width: 100%;
        margin: 16px 0;
      }
      th, td {
        border: 1px solid ${theme.colors.tableBorder};
        padding: 8px;
        text-align: left;
      }
      th {
        background-color: ${theme.colors.tableHeaderBg};
        font-weight: bold;
      }
      ul, ol {
        margin: 10px 0;
        padding-left: 30px;
      }
      li {
        margin: 5px 0;
      }
    </style>
  `;
  
  return style + html;
};
