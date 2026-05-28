import { getLinkCache } from "@/services/cacher";
import { links, signs, thoughts } from "./mock-db";
import {Thought, SignData, LinkData} from "@/types";
export function getAllThoughts(): Thought[] {
    return thoughts;
}
export function getAllSections(
){
    getLinkX
C
export function getThoughtById(id: string): Thought | undefined {
    return thoughts.find((t) => t.id === id);
}

export function getAllSigns(): SignData[] {
    return signs;
}

export function getSignById(id: string): SignData | undefined {
    return signs.find((s) => s.id === id);
}

export function getAllLinks(): LinkData[] {
    return links;
}

export function getLinkById(id: string): LinkData | undefined {
    return links.find((l) => l.id === id);
}

export function getLinksBySection(sectionName: string): LinkData[] {
    return links.filter((l) => l.section === sectionName);
}

export async function getAllLinksFromCache(): Promise<LinkData[]> {
    // Uses structural caching matching the LinkData shape parameters
    const linkData = await getLinkCache("*", ["section"]);
    return linkData;
}