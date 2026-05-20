import { Suspense } from "react";
import Link from "next/link";
import { getLinkCache } from "@/services/cacher";
import { LinkData } from "@/types";
import styles from "@/app/styles/links.module.css";
import { APP_IMAGE_URL } from "@/const";
import Image from "next/image";
// Async component that handles the data fetching
async function SectionsList() {
  // Pass "*" as the ID to get all links, as requested
  // const
  //
  //
  //
  console.log("{link} getting cache");
  const response = await getLinkCache("*");

  // Ensure we safely extract an array of links
  const links: LinkData[] = Array.isArray(response?.data) ? response.data : [];
  console.log("{link} getting cache... GOT!", response);
  // Group links by section )
  //
  console.log("{link} data ", links);
  const sections = Array.from(
    new Set(links.map((l) => l.section || "General")),
  );

  return (
    <div className={styles.grid}>
      {sections.map((section) => (
        <Link key={section} href={`/links/${section}`} className={styles.card}>
          <Image
            src={`${APP_IMAGE_URL}${section}.png`}
            alt={`${section} category`}
            width={56}
            height={56}
            className={styles.cardImage}
          />
          <h3 className={styles.title}>{section}</h3>
          {/*<p className={styles.description}></p>*/}
        </Link>
      ))}
    </div>
  );
}

export default function LinksPage() {
  return (
    <main className={styles.container}>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Browse Directories</h1>
        <p className={styles.description}>Select a category to view links.</p>
      </header>

      <Suspense
        fallback={<div className="skeleton-verse">Loading sections...</div>}
      >
        <SectionsList />
      </Suspense>
    </main>
  );
}
