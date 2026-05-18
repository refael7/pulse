export const dynamic = "force-dynamic";

import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
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
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/login");
  }

  const tasks = await getAllTasks(currentUser.id);
  const deletedTasks = await getDeletedTasks(currentUser.id);

  return (
    <main className={styles.page} dir="rtl">
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>{appTitle}</h1>
            <p className={styles.subtitle}>{`${welcomeText}, ${currentUser.name} 👋`}</p>
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