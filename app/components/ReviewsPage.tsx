'use client';

import { useState, useEffect } from 'react';
import type { Review } from '@/app/lib/reviews';
import { DISHES } from '@/app/lib/dishes';
import { createReview } from '@/app/lib/actions';
import styles from './ElCocineroAndres.module.css';

interface ReviewsPageProps {
  initialReviews: Review[];
}

export default function ReviewsPage({ initialReviews }: ReviewsPageProps) {
  const [fName, setFName] = useState('');
  const [fDish, setFDish] = useState('taco-birria');
  const [fStars, setFStars] = useState(5);
  const [fText, setFText] = useState('');
  const [formMsg, setFormMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const starStr = (v: number) => {
    const f = Math.round(v);
    return '★'.repeat(f) + '☆'.repeat(5 - f);
  };

  const nameOf = (id: string) =>
    (DISHES.find((d) => d.id === id) || { name: id }).name;

  const reviewsList = reviews.map((r) => ({
    ...r,
    starsStr: starStr(r.stars),
    dishName: nameOf(r.dish),
  }));

  const all = reviews.map((r) => r.stars);
  const avgAll = all.length ? all.reduce((x, y) => x + y, 0) / all.length : 0;

  const submitReview = async () => {
    if (!fName.trim() || !fText.trim()) {
      setFormMsg('Completa tu nombre y comentario 🙂');
      return;
    }
    if (submitting || cooldown > 0) {
      return;
    }
    setSubmitting(true);
    try {
      const result = await createReview({
        name: fName.trim(),
        dish: fDish,
        stars: fStars,
        text: fText.trim(),
      });
      if (result.ok) {
        setReviews([result.review, ...reviews]);
        setFName('');
        setFText('');
        setFStars(5);
        setFormMsg('¡Gracias por tu review!');
        setCooldown(8);
        setTimeout(() => setFormMsg(''), 3000);
      } else {
        setFormMsg(result.error);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.pageTitle}>Reviews</h1>

      <div className={styles.ratingCard}>
        <div className={styles.ratingValue}>{avgAll.toFixed(1)}</div>
        <div>
          <div className={styles.ratingStars}>{starStr(avgAll)}</div>
          <div className={styles.ratingLabel}>
            {reviews.length} reviews de nuestros comensales
          </div>
        </div>
      </div>

      <div className={styles.formCard}>
        <div className={styles.formTitle}>Deja tu review</div>
        <div className={styles.formFields}>
          <input
            type="text"
            placeholder="Tu nombre"
            value={fName}
            onChange={(e) => setFName(e.target.value)}
            className={styles.formInput}
          />
          <select
            value={fDish}
            onChange={(e) => setFDish(e.target.value)}
            className={styles.formSelect}
          >
            {DISHES.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
          <div className={styles.formStars}>
            <span className={styles.starsLabel}>Tu calificación:</span>
            <div className={styles.starsPicker}>
              {[1, 2, 3, 4, 5].map((n) => (
                <span
                  key={n}
                  onClick={() => setFStars(n)}
                  className={styles.starIcon}
                >
                  {n <= fStars ? '★' : '☆'}
                </span>
              ))}
            </div>
          </div>
          <textarea
            placeholder="¿Qué te pareció? Cuéntanos…"
            value={fText}
            onChange={(e) => setFText(e.target.value)}
            rows={3}
            className={styles.formTextarea}
          />
          <div className={styles.formPhotoPlaceholder}>
            📷 Adjuntar foto (opcional) — demo
          </div>
          <button
            onClick={submitReview}
            disabled={submitting || cooldown > 0}
            className={styles.formButton}
          >
            Publicar review
          </button>
          {formMsg && <div className={styles.formMessage}>{formMsg}</div>}
        </div>
      </div>

      <div className={styles.fullReviewsList}>
        {reviewsList.map((r) => (
          <div key={r.id} className={styles.reviewCard}>
            <div className={styles.reviewTop}>
              <span className={styles.reviewName}>{r.name}</span>
              <span className={styles.reviewStars}>{r.starsStr}</span>
            </div>
            <div className={styles.reviewTag}>{r.dishName}</div>
            <p className={styles.reviewText}>"{r.text}"</p>
            <div className={styles.reviewDate}>{r.date}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
