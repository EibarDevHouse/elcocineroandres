'use server';

import { supabase } from './supabase';
import { DISH_IDS } from './dishes';
import { Review } from './reviews';
import { mapDbReviewToReview } from './reviews';

interface CreateReviewInput {
  name: string;
  dish: string;
  stars: number;
  text: string;
}

interface CreateReviewResult {
  ok: true;
  review: Review;
}

interface CreateReviewError {
  ok: false;
  error: string;
}

export async function createReview(
  input: CreateReviewInput
): Promise<CreateReviewResult | CreateReviewError> {
  const { name, dish, stars, text } = input;

  const trimmedName = name.trim();
  const trimmedText = text.trim();

  if (trimmedName.length === 0 || trimmedName.length > 80) {
    return { ok: false, error: 'El nombre debe tener entre 1 y 80 caracteres.' };
  }

  if (trimmedText.length === 0 || trimmedText.length > 1000) {
    return {
      ok: false,
      error: 'El comentario debe tener entre 1 y 1000 caracteres.',
    };
  }

  if (!Number.isInteger(stars) || stars < 1 || stars > 5) {
    return { ok: false, error: 'La calificación debe ser entre 1 y 5 estrellas.' };
  }

  if (!DISH_IDS.includes(dish)) {
    return { ok: false, error: 'El plato seleccionado no es válido.' };
  }

  try {
    const { data, error } = await supabase
      .from('reviews')
      .insert([{
        name: trimmedName,
        dish,
        stars,
        text: trimmedText,
      }] as any)
      .select()
      .single();

    if (error || !data) {
      console.error('Error creating review:', error);
      return { ok: false, error: 'No se pudo guardar tu review. Intenta de nuevo.' };
    }

    const review = mapDbReviewToReview(data);
    return { ok: true, review };
  } catch (err) {
    console.error('Unexpected error creating review:', err);
    return { ok: false, error: 'No se pudo guardar tu review. Intenta de nuevo.' };
  }
}
