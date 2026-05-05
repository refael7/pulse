import { getAuditLogs } from "@/lib/dal/audit";

function timeAgo(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "עכשיו";
  if (minutes < 60) return `לפני ${minutes} דקות`;
  if (hours < 24) return `לפני ${hours} שעות`;
  return `לפני ${days} ימים`;
}

export default async function AuditPage() {
  const logs = await getAuditLogs();

  return (
    <main className="min-h-screen bg-gray-50 p-8" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">יומן פעולות 📋</h1>
          <a href="/" className="text-blue-600 hover:underline text-sm">
            ← חזרה לדשבורד
          </a>
        </div>

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-right px-4 py-3 text-gray-600 font-medium">פעולה</th>
                <th className="text-right px-4 py-3 text-gray-600 font-medium">משימה</th>
                <th className="text-right px-4 py-3 text-gray-600 font-medium">משתמש</th>
                <th className="text-right px-4 py-3 text-gray-600 font-medium">פרטים</th>
                <th className="text-right px-4 py-3 text-gray-600 font-medium">מתי</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {log.action}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {log.task.title}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {log.user.name}
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">
                    {log.details ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-xs">
                    {timeAgo(log.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {logs.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <p>אין פעולות עדיין</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}