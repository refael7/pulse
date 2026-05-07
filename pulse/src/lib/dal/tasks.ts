import { prisma } from "@/lib/prisma";
import { TaskStatus, Priority } from "@/generated/prisma/enums";

export interface CreateTaskInput {
  title: string;
  description?: string;
  priority?: Priority;
  ownerId: string;
};

export async function getAllTasks() {
  return prisma.task.findMany({
    where: { isDeleted: false },
    include: { owner: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getTaskById(id: string) {
  return prisma.task.findUnique({
    where: { id, isDeleted: false },
    include: { owner: true },
  });
}

export async function createTask(data: CreateTaskInput) {
  return prisma.task.create({
    data: {
      title: data.title,
      description: data.description,
      priority: data.priority ?? Priority.MEDIUM,
      ownerId: data.ownerId,
    },
  });
}

export async function updateTaskStatus(id: string, status: TaskStatus) {
  return prisma.task.update({
    where: { id },
    data: { status },
  });
}

export async function softDeleteTask(id: string) {
  return prisma.task.update({
    where: { id },
    data: { isDeleted: true },
  });
}

export interface  UpdateTaskInput {
  title?: string;
  description?: string;
  priority?: Priority;
};

export async function updateTask(id: string, data: UpdateTaskInput) {
  return prisma.task.update({
    where: { id },
    data,
  });
}

export async function getDeletedTasks() {
  return prisma.task.findMany({
    where: { isDeleted: true },
    include: { owner: true },
    orderBy: { createdAt: "desc" },
  });
}