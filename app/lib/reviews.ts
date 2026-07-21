import { supabase } from './supabase';

export interface Review {
  id: number;
  name: string;
  stars: number;
  dish: string;
  text: string;
  date: string;
}

interface DbReview {
  id: number;
  name: string;
  dish: string;
  stars: number;
  text: string;
  created_at: string;
}

export function mapDbReviewToReview(row: DbReview): Review {
  const date = new Date(row.created_at);
  const formatter = new Intl.DateTimeFormat('es-PA', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  const formatted = formatter.format(date);
  const dateStr = formatted.replace('.', '');

  return {
    id: row.id,
    name: row.name,
    stars: row.stars,
    dish: row.dish,
    text: row.text,
    date: dateStr,
  };
}

export async function getReviews(): Promise<Review[]> {
  try {
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Reviews fetch timeout')), 2000)
    );

    const { data, error } = await Promise.race([
      supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false }),
      timeoutPromise,
    ]);

    if (error) {
      console.warn('Error fetching reviews (non-fatal):', error.message);
      return [];
    }

    return (data || []).map(mapDbReviewToReview);
  } catch (err) {
    if (err instanceof Error && err.message === 'Reviews fetch timeout') {
      console.warn('Reviews fetch timed out, returning empty list');
    } else {
      console.error('Unexpected error fetching reviews:', err);
    }
    return [];
  }
}
