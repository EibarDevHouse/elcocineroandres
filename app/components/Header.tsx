import styles from './Layout.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <img width={200} src="/logo-green.png" />
      {/* <div className={styles.headerTitle}>El Cocinero Andrés</div> */}
    </header>
  );
}
