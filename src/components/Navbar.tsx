import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b" style={{ borderColor: "var(--line)" }}>
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-[15px] font-semibold tracking-tight">
          Task Tracker
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/tasks" className="hover:underline underline-offset-4">
            Tasks
          </Link>
          {/* Sign-in state wired up on Day 2 with Firebase Auth */}
          <span className="rounded-full border px-3 py-1 text-xs" style={{ borderColor: "var(--line)" }}>
            Not signed in
          </span>
        </nav>
      </div>
    </header>
  );
}
