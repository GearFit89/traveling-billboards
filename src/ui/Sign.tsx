import { SignData } from "@/types";
import Image from "next/image";
import styles from "./Sign.module.css";

export default function Sign({ data }: { data: SignData }) {
  const imgLink = data.img_key;

  return (
    <article className={styles.signCard}>
      <div className={styles.imageWrapper}>
        <Image
          src={imgLink}
          fill
          sizes="(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 33vw"
          alt={data.img_alt}
          className={styles.image}
        />
      </div>
      {data.title && <h2 className={styles.signTitle}>{data.title}</h2>}
    </article>
  );
}
