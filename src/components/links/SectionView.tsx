'use client';

import Link from 'next/link';
import { Icon, IconKey } from '@/lib/icons';
import { LinkCard } from './LinkCard';

import styles from '@/styles/Links.module.css';

interface Link {
  id: string;
  title: string;
  description: string;
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
          <h1 className={`${styles.title} ${styles.sectionTitle}`}>
            {sectionName}
            <span className={`${styles.sectionIcon} ${styles.sectionTitleIcon}`}>
              <Icon name={sectionIcon as IconKey} size={32} />
            </span>
          </h1>
          <p className={styles.subtitle}>{sectionDescription}</p>
          <div className={styles.linksHeaderSearch}>
           
            <p className={styles.searchHint}>Search this section instantly.</p>
          </div>
        </header>

       

      <div className={styles.linksList}>
        {links.map((link) => (
          <LinkCard
            key={link.id}
            id={link.id}
            title={link.title}
            description={link.description}
            sectionId={sectionId}
          />
        ))}
      </div>
    </>
  );
}
