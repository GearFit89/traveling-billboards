import "@/styles/globals.css";

import { Suspense } from 'react';
import { Thought } from '@/components/signs/Thought';
import { Spinner }from "@/components/ui/spinner" //scdu ui component for loading state
import { Sign } from '@/components/signs/Sign';
import { Navigation } from '@/components/navigation/Navigation';
import { getSignById } from '@/lib/actions';
import { siteContent, thoughtsPageContent } from '@/lib/content';
import { Icon } from '@/lib/icons';
import Skeleton from "@/components/fallbacks/Skeleton";
import { redirect } from "next/navigation";
import { AppError } from "@/utils/error";
import errorHandler from "@/lib/error-handler";
import { ErrorPageSigns } from "@/components/signs/SignError";


export  async function LoadSign( { params }: { params: Promise<Params>}) {
    try {
    const { id } = await params;
    const {data:sign , error} = await  getSignById(id);


   if(!sign || error){
    errorHandler(error || "Sign not found", 404);
   }

    return (

        <div>
            
        <Sign sign={sign} />
        
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
    return (<div>


    <Navigation />
    <Suspense fallback={<Skeleton />}>

        <LoadSign params={params} />

    </Suspense>
    
    
    </div>)
       }catch(e:any){
        return <ErrorPageSigns message={e.mesaage}/>

       }
}