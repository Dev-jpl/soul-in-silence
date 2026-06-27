import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
// Supabase's newer "publishable" key (falls back to the legacy anon key name).
const key =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Null when env vars aren't set, so the app still builds/runs without Supabase.
export const supabase: SupabaseClient | null = url && key ? createClient(url, key) : null
