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
      primary: '#0066cc',
      secondary: '#004499',
      accent: '#0088ff',
      background: '#ffffff',
      text: '#333333',
      headings: '#1a1a1a',
      links: '#0066cc',
      codeBackground: '#f5f7fa',
      codeText: '#2c3e50',
      quoteBorder: '#0066cc',
      quoteText: '#555555',
      tableBorder: '#dddddd',
      tableHeaderBg: '#f0f4f8',
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
      primary: '#2c3e50',
      secondary: '#34495e',
      accent: '#3498db',
      background: '#ffffff',
      text: '#000000',
      headings: '#000000',
      links: '#2c3e50',
      codeBackground: '#f8f8f8',
      codeText: '#000000',
      quoteBorder: '#cccccc',
      quoteText: '#444444',
      tableBorder: '#000000',
      tableHeaderBg: '#f0f0f0',
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
      primary: '#000000',
      secondary: '#333333',
      accent: '#666666',
      background: '#ffffff',
      text: '#333333',
      headings: '#000000',
      links: '#000000',
      codeBackground: '#f9f9f9',
      codeText: '#000000',
      quoteBorder: '#e0e0e0',
      quoteText: '#666666',
      tableBorder: '#e0e0e0',
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
      primary: '#e74c3c',
      secondary: '#c0392b',
      accent: '#f39c12',
      background: '#ffffff',
      text: '#2c3e50',
      headings: '#e74c3c',
      links: '#3498db',
      codeBackground: '#fff3e0',
      codeText: '#d84315',
      quoteBorder: '#f39c12',
      quoteText: '#555555',
      tableBorder: '#ffccbc',
      tableHeaderBg: '#ffe0b2',
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
      primary: '#64b5f6',
      secondary: '#42a5f5',
      accent: '#81c784',
      background: '#1e1e1e',
      text: '#e0e0e0',
      headings: '#ffffff',
      links: '#64b5f6',
      codeBackground: '#2d2d2d',
      codeText: '#a5d6a7',
      quoteBorder: '#64b5f6',
      quoteText: '#b0b0b0',
      tableBorder: '#424242',
      tableHeaderBg: '#2d2d2d',
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
      primary: '#2c3e50',
      secondary: '#34495e',
      accent: '#2980b9',
      background: '#ffffff',
      text: '#333333',
      headings: '#2c3e50',
      links: '#2980b9',
      codeBackground: '#f8f9fa',
      codeText: '#2c3e50',
      quoteBorder: '#34495e',
      quoteText: '#555555',
      tableBorder: '#dfe6e9',
      tableHeaderBg: '#f1f2f6',
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
