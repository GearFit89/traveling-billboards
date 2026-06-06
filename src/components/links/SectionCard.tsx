'use client';

import Link from 'next/link';
import { Icon } from '@/lib/icons';
import styles from '@/styles/Links.module.css';

interface SectionCardProps {
  id: string;
  name: string;
  description: string;
  iconKey: string;
  linkCount: number;
}

export function SectionCard({ id, name, description, iconKey, linkCount }: SectionCardProps) {
  return (
    <Link href={`/links?section=${id}`} className={styles.sectionCard}>
      <div className={styles.sectionIcon}>
        <Icon name={iconKey} size={24} />
      </div>
      <h2 className={styles.sectionName}>{name}</h2>
      <p className={styles.sectionDescription}>{description}</p>
      <span className={styles.sectionCount}>
        {linkCount} link{linkCount !== 1 ? 's' : ''}
      </span>
    </Link>
  );
}
