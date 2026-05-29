import type { SnippetDefinition } from './snippetTypes';

/** Built-in library (MD2FILE-style). Extend or replace in this file — not scraped from md2file.com. */
export const BUILTIN_SNIPPETS: SnippetDefinition[] = [
  {
    id: 'doc-api-endpoint',
    title: 'API Endpoint Documentation',
    description: 'Document REST API endpoint with examples',
    category: 'documentation',
    tags: ['api', 'rest', 'documentation'],
    content: `## GET /api/endpoint

### Description
Brief description of what this endpoint does.

### Authentication
Bearer token required.

### Query parameters
| Name | Type | Required | Description |
| --- | --- | --- | --- |
| \`page\` | number | No | Page index (default \`1\`) |
| \`limit\` | number | No | Page size (default \`20\`) |

### Response \`200 OK\`
\`\`\`json
{
  "data": [],
  "meta": { "page": 1, "total": 0 }
}
\`\`\`

### Errors
- \`401\` — Unauthorized
- \`404\` — Not found
`,
  },
  {
    id: 'doc-changelog',
    title: 'Changelog Entry',
    description: 'Version changelog documentation',
    category: 'documentation',
    tags: ['changelog', 'release'],
    content: `## [1.2.0] - 2026-05-28

### Added
- New export formats for Markdown and HTML
- Snippets panel for reusable content blocks

### Changed
- Improved editor toolbar layout

### Fixed
- PDF export when preview pane is hidden
`,
  },
  {
    id: 'doc-readme-section',
    title: 'README Section',
    description: 'Install, usage, and license blocks',
    category: 'documentation',
    tags: ['readme', 'oss'],
    content: `## Installation

\`\`\`bash
npm install
npm run dev
\`\`\`

## Usage

Describe how to open the app and create a document.

## Configuration

| Variable | Description |
| --- | --- |
| \`VITE_GA_MEASUREMENT_ID\` | Optional analytics ID |

## License

MIT
`,
  },
  {
    id: 'doc-faq',
    title: 'FAQ Block',
    description: 'Question and answer pairs',
    category: 'documentation',
    tags: ['faq', 'support'],
    content: `## Frequently asked questions

### How do I export to PDF?
Use **Export** in the toolbar, choose **PDF**, and ensure **Split** or **Preview** is visible.

### Where is my draft saved?
Drafts are stored locally in your browser until you clear site data.

### Can I share a document?
Use **Copy link** to save and share via the cloud link.
`,
  },
  {
    id: 'code-javascript',
    title: 'JavaScript Example',
    description: 'Fenced JavaScript block',
    category: 'code',
    tags: ['js', 'node'],
    content: `\`\`\`javascript
const features = ['Markdown', 'PDF export', 'Snippets'];

function greet(name) {
  console.log(\`Hello, \${name}!\`);
}

greet('World');
\`\`\`
`,
  },
  {
    id: 'code-typescript',
    title: 'TypeScript Example',
    description: 'Typed function and interface',
    category: 'code',
    tags: ['ts', 'types'],
    content: `\`\`\`typescript
interface ExportOptions {
  format: 'pdf' | 'markdown' | 'html';
  filename: string;
}

export async function exportDocument(opts: ExportOptions): Promise<void> {
  console.log('Exporting', opts.format, opts.filename);
}
\`\`\`
`,
  },
  {
    id: 'code-python',
    title: 'Python Example',
    description: 'Simple script block',
    category: 'code',
    tags: ['python'],
    content: `\`\`\`python
def render_status(name: str, ready: bool = True) -> str:
    state = "ready" if ready else "pending"
    return f"{name}: {state}"

print(render_status("PDF export"))
\`\`\`
`,
  },
  {
    id: 'code-json',
    title: 'JSON Config',
    description: 'Configuration object sample',
    category: 'code',
    tags: ['json', 'config'],
    content: `\`\`\`json
{
  "export": "pdf",
  "theme": "professional",
  "includePageNumbers": true,
  "margins": { "top": 24, "right": 24, "bottom": 24, "left": 24 }
}
\`\`\`
`,
  },
  {
    id: 'code-bash',
    title: 'Shell Commands',
    description: 'Bash install and build steps',
    category: 'code',
    tags: ['bash', 'cli'],
    content: `\`\`\`bash
npm install
npm run build
npm run preview
\`\`\`
`,
  },
  {
    id: 'code-sql',
    title: 'SQL Query',
    description: 'SELECT with join example',
    category: 'code',
    tags: ['sql', 'database'],
    content: `\`\`\`sql
SELECT u.id, u.email, COUNT(d.id) AS doc_count
FROM users u
LEFT JOIN documents d ON d.user_id = u.id
WHERE u.active = TRUE
GROUP BY u.id, u.email
ORDER BY doc_count DESC
LIMIT 10;
\`\`\`
`,
  },
  {
    id: 'diagram-flowchart',
    title: 'Mermaid Flowchart',
    description: 'Flow from write to export',
    category: 'diagrams',
    tags: ['mermaid', 'flowchart'],
    content: `\`\`\`mermaid
flowchart TD
  A[Write Markdown] --> B[Live Preview]
  B --> C[Choose Theme]
  C --> D[Export PDF]
\`\`\`
`,
  },
  {
    id: 'diagram-sequence',
    title: 'Mermaid Sequence',
    description: 'Request/response sequence',
    category: 'diagrams',
    tags: ['mermaid', 'sequence'],
    content: `\`\`\`mermaid
sequenceDiagram
  participant User
  participant Editor
  participant API
  User->>Editor: Edit document
  Editor->>API: Save share link
  API-->>Editor: Share ID
  Editor-->>User: Copy link
\`\`\`
`,
  },
  {
    id: 'diagram-state',
    title: 'Mermaid State Diagram',
    description: 'Document lifecycle states',
    category: 'diagrams',
    tags: ['mermaid', 'state'],
    content: `\`\`\`mermaid
stateDiagram-v2
  [*] --> Draft
  Draft --> Review: submit
  Review --> Published: approve
  Review --> Draft: changes requested
  Published --> [*]
\`\`\`
`,
  },
  {
    id: 'diagram-pie',
    title: 'Mermaid Pie Chart',
    description: 'Simple distribution chart',
    category: 'diagrams',
    tags: ['mermaid', 'chart'],
    content: `\`\`\`mermaid
pie title Export formats used
  "PDF" : 62
  "Markdown" : 24
  "HTML" : 14
\`\`\`
`,
  },
  {
    id: 'diagram-er',
    title: 'Mermaid ER Diagram',
    description: 'Entities and relationships',
    category: 'diagrams',
    tags: ['mermaid', 'er'],
    content: `\`\`\`mermaid
erDiagram
  USER ||--o{ DOCUMENT : owns
  DOCUMENT ||--o{ SHARE : has
  USER {
    string id
    string email
  }
  DOCUMENT {
    string id
    string title
  }
\`\`\`
`,
  },
  {
    id: 'table-features',
    title: 'Feature Comparison Table',
    description: 'Columns for feature, status, notes',
    category: 'tables',
    tags: ['table', 'comparison'],
    content: `| Feature | Status | Notes |
| --- | --- | --- |
| Live editing | ✅ | Split view |
| PDF export | ✅ | Theme-aware |
| Share link | ✅ | Cloud sync |
| Snippets | ✅ | Built-in library |
`,
  },
  {
    id: 'table-roadmap',
    title: 'Roadmap Table',
    description: 'Quarterly delivery plan',
    category: 'tables',
    tags: ['table', 'roadmap'],
    content: `| Quarter | Goal | Owner |
| --- | --- | --- |
| Q2 | Editor snippets | Team A |
| Q3 | Template gallery | Team B |
| Q4 | Team workspaces | Team A |
`,
  },
  {
    id: 'tpl-meeting-notes',
    title: 'Meeting Notes',
    description: 'Agenda, notes, and action items',
    category: 'templates',
    tags: ['meeting', 'notes'],
    content: `# Meeting notes

**Date:** YYYY-MM-DD  
**Attendees:** Name 1, Name 2

## Agenda
1. Topic one
2. Topic two

## Discussion
- Key point

## Action items
- [ ] Owner — Task — Due date
`,
  },
  {
    id: 'tpl-pr-description',
    title: 'Pull Request Template',
    description: 'Summary, test plan, checklist',
    category: 'templates',
    tags: ['github', 'pr'],
    content: `## Summary
What changed and why.

## Test plan
- [ ] Local dev smoke test
- [ ] PDF export on sample doc
- [ ] Mobile layout check

## Screenshots
Optional UI captures.
`,
  },
  {
    id: 'tpl-release-notes',
    title: 'Release Notes',
    description: 'Highlights for a product release',
    category: 'templates',
    tags: ['release', 'product'],
    content: `# Release v1.0.0

## Highlights
- Snippets library in the editor
- Export menu: PDF, Markdown, HTML

## Upgrade notes
No breaking changes.

## Known issues
- Mermaid diagrams render as code until diagram support is enabled
`,
  },
];
