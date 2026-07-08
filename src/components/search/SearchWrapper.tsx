"use client"

import { getSearchContext } from "@/context/search-context";
import { Table } from "@/types";
import SearchDB from "@/services/search";
import { useEffect, useMemo, useState } from "react";
import ClientSearchDB from "@/lib/search-client";

// The search wrapper that uses context to share the global instance of SearchDB for the search system
export default function SearchContextWrapper<T extends Record<string, any>>({
  initialData,
  children,
  title,
}: {
  initialData: T[];
  children: React.ReactNode;
  title: string;
}) {
  const [results, setResults] = useState<T[]>(initialData);

  useEffect(() => {
    setResults(initialData);
  }, [initialData]);

  const SearchContext = getSearchContext<T>();
  // caches the searcher instance so it doesn't get recreated on every render.
  const searcher = useMemo(
    () =>
      new ClientSearchDB<T>(initialData, {
        threshold: 0.3,
        keys: [['title', 'description', 'section', 'link']],
      }),
    [initialData]
  );

  return (
    <SearchContext.Provider value={{ searcher, title, results, setResults }}>
      {children}
    </SearchContext.Provider>
  );
}

