import { Suspense } from "react";
import Spinner from "@/ui/spinner";
import getDailyVerse from "@/utils/dailyVerseGetter";
import styles from "./Home.module.css";
import "@/app/globals.css";

export const runtime = "edge";

async function BibleVerse() {
  const data = await getDailyVerse();

  return (
    <div className={styles.verseCard}>
      <span className={styles.verseLabel}>Verse of the Day</span>
      <p className={styles.verseText}>&ldquo;{data.verse.details.text}&rdquo;</p>
      <cite className={styles.verseRef}>— {data.verse.details.reference}</cite>
    </div>
  );
}

export default function Home() {
  return (
    <main className={styles.page}>
      {/* Hero */}
      <header className={styles.hero}>
        <span className={styles.eyebrow}>Welcome</span>
        <h1 className={styles.heroTitle}>Traveling Billboards</h1>
        <p className={styles.heroSubtitle}>
          A curated space for links, signs, and reflections worth sharing.
        </p>
      </header>

      {/* Daily verse */}
      <section className={styles.verseSection} aria-label="Daily Bible Verse">
        <Suspense fallback={<Spinner />}>
          <BibleVerse />
        </Suspense>
      </section>

      {/* Intro content */}
      <section className={styles.contentSection}>
        <div className={styles.contentCard}>
          <p className={styles.contentParagraph}>
            There will be introduction text here to welcome your visitors.
          </p>
        </div>
      </section>
    </main>
  );
}
