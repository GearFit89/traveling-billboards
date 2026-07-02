'use client'

import { useState } from 'react';
import "@/styles/globals.css";
import styles from '@/styles/Chat.module.css';
import { messageBoardContent } from '@/lib/content'; // Adjust path if needed
import { X } from 'lucide-react';
import { Icon } from '@/lib/icons';
import { postMessage } from '@/lib/server-actions';
import { MessageType } from '@/types';
import { setEngine } from 'crypto';
import { LOCAL_STROAGE_KEYS } from '@/const';
import Button from '@/client/Button';

export default function MessageBoard() {
  const [showSubmitForm, setShowSubmitForm] = useState(false);

  return (
    <main className={styles.page}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroInner}>
          <p className={styles.label}>{messageBoardContent.hero.label}</p>
          <h1 className={styles.title}>{messageBoardContent.hero.title}</h1>
          <p className={styles.description}>
            {messageBoardContent.hero.description}
          </p>
        </div>
      </section>

      {/* Grid Content Layout */}
      <section className={`${styles.optionsGrid} ${showSubmitForm ? styles.formActiveGrid : ''}`}>
        
        {/* Left Side: Live Chat Option Card */}
        <article className={`${styles.optionCard} ${showSubmitForm ? styles.cardDimmed : ''}`}>
          <h2>{messageBoardContent.liveChatCard.title}</h2>
          <p>{messageBoardContent.liveChatCard.description}</p>
          {/* <div className={styles.actionRow}>
            <Button 
              className={styles.primaryButton}
              onClick={() => setShowSubmitForm(true)}
            >
              {messageBoardContent.liveChatCard.primaryBtnText}
            </Button>
            <Button className={styles.secondaryButton}>
              {messageBoardContent.liveChatCard.secondaryBtnText}
            </Button> {/* <div className={styles.actionRow}>
            <Button 
              className={styles.primaryButton}
              onClick={() => setShowSubmitForm(true)}
            >
              {messageBoardContent.liveChatCard.primaryBtnText}
            </Button>
            <Button className={styles.secondaryButton}>
              {messageBoardContent.liveChatCard.secondaryBtnText}
            </Button>
          </div>
          </div> */}
        </article>

        {/* Right Side: Animated Interface Panel */}
        <article className={styles.textPanel}>
        
            /* State A: Interactive Chat Feed Simulator */
            <div className={styles.fadeContainer}>
              <div className={styles.panelHeader}>
                <span>{messageBoardContent.textPanel.headerTitle}</span>
                <span className={styles.statusBadge}>
                  {messageBoardContent.textPanel.statusBadge}
                </span>
              </div>

              <div className={styles.bubbleList}>
                {messageBoardContent.textPanel.messages.map((msg, index) => (
                  <div
                    key={index}
                    className={
                      msg.type === 'incoming' 
                        ? styles.bubbleIncoming 
                        : styles.bubbleOutgoing
                    }
                  >
                    {msg.text}
                  </div>
                ))}
              </div>

              <div className={styles.inputRow}>
                <input 
                  type="text" 
                  className={styles.textInput} 
                  placeholder={messageBoardContent.textPanel.inputPlaceholder}
                  onFocus={() => setShowSubmitForm(true)} 
                />
                <Button 
                  className={styles.sendButton}
                  onClick={() => setShowSubmitForm(true)}
                >
                  {messageBoardContent.textPanel.sendBtnText}
                </Button>
              </div>
            </div>
          </article>

          </section>

          </main>
  )
}

        

        

      