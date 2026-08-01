

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
import errorHandler from '@/lib/error-handler';
import { ArrowBigDown } from 'lucide-react';
import { LinkSection } from '@/types';
  

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
  content: any;
}) {
  try {
    const {data:link} = await getLinkById(linkId);
  
    if (!link) { 
     errorHandler("Link not found", 404.2)
    }

    return (
      <div className={styles.container}>
      
        <main className={styles.main}>
          <LinkDetail
            title={link.title}
            description={link.description}
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
   errorHandler("Link not found", 404.3)
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
      
        <main className={styles.main}>
        
          <SectionView
            sectionId={sectionId}
            sectionName={section.name}
            sectionDescription={section.description || ''}
            sectionIcon={section.icon_key || "link"}
            links={section.links|| []}
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

async function AllSectionsView({ content }: { content: any }) {
  try {
    const { data:sections } = await getAllSections() as { success: boolean; data: LinkSection[]; error?: string };

    

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
            {sections.map((section) => (
              <SectionCard
                key={section.id}
                id={section.id}
                name={section.name}
                description={section.description || ''}
                iconKey={section.icon_key || 'link'}
                linkCount={section.links?.length || 0}
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
