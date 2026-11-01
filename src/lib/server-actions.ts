"use server";

import { COOKIE_KEYS, TAGS } from "@/const";
import { getAllLinks } from "@/lib/actions";

import SearchDB from "@/services/search";
import Fuse from "fuse.js";
import { revalidateTag } from "next/cache";
import * as s from "@/lib/schemas";
import { getEnvContext, getHeaders, getRandomUUID } from "./utils";
import { send } from "process";
import { safeToString } from "@/utils/strings";
import { LinkData, MessageType, ReturnData, ReturnStatus } from "@/types";
import Console from "@/utils/console";
import { error } from "console";
import { cookies, headers } from "next/headers";
import { AppError } from "@/utils/error";
import { Ratelimit } from "@upstash/ratelimit";
import { isRateLimited } from "@/services/rateLimiter";

const console = new Console("server-actions");
async function clearCache() {
  //updates all tags to clear the unstable cache instantly
  revalidateTag(TAGS.GLOBAL, "max");
}

export async function clearAllCache(
  key: string,
): Promise<ReturnStatus> {
  try {
    await clearCache();
    console.log("Cache cleared successfully.");
    return { success: true, message: "Cache cleared successfully." };
  } catch (e: any) {
    console.error("Error clearing cache:", e);
    return { success: false, error: e.message };
  }
}

// This is a plain, safe, serializable function
export async function getLinkSearchResults(
  filters: { section: string[] },
  searchQuery?: string,
): Promise<LinkData[] | []> {
  // Instantiate the class completely inside the server layer
  const engine = new SearchDB<LinkData>(s.LinkDataSchema, "links");

  //  Build and run the database commands locally on the server
  await engine.filter(filters).runQuery();

  //  Handle the search logic if a query exists
  if (searchQuery) {
    // Return flat, serializable arrays of data back to the client
    return engine.search(searchQuery).map((result) => result.item);
  }

  return engine.getData();
}

export async function updateLinkHit(
  linkId: string,
): Promise<ReturnStatus> {
  try {
    const cookieStore = await cookies();

    const cookieValue = cookieStore.get(COOKIE_KEYS.LINK_HIT)?.value;

    //this could throw a error, so it could be caught and handled in the catch block below
    const jsonValue = JSON.parse(cookieValue || "{}");

    if (jsonValue[linkId]) {
      console.log(`Link hit already recorded for this session: ${cookieValue}`);
      return {
        success: false,
        error: "Link hit already recorded for this session.",
      };
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
        sameSite: "strict",
      },
    );

    await env.D1.prepare(query).bind(linkId).run();
  } catch (e: any) {
    console.error("Error updating link hit:", e);
    return { success: false, error: e.message };
  }

  return { success: true };
}

//TODO  add more types and functionality
export interface MessagePayload {
  type: MessageType;
  senderId?: string;
  email: string;

  message: string;
}

export async function postMessage(payload: MessagePayload): Promise<ReturnStatus> {
  try {
    const  { get: headerGetter } = await headers()
    const { ipAddress} = getHeaders(headerGetter);
    const isLimited = await isRateLimited(`messages:${ipAddress}`, 60* 60, 5);


    if(isLimited){
        throw new Error ("Too many requests")
    }
    const env = getEnvContext();
    const { type, message, email } = payload;

    // Note this doesn't track wther the email is from an account or just entered
    const key = `msg_id:${email}`;

    const query = `
    INSERT INTO
     messages (type, sender_id, timestamp, had_reply, message, unread)
     VALUES (?, ?, ?, ?);
      `;
    //uses a string veriosn of false to avoid errors.
    await env.D1.prepare(query)
      .bind(type, key, Date.now(), safeToString(false), message, false)
      .run();

    return { success: true };
  } catch (e: any) {
    console.error("Error with postMessage", e);

    return { success: false, error: e.message };
  }
}


export interface GetMessagesOptions {
  type?: MessageType;
  unreadOnly?: boolean;
  limit?: number;
  offset?: number;
}

export interface MessageRecord {
  id: number;
  type: MessageType;
  sender_id: string;
  timestamp: number;
  had_reply: string;
  message: string;
  unread: boolean;
}

export async function getMessages(
  options: GetMessagesOptions = {}
): Promise<ReturnData<MessageRecord[]>> {
  try {
    const env = getEnvContext();
    const { type, unreadOnly = false, limit = 50, offset = 0 } = options;

    const conditions: string[] = [];
    const params: (string | number | boolean)[] = [];

    if (type) {
      conditions.push("type = ?");
      params.push(type);
    }

    if (unreadOnly) {
      conditions.push("unread = ?");
      params.push(true);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    const query = `
      SELECT id, type, sender_id, timestamp, had_reply, message, unread
      FROM messages
      ${whereClause}
      ORDER BY timestamp DESC
      LIMIT ? OFFSET ?;
    `;

    params.push(limit, offset);

    const { results } = await env.D1.prepare(query)
      .bind(...params)
      .all<MessageRecord>();

    return {
      success: true,
      data: results ?? [],
    };
  } catch (e: any) {
    console.error("Error fetching messages:", e);
    return {
      success: false,
      error: e.message || "Failed to retrieve messages.",
    };
  }
}