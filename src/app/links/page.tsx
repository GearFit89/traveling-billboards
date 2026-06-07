

import { Navigation } from '@/components/navigation/Navigation';
import { getAllSections, getSectionById , getLinkById} from '@/lib/actions';
import { linksPageContent } from '@/lib/content';
import { LinkCard } from '@/components/links/LinkCard';
import { SectionCard } from '@/components/links/SectionCard';
import { LinkDetail } from '@/components/links/LinkDetail';
import { SectionView } from '@/components/links/SectionView';
import { ErrorPageLinks } from '@/components/links/ErrorPageLinks';
import { LinksFooter } from '@/components/links/LinksFooter';
import "@/styles/globals.css";
import styles from '@/styles/Links.module.css';
import { Suspense } from 'react';
import Spinner from '@/components/fallbacks/Spinner';
  
export default async  function LinksPage({searchParams}: {searchParams: Promise<{[key: string]: string  | undefined }> } ) {
  const queryParams = await searchParams;
  const sectionId = queryParams.section;
  const linkId = queryParams.link;
  const content = linksPageContent;
const fallback = <Spinner />
  // Link detail view
  if (sectionId && linkId) {
    return <Suspense fallback={fallback}><LinkDetailView sectionId={sectionId} linkId={linkId} content={content} /></Suspense> ;
  }

  // Section view
  if (sectionId) {
    return  <Suspense fallback={fallback}><SectionDetailView sectionId={sectionId} content={content} /></Suspense> ;
  }

  // Default view - all sections
  return  <Suspense fallback={fallback}> <AllSectionsView content={content} /></Suspense>;
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
    const {data:link} = await getLinkById(linkId);
  
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
            sectionName={sectionId}
            visitSiteText={content.visitSiteText}
            backToAllText={content.backToAllText}
            pageTitle={content.title}
          />
        </main>
        {/* <LinksFooter /> */}
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
    const {data:section} = await getSectionById(sectionId);
    
    return (
      <div className={styles.container}>
        <Navigation />
        <main className={styles.main}>
          <SectionView
            sectionId={sectionId}
            sectionName={section.name}
            sectionDescription={section.description || ''}
            sectionIcon={section.icon_key || section.iconKey || 'link'}
            links={section.links|| []}
            pageTitle={content.title}
            backToAllText={content.backToAllText}
          />
        </main>
        {/* <LinksFooter /> */}
      </div>
    );
  } catch {
    return <ErrorPageLinks message="Section not found" />;
  }
}

async function AllSectionsView({ content }: { content: any }) {
  try {
    const { data:sections } = await getAllSections();

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
        {/* <LinksFooter /> */}
      </div>
    );
  } catch(e) {
    return <ErrorPageLinks message="Failed to load sections" />;
  }
};
