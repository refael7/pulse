"use client";

import { useActionState ,useEffect } from "react";
import { createTaskAction, FormState } from "@/app/actions/taskActions";
import styles from "./CreateTaskForm.module.scss";
import {
  titleLabel,
  descriptionLabel,
  priorityLabel,
  titlePlaceholder,
  descriptionPlaceholder,
  priorityOptions,
  cancelLabel,
  savingLabel,
  createTaskButtonLabel,
} from "@/lib/messages";

const initialState: FormState = { success: false, message: "" };

export default function CreateTaskForm({ onClose }: { onClose: () => void }) {
  const [state, formAction, isPending] = useActionState(createTaskAction, initialState);

  useEffect(() => {
  if (state.success) onClose();
}, [state.success]);

  return (
    <form action={formAction} className={styles.form}>
      <div>
        <label className={styles.label}>
          {titleLabel}
        </label>
        <input
          name="title"
          type="text"
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
          className={styles.textarea}
          placeholder={descriptionPlaceholder}
        />
      </div>

      <div>
        <label className={styles.label}>{priorityLabel}</label>
        <select
          name="priority"
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
        <button type="button" onClick={onClose} className={styles.cancelButton}>
          {cancelLabel}
        </button>
        <button
          type="submit"
          disabled={isPending}
          className={styles.submitButton}
        >
          {isPending ? savingLabel : createTaskButtonLabel}
        </button>
      </div>
    </form>
  );
}