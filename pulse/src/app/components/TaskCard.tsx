import type { Prisma } from "@/generated/prisma/client";
import StatusButton from "./StatusButton";
import DeleteButton from "./DeleteButton";
import EditTaskModal from "./EditTaskModal";

type TaskWithOwner = Prisma.TaskGetPayload<{
  include: { owner: true };
}>;

const priorityColors = {
  LOW: "bg-gray-100 text-gray-600",
  MEDIUM: "bg-yellow-100 text-yellow-700",
  HIGH: "bg-red-100 text-red-700",
};

const priorityLabels = {
  LOW: "נמוכה",
  MEDIUM: "בינונית",
  HIGH: "גבוהה",
};

export default function TaskCard({ task }: { task: TaskWithOwner }) {
  return (
    <div className={`bg-white rounded-lg p-4 shadow hover:shadow-md transition-shadow flex flex-col h-full ${task.isDeleted ? "opacity-50" : ""}`}>
      <div className="flex justify-between items-start mb-2">
        <h3 className={`font-semibold ${task.isDeleted ? "line-through text-gray-400" : "text-gray-800"}`}>
          {task.title}
        </h3>
        <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[task.priority]}`}>
          {priorityLabels[task.priority]}
        </span>
      </div>
      <div className="text-xs text-gray-500 mb-2">👤 {task.owner.name}</div>
      {task.description && (
        <p className="text-gray-500 text-sm mb-3">{task.description}</p>
      )}
      <div className="flex justify-between items-center mt-auto">
        <StatusButton taskId={task.id} initialStatus={task.status} />
        <div className="flex items-center gap-2">
          {!task.isDeleted && <EditTaskModal task={task} />}
          <DeleteButton taskId={task.id} isDeleted={task.isDeleted} />
        </div>
      </div>
    </div>
  );
}