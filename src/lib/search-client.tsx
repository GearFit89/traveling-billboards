import { createColumnSchema, getEnvContext } from '@/lib/utils';
import { Table } from '@/types';
import { SORT } from "@/const"
import Fuse, { Expression, FuseResult, FuseSearchOptions, IFuseOptions } from 'fuse.js';
import * as v from "valibot"




 export type FilterValue= (any[]|(string|number|null))

export class ClientSearchDB<T extends Record<string, any>> {
 
   private initialData: T[]; // Keep a copy of the original dataset
    private data: T[];        // Holds the currently filtered/sorted dataset
    private options: IFuseOptions<T> = {};
   

    constructor(initialData: T[], options: IFuseOptions<T> = {}) {
        this.initialData = [...initialData];
        this.data = [...initialData];
       

        this.options = {
            shouldSort: false, // Let our manual sort functions handle ordering if desired
            threshold: 0.3,
            keys:['title', 'description', 'section', 'link'],
            ...options
        };
        console.log("options", options)
    }
   
  filter( filters: Partial<Record<keyof T, FilterValue>>,
  isEveryFilter: boolean = true

  ) {
    

    //  Reduce the filters object to append to this.query
    this.data = this.data.filter((item) => {

        //switch between every and some based on isEveryFilter
        const method = isEveryFilter ? "every" : "some";

      return Object.entries(filters)[method](([col, value]) => {

        //cast the types to get perfect type checking
        const typedCol = col as keyof T;
        const typedValue = value as FilterValue
        const itemToCheck = item[typedCol];

        if(!Array.isArray(typedValue)){
            //if not array check for direct equal 
            return itemToCheck === typedValue
        }
        if (!typedValue || typedValue.length === 0) {
          return true; // No filter applied for this column
        }
        
        return typedValue.includes(itemToCheck);
      });
    });
    return this; // Return 'this' for method chaining
  }
  alphaSort(keyToSort:string, isASC: boolean = true) {
    this.data.sort((a, b)=> {

        const keyA = String(a[keyToSort] ?? "") ;
        const keyB = String(b[keyToSort] ?? "");

        const comparison = keyA.localeCompare(keyB, undefined, {sensitivity: "base"})
        
        
      //check to see if alphaet compar is good and switch order
        return  isASC ? comparison : -comparison;


        

    })
    return this;
  }
   numSort(keyToSort:string, isASC: boolean = true) {
    //sorts based on numeric order, ASC and DSC based on isASC
    this.data.sort((a, b)=> isASC ? a[keyToSort] - b[keyToSort] : b[keyToSort] - a[keyToSort]);
    return this;
  }


   search(query: string | Expression, options?: FuseSearchOptions): FuseResult<T>[] {
     console.log("options4", this.options)
        // lightwieght search library
        const searcher = new Fuse<T>(this.initialData,{
            threshold: 0.3,
              keys:['title', 'description', 'section', 'link']
        });

        const results = searcher.search(query);

        console.log(`data ${JSON.stringify(this.data)} : ${JSON.stringify(this.initialData)}`)
        console.log(`\n results :${results}`);
        if (!query || (typeof query === 'string' && query.trim().length === 0)) {
            this.data = [...this.initialData];
            return [];
        }

        this.data = results.map((result) => result.item);
        return results;
    }
 
        
   getData (): T[] {
    return [...this.data]
   }
    

}

export default ClientSearchDB;