"use server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createTask, updateTaskStatus, softDeleteTask, updateTask } from "@/lib/dal/tasks";
import { logActivity } from "@/lib/dal/audit";
import { getCurrentUser } from "@/lib/auth";
import {
  formErrorMessage,
  titleRequiredError,
  taskCreatedAction,
  taskCreatedDetailsPrefix,
  taskCreatedSuccess,
  taskUpdatedAction,
  taskUpdatedDetailsPrefix,
  taskUpdatedSuccess,
  statusChangedAction,
  statusChangedDetailsPrefix,
  taskDeletedAction,
  taskDeletedDetails,
  taskRestoredAction,
  taskRestoredDetails,
  notAuthenticatedError,
} from "@/lib/messages";

const CreateTaskSchema = z.object({
  title: z.string().trim().min(1, titleRequiredError),
  description: z.string().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
});

export interface FormState {
  success: boolean;
  message: string;
  errors?: {
    title?: string[];
    description?: string[];
    priority?: string[];
  };
};

async function getAuthenticatedUser() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error(notAuthenticatedError);
  }

  return currentUser;
}

export async function createTaskAction(
  _state: FormState,
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
      message: formErrorMessage,
      errors: result.error.flatten().fieldErrors,
    };
  }

  const currentUser = await getAuthenticatedUser();

  const task = await createTask({
    title: result.data.title,
    description: result.data.description,
    priority: result.data.priority as "LOW" | "MEDIUM" | "HIGH",
    ownerId: currentUser.id,
  });

  await logActivity(currentUser.id, task.id, taskCreatedAction, `${taskCreatedDetailsPrefix}${task.title}`);

  revalidatePath("/");

  return { success: true, message: taskCreatedSuccess };
}

export async function updateTaskAction(
  _state: FormState,
  formData: FormData,
  id: string
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
      message: formErrorMessage,
      errors: result.error.flatten().fieldErrors,
    };
  }

  const currentUser = await getAuthenticatedUser();

  await updateTask(id, {
    title: result.data.title,
    description: result.data.description,
    priority: result.data.priority as "LOW" | "MEDIUM" | "HIGH",
  });

  await logActivity(currentUser.id, id, taskUpdatedAction, `${taskUpdatedDetailsPrefix}${result.data.title}`);

  revalidatePath("/");

  return { success: true, message: taskUpdatedSuccess };
}

export async function updateTaskStatusAction(
  id: string,
  status: "TODO" | "IN_PROGRESS" | "DONE"
) {

  await new Promise((r) => setTimeout(r, 500));

  const currentUser = await getAuthenticatedUser();

  await updateTaskStatus(id, status);

  await logActivity(
    currentUser.id,
    id,
    statusChangedAction,
    `${statusChangedDetailsPrefix}${status}`
  );

  revalidatePath("/");
}
export async function deleteTaskAction(id: string) {
  const currentUser = await getAuthenticatedUser();

  await softDeleteTask(id);

  await logActivity(
    currentUser.id,
    id,
    taskDeletedAction,
    taskDeletedDetails
  );

  revalidatePath("/");
}

export async function restoreTaskAction(id: string) {
  const currentUser = await getAuthenticatedUser();

  await prisma.task.update({
    where: { id },
    data: { isDeleted: false },
  });

  await logActivity(
    currentUser.id,
    id,
    taskRestoredAction,
    taskRestoredDetails
  );

  revalidatePath("/");
}