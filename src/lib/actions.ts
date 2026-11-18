"use server";

import { getPayload } from "payload";
import config from "@payload-config";
import { runQuery } from "@/db/query";

export async function getAllSigns() {
  return runQuery(async () => {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "signs",
      pagination: false,
      sort: "id",
      depth: 1,
    });
    return result.docs;
  });
}

export async function getAllSections() {
  return runQuery(async () => {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "sections",
      pagination: false,
      sort: "id",
    });
    return result.docs;
  });
}

export async function getAllLinks() {
  return runQuery(async () => {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "links",
      pagination: false,
      sort: "id",
    });
    return result.docs;
  });
}

export async function getLinkById(id: string) {
  return runQuery(async () => {
    const payload = await getPayload({ config });
    return payload.findByID({ collection: "links", id });
  });
}

export async function getSignById(id: string) {
  return runQuery(async () => {
    const numericId = Number(id);
    if (!Number.isSafeInteger(numericId) || numericId <= 0) {
      throw new Error("Sign not found");
    }
    const payload = await getPayload({ config });
    return payload.findByID({ collection: "signs", id: numericId, depth: 1 });
  });
}

export async function getSectionById(id: string) {
  return runQuery(async () => {
    const payload = await getPayload({ config });
    return payload.findByID({ collection: "sections", id });
  });
}

export async function getThoughtSignById(id: string) {
  return runQuery(async () => {
    const numericId = Number(id);
    if (!Number.isSafeInteger(numericId) || numericId <= 0) {
      throw new Error("Sign not found");
    }
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "thoughts",
      where: { sign: { equals: numericId } },
      pagination: false,
      sort: "id",
    });
    return result.docs;
  });
}
