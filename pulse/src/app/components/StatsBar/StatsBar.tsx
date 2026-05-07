import { getAllTasks } from "@/lib/dal/tasks";
import { getAuditLogs } from "@/lib/dal/audit";
import styles from "./StatsBar.module.scss";
import { openTasksLabel, doneTasksLabel, todayActionsLabel } from "@/lib/messages";

export default async function StatsBar() {
  const tasks = await getAllTasks();
  const logs = await getAuditLogs();

  const openTasks = tasks.filter((t) => t.status !== "DONE").length;
  const doneTasks = tasks.filter((t) => t.status === "DONE").length;

  const today = new Date();
  const todayLogs = logs.filter((log) => {
    const logDate = new Date(log.createdAt);
    return logDate.toDateString() === today.toDateString();
  }).length;

  return (
    <div className={styles.statsBar}>
      <div className={styles.stat}>
        <p className={styles.label}>{openTasksLabel}</p>
        <p className={styles.value}>{openTasks}</p>
      </div>
      <div className={styles.stat}>
        <p className={styles.label}>{doneTasksLabel}</p>
        <p className={styles.value}>{doneTasks}</p>
      </div>
      <div className={styles.stat}>
        <p className={styles.label}>{todayActionsLabel}</p>
        <p className={styles.value}>{todayLogs}</p>
      </div>
    </div>
  );
}