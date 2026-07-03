"use client"


import { clearAllCache } from "@/lib/server-actions";
import { useState } from "react";
import styles from "@/styles/DevDashboard.module.css";
import { LOCAL_STROAGE_KEYS } from "@/const";
import Button from "@/client/Button";

export default function DevDashboard() {
  const [cacheClearKey, setCacheClearKey] = useState("");
  const [message, setMessage] = useState("");

  const handleClearCache = async () => {
    try {
      const response = await clearAllCache(cacheClearKey);
      if (response.success) {
        setMessage("Cache cleared successfully.");
      } else {
        setMessage(`Error: ${response.error}`);
      }
    } catch (error) {
      setMessage(`Error: ${error}`);
    }
  };

  return (
    <div className={styles.dashboard}>
      <h1>Developer Dashboard</h1>
      <div className={styles.cacheClearSection}>
        <input
          type="text"
          placeholder="Enter cache clear    key"                

            value={cacheClearKey}   
            onChange={(e) => setCacheClearKey(e.target.value)}
            className={styles.input}
        />
        <Button onClick={handleClearCache} className={styles.button}>
          Clear Cache
        </Button>
      </div>

        {message && <p className={styles.message}> {message} </p>}
        </div>
    )
    }
