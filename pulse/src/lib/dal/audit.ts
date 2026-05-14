import { prisma } from "@/lib/prisma";

export async function logActivity(
  userId: string,
  taskId: string,
  action: string,
  details?: string
) {
  return prisma.auditLog.create({
    data: {
      userId,
      taskId,
      action,
      details,
    },
  });
}

export async function getAuditLogs() {
  return prisma.auditLog.findMany({
    include: {
      user: true,
      task: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getAuditLogsByUser(userId: string) {
  return prisma.auditLog.findMany({
    where: { userId },
    include: { task: true },
    orderBy: { createdAt: "desc" },
  });
}
