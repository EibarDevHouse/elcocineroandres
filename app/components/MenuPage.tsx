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
  displayName: string;
  price: number;
  desc: string;
  macros?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

const COMBOS: Combo[] = [
  {
    id: 'combo-2',
    name: '2 Tacos',
    displayName: 'Snack para 2',
    price: 5.5,
    desc: 'Res 50g • Pollo 50g • Tortillas 40g\n1 Birria + 1 Pollo Copal',
    macros: {
      calories: 530,
      protein: 40,
      carbs: 40,
      fat: 24,
    },
  },
  {
    id: 'combo-3',
    name: '3 Tacos',
    displayName: 'Combo Deficit',
    price: 8,
    desc: 'Res 80g • Pollo 150g • Tortillas 75g\n1 Birria + 2 Pollo Copal',
    macros: {
      calories: 775,
      protein: 62,
      carbs: 58,
      fat: 34,
    },
  },
  {
    id: 'combo-4',
    name: '4 Tacos',
    displayName: 'Combo Aumento/Elite',
    price: 10,
    desc: 'Res 160g • Pollo 150g • Tortillas 100g\n2 Birria + 2 Pollo Copal',
    macros: {
      calories: 1060,
      protein: 80,
      carbs: 80,
      fat: 48,
    },
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

export default function MenuPage({
  reviews,
  category = 'tacos',
}: MenuPageProps) {
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

  const categoryLabel =
    CATEGORIES.find((c) => c.id === category)?.label || 'Menú';

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
        {filteredItems.map((d) => {
          const dish = DISHES.find((x) => x.id === d.id);
          return (
            <article key={d.id} className={styles.dishCard}>
              <div className={styles.dishImageWrapper}>
                <div className={styles.dishImage}>
                  <video
                    src={d.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    disablePictureInPicture
                    preload="metadata"
                  />
                </div>
                {dish?.macros && (
                  <div className={styles.macroBadge}>
                    <div className={styles.macroCalories}>
                      {dish.macros.calories}
                    </div>
                    <div className={styles.macroLabel}>cal</div>
                  </div>
                )}
              </div>
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
          );
        })}
      </div>

      {category === 'tacos' && (
        <>
          <h2 className={styles.combosTitle}>Combos Tacos</h2>
          <div className={styles.combosList}>
            {combos.map((c) => {
              const tacoCount = parseInt(c.name[0]);
              return (
                <div key={c.id} className={styles.comboCard}>
                  <div className={styles.comboTop}>
                    <div className={styles.comboLeft}>
                      <div className={styles.comboDisplayName}>
                        {c.displayName}
                      </div>
                      <div className={styles.comboEmojis}>
                        {'🌮'.repeat(tacoCount)}
                      </div>
                    </div>
                    <div className={styles.comboPrice}>{c.priceLabel}</div>
                  </div>
                  <div className={styles.comboBottom}>
                    <div className={styles.comboInfo}>
                      <div className={styles.comboName}>{c.name}</div>
                      <div className={styles.comboDesc}>{c.desc}</div>
                    </div>
                    {c.macros && (
                      <div className={styles.comboMacroBadge}>
                        <div className={styles.comboMacroCalories}>
                          {c.macros.calories}
                        </div>
                        <div className={styles.comboMacroLabel}>cal</div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </main>
  );
}
