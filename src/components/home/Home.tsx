// import { Suspense } from "react";
// import Spinner from "@/components/fallbacks/Spinner"
// import getDailyVerse from "@/utils/dailyVerseGetter";
// import styles from "./Home.module.css";
// import "@/app/globals.css";
// //please delete this file
// export default function Home() {
//   return (
//     <main className={styles.page}>
//       {/* Hero */}
//       <header className={styles.hero}>
//         <span className={styles.eyebrow}>Welcome</span>
//         <h1 className={styles.heroTitle}>Traveling Billboards</h1>
//         <p className={styles.heroSubtitle}>
//           A curated space for links, signs, and reflections worth sharing.
//         </p>
//       </header>

//       {/* Daily verse */}
//       <section className={styles.verseSection} aria-label="Daily Bible Verse">
//         <Suspense fallback={<Spinner />}>
//           {/* <BibleVerse /> */}
//         </Suspense>
//       </section>

//       {/* Intro content */}
//       <section className={styles.contentSection}>
//         <div className={styles.contentCard}>
//           <p className={styles.contentParagraph}>
//             There will be introduction text here to welcome your visitors.
//           </p>
//         </div>
//       </section>
//     </main>
//   );
// }
