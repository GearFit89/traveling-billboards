import { AppError } from "./error";

// Specific Type Aliases for eac
type VerseText = string;
type ScriptureReference = string;
type BibleVersion = string;
type ExternalUrl = string;
type AttributionNotice = string;

interface VerseDetails {
    text: VerseText; // The actual scripture
    reference: ScriptureReference; // e.g., "Isaiah 52:7"
    version: BibleVersion; // e.g., "NIV"
    verseurl: ExternalUrl; // Link to the source
}

interface Verse {
    details: VerseDetails;
    notice: AttributionNotice; // "Powered by OurManna.com"
}

export interface BibleResponse {
    verse: Verse;
}

export default async function getDailyVerse(): Promise<BibleResponse> {
    const response = await fetch("https://beta.ourmanna.com/api/v1/get?format=json&order=daily", {
        method: "GET",
        next: { revalidate: 60 * 60 * 24 }, // Revalidate once every 24 hours
        
    });
    if (!response.ok) {
        throw new AppError(`Failed to fetch daily verse: ${response.statusText}`, 500);
    }
    return response.json() as Promise<BibleResponse>;

}
