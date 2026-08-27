import Link from 'next/link';
import "@/styles/globals.css"

import { siteContent, homePageContent } from '@/lib/content';
import { getAllSigns } from '@/lib/actions';
import Carousel from '@/components/signs/Carousel';
import { Icon } from '@/lib/icons';
import styles from '@/styles/Home.module.css';
import BibleVerse from '@/components/home/BibleVerse';
import { Suspense } from 'react';
import Skeleton from '@/components/fallbacks/Skeleton';

export default async function HomePage() {
  const { hero, stats, features } = homePageContent;
  const { data: signs } = await getAllSigns();

  return (
    <div className={styles.container}>

      {/* HERO SECTION: Tailgate Concept — sign styled onto the tailgate background */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroSign}>
            <p className={styles.tagline}>{hero.tagline}</p>
            <h1 className={styles.title}>
              {hero.titleLine1}
              <br />
              {hero.titleLine2}<span className={styles.titleAccent}>.</span>
            </h1>
          </div>
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

      {/* Carousel Section — featured signs, placed directly under the hero */}
      {signs && signs.length > 0 && (
        <section className={styles.carouselWrapper}>
          <h3 className={styles.sectionTitle}>Featured Designs</h3>
          <Carousel signs={signs} />
        </section>
      )}

      {/* Stats Section */}
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

      {/* Features Section */}
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

      {/* Verse Section */}
      <section className={styles.VerseContent}>
        <p className={styles.sectionTitle}>Verse of the Day</p>
        <Suspense fallback={<Skeleton />}>
          <BibleVerse />
        </Suspense>
      </section>

    
    </div>
  );
}