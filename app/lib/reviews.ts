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
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching reviews:', error);
      return [];
    }

    return (data || []).map(mapDbReviewToReview);
  } catch (err) {
    console.error('Unexpected error fetching reviews:', err);
    return [];
  }
}
