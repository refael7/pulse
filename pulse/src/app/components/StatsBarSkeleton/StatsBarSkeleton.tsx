import styles from "./StatsBarSkeleton.module.scss";

export default function StatsBarSkeleton() {
  return (
    <div className={styles.skeleton}>
      {[1, 2, 3].map((i) => (
        <div key={i} className={styles.stat}>
          <div className={styles.labelSkeleton}></div>
          <div className={styles.valueSkeleton}></div>
        </div>
      ))}
    </div>
  );
}