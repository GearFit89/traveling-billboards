import * as v from 'valibot';
// Fixed the typo in stable_cache
import  stableCache, {Options } from './stableCache'; 
import Console from '@/utils/console';
import { AppError } from '@/utils/error';
import { ReturnData } from '@/types';
import { getEnvContext, getIsBuildPharse } from '@/lib/utils';


// custom console keeps thigns clean 
const console = new Console("schema_validation");


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
      let data:  v.InferOutput<S>;
      // Make sure the function exist and we in development 
      if ( false ){
        console.log("dev mode enabled")
        // data =  await getDevData();
        console.log("dev data got. ", data);
      }else {

        

        // 1. Check if we are currently building the app
  const isBuildPhase = getIsBuildPharse(); 

  if (isBuildPhase) {
    console.log("Build phase detected. Skipping D1 execution.");
    // Return empty fallback data so the build succeeds
    return { success: true, data: [] as unknown as v.InferOutput<S> };
  }
        
        const vailationFn = async ()=>{
           const data = await  queryBuilder();

            if(!data){
        console.log("data not found")
       throw new Error("data not found")
       
            
      }
        return  v.parse<S>(schema, data);
  

        }
        //type json since the sql lite data is array of objects
       const  cacheFn = stableCache(vailationFn, cacheKey,  {getOptions:{type:"json"}, ...options}) 
        data = await cacheFn();
      
      }
     


     
        
        return { success: true, data};
      
      
    } catch (error) {
      console.error('Error fetching or parsing cached data:', error);
      return {data:{}, success: false, error: 'Error fetching or parsing cached data' };
    }
  };
};


