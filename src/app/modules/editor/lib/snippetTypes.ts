export type SnippetCategoryId =
  | 'all'
  | 'code'
  | 'documentation'
  | 'diagrams'
  | 'tables'
  | 'templates';

export type SnippetBuiltinCategory = Exclude<SnippetCategoryId, 'all'>;

export interface SnippetDefinition {
  id: string;
  title: string;
  description: string;
  content: string;
  category: SnippetBuiltinCategory;
  tags: string[];
}

export const SNIPPET_CATEGORY_META: Record<
  SnippetCategoryId,
  { label: string; icon: string }
> = {
  all: { label: 'All', icon: 'bi-grid' },
  code: { label: 'Code Blocks', icon: 'bi-code-slash' },
  documentation: { label: 'Documentation', icon: 'bi-journal-text' },
  diagrams: { label: 'Diagrams', icon: 'bi-diagram-3' },
  tables: { label: 'Tables', icon: 'bi-table' },
  templates: { label: 'Templates', icon: 'bi-file-earmark-richtext' },
};
