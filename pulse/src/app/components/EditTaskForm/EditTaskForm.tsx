"use client";

import { useActionState, useEffect } from "react";
import { updateTaskAction, FormState } from "@/app/actions/taskActions";
import styles from "./EditTaskForm.module.scss";
import {
  titleLabel,
  descriptionLabel,
  priorityLabel,
  titlePlaceholder,
  descriptionPlaceholder,
  priorityOptions,
  cancelLabel,
  savingLabel,
  updateTaskButtonLabel,
} from "@/lib/messages";

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
    (prevState: FormState, formData: FormData) => updateTaskAction(prevState, formData, taskId),
    initialState
  );

  useEffect(() => {
    if (state.success) onClose();
  }, [state.success]);

  return (
    <form action={formAction} className={styles.form}>
      <div>
        <label className={styles.label}>{titleLabel}</label>
        <input
          name="title"
          type="text"
          defaultValue={initialTitle}
          className={styles.input}
          placeholder={titlePlaceholder}
        />
        {state.errors?.title && (
          <p className={styles.error}>{state.errors.title[0]}</p>
        )}
      </div>

      <div>
        <label className={styles.label}>{descriptionLabel}</label>
        <textarea
          name="description"
          rows={2}
          defaultValue={initialDescription || ""}
          className={styles.textarea}
          placeholder={descriptionPlaceholder}
        />
      </div>

      <div>
        <label className={styles.label}>{priorityLabel}</label>
        <select
          name="priority"
          defaultValue={initialPriority}
          className={styles.select}
        >
          {priorityOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {state.message && !state.success && (
        <p className={styles.message}>{state.message}</p>
      )}

      <div className={styles.buttonGroup}>
        <button
          type="button"
          onClick={onClose}
          className={styles.cancelButton}
        >
          {cancelLabel}
        </button>
        <button
          type="submit"
          disabled={isPending}
          className={styles.submitButton}
        >
          {isPending ? savingLabel : updateTaskButtonLabel}
        </button>
      </div>
    </form>
  );
}