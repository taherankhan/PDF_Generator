export type PdfTheme = {
  name: string;
  desc: string;
  bg: string;
  text: string;
};

export type UseCase = {
  icon: string;
  cls: string;
  title: string;
  desc: string;
  tag: string;
  num: string;
};

export type WorkflowStep = {
  num: string;
  title: string;
  desc: string;
};

export const USE_CASES: UseCase[] = [
  {
    icon: '📄',
    cls: 'fi-purple',
    title: 'Professional Resumes',
    desc: 'Craft polished CVs and resumes with structured Markdown and export them as print-ready PDFs with elegant typography.',
    tag: '🚀 Most Popular',
    num: '01',
  },
  {
    icon: '📊',
    cls: 'fi-cyan',
    title: 'Technical Reports',
    desc: 'Write code-inclusive technical reports and documentation. Fenced code blocks, tables, and diagrams all render beautifully.',
    tag: '💻 Developer Favourite',
    num: '02',
  },
  {
    icon: '📚',
    cls: 'fi-pink',
    title: 'Study Notes & Guides',
    desc: 'Organise lecture notes, revision guides, and cheat-sheets in Markdown and convert them to shareable PDFs instantly.',
    tag: '🎓 Students',
    num: '03',
  },
  {
    icon: '📝',
    cls: 'fi-amber',
    title: 'Business Proposals',
    desc: 'Create professional project proposals, SOWs, and client documents with branded themes that impress at first glance.',
    tag: '💼 Business',
    num: '04',
  },
];

export const THEMES: PdfTheme[] = [
  { name: 'Aurora', desc: 'Clean & Minimal', bg: 'linear-gradient(135deg,#f8fafc,#e2e8f0)', text: '#1e293b' },
  { name: 'Midnight', desc: 'Dark & Bold', bg: 'linear-gradient(135deg,#0f172a,#1e293b)', text: '#f1f5f9' },
  { name: 'Ocean', desc: 'Corporate Blue', bg: 'linear-gradient(135deg,#eff6ff,#dbeafe)', text: '#1e40af' },
  { name: 'Forest', desc: 'Earthy & Natural', bg: 'linear-gradient(135deg,#f0fdf4,#dcfce7)', text: '#166534' },
  { name: 'Sunset', desc: 'Warm & Inviting', bg: 'linear-gradient(135deg,#fff7ed,#fde68a)', text: '#92400e' },
];

export const STEPS: WorkflowStep[] = [
  { num: '1', title: 'Write Markdown', desc: 'Type in the live editor — headings, lists, code, tables, links.' },
  { num: '2', title: 'Pick a Theme', desc: 'Choose one of 6 handcrafted PDF themes from the toolbar.' },
  { num: '3', title: 'Preview Live', desc: 'See exactly how your PDF will look in the side-by-side pane.' },
  { num: '4', title: 'Export PDF', desc: 'Hit export — your pixel-perfect PDF downloads in under a second.' },
];

export const STATS = [
  { value: '6', label: 'PDF Themes' },
  { value: '0', label: 'Server Uploads' },
  { value: '100%', label: 'Client-Side Export' },
  { value: '∞', label: 'Free Forever' },
];

export const DEVELOPER = {
  githubUsername: 'taherankhan',
  repoUrl: 'https://github.com/taherankhan/PDF_Generator',
  role: 'Full-Stack Developer',
  stack: ['React', 'TypeScript', 'Vite', 'jsPDF', 'Marked'],
} as const;

export const FOOTER_NAV = [
  { label: 'Features', sectionId: 'lp-features' },
  { label: 'Use Cases', sectionId: 'lp-usecases' },
  { label: 'Themes', sectionId: 'lp-themes' },
] as const;

export const themeSwatchBg = (name: string, bg: string) => {
  if (name === 'Ocean') return 'linear-gradient(135deg, #e0f2fe, #bae6fd)';
  if (name === 'Forest') return 'linear-gradient(135deg, #dcfce7, #bbf7d0)';
  if (name === 'Sunset') return 'linear-gradient(135deg, #fef08a, #fde047)';
  return bg;
};
