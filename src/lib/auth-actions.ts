
"use server"

import { heavyRatelimit } from "@/services/ratelimits";
import { AppError } from "@/utils/error"
import { cookies, headers } from "next/headers";
import { getEnvContext } from "@/lib/utils";
import { COOKIE_KEYS, FILE_SIZE_LIMIT } from "@/const";
import { ReturnData, SuccessReturn } from "@/types";
import { revalidatePath } from "next/cache";


import { SignJWT, jwtVerify } from "jose";
import { createClient } from "./supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";
import { sign } from "crypto";
import { log } from "console";



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
/**
 * - A helper function that takes the serverClient and checks to see if a username 
 * is unique.
 * @throws usernameCheckErr - The actuall supabase call fails
 * @throws Username is taken - When another username is found
 * @param serverClient The supabase server client required for the db call
 * @param username The username that is being check, to see if it is taken
 */
export async function isUsernameUnique(serverClient: SupabaseClient, username: string){
  


  const { data, error: usernameCheckErr } = await serverClient
  .from("profiles")
  .select("username")
  .eq("username", username)

  if(usernameCheckErr){
    throw new Error(usernameCheckErr.message)

  }

if (data?.length > 0) {
  throw new Error("Username is taken")

}

 


}
interface SignUpData {
  username: string;
  email: string;
  password: string;
}

export async function signUp({username, email, password}: SignUpData) {

 try{

  const serverClient = await createClient();

  await isUsernameUnique(serverClient, username);

  const { error : signUpErr, data } = await serverClient.auth.signUp({
    email,
    password
  })
  const userId = data.user?.id;

    if(signUpErr || !userId ){
      throw new Error(signUpErr?.message)
    }
    
    const { error: profileErr } = await serverClient
    .from("profiles")
    .insert({
      username,
      id: userId
    })
    


    if(profileErr){
      throw new Error(profileErr.message)
    }

    const { error: logInErr } = await serverClient.auth.signInWithPassword({
      email,
      password
    })
    

    if(logInErr){
      throw new Error(logInErr.message)
    }

  } catch(e: any){

    console.error(e);

    return {
      success: false,
      error: e.message
    }

  }
  
}
