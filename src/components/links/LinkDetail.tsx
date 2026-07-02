'use client';

import Link from 'next/link';
import { Icon } from '@/lib/icons';
import styles from '@/styles/Links.module.css';

interface LinkDetailProps {
  title: string;
  description: string;
  url: string;
  sectionId: string;
  sectionName: string;
  visitSiteText: string;
  backToAllText: string;
  pageTitle: string;
}

export function LinkDetail({
  title,
  description,
  url,
  sectionId,
  sectionName,
  visitSiteText,
  backToAllText,
  pageTitle,
}: LinkDetailProps) {
  return (
    <>
      <Link href={`/links?section=${sectionId}`} className={styles.backLink}>
        <Icon name="arrowLeft" size={16} className={styles.backIcon} />
        {backToAllText}
      </Link>

      <header className={styles.header}>
        {/* <nav className={styles.breadcrumb}>
          <Link href="/links" className={styles.breadcrumbLink}>
            {pageTitle}
          </Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <Link
            href={`/links?section=${sectionId}`}
            className={styles.breadcrumbLink}
          >
            {sectionName}
          </Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbCurrent}>{title}</span>
        </nav> */}
      </header>

      <div className={styles.linkDetail}>
        <div className={styles.linkDetailCard}>
          {/* <div className={styles.linkDetailIcon}>
            <Icon name="externalLink" size={28} className={styles.linkDetailIconSvg} />
          </div> */}
          <h1 className={styles.linkDetailTitle}>{title}</h1>
          <p className={styles.linkDetailDescription}>{description}</p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkDetailBtn}
          >
            {visitSiteText}
            <Icon name="externalLink" size={16} />
          </a>
          <div className={styles.linkDetailMeta}>
            <span className={styles.linkDetailUrl}>{url}</span>
          </div>
        </div>
      </div>
    </>
  );
}
