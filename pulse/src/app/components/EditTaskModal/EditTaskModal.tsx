"use client";

import { useState } from "react";
import EditTaskForm from "../EditTaskForm/EditTaskForm";
import styles from "./EditTaskModal.module.scss";
import { editTaskButtonLabel, editTaskModalTitle } from "@/lib/messages";

type Task = {
  id: string;
  title: string;
  description: string | null;
  priority: string;
};

export default function EditTaskModal({ task }: { task: Task }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={styles.editButton}
        title={editTaskButtonLabel}
      >
        {editTaskButtonLabel}
      </button>

      {isOpen && (
        <div className={styles.overlay}>
          <div className={styles.modal} dir="rtl">
            <h2 className={styles.title}>{editTaskModalTitle}</h2>
            <EditTaskForm
              taskId={task.id}
              initialTitle={task.title}
              initialDescription={task.description}
              initialPriority={task.priority}
              onClose={() => setIsOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}