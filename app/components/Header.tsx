import Image from 'next/image';
import styles from './Layout.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <Image
        src="/logo-green.png"
        alt="El Cocinero Andrés"
        width={200}
        height={64}
        priority
        quality={85}
      />
      {/* <div className={styles.headerTitle}>El Cocinero Andrés</div> */}
    </header>
  );
}
