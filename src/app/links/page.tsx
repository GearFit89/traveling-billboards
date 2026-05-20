import { Suspense } from "react";
import Link from "next/link";
import { getLinkCache } from "@/services/cacher";
import { LinkData } from "@/types";
import styles from "@/app/styles/links.module.css";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import Image from "next/image"
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
          <Image src=`${APP_IMAGE_URL}${section}.png    z`> </Image>
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
      <h1 className={styles.title}>Browse Directories</h1>
      <p className={styles.description}>Select a category to view links.</p>

      {/* Suspense keeps the page static while fetching data */}
      <Suspense
        fallback={<div className="skeleton-verse">Loading sections...</div>}
      >
        <SectionsList />
      </Suspense>
    </main>
  );
}
