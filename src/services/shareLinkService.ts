/**
 * Share link encoding/decoding — no backend.
 * Payload lives in URL hash so it's never sent to the server.
 */

import LZString from 'lz-string';
import { getSupabase } from './supabaseClient';

export interface SharePayload {
  content: string;
  theme?: string;
  /** Document title from the editor header */
  title?: string;
}

const HASH_PREFIX = 'd=';
const MAX_TITLE_LENGTH = 200;

export function normalizeShareTitle(title: string | undefined): string {
  if (!title) return '';
  return title.trim().slice(0, MAX_TITLE_LENGTH);
}

/**
 * Encode markdown + optional theme into a short hash string (compressed, URI-safe).
 */
export function encodeSharePayload(payload: SharePayload): string {
  const json = JSON.stringify({
    content: payload.content,
    theme: payload.theme ?? 'professional',
    title: normalizeShareTitle(payload.title),
  });
  return LZString.compressToEncodedURIComponent(json);
}

/**
 * Decode hash fragment to payload. Returns null if missing or invalid.
 */
export function decodeSharePayload(): SharePayload | null {
  const hash = typeof window === 'undefined' ? '' : window.location.hash.slice(1);
  if (!hash.startsWith(HASH_PREFIX)) return null;
  const encoded = hash.slice(HASH_PREFIX.length);
  if (!encoded) return null;
  try {
    const json = LZString.decompressFromEncodedURIComponent(encoded);
    if (!json) return null;
    const parsed = JSON.parse(json) as SharePayload;
    if (typeof parsed?.content !== 'string') return null;
    return {
      content: parsed.content,
      theme: typeof parsed.theme === 'string' ? parsed.theme : 'professional',
      title: typeof parsed.title === 'string' ? normalizeShareTitle(parsed.title) : '',
    };
  } catch {
    return null;
  }
}

/**
 * Build full share URL for current origin + editor path (works with basename).
 * Always targets /editor so opening the link loads the editor with prefilled data.
 */
export function buildShareUrl(payload: SharePayload): string {
  const encoded = encodeSharePayload(payload);
  if (typeof window === 'undefined') return `#${HASH_PREFIX}${encoded}`;
  const pathname = window.location.pathname;
  const base = window.location.origin + pathname;
  const editorPath = pathname.endsWith('/editor') ? base : base.replace(/\/?$/, '') + '/editor';
  return `${editorPath}#${HASH_PREFIX}${encoded}`;
}

/** Rough safe length for most browsers; beyond this we warn. */
export const SHARE_URL_LENGTH_WARN = 1800;

function rowFromPayload(payload: SharePayload) {
  return {
    content: payload.content,
    theme: payload.theme ?? 'professional',
    title: normalizeShareTitle(payload.title),
  };
}

/**
 * Save payload (content, theme, title) to Supabase. Returns the short UUID of the row.
 */
export async function saveSharePayloadToDb(payload: SharePayload): Promise<string> {
  const supabase = await getSupabase();
  const { data, error } = await supabase
    .from('shares')
    .insert([rowFromPayload(payload)])
    .select('id')
    .single();

  if (error) {
    console.error('Error saving document to database:', error);
    throw error;
  }
  return data.id;
}

/**
 * Fetch payload from Supabase using its UUID.
 */
export async function fetchSharePayloadFromDb(id: string): Promise<SharePayload | null> {
  const supabase = await getSupabase();
  const { data, error } = await supabase
    .from('shares')
    .select('content, theme, title')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error loading document from database:', error);
    return null;
  }

  return {
    content: data.content,
    theme: data.theme,
    title: typeof data.title === 'string' ? data.title : '',
  };
}

/**
 * Build full database share URL for current origin + editor path.
 */
export function buildDbShareUrl(id: string): string {
  if (typeof window === 'undefined') return `?share=${id}`;
  const pathname = window.location.pathname;
  const base = window.location.origin + pathname;
  const editorPath = pathname.endsWith('/editor') ? base : base.replace(/\/?$/, '') + '/editor';
  return `${editorPath}?share=${id}`;
}

/**
 * Update an existing payload (content, theme, title) in Supabase.
 */
export async function updateSharePayloadInDb(id: string, payload: SharePayload): Promise<void> {
  const supabase = await getSupabase();
  const { data, error } = await supabase
    .from('shares')
    .update(rowFromPayload(payload))
    .eq('id', id)
    .select('id')
    .single();

  if (error) {
    console.error('Error updating document in database:', error);
    throw error;
  }

  if (!data?.id) {
    throw new Error('Update did not affect any rows. Check Supabase RLS UPDATE policy on public.shares.');
  }
}
