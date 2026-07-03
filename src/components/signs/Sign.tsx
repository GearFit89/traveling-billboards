import "@/styles/globals.css"
import styles from "@/styles/Signs.module.css"
import { SignData } from "@/types"
import Image from "next/image"


export function Sign({ sign }: { sign: SignData }) {
  // Check if an image actually exists
  const hasImage = !!sign.img_key;

  return (
    <div className={styles.signWrapper}>
      <div className={styles.container}>
        {/*  Image Container - Only renders if img_key is present */}
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