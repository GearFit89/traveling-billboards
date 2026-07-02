
'use client'

import { useState } from 'react';
import "@/styles/globals.css";
import styles from '@/styles/Chat.module.css';
import { messageBoardContent } from '@/lib/content'; // Adjust path if needed
import { X } from 'lucide-react';
import { Icon } from '@/lib/icons';
import { postMessage } from '@/lib/server-actions';
import { MessageType } from '@/types';
import { setEngine } from 'crypto';
import { LOCAL_STROAGE_KEYS } from '@/const';
import Button from '@/client/Button';

export  default function SubmitPanel({ 
    type,
     onClose, 
    isOpen, 
    shouldGetReply } : {
     type : MessageType, 
    onClose: (e: MouseEvent )=> void, 
    isOpen: boolean, 
    shouldGetReply: boolean}) {
  const [ message, setMessage] = useState("");
  const [ email, setEmail ] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, SetError] = useState("");
  if(!isOpen) {
    return null;
  }

  return ( 
            /* State B: Contextual Form Inline Injection */
            <div className={`${styles.fadeContainer} ${styles.slideIn}`}>
              <div className={styles.panelHeader}>
                <span>{messageBoardContent.submit.requestTitle}</span>
                 <Button 
                  className={styles.inlineCloseBtn} 
                  onClick={onClose}
                >
                  <X>
                  {messageBoardContent.submit.backBtn}
                  </X>
                </Button>
              </div>

              <div className={styles.inlineFormLayout}>
                <div className={styles.fieldGroup}>
                  <label className={styles.formLabel}>
                    Message
                  </label>
                  <textarea 
                    className={styles.textarea} 
                    placeholder={messageBoardContent.submit.placeholder} 
                    rows={4}
                    value={message}
                    onChange={({target})=> setMessage(target.value)}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.formLabel}>
                    {messageBoardContent.submit.emailText} 
                    <span className={styles.optionalText}> ({messageBoardContent.submit.optional})</span>
                  </label>
                  <input 
                    type="email"
                    className={styles.inputField} 
                    placeholder="you@example.com" 
                    value={email}
                    onChange={({target})=> setEmail(target.value)}
                    
                  />
                </div>

                <div className={styles.actionsContainer}>
                  <Button 
                  className={styles.submitBtn}
                   onClick={async () => {

                    try{

                    //start the sending state effect
                    setIsSending(true);

                    //grab the token for knowing if a reply has arrived
                    const { token } = await postMessage({
                    type,
                    message,
                    email
                   })

                   if(token && shouldGetReply) {

                   
                      localStorage.setItem(`${LOCAL_STROAGE_KEYS.MESSAGE_TOKEN}:${type}`, token);
                
                    
                   }else if(!token && shouldGetReply){

                     // if the message needs to have reply and the token is not there,
                    // then we set an error

                    throw new Error("Token not vaild")
                   }

                   //save token to storage if we a reply is possible
                 
                  }catch(e: any){
                    SetError(e.message);
                    console.error("error with message submit", e);

                  }
                  finally{
                    setIsSending(false);

                  }
                   
                  // saves the token, so when the user comes back we know which user to give it to.
                     
                  }

                  
                  }
                  >
                    
                    {messageBoardContent.submit.sendBtn}
                  </Button>
                  
                </div>
              </div>
            </div>
       
      
  )


}
