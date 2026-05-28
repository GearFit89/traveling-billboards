import Link from 'next/link';
import { Navigation } from '@/components/navigation/Navigation';
import { getAllSections } from '@/lib/mock-db';
import { siteContent, linksPageContent } from '@/lib/content';
import { Icon } from '@/lib/icons';
import styles from './Links.module.css';

export default function LinksPage() {
  const sections = getAllSections();
  const content = linksPageContent;

  return (
    <div className={styles.container}>
      <Navigation />

      <main className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            {content.title}<span className={styles.titleAccent}>.</span>
          </h1>
          <p className={styles.subtitle}>{content.subtitle}</p>
        </header>

        <div className={styles.sectionsGrid}>
          {sections.map((section) => (
            <Link
              key={section.id}
              href={`/links/${section.id}`}
              className={styles.sectionCard}
            >
              <div className={styles.sectionIcon}>
                <Icon name={section.iconKey} size={24} />
              </div>
              <h2 className={styles.sectionName}>{section.name}</h2>
              <p className={styles.sectionDescription}>{section.description}</p>
              <span className={styles.sectionCount}>
                {section.links.length} link{section.links.length !== 1 ? 's' : ''}
              </span>
            </Link>
          ))}
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
