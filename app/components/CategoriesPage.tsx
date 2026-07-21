'use client';

import Link from 'next/link';
import styles from './MenuPage.module.css';

const CATEGORIES = [
  {
    id: 'tacos',
    label: 'Tacos',
    emoji: '🌮',
    backgroundImage: 'url(https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=1200&h=400&fit=crop)'
  },
  {
    id: 'pizzas',
    label: 'Pizzas',
    emoji: '🍕',
    backgroundImage: 'url(https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=1200&h=400&fit=crop)'
  },
  {
    id: 'ceviches',
    label: 'Ceviches',
    emoji: '🍤',
    backgroundImage: 'url(https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=400&fit=crop)'
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
            <div className={styles.categoryEmoji}>{category.emoji}</div>
            <div className={styles.categoryLabel}>{category.label}</div>
          </Link>
        ))}
      </div>
    </main>
  );
}
