'use client';

import Image from 'next/image';
import type { Review } from '@/app/lib/reviews';
import { DISHES } from '@/app/lib/dishes';
import Link from 'next/link';
import styles from './ElCocineroAndres.module.css';

interface HomePageProps {
  reviews: Review[];
}

export default function HomePage({ reviews }: HomePageProps) {
  const starStr = (v: number) => {
    const f = Math.round(v);
    return '★'.repeat(f) + '☆'.repeat(5 - f);
  };

  const price = (p: number) =>
    '$' + (p % 1 ? p.toFixed(2).replace(/0$/, '') : p);

  const byDish: Record<string, number[]> = {};
  reviews.forEach((r) => {
    if (!byDish[r.dish]) byDish[r.dish] = [];
    byDish[r.dish].push(r.stars);
  });

  const rate = (id: string) => {
    const a = byDish[id];
    if (!a) return null;
    return a.reduce((x, y) => x + y, 0) / a.length;
  };

  const items = DISHES.map((d) => {
    const avg = rate(d.id);
    const n = (byDish[d.id] || []).length;
    return {
      ...d,
      priceLabel: price(d.price),
      stars: avg ? starStr(avg) : '☆☆☆☆☆',
      ratingLabel: avg
        ? avg.toFixed(1) + ' · ' + n + ' review' + (n > 1 ? 's' : '')
        : 'Sin reviews aún',
    };
  });

  const featured = ['taco-birria', 'ceviche-330', 'mini-pizzas']
    .map((id) => items.find((i) => i.id === id))
    .filter((f) => f !== undefined);

  const homeReviews = reviews
    .slice(0, 2)
    .map((r) => ({ ...r, starsStr: starStr(r.stars) }));

  return (
    <main className={styles.main}>
      <section className={styles.heroSection}>
        <div className={styles.heroImage}>
          <Image
            src="/open-graph.jpg"
            alt="Sabor que se apodera de tus sentidos"
            fill
            priority
            quality={80}
            style={{ objectFit: 'cover' }}
          />
        </div>
        <h1 className={styles.heroTitle}>
          Sabor que se apodera de tus sentidos
        </h1>
        <p className={styles.heroDesc}>
          En esta edición, cada platillo está diseñado para ser saludable y bajo
          en calorías — sin sacrificar ni un gramo de sabor.
        </p>
      </section>

      <section className={styles.chefSection}>
        <div className={styles.chefImage}>👨‍🍳</div>
        <div>
          <div className={styles.chefName}>Chef José "Andrés" Durán</div>
          <p className={styles.chefDesc}>
            Un apasionado por la cocina y por complacer a sus comensales. Te
            llevamos a una experiencia sensorial en cada bocado.
          </p>
        </div>
      </section>

      <section className={styles.favoritesSection}>
        <h2 className={styles.sectionTitle}>Favoritos de la casa</h2>
        <div className={styles.favoritesList}>
          {featured.map((f) => (
            <div key={f.id} className={styles.favoriteCard}>
              <div className={styles.favoriteImage}>📷</div>
              <div className={styles.favoriteContent}>
                <div className={styles.favoriteName}>{f.name}</div>
                <div className={styles.favoritePrice}>
                  <span className={styles.favoritePriceValue}>
                    {f.priceLabel}
                  </span>
                  <span className={styles.favoriteStars}>{f.stars}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.reviewsPreviewSection}>
        <div className={styles.reviewsHeader}>
          <h2 className={styles.sectionTitle}>Lo que dicen</h2>
          <Link href="/reviews" className={styles.reviewsLink}>
            Ver todos
          </Link>
        </div>
        <div className={styles.reviewsList}>
          {homeReviews.map((r, i) => (
            <div key={i} className={styles.reviewCard}>
              <div className={styles.reviewTop}>
                <span className={styles.reviewName}>{r.name}</span>
                <span className={styles.reviewStars}>{r.starsStr}</span>
              </div>
              <p className={styles.reviewText}>"{r.text}"</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.gallerySection}>
        <h2 className={styles.sectionTitle}>Galería</h2>
        <div className={styles.galleryGrid}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={styles.galleryImage}>
              📷
            </div>
          ))}
        </div>
      </section>

      <section className={styles.followSection}>
        <div className={styles.followTitle}>Síguenos</div>
        <div className={styles.followLinks}>
          <a href="#" className={styles.followButton}>
            Instagram
          </a>
          <a href="#" className={styles.followButton}>
            Facebook
          </a>
          <a href="#" className={styles.followButton}>
            TikTok
          </a>
        </div>
      </section>
    </main>
  );
}
