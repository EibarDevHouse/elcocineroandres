import { getReviews } from '@/app/lib/reviews';
import Header from '@/app/components/Header';
import MenuPage from '@/app/components/MenuPage';
import Navigation from '@/app/components/Navigation';
import styles from '@/app/components/ElCocineroAndres.module.css';
import type { DishCategory } from '@/app/lib/dishes';
import type { Metadata } from 'next';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

const categoryNames: Record<DishCategory, string> = {
  tacos: 'Tacos',
  pizzas: 'Pizzas',
  ceviches: 'Ceviches',
};

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const categoryName =
    categoryNames[resolvedParams.category as DishCategory] || 'Menú';
  return {
    title: `${categoryName} - El Cocinero Andrés`,
    description: `Explora nuestros ${categoryName.toLowerCase()} saludables`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  const reviews = await getReviews();
  const category = resolvedParams.category as DishCategory;

  return (
    <div className={styles.container}>
      <Header />
      <MenuPage reviews={reviews} category={category} />
      <Navigation />
    </div>
  );
}
