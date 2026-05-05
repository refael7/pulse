import { getAllTasks, getDeletedTasks } from "@/lib/dal/tasks";
import StatsBar from "./components/StatsBar";
import TaskCard from "./components/TaskCard";
import CreateTaskModal from "./components/CreateTaskModal";
import LogoutButton from "./components/LogoutButton";

export default async function HomePage() {
  await new Promise((r) => setTimeout(r, 100));
  const tasks = await getAllTasks();
  const deletedTasks = await getDeletedTasks();

  return (
    <main className="min-h-screen bg-gray-50 p-8" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Pulse 🚀</h1>
            <p className="text-sm text-gray-500">ברוכים הבאים, refael 👋</p>
          </div>
          <div className="flex gap-3 items-center">
            <a href="/audit" className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-500">
              יומן פעולות 📋
            </a>
            <CreateTaskModal />
            <LogoutButton />
          </div>
        </div>

        <StatsBar />

        {tasks.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-xl">אין משימות עדיין</p>
            <p className="text-sm mt-2">התחילו ביצירת המשימה הראשונה</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        )}

        {deletedTasks.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-400 mb-4">
              🗑️ משימות מחוקות ({deletedTasks.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {deletedTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}