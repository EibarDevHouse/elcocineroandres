import Header from '@/app/components/Header';
import CategoriesPage from '@/app/components/CategoriesPage';
import Navigation from '@/app/components/Navigation';
import styles from '@/app/components/ElCocineroAndres.module.css';

export const metadata = {
  title: 'Menú - El Cocinero Andrés',
  description: 'Explora nuestro menú de comidas saludables',
};

export default function Menu() {
  return (
    <div className={styles.container}>
      <Header />
      <CategoriesPage />
      <Navigation />
    </div>
  );
}
