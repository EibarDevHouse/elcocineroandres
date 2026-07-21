import { createClient } from '@supabase/supabase-js';

let supabaseClient: ReturnType<typeof createClient> | null = null;

function initializeSupabase() {
  if (!supabaseClient) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !serviceRoleKey) {
      throw new Error(
        'Missing Supabase environment variables. Ensure .env.local contains NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.'
      );
    }

    supabaseClient = createClient(url, serviceRoleKey);
  }
  return supabaseClient;
}

export const supabase = new Proxy({}, {
  get: (_target, prop) => {
    return (initializeSupabase() as any)[prop];
  },
}) as ReturnType<typeof createClient>;
