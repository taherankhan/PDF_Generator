/**
 * Share link encoding/decoding — no backend.
 * Payload lives in URL hash so it's never sent to the server.
 */

import LZString from "lz-string";

export interface SharePayload {
  content: string;
  theme?: string;
}

const HASH_PREFIX = "d=";

/**
 * Encode markdown + optional theme into a short hash string (compressed, URI-safe).
 */
export function encodeSharePayload(payload: SharePayload): string {
  const json = JSON.stringify({
    content: payload.content,
    theme: payload.theme ?? "professional",
  });
  return LZString.compressToEncodedURIComponent(json);
}

/**
 * Decode hash fragment to payload. Returns null if missing or invalid.
 */
export function decodeSharePayload(): SharePayload | null {
  const hash = typeof window === "undefined" ? "" : window.location.hash.slice(1);
  if (!hash.startsWith(HASH_PREFIX)) return null;
  const encoded = hash.slice(HASH_PREFIX.length);
  if (!encoded) return null;
  try {
    const json = LZString.decompressFromEncodedURIComponent(encoded);
    if (!json) return null;
    const parsed = JSON.parse(json) as SharePayload;
    if (typeof parsed?.content !== "string") return null;
    return {
      content: parsed.content,
      theme: typeof parsed.theme === "string" ? parsed.theme : "professional",
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
  if (typeof window === "undefined") return `#${HASH_PREFIX}${encoded}`;
  const pathname = window.location.pathname;
  const base = window.location.origin + pathname;
  const editorPath = pathname.endsWith("/editor") ? base : base.replace(/\/?$/, "") + "/editor";
  return `${editorPath}#${HASH_PREFIX}${encoded}`;
}

/** Rough safe length for most browsers; beyond this we warn. */
export const SHARE_URL_LENGTH_WARN = 1800;

import { supabase } from "./supabaseClient";

/**
 * Save payload (content & theme) to Supabase. Returns the short UUID of the row.
 */
export async function saveSharePayloadToDb(payload: SharePayload): Promise<string> {
  const { data, error } = await supabase
    .from("shares")
    .insert([
      {
        content: payload.content,
        theme: payload.theme ?? "professional",
      }
    ])
    .select("id")
    .single();

  if (error) {
    console.error("Error saving document to database:", error);
    throw error;
  }
  return data.id;
}

/**
 * Fetch payload from Supabase using its UUID.
 */
export async function fetchSharePayloadFromDb(id: string): Promise<SharePayload | null> {
  const { data, error } = await supabase
    .from("shares")
    .select("content, theme")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error loading document from database:", error);
    return null;
  }

  return {
    content: data.content,
    theme: data.theme,
  };
}

/**
 * Build full database share URL for current origin + editor path.
 */
export function buildDbShareUrl(id: string): string {
  if (typeof window === "undefined") return `?share=${id}`;
  const pathname = window.location.pathname;
  const base = window.location.origin + pathname;
  const editorPath = pathname.endsWith("/editor") ? base : base.replace(/\/?$/, "") + "/editor";
  return `${editorPath}?share=${id}`;
}

/**
 * Update an existing payload (content & theme) in Supabase.
 */
export async function updateSharePayloadInDb(id: string, payload: SharePayload): Promise<void> {
  const { data, error } = await supabase
    .from("shares")
    .update({
      content: payload.content,
      theme: payload.theme ?? "professional",
    })
    .eq("id", id)
    .select("id")
    .single();

  if (error) {
    console.error("Error updating document in database:", error);
    throw error;
  }

  if (!data?.id) {
    throw new Error("Update did not affect any rows. Check Supabase RLS UPDATE policy on public.shares.");
  }
}
