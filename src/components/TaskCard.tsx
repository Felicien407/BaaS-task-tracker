"use client";

import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Task } from "@/types/task";

const STATUS_CYCLE: Record<Task["status"], Task["status"]> = {
  todo: "in_progress",
  in_progress: "completed",
  completed: "todo",
};

const STATUS_LABEL: Record<Task["status"], string> = {
  todo: "To do",
  in_progress: "In progress",
  completed: "Completed",
};

export default function TaskCard({ task }: { task: Task }) {
  // Clicking the status button cycles todo -> in_progress -> completed -> todo.
  // updateDoc only needs the fields that change; it merges rather than overwrites.
  async function handleToggleStatus() {
    await updateDoc(doc(db, "tasks", task.id), {
      status: STATUS_CYCLE[task.status],
    });
  }

  async function handleDelete() {
    await deleteDoc(doc(db, "tasks", task.id));
  }

  return (
    <li className="flex items-center justify-between rounded border p-3">
      <div>
        <p className="font-medium">{task.title}</p>
        {task.description && (
          <p className="text-sm text-gray-600">{task.description}</p>
        )}
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={handleToggleStatus}
          className="rounded border px-2 py-1 text-sm"
        >
          {STATUS_LABEL[task.status]}
        </button>
        <button
          onClick={handleDelete}
          className="rounded border border-red-300 px-2 py-1 text-sm text-red-600"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
