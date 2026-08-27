"use server";

import { headers } from "next/headers";
import { redis } from "./redis";

import crypto from "crypto";
import { string } from "valibot";

interface UpdateSignWebHitsParams {
  id: string;
 
  expiresIn?: number; // Optional parameter for expiration time in seconds
}

 export async function updateWebHits (params: UpdateSignWebHitsParams) {
    try{
    const { get: getHeader }= await  headers()
    
    const userAgent = getHeader("user-agent");
    const rawXff = getHeader("x-forwarded-for");
    const rawRealIp = getHeader("x-real-ip");

    // Extract first IP from x-forwarded-for or fallback to x-real-ip
    const ipAddress = rawXff ? rawXff.split(",")[0].trim() : rawRealIp;

    if(!userAgent || !ipAddress){
        const errMsg = `Invaild entry, \n ip:${ipAddress} \n -----or---- \n user-agent:${userAgent} \n are not vaild  `
        console.error(errMsg)
        throw new Error(errMsg)
    }

    const redisKey = `tb:web_hits:${params.id}`;
    const userAgentKey = `${ipAddress}:${userAgent}`;

    const hashedUserAgentKey = crypto.createHash('sha256').update(userAgentKey).digest('hex');

     await redis.pfadd(redisKey, hashedUserAgentKey);


     const { data:count } = await getWebHits({ id: params.id })
    
    
     return {
        success: true,
        data: count

    }
    }
    catch(e: any){
        console.error(e)
        return {
            error: e.message,
            success: false,
    

        }
    }
   
    
  
}
interface GetWebHitsParams {
    id: string;
}
export async function getWebHits(params: GetWebHitsParams){
    try {
        const totalHits = await redis.pfcount(`tb:web_hits:${params.id}`);
        return {
            data: totalHits,
            success: true
        }
    } catch (error: any) {

        console.error(error);
        return {
            success: false,
            error: error.message

        }
        
    }
}