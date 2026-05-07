"use client";

import { useTransition } from "react";
import { deleteTaskAction, restoreTaskAction } from "@/app/actions/taskActions";
import styles from "./DeleteButton.module.scss";
import { deleteButtonLabel, restoreButtonLabel, pendingDots } from "@/lib/messages";

export default function DeleteButton({
  taskId,
  isDeleted,
}: {
  taskId: string;
  isDeleted: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(async () => {
      if (isDeleted) {
        await restoreTaskAction(taskId);
      } else {
        await deleteTaskAction(taskId);
      }
    });
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className={`${styles.button} ${isDeleted ? styles.restore : styles.delete}`}
    >
      {isPending ? pendingDots : isDeleted ? restoreButtonLabel : deleteButtonLabel}
    </button>
  );
}