import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-semibold">Task Tracker</h1>
      <Link href="/tasks" className="rounded bg-black px-4 py-2 text-white">
        Go to my tasks
      </Link>
    </main>
  );
}
