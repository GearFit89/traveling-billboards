import Spinner from "@/ui/spinner";
import "@/app/globals.css"
import { Suspense } from "react";
import getQuery from "../../../services/getQuery";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import {Comments} from "@/ui/Comments"
import { AppError } from "@/utils/error";
import { SignData } from "@/types";
import { TextSkeleton } from "@/ui/Skeleton";
import { unstable_cache } from "next/cache";


export const runtime = 'edge'
export const dynamicParams = true;


//route param example : sign/1, sign/2, sign/3, etc. This page will be used to display the content for each sign, which will be determined by the route parameter. For example, if the user navigates to /sign1, the content for sign1 will be displayed. If they navigate to /sign2, the content for sign2 will be displayed, and so on. This allows us to have a single page that can display different content based on the route parameter, which is more efficient than creating separate pages for each sign.
/*using suspence the main data will be se */
export function generateStaticParams(){
    const params = []
    for (let i= 0; i < 10; i++){
        params.push({id:i+1})
    }
    return params
}
const getSignCache= 
    unstable_cache(async (env:any, id:string) => {
        return  getQuery<SignData>(env, { id, type: 'signs', columns:["*"] }, { first: true });
    }, ["sign_data"], 
        {
             tags: [TAGS.SIGNS] // this tag is revaildated in updateQuery calls on the dashboard
        }
)

async function LoadSignData ({id}:{id:string}){

  const {env } = getCloudflareContext();
  
    const { data, error, success } = await  getSignCache(env, id);
     if(!success || !data) {
        throw new AppError("Unable to get sign data: "+error, 404);//go to error page
       
        };
    const finalData = Array.isArray(data) ? data[0] : data;//the data will be most likey a non-arry but later this migth be hekpful 

    return (
        <div>
            {/* THis comp will take a few ms to render, but pretty fast due to coudfare bindings */}
      <Comments signData={finalData}></Comments>

        </div>
    )

}
export default async  function Page({ params }: { params: Promise< { id: string }> }) {
    const { id:sign_id} = await params;
    return (
        <div>
            
            <h1>Sign: {sign_id} --demo remove this code later</h1>
            <p>This is the page for sign {sign_id}.--demo remove this code later</p>
            


            <Suspense fallback={<TextSkeleton />}>
                <LoadSignData id={sign_id} />
            </Suspense>
        </div>
    );
}