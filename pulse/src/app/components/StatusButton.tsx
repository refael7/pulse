"use client";

import { useOptimistic, useTransition } from "react";
import { updateTaskStatusAction } from "@/app/actions/taskActions";

type Status = "TODO" | "IN_PROGRESS" | "DONE";

const nextStatus: Record<Status, Status> = {
  TODO: "IN_PROGRESS",
  IN_PROGRESS: "DONE",
  DONE: "TODO",
};

const statusLabels: Record<Status, string> = {
  TODO: "לביצוע",
  IN_PROGRESS: "בתהליך",
  DONE: "הושלם",
};

const statusColors: Record<Status, string> = {
  TODO: "bg-blue-100 text-blue-700",
  IN_PROGRESS: "bg-orange-100 text-orange-700",
  DONE: "bg-green-100 text-green-700",
};

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

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className={`text-xs px-2 py-1 rounded-full transition-opacity ${statusColors[optimisticStatus]} ${isPending ? "opacity-60" : "hover:opacity-80"}`}
    >
      {statusLabels[optimisticStatus]}
    </button>
  );
}