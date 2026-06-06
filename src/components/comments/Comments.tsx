
import { Comments as IComments, SignData } from '@/types';

import React, { useState, useEffect,  } from 'react'; // Import React and necessary hooks
import "./../app/globals.css"

import styles from "./Comments.module.css"

// --- COMPONENTS --- // Start component definitions



interface MessageCardProps { // Define props interface for MessageCard
    title: string; // Expect a title string
    htmlStr:string; // Expect an array of paragraph strings
} // End MessageCardProps interface

const MessageCard: React.FC<MessageCardProps> = ({ title, htmlStr  }) => { // Define MessageCard component with props
    return ( // Return component JSX
        <article className={styles.messageCard}> {/* Apply message card styles */}
            <h1 className={styles.messageTitle}>{title}</h1> {/* Render dynamic title */}
            <div dangerouslySetInnerHTML={{__html:htmlStr}}> {/* Container for paragraphs */}
               
            </div> {/* End paragraphs container */}
        </article> // End article element
    ); // End MessageCard return
}; // End MessageCard component

// --- MAIN APP COMPONENT --- // Start main App definition

export function Comments({signData}:{signData:SignData}) { // Export default App component
     // Empty dependency array means this runs once on mount
const comments = signData.comments 
    // Simulate data that might be fetched based on a URL parameter // Example data comment
    // End mock data object
    // const {isDesktop } = useWindowSize()
    // // Combine base styles with desktop overrides if applicable // Styling logic comment
    //how to use these stlyes destop  imean if u can find out hte stlyes on the client
     const contentStyle = styles.mainContent; // Merge styles based on screen size

    return ( // Return main App JSX
        <div className={styles.appContainer}> {/* Apply main wrapper styles */}

            {/* Render the top navigation bar */}

            <main className={contentStyle}> {/* Render main content area with dynamic styles */}

                <header className={styles.headerSection}> {/* Header area for sign context */}
                    <div className={styles.signBadge}>Scanned Sign #{signData.id}</div> {/* Display which sign was scanned */}
                    <p >A message from Gary's tailgate.</p> {/* Context subtitle */}
                </header> 
                {/* End header area */}
                {comments.map(comment => (
                    <MessageCard title={comment.title} htmlStr={comment.html} />
                     
                ))}
                <section className={styles.resourceGrid}> {/* Render grid for action buttons */}
                    
                </section> {/* End action buttons grid */}

            </main> {/* End main content area */}

           

        </div> // End main wrapper
    ); // End main App return
} // End App component