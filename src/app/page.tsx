import Link from 'next/link';
import "@/styles/globals.css"

import { siteContent, homePageContent } from '@/lib/content';
import { Icon } from '@/lib/icons';
import styles from '@/styles/Home.module.css';
import BibleVerse from '@/components/home/BibleVerse';
import { Suspense } from 'react';
import Skeleton from '@/components/fallbacks/Skeleton';
export default function HomePage() {
  const { hero, stats, features } = homePageContent;

  return (
    <div className={styles.container}>
     
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.tagline}>{hero.tagline}</p>
          <h1 className={styles.title}>
            {hero.titleLine1}<span className={styles.titleAccent}>.</span>
            <br />
            {hero.titleLine2}
          </h1>
          <p className={styles.description}>{hero.description}</p>
          <div className={styles.buttons}>
            <Link href={hero.primaryButtonHref} className={styles.primaryBtn}>
              {hero.primaryButtonText}
              <Icon name="arrowRight" size={16} />
            </Link>
            <Link href={hero.secondaryButtonHref} className={styles.secondaryBtn}>
              {hero.secondaryButtonText}
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.stats}>
        <div className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.statCard}>
              <div className={styles.statNumber}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.features}>
        <p className={styles.sectionTitle}>{features.sectionTagline}</p>
        <h2 className={styles.sectionHeading}>{features.sectionHeading}</h2>
        
        <div className={styles.featuresGrid}>
          {features.items.map((feature, index) => (
            <Link key={index} href={feature.link} className={styles.featureCard}>
              <div className={styles.featureIcon}>
                {feature.iconKey && <Icon name={feature.iconKey} size={32} />}
              </div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </Link>
          ))}
        </div>
      </section>
   <section className={styles.VerseContent } >
      <Suspense fallback={<Skeleton/>}>

       <BibleVerse />

       </Suspense>
      </section>
    </div>
  );
}
