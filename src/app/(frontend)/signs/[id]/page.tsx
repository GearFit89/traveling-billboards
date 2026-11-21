import "@/styles/globals.css";

import { Suspense } from 'react';
import {  Thoughts } from '@/components/signs/Thought';
import { Spinner }from "@/components/ui/spinner" //scdu ui component for loading state
import { Sign } from '@/components/signs/Sign';

import { getSignById, getThoughtSignById } from '@/lib/actions';
import { siteContent, thoughtsPageContent } from '@/lib/content';

import Skeleton from "@/components/fallbacks/Skeleton";
import { redirect } from "next/navigation";
import { AppError } from "@/lib/error";
import errorHandler from "@/lib/error-handler";
import { ErrorPageSigns } from "@/components/signs/SignError";


import "@/styles/globals.css"
import styles from "@/styles/Signs.module.css"


 
export function generateStaticParams (){
  return [];

}
export  async function LoadSign( { params }: { params: Promise<Params>}) {
    try {
    const { id } = await params;
    const sign = await getSignById(id);
    if (!sign.success) {
      errorHandler(sign.error || "Sign not found", 404);
      return <ErrorPageSigns message="Sign not found." />;
    }
    const thoughts = await getThoughtSignById(id);
    if (!thoughts.success) {
      return <ErrorPageSigns message="Failed to get sign." />;
    }

    return (
        <div>
        <Sign sign={sign.data} />
          <div className={styles.thoughtsList}>
           <Thoughts thoughts={thoughts.data} />
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
        return <ErrorPageSigns message={e.message}/>

       }
}