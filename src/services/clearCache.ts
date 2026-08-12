import { getEnvContext } from "@/lib/utils";
import { R2Bucket } from "@cloudflare/workers-types";
import { ListRestart } from "lucide-react";

export default async function clearCache() {
  try {
    const { NEXT_INC_CACHE_R2_BUCKET: r2Cache } = getEnvContext() as { NEXT_INC_CACHE_R2_BUCKET: R2Bucket };

   let isRunning = true;
   let cursor: string | undefined = undefined;

   do {

    // Add the cursor to keep track of results 
   const listResults = await r2Cache.list({
        prefix: "incremental-cache/",
        cursor,
      });
       const objectsToDelete = listResults.objects.map(obj=> obj.key);

       if(objectsToDelete.length > 0){
        r2Cache.delete(objectsToDelete)
       }

       isRunning = listResults.truncated;

    
       cursor = listResults.truncated ? listResults.cursor : undefined;


   }
   
  
   while (isRunning);

    return { success: true };
  } catch (e: any) {
    console.error(`Error with clearing cache: ${e.message}`);
    return {
      error: e.message,
      success: false,
    };
  }
}