
import { getAllSigns} from '@/lib/actions';
import {  siteContent, thoughtsPageContent } from '@/lib/content';
import { Icon } from '@/lib/icons';
import styles from '@/styles/Thoughts.module.css';
import { redirect } from 'next/navigation'
import { SignData, ThoughtData } from '@/types';

import "@/styles/globals.css";

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}


export  async function Thought({ thought }: {thought: ThoughtData}) {
  const content =  thoughtsPageContent

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <header className={styles.pageHeader}>
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

        <article className={styles.articleWrapper}>
          <header className={styles.articleHeader}>
            {thought.title && (
              <h1 className={styles.articleTitle}>{thought.title}</h1>
            )}
            <div className={styles.articleMeta}>
              {/* {thought?.location && (
                <span className={styles.metaItem}>
                  <span className={styles.metaIcon}>
                    <Icon name="location" size={14} />
                  </span>
                
                </span>
              )} */}
              <span className={styles.metaItem}>
                <span className={styles.metaIcon}>
                  <Icon name="calendar" size={14} />
                </span>
                {formatDate(thought.date)}
              </span>
            </div>
          </header>

          <div className={styles.articleContent}>
            {thought.html ? (
              <div 
                className={styles.richContent}
                dangerouslySetInnerHTML={{ __html: thought.html }}
              />
            ) : thought.content ? (
              <div className={styles.plainContent}>
                {thought.content}
              </div>
            ) : null}
          </div>
        </article>
      </main>
    </div>
  );
}
