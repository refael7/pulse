import StatsBarSkeleton from "./components/StatsBarSkeleton/StatsBarSkeleton";
import TaskCardSkeleton from "./components/TaskCardSkeleton/TaskCardSkeleton";
import styles from "./loading.module.scss";

export default function Loading() {
  return (
    <main className={styles.loadingPage} dir="rtl">
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <div className={styles.titleSkeleton}></div>
            <div className={styles.subtitleSkeleton}></div>
          </div>
          <div className={styles.actions}>
            <div className={`${styles.buttonSkeleton} ${styles.audit}`}></div>
            <div className={`${styles.buttonSkeleton} ${styles.create}`}></div>
            <div className={`${styles.buttonSkeleton} ${styles.logout}`}></div>
          </div>
        </div>

        <StatsBarSkeleton />

        <div className={styles.tasksGrid}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <TaskCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </main>
  );
}