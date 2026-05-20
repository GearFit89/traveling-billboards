import { Suspense } from "react";
import Link from "next/link";
import { getLinkCache } from "@/services/cacher";
import { LinkData } from "@/types";
import styles from "@/app/styles/links.module.css";

// Fetches all links and filters by the current section route
async function SectionLinks({ sectionName }: { sectionName: string }) {
  const response = await getLinkCache(
    "*",
    ["id", "section", "title"],
    "AND section = ?",
    [sectionName],
  );
  const allLinks: LinkData[] = Array.isArray(response?.data)
    ? response.data
    : [];

  // Decode the URL param and match it to our section grouping logic
  const decodedSection = decodeURIComponent(sectionName);
  const sectionLinks = allLinks.filter(
    (l) => (l.section || "General") === decodedSection,
  );

  if (sectionLinks.length === 0) {
    return (
      <p className={styles.description}>No links found in this section.</p>
    );
  }

  return (
    <div className={styles.grid}>
      {sectionLinks.map((link) => (
        <Link
          key={link.id}
          href={`/links/${sectionName}/${link.id}`}
          className={styles.card}
        >
          <h2 className={styles.title}>{link.title}</h2>
          <p className={styles.description}>Click to view details</p>
        </Link>
      ))}
    </div>
  );
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const getParams = await params;
  return (
    <main className={styles.container}>
      <header className={styles.pageHeader}>
        <Link href="/links" className={styles.linkButton}>
          &larr; Back to Sections
        </Link>
        <h1 className={styles.pageTitle}>
          {decodeURIComponent(getParams.section)} Links
        </h1>
      </header>

      <Suspense
        fallback={<div className="skeleton-verse">Loading links...</div>}
      >
        <SectionLinks sectionName={getParams.section} />
      </Suspense>
    </main>
  );
}
