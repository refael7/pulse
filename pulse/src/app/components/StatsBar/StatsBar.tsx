import { getAllTasks } from "@/lib/dal/tasks";
import { getAuditLogsByUser } from "@/lib/dal/audit";
import { getCurrentUser } from "@/lib/auth";
import styles from "./StatsBar.module.scss";
import { openTasksLabel, doneTasksLabel, todayActionsLabel } from "@/lib/messages";

export default async function StatsBar() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return null;
  }

  const tasks = await getAllTasks(currentUser.id);
  const logs = await getAuditLogsByUser(currentUser.id);

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