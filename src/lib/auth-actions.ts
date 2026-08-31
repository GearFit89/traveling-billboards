
"use server"

import { heavyRatelimit } from "@/services/ratelimits";
import { AppError } from "@/utils/error"
import { cookies, headers } from "next/headers";
import { getEnvContext } from "@/lib/utils";
import { COOKIE_KEYS, FILE_SIZE_LIMIT } from "@/const";
import { ReturnData, SuccessReturn } from "@/types";
import { revalidatePath } from "next/cache";


import { SignJWT, jwtVerify } from "jose";



const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

// Sign a token when a user logs in
export async function signToken(payload: { token: string}) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("16weeks") // Token expires in 6 weeks
    .sign(SECRET);
}

// Verify a token from incoming requests
export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload;
  } catch (error) {
    return null; // Invalid or expired token
  }
}
export async function setToken(token: string):Promise< SuccessReturn >{
    try{
      if(token !== process.env.ADMIN_KEY){
        return {
          success: false,
          error:"ADMIN key is not vaild"
        }
      }
    const cookieStore =await  cookies();


    const signedToken = await    signToken({ token })
  cookieStore.set(COOKIE_KEYS.ADMIN_COOKIE, signedToken, {maxAge: 60 * 60 * 24 * 7 * 6, //6 weeks
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/"});

 
    return {
        success: true,
        
    }
}
    catch(e : any){
        return {
            success:false,
            error:e.message,
         
        }
    }
    
}

export async function getToken():Promise< ReturnData<string> >{
    try{
    const cookieStore =await  cookies();
  const cookie=   cookieStore.get(COOKIE_KEYS.ADMIN_COOKIE);
  if(!cookie?.value){
    throw new Error("Cookie not there")
  }

  const actualCookie = await verifyToken(cookie.value);

  if(!actualCookie){
     throw new Error("Cookie not verfied")
  }

  const { token } = actualCookie;

    return {
        success: true,
        data: token as string
    }
}
    catch(e : any){
        return {
            success:false,
            error:e.message,
            data: ""
        }
    }
    
}