import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  // יצירת משתמש
  const user = await prisma.user.create({
    data: {
      name: "רפאל",
      email: "refael@pulse.dev",
    },
  });

  console.log("✅ משתמש נוצר:", user.name);

  // יצירת משימות
  const task1 = await prisma.task.create({
    data: {
      title: "בניית ה-DAL",
      description: "יצירת שכבת הגישה לנתונים",
      priority: "HIGH",
      status: "DONE",
      ownerId: user.id,
    },
  });

  const task2 = await prisma.task.create({
    data: {
      title: "בניית ה-Dashboard",
      description: "עמוד ראשי עם רשימת משימות",
      priority: "HIGH",
      status: "IN_PROGRESS",
      ownerId: user.id,
    },
  });

  const task3 = await prisma.task.create({
    data: {
      title: "הוספת Optimistic UI",
      description: "שיפור חוויית המשתמש",
      priority: "MEDIUM",
      status: "TODO",
      ownerId: user.id,
    },
  });

  console.log("✅ משימות נוצרו");

  // יצירת AuditLogs
  await prisma.auditLog.createMany({
    data: [
      { userId: user.id, taskId: task1.id, action: "משימה נוצרה", details: "סטטוס: TODO" },
      { userId: user.id, taskId: task1.id, action: "סטטוס שונה", details: "מ-TODO ל-DONE" },
      { userId: user.id, taskId: task2.id, action: "משימה נוצרה", details: "סטטוס: TODO" },
      { userId: user.id, taskId: task2.id, action: "סטטוס שונה", details: "מ-TODO ל-IN_PROGRESS" },
      { userId: user.id, taskId: task3.id, action: "משימה נוצרה", details: "סטטוס: TODO" },
    ],
  });

  console.log("✅ AuditLogs נוצרו");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());