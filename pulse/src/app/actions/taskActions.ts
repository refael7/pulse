"use server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createTask, updateTaskStatus, softDeleteTask } from "@/lib/dal/tasks";
import { logActivity } from "@/lib/dal/audit";
import { getAllUsers } from "@/lib/dal/users";

const CreateTaskSchema = z.object({
  title: z.string().min(1, "כותרת היא שדה חובה"),
  description: z.string().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
});

export type FormState = {
  success: boolean;
  message: string;
  errors?: {
    title?: string[];
    description?: string[];
    priority?: string[];
  };
};

export async function createTaskAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  await new Promise((r) => setTimeout(r, 500));

  const raw = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    priority: formData.get("priority") as string,
  };

  const result = CreateTaskSchema.safeParse(raw);

  if (!result.success) {
    return {
      success: false,
      message: "יש שגיאות בטופס",
      errors: result.error.flatten().fieldErrors,
    };
  }

  const users = await getAllUsers();
  const firstUser = users[0];

  const task = await createTask({
    title: result.data.title,
    description: result.data.description,
    priority: result.data.priority as "LOW" | "MEDIUM" | "HIGH",
    ownerId: firstUser.id,
  });

  await logActivity(firstUser.id, task.id, "משימה נוצרה", `כותרת: ${task.title}`);

  revalidatePath("/");

  return { success: true, message: "המשימה נוצרה בהצלחה!" };
}

export async function updateTaskStatusAction(
  id: string,
  status: "TODO" | "IN_PROGRESS" | "DONE"
) {
  "use server";
  
  await new Promise((r) => setTimeout(r, 500));

  const users = await getAllUsers();
  const firstUser = users[0];

  await updateTaskStatus(id, status);

  await logActivity(
    firstUser.id,
    id,
    "סטטוס שונה",
    `סטטוס חדש: ${status}`
  );

  revalidatePath("/");
}
export async function deleteTaskAction(id: string) {
  "use server";

  const users = await getAllUsers();
  const firstUser = users[0];

  await softDeleteTask(id);

  await logActivity(
    firstUser.id,
    id,
    "משימה נמחקה",
    "נמחק"
    
  );

  revalidatePath("/");
}

export async function restoreTaskAction(id: string) {
  "use server";

  const users = await getAllUsers();
  const firstUser = users[0];

  await prisma.task.update({
    where: { id },
    data: { isDeleted: false },
  });

  await logActivity(
    firstUser.id,
    id,
    "משימה שוחזרה",
    "שחזור לאחר מחיקה"
  );

  revalidatePath("/");
}