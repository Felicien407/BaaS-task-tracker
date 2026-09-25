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
    <li className="flex flex-col gap-4 rounded-2xl border border-[#e7e7ef] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <div className="flex items-start gap-3">
          <span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${task.status === "completed" ? "bg-emerald-400" : task.status === "in_progress" ? "bg-amber-400" : "bg-[#bcb7ff]"}`} />
          <div>
            <p className={`font-semibold text-[#26263a] ${task.status === "completed" ? "text-[#9697a5] line-through" : ""}`}>{task.title}</p>
            {task.description && (
              <p className="mt-1 text-sm leading-6 text-[#6f7182]">{task.description}</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <button
          onClick={handleToggleStatus}
          className="rounded-lg border border-[#e7e7ef] bg-[#fafaff] px-3 py-2 text-xs font-semibold text-[#5b4bdb] transition hover:border-[#bcb7ff]"
        >
          {STATUS_LABEL[task.status]}
        </button>
        <button
          onClick={handleDelete}
          className="rounded-lg border border-red-100 px-3 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-50"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
