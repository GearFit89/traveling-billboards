import "@/styles/globals.css"
import styles from "@/styles/Signs.module.css"
import { SignData } from "@/types"
import Image from "next/image"
import { Thought } from "./Thought"

export function Sign({ sign }: { sign: SignData }) {
  // Check if an image actually exists
  const hasImage = !!sign.img_key;

  return (
    <div className={styles.signWrapper}>
      <div className={styles.container}>
        {/* 1. Image Container - Only renders if img_key is present */}
        {hasImage && (
          <div className={styles.imageFrame}>
            <Image
              src={sign.img_key}
              alt={sign.img_alt || sign.title} 
              fill
              priority
              className={styles.actualImage}
            /> 
          </div>
        )}

        {/* 2. Thoughts Container */}
        <div className={styles.thoughtsSection}>
          <h2 className={styles.signTitle}>{sign.title}</h2>
          <p className={styles.signDescription}>{sign.discription}</p>
          
          {sign.thoughts && sign.thoughts.length > 0 && (
            <div className={styles.thoughtsList}>
              {sign.thoughts.map((thought, index) => (
                <div key={thought.id || index} className={styles.thoughtCard}>
                  <Thought thought={thought} /> 
                  {index < sign.thoughts.length - 1 && <div className={styles.divider} />}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* 3. Separator Between Signs */}
      <div className={styles.signSeparator} />
    </div>
  )
}