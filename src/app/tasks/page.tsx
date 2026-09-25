"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import TaskForm from "@/components/TaskForm";
import TaskCard from "@/components/TaskCard";
import { Task } from "@/types/task";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function TasksPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);

  // Route guard: bounce unauthenticated users to /login once we know
  // for sure they're not logged in (loading === false, user === null).
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // Real-time subscription: onSnapshot fires immediately with the current
  // data, then again on every future change — no manual refetching needed.
  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, "tasks"), where("ownerId", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const next = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })) as Task[];
      setTasks(next);
    });

    return () => unsubscribe();
  }, [user]);

  if (loading || !user) {
    return <main className="flex min-h-screen items-center justify-center text-sm text-[#6f7182]">Loading your workspace…</main>;
  }

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-5 py-8 sm:px-8">
      <header className="mb-10 flex items-center justify-between">
        <div className="flex items-center gap-3 text-sm font-bold tracking-tight">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#ff8066] text-lg text-[#191a2b]">✓</span>
          Taskflow
        </div>
        <button onClick={() => signOut(auth)} className="rounded-lg px-3 py-2 text-sm font-semibold text-[#6f7182] transition hover:bg-white hover:text-[#191a2b]">
          Sign out
        </button>
      </header>
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#5b4bdb]">Your workspace</p>
        <h1 className="text-4xl font-bold tracking-tight text-[#191a2b]">Good to see you.</h1>
        <p className="mt-2 text-[#6f7182]">{tasks.length ? `${tasks.length} ${tasks.length === 1 ? "task" : "tasks"} in your list` : "Start with one small, meaningful step."}</p>
      </div>
      <TaskForm />
      <ul className="mt-2 flex flex-col gap-3">
        {tasks.length === 0 && (
          <div className="rounded-2xl border border-dashed border-[#d7d6e4] bg-white/60 px-6 py-10 text-center">
            <p className="text-2xl">✦</p>
            <p className="mt-3 font-semibold text-[#454657]">Your list is clear</p>
            <p className="mt-1 text-sm text-[#6f7182]">Add a task above and make some progress.</p>
          </div>
        )}
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </ul>
    </main>
  );
}
