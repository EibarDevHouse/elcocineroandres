import { createClient, SupabaseClient } from '@supabase/supabase-js';

type Database = {
  public: {
    Tables: {
      reviews: {
        Row: {
          id: number;
          name: string;
          dish: string;
          stars: number;
          text: string;
          created_at: string;
        };
        Insert: {
          name: string;
          dish: string;
          stars: number;
          text: string;
          created_at?: string;
        };
        Update: {
          name?: string;
          dish?: string;
          stars?: number;
          text?: string;
          created_at?: string;
        };
      };
    };
  };
};

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!url || !serviceRoleKey) {
  if (typeof window === 'undefined') {
    console.error(
      'Missing Supabase environment variables. Ensure .env.local contains NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.'
    );
  }
}

export const supabase = createClient<Database>(url, serviceRoleKey);
