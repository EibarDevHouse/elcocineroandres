import { getReviews } from '@/app/lib/reviews';
import Header from '@/app/components/Header';
import ReviewsPage from '@/app/components/ReviewsPage';
import Navigation from '@/app/components/Navigation';
import styles from '@/app/components/ElCocineroAndres.module.css';

export const metadata = {
  title: 'Reviews - El Cocinero Andrés',
  description: 'Lee las opiniones de nuestros clientes',
};

export default async function Reviews() {
  const initialReviews = await getReviews();

  return (
    <div className={styles.container}>
      <Header />
      <ReviewsPage initialReviews={initialReviews} />
      <Navigation />
    </div>
  );
}
