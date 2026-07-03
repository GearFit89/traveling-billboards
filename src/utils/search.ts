import { createColumnSchema, getEnvContext } from '@/lib/utils';
import { Table } from '@/types';
import { SORT } from "@/const"
import Fuse, { Expression, FuseResult, FuseSearchOptions, IFuseOptions } from 'fuse.js';
import * as v from "valibot"





export class SearchDB<T, > {
    private table : Table;
    private options: IFuseOptions<T>={}
    private data: T[]=[];
    private query : string;
    private bindings: (string|number)[]=[];
    private objectSchema: v.ObjectSchema<any, undefined>;


    constructor(   objectSchema: v.ObjectSchema<any, undefined>, SQLTable:Table,  options: IFuseOptions<T> = {}) {
       
         this.table = SQLTable;
      
         this.query = `SELECT * FROM ${this.table} WHERE 1=1`; // makes it easy to add AND statments
        this.objectSchema = objectSchema;

         this.options = {
            shouldSort: false, // Default: Let SQLite handle the sorting
            threshold: 0.3,    // Optional: Good default fuzzy matching sensitivity (0.0 = perfect match, 1.0 = match anything)
            ...options         // Merges custom overrides passed into 'new SearchDB()'
         };

    }

  filter(
 
    filters: Record<string, (string | number)[]|"*">
  ) {
    //  Generate the column schema dynamically
    const schema = createColumnSchema<any>(this.objectSchema);

    //  Reduce the filters object to append to this.query
    this.query = Object.entries(filters).reduce((sqlAccumulator, [col, values]) => {
      
      // Validate the column name. 
      // If 'col' isn't in the schema, v.parse automatically throws a ValibotError
      try {
        v.parse(schema, col);
      } catch (error) {
        const errorMsg = `[SQL Filter Error]: "${col}" is not a known column in this schema.`
        console.error(errorMsg);
        
        //throw the error to break the chain
        throw new Error(errorMsg);
      }
      if(values === "*" || (Array.isArray(values) && values.length === 0)){
        // If the filter is a wildcard or an empty array, skip adding it to the query
        return sqlAccumulator;
      }
      // Safely push the value to the D1 prepare bindings
      values.forEach((val) => {
        this.bindings.push(val);
      });
      
      return `${sqlAccumulator} AND ${col} IN (${values.map(() => '?').join(', ')})`;
      
    }, this.query); // 'this.query' acts as the initial value for the string reduction

    return this; // Return 'this' for method chaining
  }
  alphaSort(col:string, isASC: boolean = true) {
    this.query += `ORDER BY ${col} COLLATE NOCASE ${isASC ? SORT.ASC : SORT.DESC} `;

    return this;
  }
  numSort(col:string, isASC: boolean = true){
    this.query += `ORDER BY CAST (${col} AS INT) ${isASC ? SORT.ASC : SORT.DESC} `; // casts to int, in case its text

    return this;
  }

  async runQuery(){
        const env = getEnvContext();

        // ";" added to avoid errors
        const data = await   env.D1.prepare(this.query + ';'). bind(this.bindings).all<T>();
        this.data = data.results;

      return this; //returns this for chaining
    }
    
  async queryAndSearch(query: string | Expression, options?: FuseSearchOptions){
        //run both together, for cleaner code
     await    this.runQuery();
     await  this.search(query, options );

       return this;

    }
   search(query: string | Expression, options?: FuseSearchOptions): FuseResult<T>[] {

        // lightwieght search library
        const searcher = new Fuse<T>(this.data, this.options);

       return  searcher.search(query, options)
        

      
        
    }
 
        
   getData () {
    return this.data;
   }
    

}

export default SearchDB;