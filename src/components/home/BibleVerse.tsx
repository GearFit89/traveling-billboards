

import { Suspense } from "react";
import Spinner from "@/components/fallbacks/Spinner"
import getDailyVerse from "@/utils/dailyVerseGetter";

import "@/app/globals.css";
import styles from "./BibleVerse.module.css";


export default async function BibleVerse() {
  const data = await getDailyVerse();

  return (
    <div className={styles.verseCard}>
      <span className={styles.verseLabel}>Verse of the Day</span>
      <p className={styles.verseText}>&ldquo;{data.verse.details.text}&rdquo;</p>
      <cite className={styles.verseRef}>— {data.verse.details.reference}</cite>
    </div>
  );
}
