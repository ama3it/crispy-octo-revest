import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <h1>Welcome to Revest</h1>
        <p>Experience the premium dashboard.</p>
        <Link href="/signup" className={styles.button}>
          Get Started
        </Link>
      </div>
    </main>
  );
}
