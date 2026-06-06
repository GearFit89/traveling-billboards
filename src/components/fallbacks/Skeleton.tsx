import "@/app/globals.css"
import styles from "@/app.module.css"

export default function Skeleton() { // Component for the loading state
    return (
        <div className={styles.scard}>
            <div className={styles.sheader}>
                <div className={styles.stitle}></div> {/* Shimmering title line */}
            </div>
            
            <div className={styles.sbodyWrapper}> {/* Container for text lines */}
                <div className={styles.sbody}></div> {/* Full shimmer line */}
                <div className={styles.sbody}></div> {/* Full shimmer line */}
                <div className={styles.sbodyShort}></div> {/* Shorter shimmer line */}
            </div>

            <div className={styles.sactions}>
                <div className={styles.sbutton}></div> {/* Left button shimmer */}
                <div className={styles.sbutton}></div> {/* Right button shimmer */}
            </div>
        </div>
    );
} // End Skeleton component

export function TextSkeleton() {
    return (
        <div className={styles.scard}>
            <div className={styles.sbodyWrapper}>
                <div className={styles.sbody}></div>
                <div className={styles.sbody}></div>
                <div className={styles.sbodyShort}></div>
            </div>
        </div>
    );
}

export function ImageSkeleton() {
    return (
        <div className={styles.scard}>
            <div className={styles.simage}></div>
            <div className={styles.sbodyWrapper}>
                <div className={styles.sbody}></div>
            </div>
        </div>
    );
}

export function HeaderSkeleton() {
    return (
        <div className={styles.scard}>
            <div className={styles.sheader}>
                <div className={styles.stitle}></div>
                <div className={styles.ssubtitle}></div>
            </div>
        </div>
    );
}

export function ListSkeleton() {
    return (
        <div className={styles.scard}>
            {[...Array(3)].map((_, i) => (
                <div key={i} className={styles.slistItem}>
                    <div className={styles.sbody}></div>
                </div>
            ))}
        </div>
    );
}

export function CardGridSkeleton() {
    return (
        <div className={styles.sgridContainer}>
            {[...Array(4)].map((_, i) => (
                <div key={i} className={styles.scard}>
                    <div className={styles.simage}></div>
                    <div className={styles.sbody}></div>
                </div>
            ))}
        </div>
    );
}

export function ProfileSkeleton() {
    return (
        <div className={styles.scard}>
            <div className={styles.savatar}></div>
            <div className={styles.stitle}></div>
            <div className={styles.ssubtitle}></div>
            <div className={styles.sbodyWrapper}>
                <div className={styles.sbody}></div>
            </div>
        </div>
    );
}

export function TimelineSkeleton() {
    return (
        <div className={styles.scard}>
            {[...Array(5)].map((_, i) => (
                <div key={i} className={styles.stimelineItem}>
                    <div className={styles.sdot}></div>
                    <div className={styles.sbody}></div>
                </div>
            ))}
        </div>
    );
}