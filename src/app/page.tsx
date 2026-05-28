import Link from 'next/link';
import { Navigation } from '@/components/navigation/Navigation';
import { siteContent, homePageContent } from '@/lib/content';
import { Icon } from '@/lib/icons';
import styles from './Home.module.css';

export default function HomePage() {
  const { hero, stats, features } = homePageContent;

  return (
    <div className={styles.container}>
      <Navigation />

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
            <div key={index} className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Icon name={feature.iconKey} size={24} />
              </div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        <p className={styles.footerText}>
          {siteContent.siteName.split(' ')[0]}
          <span className={styles.footerAccent}>.</span>{' '}
          {siteContent.siteName.split(' ').slice(1).join(' ')} — {siteContent.footerText}
        </p>
      </footer>
    </div>
  );
}
