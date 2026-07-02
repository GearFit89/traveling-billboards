import { getEnvContext } from './utils'
import * as s from './schemas';
import Console from "@/utils/console";
import { AppError } from '@/utils/error';
import {  getCacheAndValidation } from '@/services/cacher';
import { TAGS } from '@/const';
import * as v from 'valibot';
import Fuse from 'fuse.js';
import { LinkData, LinkSection, ReturnData } from '@/types';
import { link } from 'fs';
import { D1Database } from '@cloudflare/workers-types';

// custom console keeps logs clean 
// in const.ts turn DEBUG to false to remove these logs
// do console.llog(msg, 0) to bypass debug mode logging.
const console = new Console("actions");


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
/**
 * 
 * @param id 
 * @returns 
 */



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

    // we need to get the section names and other data AND all the links
    // that's why two calls are needed.
    const linkQuery =  `SELECT * FROM links WHERE section = ?`
  
     console.log(`Fetching links for section ${sectionId} from D1 with query: `, linkQuery, );

     const getLinks = getCacheAndValidation(s.SectionSchema)  // return an arrya of links
    return getLinks(async ()=> {
    
      return{
      id:sectionId, //it must have a name 
      name:sectionId,
         links:  (await env.D1.prepare(linkQuery).bind(sectionId).all()).results as LinkData[],
     
      }
    }, 
      
      `section_${sectionId}`,

      { tags: [ TAGS.LINKS] },

      async ()=> ({
      id:sectionId, //it must have a name 
      name:sectionId,
       links:  (await import("@/lib/mock-db")).links.filter(l=>l.section === sectionId) as LinkData[],
     
      })

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
        const result = await env.D1.prepare(query).bind(id).all(); // in cas thier are multiple thoughts
       console.warn("", "debug result this", result)
        return result?.results;
      },
      `sign_thought_${id}`, // using a unique cache key for each sign
      {
        tags: [TAGS.SIGNS], // tag for invalidation
      }
    );
 
};  