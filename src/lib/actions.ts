import { getEnvContext } from './utils'
import * as s from './schemas';
import Console from "@/utils/console";
import { AppError } from '@/utils/error';
import { getCacheAndValidation } from '@/services/cacher';
import { TAGS } from '@/const';
import * as v from 'valibot';
import Fuse from 'fuse.js';

// custom console keeps things clean 
const console = new Console("actions");



export const getAllSections = async () => {
 
 const env =  getEnvContext();
 const query = 'SELECT * FROM sections';

 console.log("Fetching all sections from D1 with query: ", query);

 const getSections = getCacheAndValidation(v.array(s.SectionSchema));
  return await getSections(
    async () => {
      const result = await env.D1.prepare(query).all();
      if(!result.results){
        return { success:false, error: "No sections found in the database"}
      }
      return result.results;
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
        if(!result.results){
          return { success:false, error: "No links found in the database"}
        }
        return result.results;
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
        if(!result){
          return { success:false, error: `No link found with id ${id}`}
        }
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
        if(!result.results){
          return { success:false, error: ("No signs found in the database")};
        }
        return result.results;
      },
      query, // using the query as the cache key',
      {
        tags: [TAGS.SIGNS], // tag for invalidation
      },
      async () => (await import("./mock-db")).signs
    )
  ); 
}

// helper function to search links with fuse.js
export const searchLinks = async (query: string) => {
  try {
  const allLinks = await getAllLinks();
  if(!allLinks.data || allLinks.data?.length === 0){
    return { success:false, error: ("No links found to search through")};
  }
    const fuse = new Fuse(allLinks.data , {
      keys: ['title', 'discription', 'section'],
      threshold: 0.3,
    });
    const results = fuse.search(query);
    console.log(`Search results for query "${query}": `, results);

    return results.length > 0 ? results.map(result => result.item) : []; // stop from mapping an empty array if no results
  } catch (e) {
    console.error(`Error in searchLinks for query ${query}: `, e);
    return { success:false, error: (`Failed to search links with query ${query}` )}
  }
}

  