import styles from "./loading.module.scss";

export default function AuditLoading() {
  return (
    <main className={styles.page} dir="rtl">
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <div className={styles.titleSkeleton}></div>
            <div className={styles.subtitleSkeleton}></div>
          </div>
          <div className={styles.actions}>
            <div className={`${styles.buttonSkeleton} ${styles.back}`}></div>
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead className={styles.tableHead}>
              <tr>
                <th className={styles.headerCell}>
                  <div className={styles.skeletonBar}></div>
                </th>
                <th className={styles.headerCell}>
                  <div className={styles.skeletonBar}></div>
                </th>
                <th className={styles.headerCell}>
                  <div className={styles.skeletonBar}></div>
                </th>
                <th className={styles.headerCell}>
                  <div className={styles.skeletonBar}></div>
                </th>
                <th className={styles.headerCell}>
                  <div className={styles.skeletonBar}></div>
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 6 }).map((_, rowIndex) => (
                <tr key={rowIndex} className={styles.row}>
                  <td className={styles.bodyCell}>
                    <div className={styles.skeletonBar}></div>
                  </td>
                  <td className={styles.bodyCell}>
                    <div className={styles.skeletonBar}></div>
                  </td>
                  <td className={styles.bodyCell}>
                    <div className={styles.skeletonBar}></div>
                  </td>
                  <td className={styles.bodyCell}>
                    <div className={styles.skeletonBar}></div>
                  </td>
                  <td className={styles.bodyCell}>
                    <div className={styles.skeletonBar}></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
