import type { Sign as S } from "@/payload-types";
import "@/styles/globals.css"
import styles from "@/styles/Signs.module.css"

import Image from "next/image"


export function Sign({ sign }: { sign: S}) {
  const image = typeof sign.image === "object" ? sign.image : null;
  const imageUrl = image?.url;
  return (
    <div className={styles.signWrapper}>
      <div className={styles.container}>
        {/* Render the populated sign image when a URL is available. */}
        {imageUrl && (
          <div className={styles.imageFrame}>
            <Image
              src={imageUrl}
              alt={sign.imgAlt || sign.title}
              fill
              priority
              className={styles.actualImage}
            />
          </div>
        )}

        <div className={styles.thoughtsSection}>
          <h2 className={styles.signTitle}>{sign.title}</h2>
          <p className={styles.signDescription}>{sign.description}</p>


        </div>
      </div>

      {/*  Separator Between Signs */}
      <div className={styles.signSeparator} />
    </div>
  )
}
