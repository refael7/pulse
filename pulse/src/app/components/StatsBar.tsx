import { getAllTasks } from "@/lib/dal/tasks";
import { getAuditLogs } from "@/lib/dal/audit";

export default async function StatsBar() {
  const tasks = await getAllTasks();
  const logs = await getAuditLogs();

  const openTasks = tasks.filter((t) => t.status !== "DONE").length;
  const doneTasks = tasks.filter((t) => t.status === "DONE").length;

  const today = new Date();
  const todayLogs = logs.filter((log) => {
    const logDate = new Date(log.createdAt);
    return logDate.toDateString() === today.toDateString();
  }).length;

  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      <div className="bg-white rounded-lg p-4 shadow">
        <p className="text-gray-500 text-sm">משימות פתוחות</p>
        <p className="text-3xl font-bold text-blue-600">{openTasks}</p>
      </div>
      <div className="bg-white rounded-lg p-4 shadow">
        <p className="text-gray-500 text-sm">משימות שהושלמו</p>
        <p className="text-3xl font-bold text-blue-600">{doneTasks}</p>
      </div>
      <div className="bg-white rounded-lg p-4 shadow">
        <p className="text-gray-500 text-sm">פעולות היום</p>
        <p className="text-3xl font-bold text-blue-600">{todayLogs}</p>
      </div>
    </div>
  );
}