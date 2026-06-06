'use client';

import Link from 'next/link';
import { Icon } from '@/lib/icons';
import { LinkCard } from './LinkCard';
import styles from '@/styles/Links.module.css';

interface Link {
  id: string;
  title: string;
  discription: string;
}

interface SectionViewProps {
  sectionId: string;
  sectionName: string;
  sectionDescription: string;
  sectionIcon: string;
  links: Link[];
  pageTitle: string;
  backToAllText: string;
}

export function SectionView({
  sectionId,
  sectionName,
  sectionDescription,
  sectionIcon,
  links,
  pageTitle,
  backToAllText,
}: SectionViewProps) {
  return (
    <>
      <Link href="/links" className={styles.backLink}>
        <Icon name="arrowLeft" size={16} className={styles.backIcon} />
        {backToAllText}
      </Link>

      <header className={styles.header}>
        <nav className={styles.breadcrumb}>
          <Link href="/links" className={styles.breadcrumbLink}>
            {pageTitle}
          </Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbCurrent}>{sectionName}</span>
        </nav>
        <h1 className={styles.title}>
          <span
            className={styles.sectionIcon}
            style={{ display: 'inline-flex', marginRight: '0.5rem', verticalAlign: 'middle' }}
          >
            <Icon name={sectionIcon} size={32} />
          </span>
          {sectionName}
        </h1>
        <p className={styles.subtitle}>{sectionDescription}</p>
      </header>

      <div className={styles.linksList}>
        {links.map((link) => (
          <LinkCard
            key={link.id}
            id={link.id}
            title={link.title}
            description={link.discription}
            sectionId={sectionId}
          />
        ))}
      </div>
    </>
  );
}
