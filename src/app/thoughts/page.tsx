import { Navigation } from '@/components/navigation/Navigation';
import { getAllThoughts, type MoodType } from '@/lib/mock-db';
import { siteContent, thoughtsPageContent } from '@/lib/content';
import { Icon } from '@/lib/icons';
import styles from './Thoughts.module.css';

function getMoodClass(mood: MoodType) {
  const moodClasses: Record<MoodType, string> = {
    reflective: styles.moodReflective,
    excited: styles.moodExcited,
    curious: styles.moodCurious,
    peaceful: styles.moodPeaceful,
  };
  return moodClasses[mood];
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function ThoughtsPage() {
  const thoughts = getAllThoughts();
  const content = thoughtsPageContent;

  return (
    <div className={styles.container}>
      <Navigation />

      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>
              <Icon name={content.badgeIconKey} size={16} />
            </span>
            {content.badge}
          </div>
          <h1 className={styles.title}>
            {content.title}<span className={styles.titleAccent}>.</span>
          </h1>
          <p className={styles.subtitle}>{content.subtitle}</p>
        </header>

        <div className={styles.thoughtsList}>
          {thoughts.map((thought, index) => (
            <div key={thought.id}>
              <article className={styles.thoughtCard}>
                <p className={styles.thoughtContent}>{`"${thought.content}"`}</p>
                <div className={styles.thoughtMeta}>
                  <span className={styles.metaItem}>
                    <span className={styles.metaIcon}>
                      <Icon name="location" size={14} />
                    </span>
                    {thought.location}
                  </span>
                  <span className={styles.metaItem}>
                    <span className={styles.metaIcon}>
                      <Icon name="calendar" size={14} />
                    </span>
                    {formatDate(thought.date)}
                  </span>
                  <span className={`${styles.moodBadge} ${getMoodClass(thought.mood)}`}>
                    {thought.mood}
                  </span>
                </div>
              </article>
              {index < thoughts.length - 1 && <div className={styles.divider} />}
            </div>
          ))}
        </div>
      </main>

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
