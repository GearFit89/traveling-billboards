'use client';

import { Navigation } from '@/components/navigation/Navigation';
import { siteContent } from '@/lib/content';
import styles from '@/styles/Links.module.css';

interface ErrorPageProps {
  message: string;
}

export function ErrorPageLinks({ message }: ErrorPageProps) {
  return (
    <div className={styles.container}>
      <Navigation />
      <main className={styles.main}>
        <div className={styles.header}>
          <h1>{message}</h1>
        </div>
      </main>
      <footer className={styles.footer}>
        <p className={styles.footerText}>
          {siteContent.siteName.split(' ')[0]}
          <span className={styles.footerAccent}>.</span>{' '}
          {siteContent.siteName.split(' ').slice(1).join(' ')} — {siteContent.footerText}
        </p>
      </footer>
    </div>
  );
}
