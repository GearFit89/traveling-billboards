"use client"

import { useToast } from "@/hooks/use-toast";
import { toastContent } from "@/lib/content";
import Console from "@/utils/console";

const debugConsole = new Console("utils_client");

/**
 * Copies a given text string to the user's system clipboard.
 * * @param text - The string content to be copied.
 * @param toast - The UI toast function instantiated from a React component.
 * @returns An object indicating operational success or failure with error details.
 */
export async function copyToClipBoard(text: string, toast: ReturnType<typeof useToast>["toast"]) {
    try {
        await navigator.clipboard.writeText(text);

        if (toast) {
            toast({ description: toastContent.copy.success });
        } else {
            alert("Copied to clipboard");
        }

        return { success: true };
    } catch (e: any) {
        if (toast) {
            toast({ description: toastContent.copy.error });
        }

        debugConsole.error("Failed to save to clipboard:", text, e);
        return { success: false, error: e.message };
    }
}

/**
 * Triggers the native device sharing sheet/dialog window interface.
 * * @param shareData - Object configuration containing title, text, or URL to share.
 * @param toast - The UI toast function instantiated from a React component.
 * @returns An object indicating operational success or failure with error details.
 */
export async function shareText(shareData: ShareData, toast?: ReturnType<typeof useToast>["toast"]) {
    try {
        await navigator.share(shareData);

        if (toast) {
            toast({ description: toastContent.share.success});
        }

        debugConsole.debug("Successful share operation completed");
        return { success: true };
    } catch (e: any) {
        if (toast) {
            toast({ description: toastContent.share.error });
        }

        debugConsole.error("Failed to share target:", shareData, e);
        return { success: false, error: e.message };
    }
}