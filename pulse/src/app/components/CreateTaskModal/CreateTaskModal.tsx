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
        <div className={styles.overlay} onClick={() => setIsOpen(false)}>
          <div
            className={styles.modal}
            dir="rtl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.header}>
              <div>
                <h2 className={styles.title}>{newTaskModalTitle}</h2>
                <p className={styles.subtitle}>
                  הזן את הפרטים וקבע את העדיפות כדי שהמשימה תיערך כחלק מהיומן.
                </p>
              </div>
              <button
                type="button"
                aria-label="Close modal"
                className={styles.closeButton}
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>
            </div>

            <CreateTaskForm onClose={() => setIsOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}