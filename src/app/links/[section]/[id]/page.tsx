import { Suspense } from "react";
import Link from "next/link";
import { getLinkCache } from "@/services/cacher";
import { LinkData } from "@/types";
import styles from "@/app/styles/links.module.css";
import { ArrowLeft } from "lucide-react";

// Find the specific link by ID
//  jjj if i ===
//
//
//
//
//
async function LinkDetail({ linkId }: { linkId: string }) {

  const response = await getLinkCache( linkId);

  const linkData = response.data as LinkData;
  if (!linkData) {
    return (
      <p className={styles.description}>Sorry, this link could not be found.</p>
    );
  }

  return (
    <div className={styles.detailCard}>
      <h2 className={styles.title}>{linkData.title}</h2>
      {/* Note: Pulling 'discription' exactly as it is spelled in types.ts */}
      <p className={styles.description}>{linkData.discription}</p>

      <a
        href={linkData.link}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.linkButton}
      >
        Visit URL
      </a>
    </div>
  );
}

export default async function LinkDetailPage({
  params,
}: {
  params: Promise<{ section: string; id: string }>;
}) {
  const getParams = await params;
  return (
    <main className={styles.container}>
      <Link href={`/links/${getParams.section}`} className={styles.linkButton}>
        <ArrowLeft size={"3rem"} />
        or &larr; Back to {decodeURIComponent(getParams.section)}
      </Link>

      <Suspense
        fallback={<div className="skeleton-verse">Loading link details...</div>}
      >
        <LinkDetail linkId={getParams.id} />
      </Suspense>
    </main>
  );
}
