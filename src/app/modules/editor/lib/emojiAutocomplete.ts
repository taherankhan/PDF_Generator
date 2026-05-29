import {
  autocompletion,
  Completion,
  CompletionContext,
  CompletionResult,
} from '@codemirror/autocomplete';
import { Extension } from '@codemirror/state';
import { EMOJI_CATALOG } from './emojiCatalog';

function emojiCompletions(context: CompletionContext): CompletionResult | null {
  const word = context.matchBefore(/:[a-z0-9_+-]{0,40}$/i);
  if (!word) return null;
  if (word.from === word.to && !context.explicit) return null;

  const query = word.text.slice(1).toLowerCase();
  const matches = EMOJI_CATALOG.filter((e) => {
    if (!query) return true;
    if (e.shortcode.startsWith(query)) return true;
    return e.tags?.some((t) => t.startsWith(query) || t.includes(query));
  }).slice(0, 14);

  if (!matches.length) return null;

  const options: Completion[] = matches.map((e) => ({
    label: e.shortcode,
    detail: e.emoji,
    type: 'text',
    apply: e.emoji,
    boost: e.shortcode.startsWith(query) ? 2 : 0,
  }));

  return {
    from: word.from,
    options,
    validFor: /^:[a-zA-Z0-9_+-]*$/,
  };
}

export const emojiAutocompleteTheme = {
  '.cm-tooltip.cm-tooltip-autocomplete': {
    backgroundColor: '#1a2238',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
    boxShadow: '0 16px 40px rgba(0, 0, 0, 0.5)',
    padding: '4px 0',
    fontFamily: "'Inter', system-ui, sans-serif",
  },
  '.cm-tooltip-autocomplete ul li': {
    padding: '6px 12px',
    lineHeight: '1.4',
  },
  '.cm-tooltip-autocomplete ul li[aria-selected]': {
    background: 'rgba(139, 92, 246, 0.22)',
    color: '#f1f5f9',
  },
  '.cm-completionLabel': {
    fontFamily: "'Fira Code', monospace",
    fontSize: '13px',
  },
  '.cm-completionDetail': {
    fontSize: '1.25rem',
    marginLeft: '10px',
    opacity: 1,
  },
};

export function emojiAutocompleteExtension(): Extension {
  return [
    autocompletion({
      override: [emojiCompletions],
      activateOnTyping: true,
      maxRenderedOptions: 12,
      icons: false,
    }),
  ];
}
