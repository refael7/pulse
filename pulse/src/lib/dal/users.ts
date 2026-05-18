import { prisma } from "@/lib/prisma";

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
  });
}

export async function getUserByUsernameAndCode(name: string, code: string) {
  return prisma.user.findFirst({
    where: { name, code },
  });
}

export async function getAllUsers() {
  return prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function createUser(data: { name: string; email: string }) {
  return prisma.user.create({
    data,
  });
}