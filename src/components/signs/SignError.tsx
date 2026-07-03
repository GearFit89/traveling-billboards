'use client';

import { Navigation } from '@/components/navigation/Navigation';
import { siteContent } from '@/lib/content';
import styles from '@/styles/Links.module.css';

interface ErrorPageProps {
  message: string;
}

export function ErrorPageSigns({ message }: ErrorPageProps) {
  return (
    <div className={styles.container}>
      <Navigation />
      <main className={styles.main}>
        
        <div className={styles.header}>
          <h1>{message}</h1>
          
        </div>
      </main>
     
    </div>
  );
}
