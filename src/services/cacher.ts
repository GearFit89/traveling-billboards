import * as v from 'valibot';
// Fixed the typo in stable_cache
import { stableCache, Options } from './stableCache'; 
import Console from '@/utils/console';
import { AppError } from '@/utils/error';
import { ReturnData } from '@/types';
// custom console keeps thigns clean 
const console = new Console("schema_validation");
interface QueryFnRetrun<T> {
  results: T

}
export const getCacheAndValidation = <S extends v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>>(
  schema: S
) => {
  // This function returns another function that will handle caching and validation

  return async <T>(
    queryBuilder: () => Promise<T | unknown>, // the type of the data returned by the query builder can be anything, we will validate it against the schema
    cacheKey: string,
    options?: Options,
    getDevData?:  Function
  ): Promise<ReturnData<v.InferOutput<S>>> => {
    try {
      let data;
      // Make sure the function exist and we in development 
      if ( process.env.NODE_ENV === "development" && getDevData){
        console.log("dev mode enabled")
        data =  await getDevData();
        console.log("dev data got. ", data);
      }else {
        console.log("using stable cache");
        data = stableCache(queryBuilder, cacheKey,  options)
      }
     
      if(!data){
        console.log("data not found")
        return {success:false, error:"no data", data:{}}
      }
      // safeParseAsync returns an object with { success: true, output: ... } 
      // or { success: false, issues: ... }
      const parsed =  v.safeParse(schema, data);


      if (parsed.success) {
        
        return { success: true, data: parsed.output };
      } else {
        
        console.error('Validation failed:', JSON.stringify(parsed.issues));
        return { success: false, error: 'Validation failed' , data:{}};
      }
    } catch (error) {
      console.error('Error fetching or parsing cached data:', error);
      return {data:{}, success: false, error: 'Error fetching or parsing cached data' };
    }
  };
};