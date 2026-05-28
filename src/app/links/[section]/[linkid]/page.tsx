import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Navigation } from '@/components/navigation/Navigation';
import { getSectionById, getLinkById, getAllSections } from '@/lib/actions';
import { siteContent, linksPageContent } from '@/lib/content';
import { Icon } from '@/lib/icons';
import styles from '../../Links.module.css';
 
export const runtime = 'edge';
export const dynamicParams = false; // Disable dynamic routes for better caching
export  async function generateStaticParams() {
  const sections =  await getAllSections();
  const params: { section: string; linkid: string }[] = [];

  sections.forEach((section) => {
    section.links.forEach((link) => {
      params.push({
        section: section.id,
        linkid: link.id,
      });
    });
  });

  return params;
}

export default async function LinkDetailPage({
  params,
}: {
  params: Promise<{ section: string; linkid: string }>;
}) {
  const { section: sectionId, linkid: linkId } = await params;
  const section = getSectionById(sectionId);
  const link = getLinkById(sectionId, linkId);
  const content = linksPageContent;

  if (!section || !link) {
    notFound();
  }

  return (
    <div className={styles.container}>
      <Navigation />

      <main className={styles.main}>
        <Link href={`/links/${sectionId}`} className={styles.backLink}>
          <Icon name="arrowLeft" size={16} className={styles.backIcon} />
          Back to {section.name}
        </Link>

        <header className={styles.header}>
          <nav className={styles.breadcrumb}>
            <Link href="/links" className={styles.breadcrumbLink}>{content.title}</Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <Link href={`/links/${sectionId}`} className={styles.breadcrumbLink}>{section.name}</Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span className={styles.breadcrumbCurrent}>{link.title}</span>
          </nav>
        </header>

        <div className={styles.linkDetail}>
          <div className={styles.linkDetailCard}>
            <div className={styles.linkDetailIcon}>
              <Icon name="externalLink" size={28} className={styles.linkDetailIconSvg} />
            </div>
            <h1 className={styles.linkDetailTitle}>{link.title}</h1>
            <p className={styles.linkDetailDescription}>{link.description}</p>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkDetailBtn}
            >
              {content.visitSiteText}
              <Icon name="externalLink" size={16} />
            </a>
            <div className={styles.linkDetailMeta}>
              <span className={styles.linkDetailUrl}>{link.url}</span>
            </div>
          </div>
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
