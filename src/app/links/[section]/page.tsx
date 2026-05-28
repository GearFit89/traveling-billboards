import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Navigation } from '@/components/navigation/Navigation';
import { getSectionById, getAllSections } from '@/lib/mock-db';
import { siteContent, linksPageContent } from '@/lib/content';
import { Icon } from '@/lib/icons';
import styles from '../Links.module.css';

export function generateStaticParams() {
  const sections = await  getAllSections();
  return sections.map((section) => ({
    section: section.id,
  }));
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section: sectionId } = await params;
  const section = getSectionById(sectionId);
  const content = linksPageContent;

  if (!section) {
    notFound();
  }

  return (
    <div className={styles.container}>
      <Navigation />

      <main className={styles.main}>
        <Link href="/links" className={styles.backLink}>
          <Icon name="arrowLeft" size={16} className={styles.backIcon} />
          {content.backToAllText}
        </Link>

        <header className={styles.header}>
          <nav className={styles.breadcrumb}>
            <Link href="/links" className={styles.breadcrumbLink}>{content.title}</Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span className={styles.breadcrumbCurrent}>{section.name}</span>
          </nav>
          <h1 className={styles.title}>
            <span className={styles.sectionIcon} style={{ display: 'inline-flex', marginRight: '0.5rem', verticalAlign: 'middle' }}>
              <Icon name={section.iconKey} size={32} />
            </span>
            {section.name}
          </h1>
          <p className={styles.subtitle}>{section.description}</p>
        </header>

        <div className={styles.linksList}>
          {section.links.map((link) => (
            <Link
              key={link.id}
              href={`/links/${sectionId}/${link.id}`}
              className={styles.linkCard}
            >
              <div className={styles.linkContent}>
                <h2 className={styles.linkTitle}>{link.title}</h2>
                <p className={styles.linkDescription}>{link.description}</p>
              </div>
              <Icon name="arrowRight" size={20} className={styles.linkArrow} />
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
