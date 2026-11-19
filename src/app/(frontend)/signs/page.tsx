import { getAllSigns } from "@/lib/actions";
import { siteContent, thoughtsPageContent } from "@/lib/content";
import { AppError } from "@/utils/error";
import styles from "@/styles/Thoughts.module.css";
import "@/styles/globals.css";

import { Suspense } from "react";
import { Thoughts } from "@/components/signs/Thought";
import { Spinner } from "@/components/ui/spinner"; //scdu ui component for loading state
import { Sign } from "@/components/signs/Sign";
import errorHandler from "@/lib/error-handler";
import { ErrorPageSigns } from "@/components/signs/SignError";
import Link from "next/link";
import { NavBar } from "@/components/navigation/NavBar";

// This page will fetch all signs from the database and display them in a list format. Each sign will show its content, location, and date. The page will also include a header with a title and subtitle.
export async function LoadSignsList() {
  const sign = await getAllSigns();

  if (!sign.success) {
    console.error("error", sign.error);
    errorHandler(sign.error || "Sign not found", 404);
    return;
  }

  return (
    <div className={styles.container}>
      {sign.data.map((sign) => (
        <Link href={`/signs/${sign.id}`} key={sign.id}>
          <Sign sign={sign} />
        </Link>
      ))}
    </div>
  );
}
export default function SignListPage() {
  return (
    <div className={styles.signPageWrapper}>
      <NavBar page="signs" />
      <Suspense fallback={<Spinner />}>
        <LoadSignsList />
      </Suspense>
    </div>
  );
}
