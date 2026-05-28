import type { SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

let clientPromise: Promise<SupabaseClient> | null = null;

/**
 * Lazy-loads the Supabase client so the landing bundle does not include Auth/Realtime/PostgREST.
 */
export function getSupabase(): Promise<SupabaseClient> {
  if (!clientPromise) {
    clientPromise = (async () => {
      if (!supabaseUrl || !supabaseAnonKey) {
        console.warn(
          'Supabase environment variables (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY) are missing. Cloud share and contact may fail.'
        );
      }
      const { createClient } = await import('@supabase/supabase-js');
      return createClient(
        supabaseUrl || 'https://placeholder-url.supabase.co',
        supabaseAnonKey || 'placeholder-anon-key'
      );
    })();
  }
  return clientPromise;
}
