

"use client"


import { ChangeEvent, useEffect, useRef, useState } from "react";
import Button from "@/client/Button";
import { useSearchContext } from "@/context/search-context";
import { Search } from "lucide-react";
import styles from "@/styles/Search.module.css";

export default function SearchBar() {
  const [query, setQuery] = useState<string>("");
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeout = useRef<number | null>(null);

  const { searcher, setResults } = useSearchContext();

  useEffect(() => {
    return () => {
      if (searchTimeout.current) {
        window.clearTimeout(searchTimeout.current);
      }
    };
  }, []);

  const runSearch = (value: string) => {
    setQuery(value);
    setIsSearching(true);

    if (searcher) {
      searcher.search(value);
      const data = searcher.getData();
      setResults?.([...data]);
    }

    if (searchTimeout.current) {
      window.clearTimeout(searchTimeout.current);
    }

    searchTimeout.current = window.setTimeout(() => {
      setIsSearching(false);
    }, 250);
  };

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    runSearch(event.target.value);
  }

  function handleSearch(): void {
    runSearch(query);
  }

  // Handle pressing "Enter" inside the input
  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === "Enter") {
      event.preventDefault();
      runSearch(query);
    }
  }

  return (
    <div className={styles.searchContainer} data-searching={isSearching ? "true" : "false"}>
      <input
        type="text"
        className={styles.searchInput}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={query}
        placeholder="Search..."
        aria-label="Search"
      />
      <Button onClick={handleSearch} className={styles.searchButton} aria-label="Search">
        <Search size={16} />
      </Button>
      <span className={styles.searchStatus}>{isSearching ? "Searching..." : "Results update automatically"}</span>
    </div>
  );
}