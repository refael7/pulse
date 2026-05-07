import type { Prisma } from "@/generated/prisma/client";
import StatusButton from "../StatusButton/StatusButton";
import DeleteButton from "../DeleteButton/DeleteButton";
import EditTaskModal from "../EditTaskModal/EditTaskModal";
import styles from "./TaskCard.module.scss";
import { priorityLabels } from "@/lib/messages";

type TaskWithOwner = Prisma.TaskGetPayload<{
  include: { owner: true };
}>;

export default function TaskCard({ task }: { task: TaskWithOwner }) {
  return (
    <div className={`${styles.taskCard} ${task.isDeleted ? styles.deleted : ""}`}>
      <div className={styles.header}>
        <h3 className={`${styles.title} ${task.isDeleted ? styles.deleted : ""}`}>
          {task.title}
        </h3>
        <span className={`${styles.priorityBadge} ${styles[task.priority.toLowerCase()]}`}>
          {priorityLabels[task.priority]}
        </span>
      </div>
      <div className={styles.owner}>👤 {task.owner.name}</div>
      {task.description && (
        <p className={styles.description}>{task.description}</p>
      )}
      <div className={styles.footer}>
        <StatusButton taskId={task.id} initialStatus={task.status} />
        <div className={styles.actions}>
          {!task.isDeleted && <EditTaskModal task={task} />}
          <DeleteButton taskId={task.id} isDeleted={task.isDeleted} />
        </div>
      </div>
    </div>
  );
}