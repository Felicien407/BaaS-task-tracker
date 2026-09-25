"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import TaskForm from "@/components/TaskForm";
import TaskCard from "@/components/TaskCard";
import { Task } from "@/types/task";

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
    return <p className="p-6">Loading…</p>;
  }

  return (
    <main className="mx-auto flex max-w-lg flex-col gap-6 px-4 py-8">
      <h1 className="text-2xl font-semibold">Your tasks</h1>
      <TaskForm />
      <ul className="flex flex-col gap-2">
        {tasks.length === 0 && (
          <p className="text-sm text-gray-500">No tasks yet — add one above.</p>
        )}
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </ul>
    </main>
  );
}
