'use client';

import { useSearchParams } from 'next/navigation';
import { Navigation } from '@/components/navigation/Navigation';
import { getAllSections, getSectionById } from '@/lib/actions';
import { linksPageContent } from '@/lib/content';
import { LinkCard } from '@/components/links/LinkCard';
import { SectionCard } from '@/components/links/SectionCard';
import { LinkDetail } from '@/components/links/LinkDetail';
import { SectionView } from '@/components/links/SectionView';
import { ErrorPageLinks } from '@/components/links/ErrorPageLinks';
import { LinksFooter } from '@/components/links/LinksFooter';
import "@/styles/globals.css";
import styles from '@/styles/Links.module.css';


export default function LinksPage() {
  const searchParams = useSearchParams();
  const sectionId = searchParams.get('section');
  const linkId = searchParams.get('link');
  const content = linksPageContent;

  // Link detail view
  if (sectionId && linkId) {
    return <LinkDetailView sectionId={sectionId} linkId={linkId} content={content} />;
  }

  // Section view
  if (sectionId) {
    return <SectionDetailView sectionId={sectionId} content={content} />;
  }

  // Default view - all sections
  return <AllSectionsView content={content} />;
}

async function LinkDetailView({
  sectionId,
  linkId,
  content,
}: {
  sectionId: string;
  linkId: string;
  content: any;
}) {
  try {
    const section = await getSectionById(sectionId);
    const link = section.links?.find((l) => l.id === linkId);

    if (!link) {
      return <ErrorPageLinks message="Link not found" />;
    }

    return (
      <div className={styles.container}>
        <Navigation />
        <main className={styles.main}>
          <LinkDetail
            title={link.title}
            description={link.discription}
            url={link.link}
            sectionId={sectionId}
            sectionName={section.name}
            visitSiteText={content.visitSiteText}
            backToAllText={content.backToAllText}
            pageTitle={content.title}
          />
        </main>
        <LinksFooter />
      </div>
    );
  } catch {
    return <ErrorPageLinks message="Link not found" />;
  }
}

async function SectionDetailView({
  sectionId,
  content,
}: {
  sectionId: string;
  content: any;
}) {
  try {
    const section = await getSectionById(sectionId);

    return (
      <div className={styles.container}>
        <Navigation />
        <main className={styles.main}>
          <SectionView
            sectionId={sectionId}
            sectionName={section.name}
            sectionDescription={section.description || ''}
            sectionIcon={section.icon_key || section.iconKey || 'link'}
            links={section.links || []}
            pageTitle={content.title}
            backToAllText={content.backToAllText}
          />
        </main>
        <LinksFooter />
      </div>
    );
  } catch {
    return <ErrorPageLinks message="Section not found" />;
  }
}

async function AllSectionsView({ content }: { content: any }) {
  try {
    const sections = await getAllSections();

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
              <SectionCard
                key={section.id}
                id={section.id}
                name={section.name}
                description={section.description || ''}
                iconKey={section.icon_key || section.iconKey || 'link'}
                linkCount={section.links?.length || 0}
              />
            ))}
          </div>
        </main>
        <LinksFooter />
      </div>
    );
  } catch {
    return <ErrorPageLinks message="Failed to load sections" />;
  }
