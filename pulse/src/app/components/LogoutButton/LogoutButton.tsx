"use client";

import { useTransition } from "react";
import { logoutAction } from "@/app/login/loginAction";
import styles from "./LogoutButton.module.scss";
import { logoutLabel, logoutPendingLabel } from "@/lib/messages";

export default function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(async () => {
      await logoutAction();
    });
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className={styles.button}
    >
      {isPending ? logoutPendingLabel : logoutLabel}
    </button>
  );
}