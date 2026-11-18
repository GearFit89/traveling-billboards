"use client";

import { useEffect, useState } from "react";
import type { Thought } from "@/payload-types";
import { RichText } from "@payloadcms/richtext-lexical/react";

import { Icon } from "@/components/icons";
import { formatDate } from "@/lib/utils/formatDate";

import styles from "@/styles/Thoughts.module.css";
import { thoughtsPageContent } from "@/lib/content";
import QRCodeSuccessModal from "../confetti";
import { usePathname, useSearchParams } from "next/navigation";
import { MessageSquare } from "lucide-react";

const MessageCard = ({ thought }: { thought: Thought }) => {
  return (
    <article className={styles.messageCard}>
      {" "}
      {/* Apply message card styles */}
      <header className={styles.articleHeader}>
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
            {formatDate(thought.date || "")}
          </span>
        </div>
      </header>
      <div className={styles.articleContent}>
        {thought.content ? (
          <RichText data={thought.content} />
        ) : (
          <p>No content available</p>
        )}
      </div>
    </article>
  );
};

export function Thoughts({ thoughts }: { thoughts: Thought[] }) {
  const content = thoughtsPageContent;
  const [showPopup, setShowPopup] = useState(false);
  const searchParams = useSearchParams();
  useEffect(() => {
    let timer = null;

    // Check if we are running in the browser and look for the hash
    if (typeof window !== "undefined" && window.location.hash === "#qr-code") {
      setShowPopup(true);

      timer = setTimeout(() => {
        setShowPopup(false);
      }, 90000); // 90 seconds
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [searchParams]);
  if (thoughts.length === 0 || thoughts === undefined || thoughts === null) {
    return (
      <div className={styles.container}>
        <p className={styles.thoughtsCountMessage}>
          {content.noThoughtsMessage}
        </p>
      </div>
    );
  }

  console.log("Thoughts component received thoughts:", thoughts);

  const contentStyle = styles.mainContent;

  return (
    <div className={styles.container}>
      {" "}
      {/* Apply main wrapper styles */}
      {showPopup && (
        <QRCodeSuccessModal
          isOpen={showPopup}
          onClose={() => setShowPopup(false)}
        />
      )}
      <header className={styles.pageHeader}>
        <div className={styles.badge}>
          <span className={styles.badgeIcon}>
            <Icon name={content.badgeIconKey} size={16} />
          </span>
          {content.badge}
        </div>
        <h1 className={styles.title}>
          {content.title}
          <span className={styles.titleAccent}>.</span>
        </h1>
        <p className={styles.subtitle}>{content.subtitle}</p>
      </header>
      <main className={contentStyle}>
        {/* Container wrapping icon and badge */}
        <div className="relative inline-flex items-center">
          {/* Modern, relevant icon */}
          <MessageSquare className="h-5 w-5 text-muted-foreground" />

          {/* Styled count badge */}
          <span className="ml-1.5 flex h-6 min-w-6 items-center justify-center rounded-md border border-primary bg-background px-1.5 text-xs font-semibold text-foreground shadow-sm">
            {thoughts.length}
          </span>
        </div>
        {thoughts.map((thought) => (
          <MessageCard key={thought.id} thought={thought} />
        ))}
        <section className={styles.resourceGrid}></section>
      </main>
    </div>
  );
}
