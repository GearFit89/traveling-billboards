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
      <div className="flex items-center justify-between mb-4">
  <Link href="/links" className={styles.backLink}>
    <Icon name="arrowLeft" size={16} className={styles.backIcon} />
    {backToAllText}
  </Link>
  
  <Link href="/links" className={styles.backLink}>
  <span className={styles.sectionIcon}>
    <Icon name={sectionIcon as IconKey} size={32}  />
  </span>
  </Link>
</div>

       <header className={styles.header}>
          <h1 className={`${styles.title} ${styles.sectionTitle}`}>
            {sectionName}
          
          </h1>
          <p className={styles.subtitle}>{sectionDescription}</p>
          <div className={styles.linksHeaderSearch}>
           
            
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
