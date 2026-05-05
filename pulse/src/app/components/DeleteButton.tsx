"use client";

import { useTransition } from "react";
import { deleteTaskAction, restoreTaskAction } from "@/app/actions/taskActions";

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
      className={`text-xs px-2 py-1 rounded-full transition-opacity ${
        isDeleted
          ? "bg-green-100 text-green-700 hover:bg-green-200"
          : "bg-red-100 text-red-700 hover:bg-red-200"
      } ${isPending ? "opacity-50" : ""}`}
    >
      {isPending ? "..." : isDeleted ? "שחזר" : "מחק"}
    </button>
  );
}