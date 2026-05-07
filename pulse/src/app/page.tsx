import Link from "next/link";
import { getAllTasks, getDeletedTasks } from "@/lib/dal/tasks";
import {
  appTitle,
  welcomeText,
  auditLogLabel,
  noTasksTitle,
  noTasksSubtitle,
  deletedTasksLabel,
} from "@/lib/messages";
import StatsBar from "./components/StatsBar/StatsBar";
import TaskCard from "./components/TaskCard/TaskCard";
import CreateTaskModal from "./components/CreateTaskModal/CreateTaskModal";
import LogoutButton from "./components/LogoutButton/LogoutButton";
import styles from "./page.module.scss";

export default async function HomePage() {
  await new Promise((r) => setTimeout(r, 100));
  const tasks = await getAllTasks();
  const deletedTasks = await getDeletedTasks();

  return (
    <main className={styles.page} dir="rtl">
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>{appTitle}</h1>
            <p className={styles.subtitle}>{welcomeText}</p>
          </div>
          <div className={styles.actions}>
            <Link href="/audit" className={styles.auditLink}>
              {auditLogLabel}
            </Link>
            <CreateTaskModal />
            <LogoutButton />
          </div>
        </div>

        <StatsBar />

        {tasks.length === 0 ? (
          <div className={styles.empty}>
            <p className={styles.emptyTitle}>{noTasksTitle}</p>
            <p className={styles.emptySubtitle}>{noTasksSubtitle}</p>
          </div>
        ) : (
          <div className={styles.tasksGrid}>
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        )}

        {deletedTasks.length > 0 && (
          <div className={styles.deletedSection}>
            <h2 className={styles.deletedTitle}>
              {deletedTasksLabel} ({deletedTasks.length})
            </h2>
            <div className={styles.deletedTasksGrid}>
              {deletedTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}