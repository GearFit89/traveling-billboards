



import { getAllSigns} from '@/lib/actions';
import {  siteContent, thoughtsPageContent } from '@/lib/content';
import { Icon } from '@/lib/icons';
import styles from '@/styles/Comment.module.css';
import { redirect } from 'next/navigation'
import { SignData, ThoughtData } from '@/types';
import { formatDate } from '@/lib/utils';
import "@/styles/globals.css";




export  async function Thought({ thought }: {thought: ThoughtData}) {
  const content =  thoughtsPageContent

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <article className={styles.thoughtCard}>

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
