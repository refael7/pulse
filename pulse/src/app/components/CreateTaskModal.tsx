"use client";

import { useState } from "react";
import CreateTaskForm from "./CreateTaskForm";

export default function CreateTaskModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-500"
      >
        + משימה חדשה
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4" dir="rtl">
            <h2 className="text-lg font-bold text-gray-800 mb-4">משימה חדשה</h2>
            <CreateTaskForm onClose={() => setIsOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}