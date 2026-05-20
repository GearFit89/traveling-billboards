import styles from "@/app/styles/links.module.css";

export default function SignsPage() {
  return (
    <main className={styles.container}>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Signs</h1>
        <p className={styles.description}>Billboard signs will appear here.</p>
      </header>
    </main>
  );
}
