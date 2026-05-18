import { Priority } from "@/generated/prisma/enums";

export const appMetadataTitle = "Pulse – מערכת ניהול משימות";
export const appMetadataDescription = "מערכת ניהול ומעקב משימות";
export const appTitle = "Pulse 🚀";
export const welcomeText = "ברוכים הבאים";
export const auditLogLabel = "יומן פעולות 📋";
export const noTasksTitle = "אין משימות עדיין";
export const noTasksSubtitle = "התחילו ביצירת המשימה הראשונה";
export const deletedTasksLabel = "🗑️ משימות מחוקות";
export const createNewTaskLabel = "+ משימה חדשה";
export const newTaskModalTitle = "משימה חדשה";
export const editTaskButtonLabel = "✏️עריכה";
export const editTaskModalTitle = "עריכת משימה";
export const editTaskButtonTitle = "ערוך משימה";
export const titleLabel = "כותרת *";
export const descriptionLabel = "תיאור";
export const priorityLabel = "עדיפות";
export const titlePlaceholder = "כותרת המשימה";
export const descriptionPlaceholder = "תיאור המשימה (אופציונלי)";
export const cancelLabel = "ביטול";
export const savingLabel = "שומר...";
export const createTaskButtonLabel = "צור משימה";
export const updateTaskButtonLabel = "עדכן משימה";
export const logoutLabel = "יציאה";
export const logoutPendingLabel = "יוצא...";
export const errorTitle = "משהו השתבש";
export const tryAgainLabel = "נסה שוב";
export const backToDashboardLabel = "← חזרה לדשבורד";
export const notFoundTitle = "עמוד לא נמצא";
export const notFoundDescription = "העמוד שחיפשת לא קיים";
export const usernameLabel = "שם משתמש";
export const passwordLabel = "סיסמה";
export const usernamePlaceholder = "שם משתמש";
export const passwordPlaceholder = "סיסמה";
export const loginSubtitle = "התחבר כדי להמשיך";
export const loginButtonLabel = "התחבר";
export const loginPendingLabel = "מתחבר...";
export const wrongCredentials = "שם משתמש או סיסמה שגויים";
export const openTasksLabel = "משימות פתוחות";
export const doneTasksLabel = "משימות שהושלמו";
export const todayActionsLabel = "פעולות היום";
export const auditActionHeader = "פעולה";
export const auditTaskHeader = "משימה";
export const auditUserHeader = "משתמש";
export const auditDetailsHeader = "פרטים";
export const auditWhenHeader = "מתי";
export const noActionsText = "אין פעולות עדיין";
export const nowText = "עכשיו";
export const minutesAgo = (minutes: number) => `לפני ${minutes} דקות`;
export const hoursAgo = (hours: number) => `לפני ${hours} שעות`;
export const daysAgo = (days: number) => `לפני ${days} ימים`;

export const priorityLabels: Record<Priority, string> = {
  LOW: "נמוכה",
  MEDIUM: "בינונית",
  HIGH: "גבוהה",
};

export const priorityOptions = [
  { value: "LOW", label: "נמוכה" },
  { value: "MEDIUM", label: "בינונית" },
  { value: "HIGH", label: "גבוהה" },
];

export const statusLabels = {
  TODO: "לביצוע",
  IN_PROGRESS: "בתהליך",
  DONE: "הושלם",
} as const;

export const nextStatus = {
  TODO: "IN_PROGRESS",
  IN_PROGRESS: "DONE",
  DONE: "TODO",
} as const;

export const formErrorMessage = "יש שגיאות בטופס";
export const notAuthenticatedError = "משתמש לא מאושר";
export const titleRequiredError = "כותרת היא שדה חובה";
export const taskCreatedAction = "משימה נוצרה";
export const taskCreatedDetailsPrefix = "כותרת: ";
export const taskCreatedSuccess = "המשימה נוצרה בהצלחה!";
export const taskUpdatedAction = "משימה עודכנה";
export const taskUpdatedDetailsPrefix = "כותרת: ";
export const taskUpdatedSuccess = "המשימה עודכנה בהצלחה!";
export const statusChangedAction = "סטטוס שונה";
export const statusChangedDetailsPrefix = "סטטוס חדש: ";
export const taskDeletedAction = "משימה נמחקה";
export const taskDeletedDetails = "נמחק";
export const deleteButtonLabel = "מחק";
export const restoreButtonLabel = "שחזר";
export const pendingDots = "...";
export const taskRestoredAction = "משימה שוחזרה";
export const taskRestoredDetails = "שחזור לאחר מחיקה";
export const createTaskSubtitle = "הזן את הפרטים וקבע את העדיפות כדי שהמשימה תיערך כחלק מהיומן.";
export const notFoundSupportText = "אם הגעת דרך קישור ישן, נסה לרענן את הדף או לחזור לדף הראשי כדי להמשיך.";
