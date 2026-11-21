


import { getAllSections, getSectionById, getLinkById, getAllLinks} from '@/lib/actions';
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
import errorHandler from '@/lib/error-handler';
  
export function generateStaticParams () {
  return [];
}

// 1. Create a sub-component to handle the dynamic routing based on searchParams
async function LinksContent({ searchParamsPromise }: { searchParamsPromise: Promise<{[key: string]: string | undefined }> }) {
  const queryParams = await searchParamsPromise;
  const sectionId = queryParams.section;
  const linkId = queryParams.link;
  const content = linksPageContent;

  if (sectionId && linkId) {
    return <LinkDetailView sectionId={sectionId} linkId={linkId} content={content} />;
  }

  if (sectionId) {
    return <SectionDetailView sectionId={sectionId} content={content} />;
  }

  return <AllSectionsView content={content} />;
}

// 2. The Main Page remains clean, static, and completely prerenderable!
export default function LinksPage({ searchParams }: { searchParams: Promise<{[key: string]: string | undefined }> }) {
  const fallback = <Spinner />;

  return (
    <>
      {/* You can put global page layouts, headers, or nav bars here to be prerendered instantly */}
      <Suspense fallback={fallback}>
        {/* Pass the unresolved promise down to the suspense boundary */}
        <LinksContent searchParamsPromise={searchParams} />
      </Suspense>
    </>
  );
}


async function LinkDetailView({
  sectionId,
  linkId,
  content,
}: {
  sectionId: string;
  linkId: string;
  content: typeof linksPageContent;
}) {
  try {
    const link = await getLinkById(linkId);

    if (!link.success) {
      throw new Error("Link not found");
    }

    const safeLink = link.data;

    return (
      <div className={styles.container}>
      
        <main className={styles.main}>
          <LinkDetail
            title={safeLink.title}
            description={safeLink.description || ""}
            url={safeLink.link}
            sectionId={sectionId}
            sectionName={sectionId}
            visitSiteText={content.visitSiteText}
            backToAllText={content.backToAllText}
            pageTitle={content.title}
            sectionIcon={safeLink.id}
          />
        </main>
        {/* <LinksFooter /> */}
      </div>
    );
  } catch {
   errorHandler("Link not found", 404.3)
  }
}

async function SectionDetailView({
  sectionId,
  content,
}: {
  sectionId: string;
  content: typeof linksPageContent;
}) {
  try {
    const section = await getSectionById(sectionId);

    if (!section.success) {
      throw new Error("Section not found");
    }

    const safeSection = section.data;
    const links = await getAllLinks();
    if (!links.success) {
      throw new Error(links.error);
    }
    const sectionLinks = links.data.filter((link) =>
      (typeof link.section === "object" ? link.section?.id : link.section) === sectionId
    );

    return (
      <div className={styles.container}>
      
        <main className={styles.main}>
        
          <SectionView
            sectionId={sectionId}
            sectionName={safeSection.name}
            sectionDescription={safeSection.description || ''}
            sectionIcon={safeSection.iconKey || "link"}
            links={sectionLinks}
            pageTitle={content.title}
            backToAllText={content.backToAllText}
          />
        </main>
        {/* <LinksFooter /> */}
      </div>
    );
  } catch {
     errorHandler("Link not found", 404.3);
  }
}

async function AllSectionsView({ content }: { content: typeof linksPageContent }) {
  try {
    const sections = await getAllSections();
    if (!sections.success) {
      throw new Error(sections.error);
    }
    const links = await getAllLinks();
    if (!links.success) {
      throw new Error(links.error);
    }

    

    return (
      <div className={styles.container}>
        <main className={styles.main}>
         
            <header className={styles.header}>
              <h1 className={styles.title}>
                {content.title}<span className={styles.titleAccent}>.</span>
              </h1>
              <p className={styles.subtitle}>{content.subtitle}</p>
              <div className={styles.linksHeaderSearch}>
              
                <p className={styles.searchHint}>{content.searchHeaderDescription}</p>
              </div>
            </header>

          

          <div className={styles.sectionsGrid}>
            {sections.data.map((section) => (
              <SectionCard
                key={section.id}
                id={section.id}
                name={section.name}
                description={section.description || ''}
                iconKey={section.iconKey || 'link'}
                linkCount={links.data.filter((link) =>
                  (typeof link.section === "object" ? link.section?.id : link.section) === section.id
                ).length}
              />
            ))}
          </div>
        </main>
        {/* <LinksFooter /> */}
      </div>
    );
  } catch(e:  any) {
    // const error = e as Error;
    errorHandler("Failed to load sections. Error: " + (e as Error). message || 'Unknown error', 404);
   
  }
};
