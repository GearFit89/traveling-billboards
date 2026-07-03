"use client"

import { getSearchContext } from "@/context/search-context";
import { Table } from "@/types"
import SearchDB from "@/utils/search";


//The search wrapper that use context to share the global instantance of SearchDB for the search systean
export default function SearchContextWrapper<T>({ objectSchema, sqlTable, children}: {objectSchema: any, sqlTable: Table, children: React.ReactNode}) {
 const searcher = new SearchDB<T>(objectSchema, sqlTable );

const SearchContext = getSearchContext<T>();

    return (<SearchContext.Provider value={{searcher}}>
        
        {children}
        
        
        </SearchContext.Provider>)
}
