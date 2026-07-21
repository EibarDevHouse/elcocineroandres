'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './Layout.module.css';

export default function Navigation() {
  const pathname = usePathname();

  const col = (path: string) => (pathname === path ? '#233C26' : '#9a988c');

  return null;
  /* return (
    <nav className={styles.nav}>
      <Link href="/menu" className={styles.navItem} style={{ color: col('/menu') }}>
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path>
          <path d="M7 2v20"></path>
          <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"></path>
        </svg>
        <span>Menú</span>
      </Link>
      <Link href="/" className={styles.navItem} style={{ color: col('/') }}>
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
        <span>Inicio</span>
      </Link>
      <Link href="/reviews" className={styles.navItem} style={{ color: col('/reviews') }}>
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
        <span>Reviews</span>
      </Link>
    </nav>
  ); */
}
