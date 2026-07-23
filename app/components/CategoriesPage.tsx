'use client';

import Link from 'next/link';
import styles from './MenuPage.module.css';

const CATEGORIES = [
  {
    id: 'tacos',
    label: 'Tacos',
    emoji: '🌮',
    backgroundImage: 'url(/tacos.jpg)',
  },
  {
    id: 'pizzas',
    label: 'Pizzas',
    emoji: '🍕',
    backgroundImage: 'url(/pizzas-2.jpeg)',
  },
  {
    id: 'ceviches',
    label: 'Ceviches',
    emoji: '🍤',
    backgroundImage: 'url(/ceviches.jpeg)',
  },
];

export default function CategoriesPage() {
  return (
    <main className={styles.categoriesContainer}>
      <h1 className={styles.pageTitle}>Menú</h1>
      <div className={styles.categoriesGrid}>
        {CATEGORIES.map((category) => (
          <Link
            key={category.id}
            href={`/menu/${category.id}`}
            className={styles.categoryCard}
            style={{ backgroundImage: category.backgroundImage }}
          >
            <div className={styles.categoryLabel}>{category.label}</div>
          </Link>
        ))}
      </div>
    </main>
  );
}
