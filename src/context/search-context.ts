"use client";

import { createContext, useContext, type Context, type Dispatch, type SetStateAction } from 'react';
import ClientSearchDB from '@/lib/search-client';

type SearchContextValue<T extends Record<string, any>> = {
  searcher?: ClientSearchDB<T>;
  title?: string;
  results?: T[];
  setResults?: Dispatch<SetStateAction<T[]>>;
};

const SearchContext = createContext<SearchContextValue<any>>({});

export function getSearchContext<T extends Record<string, any>>() {
  return SearchContext as Context<SearchContextValue<T>>;
}

export function useSearchContext<T extends Record<string, any>>() {
  return useContext(getSearchContext<T>());
}


