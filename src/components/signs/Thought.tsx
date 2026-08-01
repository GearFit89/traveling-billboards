
'use client';

import { useEffect, useState } from 'react';
import { ThoughtData as IComments, SignData, ThoughtData } from '@/types';

import { Icon } from '@/lib/icons';
import { formatDate } from '@/lib/utils';

import styles from '@/styles/Thoughts.module.css';
import { thoughtsPageContent } from '@/lib/content';
import QRCodeSuccessModal from '../confetti';
import { usePathname, useSearchParams } from 'next/navigation';






const MessageCard = ({ thought }: { thought: ThoughtData }  ) => { 
    return ( 
        <article className={styles.messageCard}> {/* Apply message card styles */}
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
                {formatDate(thought.date || '')}
              </span>
            </div>
          </header>
          {/* Render the thought content, either as rich HTML or plain text
          the html is vaildated and sanitized before being passed to this component, 
          on the server before going to
           the database so it is safe to use dangerouslySetInnerHTML */}
          
          
            <div dangerouslySetInnerHTML={{__html:thought.content|| "<p>No content available</p>"}} className={styles.articleContent} /> 
               
            
        </article> 
    ); 
}; 



export function Thoughts({thoughts}:{thoughts: ThoughtData[]}) { 
     
const content = thoughtsPageContent;
    const [showPopup, setShowPopup] = useState(false);
    const searchParams = useSearchParams();
 useEffect(() => {
    let timer = null;

    // Check if we are running in the browser and look for the hash
    if (typeof window !== 'undefined' && window.location.hash === '#qr-code') {
      setShowPopup(true);

      timer = setTimeout(() => {
        setShowPopup(false);
      }, 90000); // 90 seconds
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [searchParams]); 
    if(thoughts.length === 0 || thoughts === undefined || thoughts === null) {
        return (
            <div className={styles.container}>
              
                    <p className={styles.thoughtsCountMessage}>{content.noThoughtsMessage}</p>
               
            </div>
        );
    }
    
    console.log("Thoughts component received thoughts:", thoughts);
   
     const contentStyle = styles.mainContent; 
 
    return ( 
        <div className={styles.container}> {/* Apply main wrapper styles */}
          {showPopup && (
          
            <QRCodeSuccessModal isOpen={showPopup} onClose={()=>setShowPopup(false)} /> 
            
          )}
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

      
         
                
            <main className={contentStyle}> 

                
           
                <p className={styles.thoughtsCountMessage}>{thoughts.length} thought{thoughts.length > 1 ? 's' : ''} found for this sign.</p>
            
                {thoughts.map(thought => (
                    <MessageCard key={thought.id} thought={thought} />
                     
                ))}
                <section className={styles.resourceGrid}> 
                    
                </section> 

            </main> 

           

        </div> 
    ); 
} 
