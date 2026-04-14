import { createClient } from '@supabase/supabase-js';

/**
 * Supabase client for Client Components.
 * Uses the anon key only — safe for the browser.
 */
export function createBrowserSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY env vars'
    );
  }

  return createClient(supabaseUrl, supabaseAnonKey);
}
