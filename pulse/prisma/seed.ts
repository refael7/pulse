import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  // יצירת משתמשים
  const user = await prisma.user.upsert({
    where: { email: "refael@pulse.dev" },
    update: { name: "רפאל", code: "1234" },
    create: {
      name: "רפאל",
      code: "1234",
      email: "refael@pulse.dev",
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: "dan@pulse.dev" },
    update: { name: "דן", code: "5678" },
    create: {
      name: "דן",
      code: "5678",
      email: "dan@pulse.dev",
    },
  });

  const user3 = await prisma.user.upsert({
    where: { email: "noa@pulse.dev" },
    update: { name: "נועה", code: "abcd" },
    create: {
      name: "נועה",
      code: "abcd",
      email: "noa@pulse.dev",
    },
  });

  console.log("✅ משתמשים נוצרו או עודכנו:", user.name, user2.name, user3.name);

  const taskCount = await prisma.task.count({ where: { ownerId: user.id } });

  if (taskCount === 0) {
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
  } else {
    console.log("✅ משימות כבר קיימות עבור המשתמש", user.name);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());