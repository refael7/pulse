"use client";

import { useActionState, useEffect } from "react";
import { updateTaskAction, FormState } from "@/app/actions/taskActions";

const initialState: FormState = { success: false, message: "" };

export default function EditTaskForm({
  taskId,
  initialTitle,
  initialDescription,
  initialPriority,
  onClose
}: {
  taskId: string;
  initialTitle: string;
  initialDescription: string | null;
  initialPriority: string;
  onClose: () => void;
}) {
  const [state, formAction, isPending] = useActionState(
    (prevState: FormState, formData: FormData) => updateTaskAction(taskId, prevState, formData),
    initialState
  );

  useEffect(() => {
    if (state.success) onClose();
  }, [state.success]);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">כותרת *</label>
        <input
          name="title"
          type="text"
          defaultValue={initialTitle}
          className="w-full border rounded-lg px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
          placeholder="כותרת המשימה"
        />
        {state.errors?.title && (
          <p className="text-red-500 text-xs mt-1">{state.errors.title[0]}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">תיאור</label>
        <textarea
          name="description"
          rows={2}
          defaultValue={initialDescription || ""}
          className="w-full border rounded-lg px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
          placeholder="תיאור המשימה (אופציונלי)"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">עדיפות</label>
        <select
          name="priority"
          defaultValue={initialPriority}
          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        >
          <option value="LOW">נמוכה</option>
          <option value="MEDIUM">בינונית</option>
          <option value="HIGH">גבוהה</option>
        </select>
      </div>

      {state.message && !state.success && (
        <p className="text-red-500 text-sm">{state.message}</p>
      )}

      <div className="flex gap-2 justify-between">
        <button
          type="button"
          onClick={onClose}
          className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 disabled:opacity-50"
        >
          ביטול
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50"
        >
          {isPending ? "שומר..." : "עדכן משימה"}
        </button>
      </div>
    </form>
  );
}