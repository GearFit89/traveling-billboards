"use server"

import { COOKIE_KEYS, TAGS } from "@/const";
import { getAllLinks } from "@/lib/actions";
import { clearKVCache } from "@/services/cacher";
import SearchDB from "@/utils/search";
import Fuse from "fuse.js";
import { revalidateTag } from "next/cache";
import * as s from "@/lib/schemas"
import {  getEnvContext, getRandomUUID } from "./utils";
import { send } from "process";
import { safeToString } from "@/utils/strings";
import { LinkData, MessageType, ReturnData } from "@/types";
import Console from "@/utils/console";
import { error } from "console";
import { cookies } from "next/headers";



const console = new Console("server-actions")
 async function clearCache() {
   await  clearKVCache();

   //updates all tags to clear the unstable cache instantly 
   revalidateTag(TAGS.GLOBAL, "max");

};

export async function clearAllCache(key: string): Promise<{ success: boolean; message?: string; error?: string }> {
    if (key !== process.env.CACHE_CLEAR_KEY) {
        return { success: false, error: "Invalid cache clear key." };
    }
    try {
        await clearCache();
        console.log("Cache cleared successfully.");
        return { success: true, message: "Cache cleared successfully." };
    } catch (e: any) {
        console.error("Error clearing cache:", e);
        return { success: false, error: e.message };
    }   

};





// This is a plain, safe, serializable function
export async function getLinkSearchResults(filters: { section: string[] }, searchQuery?: string): Promise<LinkData[]|[]> {
    // Instantiate the class completely inside the server layer
    const engine = new SearchDB<LinkData >(s.LinkDataSchema, "links");

    //  Build and run the database commands locally on the server
    await engine
        .filter(filters)
        .runQuery();

    //  Handle the search logic if a query exists
    if (searchQuery) {
        // Return flat, serializable arrays of data back to the client
        return engine.search(searchQuery).map(result => result.item);
    }

    return engine.getData();
}


export async  function updateLinkHit (linkId:string): Promise< { success: boolean; error: string }> {
try {
 const cookieStore = await cookies();

 const cookieValue = cookieStore.get(COOKIE_KEYS.LINK_HIT)?.value;
 
 //this could throw a error, so it could be caught and handled in the catch block below
 const jsonValue = JSON.parse(cookieValue || "{}") 
 

if(jsonValue[linkId]) {
  console.log(`Link hit already recorded for this session: ${cookieValue}`);
  return {success:false, error:"Link hit already recorded for this session."};
}
  const env = getEnvContext();


  const query = `
  UPDATE links 
  SET hits = hits + 1
  WHERE id = ?;
  `;

  
  const updatedValue = { ...jsonValue, [linkId]: true };


  cookieStore.set(
    COOKIE_KEYS.LINK_HIT,
    JSON.stringify(updatedValue),
    
    { 
        path: "/",
        httpOnly: true, 
        sameSite: "strict" 
    });
  


   await  env.D1.prepare(query).bind(linkId).run();
} catch (e: any) {
    console.error("Error updating link hit:", e);
    return { success: false, error: e.message };
  }

  return { success: true, error: "" };

}






//TODO  add more types and functionality
export interface MessagePayload {
    type: MessageType;
    senderId?:string;
    email?:string;
 
    message:string;
}

export async function postMessage( payload: MessagePayload){
    try{
    const env = getEnvContext();
    const { type, senderId, message, email } = payload;

   

    //compose random keys, based wether email was submited. 
    // Note this doesn't track wther the email is from an account or just entered
    const key = !email ? `msg_id:no_email:${getRandomUUID()}` : `msg_id:${email}`;
  
    const query = `
    INSERT INTO
     messages (type, sender_id, timestamp, had_reply, message, unread)
     VALUES (?, ?, ?, ?);
      `;
      //uses a string veriosn of false to avoid errors.
    await env.D1.prepare(query).bind(
        type, 
        key,
         Date.now( ), 
         safeToString(false),
          message ,
          false
        ) 
      .run()
   
   // the unique key which the broswer will need to get the right response
    return {success:true, token:key}

    } catch(e: any){
        console.error("Error with postMessage", e);

        return {success:false, error:e.message}
    }
}