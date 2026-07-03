import "@/styles/globals.css";

import { Suspense } from 'react';
import {  Thoughts } from '@/components/signs/Thought';
import { Spinner }from "@/components/ui/spinner" //scdu ui component for loading state
import { Sign } from '@/components/signs/Sign';

import { getSignById, getThoughtSignById } from '@/lib/actions';
import { siteContent, thoughtsPageContent } from '@/lib/content';
import { Icon } from '@/lib/icons';
import Skeleton from "@/components/fallbacks/Skeleton";
import { redirect } from "next/navigation";
import { AppError } from "@/utils/error";
import errorHandler from "@/lib/error-handler";
import { ErrorPageSigns } from "@/components/signs/SignError";


import "@/styles/globals.css"
import styles from "@/styles/Signs.module.css"

export  async function LoadSign( { params }: { params: Promise<Params>}) {
    try {
    const { id } = await params;
    const {data:sign , error} = await  getSignById(id);
    const { data:thoughts } = await  getThoughtSignById(id);

   if(!sign || error){
    errorHandler(error || "Sign not found", 404);
   }

    return (

        <div>
            
        <Sign sign={sign} />
         
            <div className={styles.thoughtsList}>
           
            
           <Thoughts thoughts={thoughts} /> 

           </div>
        
        </div>
    )
    }catch {
        return <ErrorPageSigns message={`Failed to get sign.`} />
    }
}
interface Params{
    id:string;
}
export  default  function SignPage({ params }: { params: Promise<Params>}) {
       try {
    return (
      <div className={styles.pageContent}>
        <Suspense fallback={<Skeleton />}>
          <LoadSign params={params} />
        </Suspense>
      </div>
    )
       }catch(e:any){
        return <ErrorPageSigns message={e.mesaage}/>

       }
}