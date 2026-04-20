import { Suspense } from "react";
import Spinner from "@/ui/spinner"; 
import getDailyVerse from "@/utils/dailyVerseGetter";
import styles from "./Home.module.css"; // Import home module
import "@/app/globals.css"; // Ensure global tokens are available

export const runtime = "edge";

async function BibleVerse() {
    // Fetching the daily data
    const data = await getDailyVerse();

    return (
        <div className={styles.verseContainer}>
            {/* Using the themed verse text class */}
            <p className={styles.verseText}>
                "{data.verse.details.text}"
            </p>
            {/* Using the themed muted citation class */}
            <cite className={styles.verseRef}>
                — {data.verse.details.reference}
            </cite>
        </div>
    );
}

export default function Home() {
    return (
        <main className={styles.appContainer}>
            <header className={styles.headerSection}>
                <h1 className={styles.messageTitle}>Welcome to Traveling Billboards!</h1>
                <p className={styles.messageParagraph}>This is the home page.</p>
            </header>

            <Suspense fallback={<Spinner />}>
                <BibleVerse />
            </Suspense>

            <section className={styles.mainContent}>
                <p className={styles.messageParagraph}>
                    This is a demo. There will be introduction text here to welcome your visitors.
                </p>
            </section>
        </main>
    );
}