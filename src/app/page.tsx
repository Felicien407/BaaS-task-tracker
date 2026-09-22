import Link from "next/link";

export default function Home() {
  return (
    <section className="py-20">
      <p className="text-sm" style={{ color: "var(--signal)" }}>
        Project · Task Tracker
      </p>
      <h1 className="mt-3 max-w-md text-3xl font-semibold tracking-tight">
        See what the team is working on, in one list.
      </h1>
      <p className="mt-4 max-w-md text-[15px] text-neutral-600">
        Log in, add a task, move it forward, mark it done. Nothing more than
        that this week — auth and live data come next.
      </p>
      <Link
        href="/tasks"
        className="mt-8 inline-block rounded-md px-4 py-2 text-sm font-medium text-white"
        style={{ background: "var(--signal)" }}
      >
        View tasks
      </Link>
    </section>
  );
}
