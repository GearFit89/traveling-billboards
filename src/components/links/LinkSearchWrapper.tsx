"use client";


import { useState } from "react";
import styles from "@/styles/Links.module.css";
import { Icon } from "@/lib/icons";
import { LinkData } from "@/types";
import { getLinkSearchResults } from "@/lib/server-actions";
import { LinkFilters } from "@/types";
import { useContext } from "react";
import Button from "@/client/Button";
import { SearchIcon } from "lucide-react";
import { LinkCard } from "@/components/links/LinkCard";







function LinkSearchPanel({filters, allSectionNames}: {filters: LinkFilters, allSectionNames: string[]}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<LinkData[]>([]);
  const [isSearching, setIsSearching] = useState(false);
 

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSearching(true);
    try {
      const results = await getLinkSearchResults({ section: filters.sections }, searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error("Error searching links:", error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className={styles.searchWrapper}>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search links..."
          className={styles.searchInput}
        />
        <Button type="submit" className={styles.searchButton}>
        <SearchIcon size={16} className={styles.searchIcon} />
        </Button>
      </form>

      {isSearching && <p>Searching...</p>}

      {searchResults.length > 0 && (
        <ul className={styles.searchResults}>
            {searchResults.map((link) => (
                <LinkCard 
                key={link.id} 
                title={link.title} 
                description={link.description}
                sectionId={link.section}
                id={link.id}
                />
            ))}
        </ul>
      )}

     
      {searchResults.length === 0 && searchQuery.trim() === "" && (
        <ul className={styles.searchResults}>
          <li>Enter a search query to find links.</li>
        </ul>
      )}

      {searchResults.length === 0 && searchQuery.trim() !== "" && !isSearching && (
        <ul className={styles.searchResults}>
          <li>No results found for "{searchQuery}".</li>
        </ul>
      )}
      
      
    </div>
  );
}
function Link
export default LinkSearchWrapper;   
