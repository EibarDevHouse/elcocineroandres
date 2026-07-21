import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  throw new Error(
    'Missing Supabase environment variables. Ensure .env.local contains NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.'
  );
}

export const supabase = createClient<Database>(url, serviceRoleKey);
