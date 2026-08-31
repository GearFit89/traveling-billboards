"use server"

import { heavyRatelimit } from "@/services/ratelimits";
import { AppError } from "@/utils/error"
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { getEnvContext } from "@/lib/utils";
import { ADMIN_EMAIL, COOKIE_KEYS, FILE_SIZE_LIMIT } from "@/const";
import { ReturnData, SuccessReturn } from "@/types";
import { revalidatePath } from "next/cache";

import * as s from './schemas';
import Console from "@/utils/console";

import {  getCacheAndValidation } from '@/services/cacher';
import { TAGS } from '@/const';
import * as v from 'valibot';
import Fuse from 'fuse.js';
import { LinkData, LinkSection } from '@/types';
import { link } from 'fs';
import { D1Database, R2Object } from '@cloudflare/workers-types';
import clearCache from "@/services/clearCache";
import { createClient } from "./supabase/server";
import { isRateLimited } from "@/services/rateLimiter";
import redis from "@/services/redis";

const cacheProfile: string = "max"; // state while revaildate, when next user vists state is mark as stale.
const env = getEnvContext()
const console = new Console("ADMIN_ACTIONS")


async function clearIncCache(path: string, type?: "layout"| "page"){

  revalidatePath(path, type);
  console.log("revaildating path: ", path)
   await clearCache()

}




export async function clearAllCache(adminCode: string, type?: "layout" | "page") {
  
  
  await clearIncCache("/", type);

}

// ==========================================
// 1. SECTIONS ACTIONS
// ==========================================
export async function upsertSection(token: string, data: { id: string, name: string, description?: string, icon_key?: string, img_key?: string, img_alt?: string }) {
    

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
       await clearIncCache("/links");
        return { success: true };
    } catch (e: any) {
        return { success: false, error: e.message || "Failed to upsert section", status: 500 };
    }
}

export async function deleteSection(token: string, id: string) {
    

    try {
        await env.D1.prepare("DELETE FROM sections WHERE id = ?").bind(id).run();
        await clearIncCache("/links");
        console.log(`Section with id ${id} deleted successfully. Revalidating path /links`);
        return { success: true };
    } catch (e: any) {
        return { success: false, error: e.message || "Failed to delete section", status: 500 };
    }
}

// ==========================================
// 2. LINKS ACTIONS
// ==========================================
export async function upsertLink(token: string, data: { id: string, title: string, link: string, img_key?: string, img_alt?: string, description?: string, section: string, metadata?: string }) {
    
   
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
        await clearIncCache("/links");
        console.log(`Link with id ${data.id} upserted successfully. Revalidating path /links`);
        return { success: true };
    } catch (e: any) {
        return { success: false, error: e.message || "Failed to upsert link", status: 500 };
    }
}

export async function deleteLink(token: string, id: string) {
    
  
    try {
        await env.D1.prepare("DELETE FROM links WHERE id = ?").bind(id).run();
        await clearIncCache("/links");
        console.log(`Link with id ${id} deleted successfully. Revalidating path /links`);
        return { success: true };
    } catch (e: any) {
        return { success: false, error: e.message || "Failed to delete link", status: 500 };
    }
}

// ==========================================
// 3. SIGNS ACTIONS
// ==========================================
export async function upsertSign(token: string, data: { id: string, title: string, img_key?: string, img_alt?: string, description?: string, metadata?: string }) {
    
   

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
        await clearIncCache("/signs");
        console.log(`Sign with id ${data.id} upserted successfully. Revalidating path /signs`);
        return { success: true };
    } catch (e: any) {
        return { success: false, error: e.message || "Failed to upsert sign", status: 500 };
    }
}

export async function deleteSign(token: string, id: string) {
    
  

    try {
        await env.D1.prepare("DELETE FROM signs WHERE id = ?").bind(id).run();
        console.log(`Sign with id ${id} deleted successfully.`, "\n Revalidating path /signs");
          await clearIncCache("/signs");
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
       await clearIncCache('/signs', 'layout');
        return { success: true };
    } catch (e: any) {
        return { success: false, error: e.message || "Failed to upsert thought", status: 500 };
    }
}

export async function deleteThought(token: string, id: string) {
    

    try {
        await env.D1.prepare("DELETE FROM thoughts WHERE id = ?").bind(id).run();
          await clearIncCache('/signs', 'layout'); 
        return { success: true };
    } catch (e: any) {
        return { success: false, error: e.message || "Failed to delete thought", status: 500 };
    }
}

// ==========================================
// 5. MESSAGES & COMMENTS ACTIONS
// ==========================================
export async function deleteMessage(token: string, id: string) {
    
  
    try {
        await env.D1.prepare("DELETE FROM messages WHERE id = ?").bind(id).run();
        return { success: true };
    } catch (e: any) {
        return { success: false, error: e.message || "Failed to delete message", status: 500 };
    }
}

export async function deleteComment(token: string, id: string) {
    

    try {
        await env.D1.prepare("DELETE FROM comments WHERE id = ?").bind(id).run();
        return { success: true };
    } catch (e: any) {
        return { success: false, error: e.message || "Failed to delete comment", status: 500 };
    }
}







export async  function uploadImageToR2(token: string, key: string, file: File):Promise<Partial< ReturnData<Record<"imageUrl", string>>>>{
  
const imageUrl = 'images/' + file.name;
console.log("key", key, file.name)
  if(!file.type.startsWith("image") ){;
    console.error("file not image")
    return { error: "File not image", success: false}
  }

  if(file.size > FILE_SIZE_LIMIT ){
    return { error: "File size too big", success: false}
  }


 const bufferData = await file.arrayBuffer();
  const data = await env.R2_IMAGES.put(imageUrl, bufferData, {
    httpMetadata:{

      // To avoid mixing the defualt binary type, with this actual image type
      contentType: file.type
    }
  })

  

  return { success: true, data: {
    imageUrl
  }}


}



export type AdminActionState = {
  success: boolean;
  error?: string;
};

export async function adminLogin(
  _state: AdminActionState | null,
  formData: FormData,
): Promise<AdminActionState> {
  try {
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const redirectTo = String(formData.get("redirectTo") ?? "/admin/dashboard");

    if (!email || !password) {
      return { success: false, error: "Email and password are required." };
    }
   

    const { get: getHeader } = await headers();
    const userAgent = getHeader("user-agent");
    const rawXff = getHeader("x-forwarded-for");
    const rawRealIp = getHeader("x-real-ip");
    const ipAddress = rawXff ? rawXff.split(",")[0].trim() : rawRealIp;

   

    const isReqRateLmited = await isRateLimited(`ADMIN:LOGIN:${userAgent}-${ipAddress}`, 60, 3);
console.log("made it here ---1")

    if (isReqRateLmited) {
      return { success: false, error: "Too many attempts. Please try again later." };
    }
   


    const adminEmail = process.env.ADMIN_EMAIL;

    if (email !== adminEmail) {
      return { success: false, error: "Invalid login credentials." };
    }
   

    const authServer = await createClient();
    const { error: signInErr } = await authServer.auth.signInWithPassword({
      email: adminEmail,
      password,
    });
   


    if (signInErr) {
      return { success: false, error: `[DB]: ${signInErr.message}` };
    }
   


    revalidatePath("/admin", "layout");
   

    redirect(redirectTo);
    
  } catch (error: any) {
    const errMsg =`[DB-UN]: ${error?.message  ?? "Failed to sign in as admin."}`
    console.error(errMsg);
    return {
      success: false,
      error: errMsg
    };
  }
}

export async function adminLogout(): Promise<{ success: boolean; error?: string }> {
  try {
    const authServer = await createClient();
    const { error: signOutErr } = await authServer.auth.signOut();

    if (signOutErr) {
      throw new Error(signOutErr.message);
    }

    revalidatePath("/admin", "layout");
    redirect("/login/admin");
  } catch (error: any) {
    console.error(error?.message ?? error);
    return {
      success: false,
      error: error?.message ?? "Failed to sign out.",
    };
  }
}

