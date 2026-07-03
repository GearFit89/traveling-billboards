"use client"


import { LinkFilters, Table } from "@/types";
import { useContext, createContext, useState } from "react";
import SearchDB from "@/utils/search"

interface ISearchContext<T> {
  seacher?: SearchDB<T>
}
export function getSearchContext <T> (){
  
  const SearchContext = createContext< { searcher?: SearchDB<T> } >({});

  return  SearchContext


}

export function useSearchContext<T>() {

    try {

   return useContext(getSearchContext<T>());

    }catch(e){

      throw new Error("Cannot use context please put in the correct context.")
    }
  }


