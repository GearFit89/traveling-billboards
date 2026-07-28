"use server"

import { heavyRatelimit } from "@/services/ratelimits";
import { AppError } from "@/utils/error"
import { cookies, headers } from "next/headers";
import { getEnvContext } from "@/lib/utils";
import { COOKIE_KEYS } from "@/const";
import { ReturnData, SuccessReturn } from "@/types";
import { revalidateTag } from "next/cache";

import * as s from './schemas';
import Console from "@/utils/console";

import {  getCacheAndValidation } from '@/services/cacher';
import { TAGS } from '@/const';
import * as v from 'valibot';
import Fuse from 'fuse.js';
import { LinkData, LinkSection } from '@/types';
import { link } from 'fs';
import { D1Database } from '@cloudflare/workers-types';

const cacheProfile: string = "max"; // state while revaildate, when next user vists state is mark as stale.
const env = getEnvContext()

function checkAdminCode(token: string) {
    if (token !== process.env.ADMIN_KEY) {
      console.error("Not Approved")
        throw new AppError("Not Approved", 401);
    }
}

// ==========================================
// 1. SECTIONS ACTIONS
// ==========================================
export async function upsertSection(token: string, data: { id: string, name: string, description?: string, icon_key?: string, img_key?: string, img_alt?: string }) {
    checkAdminCode(token);

    try {
        const query = `
            INSERT INTO sections (id, name, description, icon_key, img_key, img_alt)
            VALUES (?1, ?2, ?3, ?4, ?5, ?6)
            ON CONFLICT(id) DO UPDATE SET
                name = excluded.name,
                description = excluded.description,
                icon_key = excluded.icon_key,
                img_key = excluded.img_key,
                img_alt = excluded.img_alt;
        `;
        console.log(`running query', ${query}`);

        
        await env.D1.prepare(query).bind(data.id, data.name, data.description || null, data.icon_key || null, data.img_key || null, data.img_alt || null).run();
       revalidateTag(TAGS.SECTIONS, cacheProfile );
        return { success: true };
    } catch (e: any) {
        return { success: false, error: e.message || "Failed to upsert section", status: 500 };
    }
}

export async function deleteSection(token: string, id: string) {
    checkAdminCode(token);

    try {
        await env.D1.prepare("DELETE FROM sections WHERE id = ?").bind(id).run();
        revalidateTag(TAGS.SECTIONS, cacheProfile );
        return { success: true };
    } catch (e: any) {
        return { success: false, error: e.message || "Failed to delete section", status: 500 };
    }
}

// ==========================================
// 2. LINKS ACTIONS
// ==========================================
export async function upsertLink(token: string, data: { id: string, title: string, link: string, img_key?: string, img_alt?: string, description?: string, section: string, metadata?: string }) {
    checkAdminCode(token);
   
    try {
        // Optimized the redundant subquery out since it preserves original values on conflict automatically
        const query = `
            INSERT INTO links (id, title, link, img_key, img_alt, description, section, hits, metadata)
            VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, 0, ?8)
            ON CONFLICT(id) DO UPDATE SET
                title = excluded.title,
                link = excluded.link,
                img_key = excluded.img_key,
                img_alt = excluded.img_alt,
                description = excluded.description,
                section = excluded.section,
                metadata = excluded.metadata;
        `;
        console.log(`running query', ${query}`);
        await env.D1.prepare(query).bind(data.id, data.title, data.link, data.img_key || null, data.img_alt || null, data.description || null, data.section, data.metadata || null).run();
        revalidateTag(TAGS.LINKS, cacheProfile );
        return { success: true };
    } catch (e: any) {
        return { success: false, error: e.message || "Failed to upsert link", status: 500 };
    }
}

export async function deleteLink(token: string, id: string) {
    checkAdminCode(token);
  
    try {
        await env.D1.prepare("DELETE FROM links WHERE id = ?").bind(id).run();
        revalidateTag(TAGS.LINKS, cacheProfile );
        return { success: true };
    } catch (e: any) {
        return { success: false, error: e.message || "Failed to delete link", status: 500 };
    }
}

// ==========================================
// 3. SIGNS ACTIONS
// ==========================================
export async function upsertSign(token: string, data: { id: string, title: string, img_key?: string, img_alt?: string, description?: string, metadata?: string }) {
    checkAdminCode(token);
   

    try {
        // Optimized the redundant subqueries out as well
        const query = `
            INSERT INTO signs (id, title, img_key, img_alt, description, web_hits, qr_hits, metadata)
            VALUES (?1, ?2, ?3, ?4, ?5, 0, 0, ?6)
            ON CONFLICT(id) DO UPDATE SET
                title = excluded.title,
                img_key = excluded.img_key,
                img_alt = excluded.img_alt,
                description = excluded.description,
                metadata = excluded.metadata;
        `;
        console.log(`running query', ${query}`);
        await env.D1.prepare(query).bind(data.id, data.title, data.img_key || null, data.img_alt || null, data.description || null, data.metadata || null).run();
        revalidateTag(TAGS.SIGNS, cacheProfile );
        return { success: true };
    } catch (e: any) {
        return { success: false, error: e.message || "Failed to upsert sign", status: 500 };
    }
}

export async function deleteSign(token: string, id: string) {
    checkAdminCode(token);
  

    try {
        await env.D1.prepare("DELETE FROM signs WHERE id = ?").bind(id).run();
          revalidateTag(TAGS.SIGNS, cacheProfile );
        return { success: true };
    } catch (e: any) {
        return { 
            success: false, 
            error: e.message || "Failed to delete sign. Make sure to delete associated thoughts first.", 
            status: 500 
        };
    }
}

// ==========================================
// 4. THOUGHTS ACTIONS
// ==========================================
export async function upsertThought(token: string, data: { id: string, sign_id: string, content?: string, location?: string, date?: string }) {
    checkAdminCode(token);

    try {
        const query = `
            INSERT INTO thoughts (id, sign_id, content, location, date)
            VALUES (?1, ?2, ?3, ?4, ?5)
            ON CONFLICT(id) DO UPDATE SET
                sign_id = excluded.sign_id,
                content = excluded.content,
                location = excluded.location,
                date = excluded.date;
        `;
        await env.D1.prepare(query).bind(data.id, data.sign_id, data.content || null, data.location || null, data.date || null).run();
        revalidateTag(TAGS.THOUGHTS, cacheProfile ); 
        return { success: true };
    } catch (e: any) {
        return { success: false, error: e.message || "Failed to upsert thought", status: 500 };
    }
}

export async function deleteThought(token: string, id: string) {
    checkAdminCode(token);

    try {
        await env.D1.prepare("DELETE FROM thoughts WHERE id = ?").bind(id).run();
          revalidateTag(TAGS.THOUGHTS, cacheProfile ); 
        return { success: true };
    } catch (e: any) {
        return { success: false, error: e.message || "Failed to delete thought", status: 500 };
    }
}

// ==========================================
// 5. MESSAGES & COMMENTS ACTIONS
// ==========================================
export async function deleteMessage(token: string, id: string) {
    checkAdminCode(token);
  
    try {
        await env.D1.prepare("DELETE FROM messages WHERE id = ?").bind(id).run();
        return { success: true };
    } catch (e: any) {
        return { success: false, error: e.message || "Failed to delete message", status: 500 };
    }
}

export async function deleteComment(token: string, id: string) {
    checkAdminCode(token);

    try {
        await env.D1.prepare("DELETE FROM comments WHERE id = ?").bind(id).run();
        return { success: true };
    } catch (e: any) {
        return { success: false, error: e.message || "Failed to delete comment", status: 500 };
    }
}



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



export const getAllSections = async () => {
 
 const env =  getEnvContext();
 const query = 'SELECT * FROM sections';

 console.log("Fetching all sections from D1 with query: ", query);

 const getSections = getCacheAndValidation(v.array(s.SectionSchema));
  return await getSections(
    async () => {
      const result = await env.D1.prepare(query).all();
     
      return result?.results;
    },
    query, // using the query as the cache key',
    {
    tags: [TAGS.SECTIONS], // tag for invalidation

    },
    async () => (await import("./mock-db")).sections
  );
  
};


export const getAllLinks = async () => {
 
    const query = 'SELECT * FROM links';
    console.log("Fetching all links from D1 with query: ", query);

    const env = getEnvContext();
    const getLinks = getCacheAndValidation(v.array(s.LinkDataSchema));
    return await getLinks(
      async () => {
        const result = await env.D1.prepare(query).all();
     
        return result?.results;// check in case results is not there
      },
      query, // using the query as the cache key',
      {
        tags: [TAGS.LINKS], // tag for invalidation
      },
      async () => (await import("./mock-db")).links
    );
  
}


export const getLinkbyId = async (id: string) => {
 
    const env = getEnvContext();
    const query = 'SELECT * FROM links WHERE id = ?';
    console.log(`Fetching link with id ${id} from D1 with query: `, query);

    const getLink = getCacheAndValidation(s.LinkDataSchema);
    return await getLink(
      async () => {
        const result = await env.D1.prepare(query).bind(id).first();
      
        return result;
      },
      `link_${id}`, // using a unique cache key for each link
      {
        tags: [TAGS.LINKS], // tag for invalidation
      },
      async ()=> (await import("./mock-db")).links[Number(id)]
    );
  
  
};

export const getSignById = async (id: string) => {
  
    const env = getEnvContext();
    const query = 'SELECT * FROM signs WHERE id = ?';
    console.log(`Fetching sign with id ${id} from D1 with query: `, query);

    const getSign = getCacheAndValidation(s.SignDataSchema);
    return await getSign(
      async () => {
        const result = await env.D1.prepare(query).bind(id).first();
       
        return result;
      },
      `sign_${id}`, // using a unique cache key for each sign
      {
        tags: [TAGS.SIGNS], // tag for invalidation
      },
      async () =>  (await import("./mock-db")).signs[Number(id)]
    );
 
};  

export const getAllSigns = async () => {
 
    const query = 'SELECT * FROM signs';
    console.log("Fetching all signs from D1 with query: ", query);
   
    const env = getEnvContext();
    const getSigns = getCacheAndValidation(v.array(s.SignDataSchema));
    return (await getSigns(
      async () => {
        const result = await env.D1.prepare(query).all();
       
        return result?.results;
      },
      query, // using the query as the cache key',
      {
        tags: [TAGS.SIGNS], // tag for invalidation
      },
      async () => (await import("./mock-db")).signs
    )
  ); 
}

  export async function getSectionById(sectionId:string):Promise<ReturnData< LinkSection>>{
    const env = getEnvContext();

    const linkQuery =  `SELECT * FROM links WHERE section = ?`
    const sectionQuery = `SELECT * FROM sections WHERE id = ?`
     console.log(`Fetching links for section ${sectionId} from D1 with query: `, linkQuery, "\n", sectionQuery);

     const getLinks = getCacheAndValidation(s.SectionSchema)
    return getLinks(async ()=> {
    const section =  ((await env.D1.prepare(sectionQuery).bind(sectionId).first<LinkSection>()))
    console.log("\n\n\n\n ", `${JSON.stringify(section)} \n\n\n\n\n\n`)
      return{
        ...section,
   
         links:  (await env.D1.prepare(linkQuery).bind(sectionId).all()).results as LinkData[],
     
      }
    }, 
      
      `section_${sectionId}`,

      { tags: [ TAGS.LINKS] },

    )
  }

  export async function getLinkById (linkId:string){
    const env = getEnvContext();
   
    const query = `SELECT * FROM links WHERE id = ?`;
    console.log(`excuting query ${query} with id ${linkId}`)

    const getLink = getCacheAndValidation(s.LinkDataSchema);
    return getLink(
     async () => await env.D1.prepare(query).bind(linkId).first(),
      `link_${linkId}`,

      {tags: [TAGS.LINKS]},

      async ()=> (await  import("@/lib/mock-db")).links?.[Number(linkId)]
    )
  } 

  export const getThoughtSignById = async (id: string) => {
  
    const env = getEnvContext();
    
    const query = 'SELECT * FROM thoughts WHERE sign_id = ?';
    console.log(`Fetching sign  thoughtswith id ${id} from D1 with query: `, query);

    const getSign = getCacheAndValidation(v.array(s.ThoughtSchema));
    return await getSign(
      async () => {
        const result = await env.D1.prepare(query).bind(id).all();
       console.warn("", "debug result this", result)
        return result?.results;
      },
      `sign_thought_${id}`,
      {
        tags: [TAGS.SIGNS],
      }
    );
 
};  

export const getAllThoughts= async () => {
  
    const env = getEnvContext();
    
    const query = 'SELECT * FROM thoughts';
    console.log(`Fetching sign  thoughts `, query);

    const getSign = getCacheAndValidation(v.array(s.ThoughtSchema));
    return await getSign(
      async () => {
        const result = await env.D1.prepare(query).all();
       console.warn("", "debug result this", result)
        return result?.results;
      },
      `sign_thoughts`,
      {
        tags: [TAGS.SIGNS],
      }
    );
};