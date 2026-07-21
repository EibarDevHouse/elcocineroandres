'use client';

import Link from 'next/link';
import type { Review } from '@/app/lib/reviews';
import type { DishCategory } from '@/app/lib/dishes';
import { DISHES } from '@/app/lib/dishes';
import styles from './ElCocineroAndres.module.css';
import menuStyles from './MenuPage.module.css';

interface Combo {
  id: string;
  name: string;
  price: number;
  desc: string;
}

const COMBOS: Combo[] = [
  {
    id: 'combo-2',
    name: '2 Tacos',
    price: 5.5,
    desc: '1 Birria + 1 Pollo Copal',
  },
  {
    id: 'combo-3',
    name: '3 Tacos',
    price: 8,
    desc: '1 Birria + 2 Pollo Copal',
  },
  {
    id: 'combo-4',
    name: '4 Tacos',
    price: 10,
    desc: '2 Birria + 2 Pollo Copal',
  },
];

const CATEGORIES: { id: DishCategory; label: string }[] = [
  { id: 'tacos', label: 'Tacos' },
  { id: 'pizzas', label: 'Pizzas' },
  { id: 'ceviches', label: 'Ceviches' },
];

interface MenuPageProps {
  reviews: Review[];
  category?: DishCategory;
}

export default function MenuPage({ reviews, category = 'tacos' }: MenuPageProps) {
  const whatsappNumber = '+584125458726';

  const starStr = (v: number) => {
    const f = Math.round(v);
    return '★'.repeat(f) + '☆'.repeat(5 - f);
  };

  const price = (p: number) =>
    '$' + (p % 1 ? p.toFixed(2).replace(/0$/, '') : p);

  const wa = (name: string) => {
    const num = String(whatsappNumber).replace(/\D/g, '');
    return (
      'https://wa.me/' +
      num +
      '?text=' +
      encodeURIComponent('¡Hola Andrés! Quiero pedir: ' + name)
    );
  };

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
      wa: wa(d.name),
      stars: avg ? starStr(avg) : '☆☆☆☆☆',
      ratingLabel: avg
        ? avg.toFixed(1) + ' · ' + n + ' review' + (n > 1 ? 's' : '')
        : 'Sin reviews aún',
    };
  });

  const combos = COMBOS.map((c) => ({
    ...c,
    priceLabel: price(c.price),
    wa: wa(c.name + ' (' + c.desc + ')'),
  }));

  const filteredItems = items.filter((item) => {
    const dish = DISHES.find((d) => d.id === item.id);
    return dish?.category === category;
  });

  const categoryLabel = CATEGORIES.find((c) => c.id === category)?.label || 'Menú';

  return (
    <main className={styles.main}>
      <div className={menuStyles.pageHeader}>
        <Link href="/menu" className={menuStyles.backButton}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className={styles.pageTitle}>{categoryLabel}</h1>
      </div>

      <div className={styles.dishesContainer}>
        {filteredItems.map((d) => (
          <article key={d.id} className={styles.dishCard}>
            <div className={styles.dishImage}>📷</div>
            <div className={styles.dishContent}>
              <div className={styles.dishHeader}>
                <h3 className={styles.dishName}>{d.name}</h3>
                <span className={styles.dishPrice}>{d.priceLabel}</span>
              </div>
              <div className={styles.dishRating}>
                <span className={styles.dishStars}>{d.stars}</span>
                <span className={styles.dishRatingLabel}>
                  {d.ratingLabel}
                </span>
              </div>
              <p className={styles.dishDesc}>{d.desc}</p>
            </div>
          </article>
        ))}
      </div>

      {category === 'tacos' && (
        <>
          <h2 className={styles.combosTitle}>Combos Tacos</h2>
          <div className={styles.combosList}>
            {combos.map((c) => (
              <div key={c.id} className={styles.comboCard}>
                <div>
                  <div className={styles.comboName}>{c.name}</div>
                  <div className={styles.comboDesc}>{c.desc}</div>
                </div>
                <div className={styles.comboRight}>
                  <span className={styles.comboPrice}>{c.priceLabel}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
