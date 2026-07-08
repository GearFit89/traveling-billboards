"use client";

import { useCallback, useMemo, useState } from 'react';
import { SearchIcon, X } from 'lucide-react';
import { LinkCard } from '@/components/links/LinkCard';
import { LinkData } from '@/types';
import styles from '@/styles/Search.module.css';
import SearchBar from '../search/SearchBar';
import SearchContextWrapper from '../search/SearchWrapper';
import { useSearchContext } from '@/context/search-context';

export function LinkSearchResults({ sectionId }: { sectionId: string }) {
  type SearchResultItem = { id: string; title: string; description: string; section?: string };
  const { results } = useSearchContext<SearchResultItem>();

  if (!results || results.length === 0) {
    return <div className={styles.noResults}>No results found.</div>;
  }

  return (
    <div className={styles.searchResults}>
      {results.map((result) => (
      
          <LinkCard key={result.id} id={result.id} title={result.title} description={result.description} sectionId={result.section ?? sectionId} />
     
      ))}
    </div>
  );
}


type LinkSearchItem = Pick<LinkData, 'id' | 'title' | 'description'> & { section?: string };

interface LinkSearchProps {
  links: LinkSearchItem[];
  sectionId: string;
}

export default function LinkSearch({ links, sectionId }: LinkSearchProps) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const title = useMemo(() => (sectionId === 'all' ? 'Search all links' : 'Search links in this section'), [sectionId]);
  const description = useMemo(
    () => (sectionId === 'all' ? 'Search every available link across the site.' : 'Open the panel to filter link results by title or description.'),
    [sectionId]
  );

  const togglePanel = useCallback(() => {
    setIsPanelOpen((state) => !state);
  }, []);

  if (links.length === 0) {
    return null;
  }

  return (
    <section className={styles.searchWrapper}>
      <div className={styles.searchHeader}>
        <div className={styles.searchHeaderTitle}>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <button type="button" className={styles.searchToggleButton} onClick={togglePanel} aria-expanded={isPanelOpen} aria-label="Open link search panel">
          <SearchIcon size={16} />
        </button>
      </div>

      {isPanelOpen ? (
        <div className={styles.filterModal} role="dialog" aria-modal="true" aria-label="Link search panel">
          <div className={styles.filterContent}>
            <div className={styles.searchModalHeader}>
              <div>
                <h3>{title}</h3>
                <p>Search by title or description and jump straight to the matching resource.</p>
              </div>
              <button type="button" className={styles.closeButton} onClick={togglePanel} aria-label="Close search panel">
                <X size={18} />
              </button>
            </div>

            <SearchContextWrapper initialData={links} title={sectionId === 'all' ? 'All links' : 'Links'}>
              <SearchBar />
              <LinkSearchResults sectionId={sectionId} />
            </SearchContextWrapper>
          </div>
        </div>
      ) : null}
    </section>
  );
}
