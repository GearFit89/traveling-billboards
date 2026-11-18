



import {  siteContent, thoughtsPageContent } from '@/lib/content';

import styles from '@/styles/Comment.module.css';
import { redirect } from 'next/navigation'
import type { Thought as ThoughtData } from '@/payload-types';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { formatDate } from '@/lib/utils/formatDate';
import "@/styles/globals.css";




export  async function Thought({ thought }: {thought: ThoughtData}) {
  const content =  thoughtsPageContent

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <article className={styles.thoughtCard}>

          <div className={styles.articleContent}>
            {thought.content ? (
              <RichText className={styles.richContent} data={thought.content} />
            ) : null}
          </div>
        </article>
      </main>
    </div>
  );
}
