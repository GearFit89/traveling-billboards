'use client';

import { siteContent } from '@/lib/content';
import styles from '@/styles/Links.module.css';

export function LinksFooter() {
  return (
    <footer className={styles.footer}>
      <p className={styles.footerText}>
        {siteContent.siteName.split(' ')[0]}
        <span className={styles.footerAccent}>.</span>{' '}
        {siteContent.siteName.split(' ').slice(1).join(' ')} — {siteContent.footerText}
      </p>
    </footer>
  );
}
