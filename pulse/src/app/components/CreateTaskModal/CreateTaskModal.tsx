"use client";

import { useState } from "react";
import styles from "./CreateTaskModal.module.scss";
import CreateTaskForm from "../CreateTaskForm/CreateTaskForm";
import { createNewTaskLabel, newTaskModalTitle } from "@/lib/messages";

export default function CreateTaskModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={styles.createButton}
      >
        {createNewTaskLabel}
      </button>

      {isOpen && (
        <div className={styles.overlay}>
          <div className={styles.modal} dir="rtl">
            <h2 className={styles.title}>{newTaskModalTitle}</h2>
            <CreateTaskForm onClose={() => setIsOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}