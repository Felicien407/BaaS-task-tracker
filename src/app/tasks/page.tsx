import type { Task } from "@/types/task";
import TaskCard from "@/components/TaskCard";

// Static placeholder data for Day 1. Replaced by Firestore reads on Day 3.
const MOCK_TASKS: Task[] = [
  {
    id: "1",
    title: "Set up local dev environment",
    description: "Node, Git, VS Code extensions.",
    status: "completed",
    createdAt: new Date("2026-09-21"),
  },
  {
    id: "2",
    title: "Scaffold Next.js app",
    description: "App Router, TypeScript, Tailwind.",
    status: "completed",
    createdAt: new Date("2026-09-21"),
  },
  {
    id: "3",
    title: "Wire up Firebase Auth",
    description: "Email/password and Google sign-in.",
    status: "in_progress",
    createdAt: new Date("2026-09-22"),
  },
  {
    id: "4",
    title: "Connect Firestore CRUD",
    description: "Create and read task documents.",
    status: "todo",
    createdAt: new Date("2026-09-22"),
  },
];

export default function TasksPage() {
  return (
    <section>
      <div className="flex items-baseline justify-between">
        <h1 className="text-xl font-semibold tracking-tight">Tasks</h1>
        <span className="text-sm text-neutral-500">{MOCK_TASKS.length} total</span>
      </div>
      <ul className="mt-6">
        {MOCK_TASKS.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </ul>
    </section>
  );
}
