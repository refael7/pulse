import LoginForm from "./LoginForm";
import styles from "./page.module.scss";
import { appTitle, loginSubtitle } from "@/lib/messages";

export default function LoginPage() {
  return (
    <main className={styles.page} dir="rtl">
      <div className={styles.card}>
        <h1 className={styles.title}>{appTitle}</h1>
        <p className={styles.subtitle}>{loginSubtitle}</p>
        <LoginForm />
      </div>
    </main>
  );
}