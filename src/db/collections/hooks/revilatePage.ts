import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from "payload";

import { revalidatePath, revalidateTag } from "next/cache";
import { Page } from "@/payload-types";

/**
 * Revalidates the current collection slug. Unless in the pages slug,
 * it revalidates the current document and the previous state if
 * the current state is not published.
 *
 * @returns
 */
export const revalidatePage: CollectionAfterChangeHook = ({
  collection,
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === "published") {
      const slug = collection.slug === "pages" ? doc.slug : collection.slug;
      const path = slug === "home" ? "/" : `/${slug}`;

      payload.logger.info(`Revalidating page at path: ${path}`);

      revalidatePath(path);
      revalidateTag("pages-sitemap", "max");
    }

    // If the page was previously published, we need to revalidate the old path
    if (previousDoc?._status === "published" && doc._status !== "published") {
      const oldPath =
        previousDoc.slug === "home" ? "/" : `/${previousDoc.slug}`;

      payload.logger.info(`Revalidating old page at path: ${oldPath}`);

      revalidatePath(oldPath);
      revalidateTag("pages-sitemap", "max");
    }
  }
  return doc;
};

export const revalidateDelete: CollectionAfterDeleteHook = ({
  collection,
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    const slug =
      (collection.slug as string) === "pages" ? doc.slug : collection.slug;
    const path = slug === "home" ? "/" : `/${slug}`;

    revalidatePath(path);
    revalidateTag("pages-sitemap", "max");
  }

  return doc;
};
