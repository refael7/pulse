"use client";

import { useActionState } from "react";
import styles from "./LoginForm.module.scss";
import { loginAction } from "./loginAction";
import {
  usernameLabel,
  passwordLabel,
  usernamePlaceholder,
  passwordPlaceholder,
  loginButtonLabel,
  loginPendingLabel,
} from "@/lib/messages";

const initialState = { error: "" };

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className={styles.form}>
      <div>
        <label className={styles.label}>{usernameLabel}</label>
        <input
          name="username"
          type="text"
          className={styles.input}
          placeholder={usernamePlaceholder}
        />
      </div>

      <div>
        <label className={styles.label}>{passwordLabel}</label>
        <input
          name="password"
          type="password"
          className={styles.input}
          placeholder={passwordPlaceholder}
        />
      </div>

      {state.error && (
        <p className={styles.error}>{state.error}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className={styles.button}
      >
        {isPending ? loginPendingLabel : loginButtonLabel}
      </button>
    </form>
  );
}