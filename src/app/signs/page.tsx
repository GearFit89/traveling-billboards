
import { getAllSigns} from '@/lib/actions';
import { siteContent, thoughtsPageContent } from '@/lib/content';
import { Icon } from '@/lib/icons';
import { AppError } from '@/utils/error';
import styles from "@/styles/Thoughts.module.css";
import "@/styles/globals.css";

import { Suspense } from 'react';
import { Thoughts } from '@/components/signs/Thought';
import { Spinner }from "@/components/ui/spinner" //scdu ui component for loading state
import { Sign } from '@/components/signs/Sign';
import errorHandler from '@/lib/error-handler';
import { ErrorPageSigns } from '@/components/signs/SignError';
import Link from 'next/link';

// This page will fetch all signs from the database and display them in a list format. Each sign will show its content, location, and date. The page will also include a header with a title and subtitle.
export  async function LoadSignsList() {
const {data:signs, error} = await getAllSigns();
try {
if(!signs || error ){ // the !signs is only for the type checking
  console.error("error", error);
  errorHandler  (error || "Sign not found", 404)
   }
 


  return (
    <div className={styles.container}>
     

         {signs?.map((sign) => (
          
          <Link href={`/signs/${sign.id}`} key={sign.id}  >

            <Sign key={sign.id} sign={sign} />

           </Link>
            

          ))}
         
         
      
    </div>
  );
}catch {
  return <ErrorPageSigns message="Failed to load signs" />;
}
}
export default function  SignListPage (){
  try {
    return (
      <div className={styles.signPageWrapper}>
        <Suspense fallback={<Spinner />}>
          <LoadSignsList />
        </Suspense>
      </div>
    );
  }catch(e:any) {
    return <ErrorPageSigns message={e.message}/>
  }
}