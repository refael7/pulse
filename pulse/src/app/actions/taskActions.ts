"use server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createTask, updateTaskStatus, softDeleteTask, updateTask } from "@/lib/dal/tasks";
import { logActivity } from "@/lib/dal/audit";
import { getAllUsers } from "@/lib/dal/users";
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

export async function createTaskAction(
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

  const users = await getAllUsers();
  const firstUser = users[0];


  const task = await createTask({
    title: result.data.title,
    description: result.data.description,
    priority: result.data.priority as "LOW" | "MEDIUM" | "HIGH",
    ownerId: firstUser.id,
  });

  await logActivity(firstUser.id, task.id, taskCreatedAction, `${taskCreatedDetailsPrefix}${task.title}`);

  revalidatePath("/");

  return { success: true, message: taskCreatedSuccess };
}

export async function updateTaskAction(
  id: string,
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

  const users = await getAllUsers();
  const firstUser = users[0];

  await updateTask(id, {
    title: result.data.title,
    description: result.data.description,
    priority: result.data.priority as "LOW" | "MEDIUM" | "HIGH",
  });

  await logActivity(firstUser.id, id, taskUpdatedAction, `${taskUpdatedDetailsPrefix}${result.data.title}`);

  revalidatePath("/");

  return { success: true, message: taskUpdatedSuccess };
}

export async function updateTaskStatusAction(
  id: string,
  status: "TODO" | "IN_PROGRESS" | "DONE"
) {

  await new Promise((r) => setTimeout(r, 500));

  const users = await getAllUsers();
  const firstUser = users[0];

  await updateTaskStatus(id, status);

  await logActivity(
    firstUser.id,
    id,
    statusChangedAction,
    `${statusChangedDetailsPrefix}${status}`
  );

  revalidatePath("/");
}
export async function deleteTaskAction(id: string) {

  const users = await getAllUsers();
  const firstUser = users[0]; 

  await softDeleteTask(id);

  await logActivity(
    firstUser.id,
    id,
    taskDeletedAction,
    taskDeletedDetails
  );

  revalidatePath("/");
}

export async function restoreTaskAction(id: string) {

 const users = await getAllUsers();
const firstUser = users[0];

  await prisma.task.update({
    where: { id },
    data: { isDeleted: false },
  });

  await logActivity(
    firstUser.id,
    id,
    taskRestoredAction,
    taskRestoredDetails
  );

  revalidatePath("/");
}