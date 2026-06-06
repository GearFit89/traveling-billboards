import "@/styles/globals.css"
import styles from "@/styles/Signs.module.css"
import { SignData } from "@/types"
import Image from "next/image"
import { Thought } from "./Thought"

export function Sign({ sign }: { sign: SignData }) {
  return (
    <div className={styles.container}>
      {/* 1. Image Container */}
      <div className={styles.imageFrame}>
        <Image
          src={sign.img_key}
          alt={sign.img_alt} 
          fill
          priority
          className={styles.actualImage}
        /> 
      </div>

      {/* 2. Thoughts Container (Sits cleanly below or next to the image) */}
      <div className={styles.thoughtsSection}>
        {sign.thoughts.map((thought, index) => (
          <div key={index} className={styles.thoughtCard}>
            <Thought thought={thought} /> 
             {index < sign.thoughts.length - 1 && <div className={styles.divider} />}
          
          </div>
        ))}
       {sign.thoughts?.length === 0}
      </div>
    </div>
  )
}