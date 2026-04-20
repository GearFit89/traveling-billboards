// Using 'use client' because error boundaries in Next.js must be client components
'use client';

import Link from 'next/link';

export default function ErrorPage({ error, message, code, reset }: { error?: Error, message?: string, code: number , reset:Function}) {
    // Fallback message logic
    const errMessage = error?.message || message || "An unexpected error occurred.";

    return (
        <main style={containerStyle}>
            <section style={cardStyle}>
                <h1 style={titleStyle}>Oops! Something went wrong</h1>

                <div style={badgeStyle}>
                    Error Code: {code}
                </div>

                <p style={messageStyle}>
                    {errMessage}
                </p>

                {/* Data debugging section - scrollable for mobile */}
                <div style={debugBoxStyle}>
                    <pre style={preStyle}>
                        {error ? JSON.stringify(error, Object.getOwnPropertyNames(error), 2) : "No additional data available."}
                    </pre>
                </div>
        <button onClick={()=>reset()}> Retry</button>
                
            </section>
        </main>
    );
}

// --- Styles following your rem/% and Flexbox rules ---

const containerStyle: React.CSSProperties = {
    display: 'flex',              // Using flexbox
    flexDirection: 'column',      // Mobile-first stack
    alignItems: 'center',         // Center horizontally
    justifyContent: 'center',     // Center vertically
    minHeight: '100vh',           // Take whole screen
    padding: '2rem',              // Scalable padding
    backgroundColor: '#f8f9fa'
};

const cardStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,                  // Grow to fill available space
    width: '100%',                // Full width for mobile
    maxWidth: '40rem',            // Constraint using rem
    textAlign: 'center'
};

const titleStyle: React.CSSProperties = {
    fontSize: '2rem',             // Responsive size
    marginBottom: '1rem'
};

const badgeStyle: React.CSSProperties = {
    fontSize: '0.8rem',
    color: '#666',
    marginBottom: '1.5rem'
};

const messageStyle: React.CSSProperties = {
    fontSize: '1.2rem',
    marginBottom: '2rem'
};

const debugBoxStyle: React.CSSProperties = {
    backgroundColor: '#eeeeee',
    padding: '1rem',
    borderRadius: '0.5rem',
    overflowX: 'auto',           // Prevent screen stretching
    textAlign: 'left',
    marginBottom: '2rem',
    fontSize: '0.85rem'
};

const preStyle: React.CSSProperties = {
    whiteSpace: 'pre-wrap',      // Wrap text on small screens
    wordBreak: 'break-all'
};

const buttonStyle: React.CSSProperties = {
    padding: '1rem 2rem',
    backgroundColor: '#0070f3',
    color: 'white',
    borderRadius: '0.5rem',
    textDecoration: 'none',
    fontWeight: 'bold'
};