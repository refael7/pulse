"use client";

import { useOptimistic, useTransition } from "react";
import { updateTaskStatusAction } from "@/app/actions/taskActions";
import styles from "./StatusButton.module.scss";
import { nextStatus, statusLabels } from "@/lib/messages";

type Status = "TODO" | "IN_PROGRESS" | "DONE";

export default function StatusButton({
  taskId,
  initialStatus,
}: {
  taskId: string;
  initialStatus: Status;
}) {
  const [optimisticStatus, setOptimisticStatus] = useOptimistic(initialStatus);
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    const next = nextStatus[optimisticStatus];

    startTransition(async () => {
      setOptimisticStatus(next);
      await updateTaskStatusAction(taskId, next);
    });
  }

  const statusClass = optimisticStatus === "TODO" ? styles.todo : optimisticStatus === "IN_PROGRESS" ? styles.inProgress : styles.done;

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className={`${styles.button} ${statusClass}`}
    >
      {statusLabels[optimisticStatus]}
    </button>
  );
}