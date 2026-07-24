import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.poweredBy}>
          <span className={styles.poweredByText}>Hecho por</span>
          <Link
            href="https://ladevhouse.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.logoLink}
          >
            <img
              className={styles.logoPlaceholder}
              src="/logo-ladevhouse-large.svg"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
