"use client";

import React, { useEffect, useState } from "react";
import { SignData } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/lib/icons';
import styles from '@/styles/Home.module.css';

export default function Carousel({ signs }: { signs: SignData[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!signs || signs.length === 0) return;
    const id = setInterval(() => setIndex(i => (i + 1) % signs.length), 5000);
    return () => clearInterval(id);
  }, [signs]);

  if (!signs || signs.length === 0) return null;

  const cur = signs[index];

  return (
    <div className={styles.carouselSection} role="region" aria-label="Signs carousel">
      <div className={styles.carouselInner}>
        <button
          className={styles.carouselBtn}
          aria-label="Previous sign"
          onClick={() => setIndex((index - 1 + signs.length) % signs.length)}
        >
          <Icon name="arrowLeft" />
        </button>

        <div className={styles.carouselCard}>
          <div className={styles.carouselTextBox}>
            <div className={styles.carouselTextInner}>
              <h3 className={styles.carouselTitle}>{cur.title}</h3>
              <p className={styles.carouselDesc}>{cur.description}</p>
              <Link href={`/signs/${cur.id}`} className={styles.carouselLink}>
                View Sign
              </Link>
            </div>
          </div>

          {cur.img_key && (
            <div className={styles.carouselImageWrapper}>
              <Image
                src={cur.img_key}
                alt={cur.img_alt || cur.title}
                fill
                sizes="100vw"
                className={styles.carouselImage}
              />
            </div>
          )}
        </div>

        <button
          className={styles.carouselBtn}
          aria-label="Next sign"
          onClick={() => setIndex((index + 1) % signs.length)}
        >
          <Icon name="arrowRight" />
        </button>
      </div>

      <div className={styles.carouselDots}>
        {signs.map((_, i) => (
          <button
            key={i}
            className={`${styles.carouselDot} ${i === index ? styles.activeDot : ''}`}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
