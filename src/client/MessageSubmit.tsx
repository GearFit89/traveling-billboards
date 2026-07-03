"use client";

import { useState } from "react";
import { messageBoardContent } from "@/lib/content";
import Button from "./Button";
import NavigateBackButton from "@/components/navigation/BackButton";
import { postMessage } from "@/lib/server-actions";
import { MessageType } from "@/types";
import { LOCAL_STROAGE_KEYS } from "@/const";

import styles from "@/styles/Chat.module.css";
import { useRouter } from "next/router";
import Console from "@/utils/console";
const debugConsole = new Console("Message_submit_client");

export default function MessageSubmit({ type, onSuccess }: { type: MessageType, onSuccess:(token:string)=> any }) {
  const content = messageBoardContent.submit;

 

  const [textInput, setTextInput] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await postMessage({
        type,
        message: textInput,
        email,
       
      });

      if (!data || !data?.success || !data.token) {
        throw new Error("Data failed to load");
      }

      localStorage.setItem(LOCAL_STROAGE_KEYS.MESSAGE_TOKEN, data.token);
      
     onSuccess(data.token);


      setTextInput("");
      setEmail("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      debugConsole.error("Error with posting message", e)
    } finally {

        // so that the user may click the btn again
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.layoutStack}>
        
        {/* Message Input Field */}
        <div className={styles.fieldGroup}>
          <textarea
            placeholder={content.placeholder}
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            rows={4}
            className={styles.textarea}
          />
        </div>

        {/* Email Input Field */}
        <div className={styles.fieldGroup}>
          <label className={styles.label}>
            {content.emailText}
            {content.optional && (
              <span className={styles.optionalText}>
                {content.optional}
              </span>
            )}
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
        </div>

        {/* Error Notification Banner */}
        {error && (
          <div className={styles.errorBanner}>
            {error}
          </div>
        )}

        {/* Action Controls */}
        <div className={styles.actionsContainer}>
          <Button 
            onClick={handleSubmit} 
            disabled={isLoading}
            className={styles.submitBtn}
          >
            {isLoading ? content.sending : content.sendBtn}
          </Button>
          
          <NavigateBackButton className={styles.backBtn}>
            {content.backBtn}
          </NavigateBackButton>
        </div>

      </div>
    </div>
  );
}