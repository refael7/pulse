import Link from "next/link";
import styles from "./not-found.module.scss";
import { backToDashboardLabel, notFoundDescription, notFoundTitle, notFoundSupportText } from "@/lib/messages";

export default function NotFound() {
  return (
    <main className={styles.page} dir="rtl">
      <div className={styles.canvas}>
        <section className={styles.card}>
          <div className={styles.symbol}>🔍</div>
          <h1 className={styles.title}>{notFoundTitle}</h1>
          <p className={styles.description}>{notFoundDescription}</p>

          <div className={styles.actions}>
            <Link href="/" className={styles.button}>
              {backToDashboardLabel}
            </Link>
          </div>

          <p className={styles.supportText}>
            {notFoundSupportText}
          </p>
        </section>
      </div>
    </main>
  );
}