import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!supabaseUrl || !supabaseAnonKey) {
  // Fails loudly in dev instead of silently breaking form submissions later.
  console.error(
    "Missing Supabase env vars. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.",
  );
}

export const supabase = createClient(supabaseUrl ?? "", supabaseAnonKey ?? "");

// Session-less client — always uses the anon key, never picks up a logged-in
// admin/employer session from this browser. Use this for public-facing forms
// (like the agent/company registration form) so submissions never get
// blocked by RLS policies scoped to the "authenticated" role.
export const publicSupabase = createClient(supabaseUrl ?? "", supabaseAnonKey ?? "", {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
});
