import { getReviews } from './lib/reviews';
import Header from './components/Header';
import HomePage from './components/HomePage';
import Navigation from './components/Navigation';
import styles from './components/ElCocineroAndres.module.css';

export const metadata = {
  title: 'Inicio - El Cocinero Andrés',
  description: 'Sabor que se apodera de tus sentidos',
};

export default async function Home() {
  const reviews = await getReviews();

  return (
    <div className={styles.container}>
      <Header />
      <HomePage reviews={reviews} />
      <Navigation />
    </div>
  );
}
