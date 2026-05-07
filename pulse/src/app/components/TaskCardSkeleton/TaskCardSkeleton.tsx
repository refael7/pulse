import styles from "./TaskCardSkeleton.module.scss";

export default function TaskCardSkeleton() {
  return (
    <div className={styles.skeleton}>
      <div className={styles.header}>
        <div className={styles.titleSkeleton}></div>
        <div className={styles.prioritySkeleton}></div>
      </div>
      <div className={styles.ownerSkeleton}></div>
      <div className={styles.descSkeleton}></div>
      <div className={styles.footer}>
        <div className={styles.statusSkeleton}></div>
        <div className={styles.actionSkeleton}></div>
      </div>
    </div>
  );
}