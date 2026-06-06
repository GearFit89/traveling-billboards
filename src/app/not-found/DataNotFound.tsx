import "@/app/globals.css";
import styles from "@/styles/DataNotFound.module.css";



export default function DataNotFound(  ) {
    return (
        <div className={styles.notFoundContainer}>
            <h2>Data Not Found</h2>
            <p>Sorry, we couldn't find the data you were looking for.</p>
        </div>
    );
}

