import Link from "next/link";
import { getAuditLogs } from "@/lib/dal/audit";
import styles from "./page.module.scss";
import {
  auditLogLabel,
  backToDashboardLabel,
  auditActionHeader,
  auditTaskHeader,
  auditUserHeader,
  auditDetailsHeader,
  auditWhenHeader,
  noActionsText,
  nowText,
  minutesAgo,
  hoursAgo,
  daysAgo,
} from "@/lib/messages";

function timeAgo(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return nowText;
  if (minutes < 60) return minutesAgo(minutes);
  if (hours < 24) return hoursAgo(hours);
  return daysAgo(days);
}

export default async function AuditPage() {
  const logs = await getAuditLogs();

  return (
    <main className={styles.page} dir="rtl">
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>{auditLogLabel}</h1>
          <Link href="/" className={styles.backLink}>
            {backToDashboardLabel}
          </Link>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead className={styles.tableHead}>
              <tr>
                <th className={styles.tableHeader}>{auditActionHeader}</th>
                <th className={styles.tableHeader}>{auditTaskHeader}</th>
                <th className={styles.tableHeader}>{auditUserHeader}</th>
                <th className={styles.tableHeader}>{auditDetailsHeader}</th>
                <th className={styles.tableHeader}>{auditWhenHeader}</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className={styles.tableBodyRow}>
                  <td className={`${styles.tableCell} ${styles.actionCell}`}>
                    {log.action}
                  </td>
                  <td className={`${styles.tableCell} ${styles.taskCell}`}>
                    {log.task.title}
                  </td>
                  <td className={`${styles.tableCell} ${styles.userCell}`}>
                    {log.user.name}
                  </td>
                  <td className={`${styles.tableCell} ${styles.detailsCell}`}>
                    {log.details ?? "—"}
                  </td>
                  <td className={`${styles.tableCell} ${styles.timeCell}`}>
                    {timeAgo(log.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {logs.length === 0 && (
            <div className={styles.empty}>
              <p>{noActionsText}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}