'use client';

import Link from 'next/link';
import { Icon } from '@/lib/icons';
import styles from '@/styles/Links.module.css';

interface LinkCardProps {
  id: string;
  title: string;
  description: string;
  sectionId: string;
}

export function LinkCard({ id, title, description, sectionId }: LinkCardProps) {
  return (
    <Link
      href={`/links?section=${sectionId}&link=${id}`}
      className={styles.linkCard}
    >
      <div className={styles.linkContent}>
        <h2 className={styles.linkTitle}>{title}</h2>
        <p className={styles.linkDescription}>{description}</p>
      </div>
      <Icon name="arrowRight" size={20} className={styles.linkArrow} />
    </Link>
  );
}
