"use client";

import { useState } from "react";
import EditTaskForm from "./EditTaskForm";

type Task = {
  id: string;
  title: string;
  description: string | null;
  priority: string;
};

export default function EditTaskModal({ task }: { task: Task }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-100 hover:bg-blue-200 text-blue-600 px-2 py-1 rounded text-sm transition-colors"
        title="ערוך משימה"
      >
        ✏️עריכה
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4" dir="rtl">
            <h2 className="text-lg font-bold text-gray-800 mb-4">עריכת משימה</h2>
            <EditTaskForm
              taskId={task.id}
              initialTitle={task.title}
              initialDescription={task.description}
              initialPriority={task.priority}
              onClose={() => setIsOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}