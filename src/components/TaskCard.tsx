import type { Task } from "@/types/task";

const STATUS_LABEL: Record<Task["status"], string> = {
  todo: "To do",
  in_progress: "In progress",
  completed: "Completed",
};

const STATUS_STYLE: Record<Task["status"], { bg: string; fg: string }> = {
  todo: { bg: "var(--signal-soft)", fg: "var(--signal)" },
  in_progress: { bg: "var(--progress-soft)", fg: "var(--progress)" },
  completed: { bg: "var(--done-soft)", fg: "var(--done)" },
};

export default function TaskCard({ task }: { task: Task }) {
  const style = STATUS_STYLE[task.status];

  return (
    <li
      className="flex items-start justify-between gap-4 border-b py-4 last:border-b-0"
      style={{ borderColor: "var(--line)" }}
    >
      <div>
        <p className="text-[15px] font-medium">{task.title}</p>
        <p className="mt-1 text-sm text-neutral-500">{task.description}</p>
      </div>
      <span
        className="shrink-0 rounded-full px-3 py-1 text-xs font-medium"
        style={{ background: style.bg, color: style.fg }}
      >
        {STATUS_LABEL[task.status]}
      </span>
    </li>
  );
}
