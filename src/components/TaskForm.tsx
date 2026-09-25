"use client";

import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";

export default function TaskForm() {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user || !title.trim()) return;

    setSubmitting(true);
    try {
      // ownerId is what firestore.rules checks against — without it every
      // task would be readable/writable by any signed-in user.
      await addDoc(collection(db, "tasks"), {
        title: title.trim(),
        description: description.trim(),
        status: "todo",
        ownerId: user.uid,
        createdAt: serverTimestamp(),
      });
      setTitle("");
      setDescription("");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 rounded border p-4">
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="rounded border px-3 py-2"
      />
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="rounded border px-3 py-2"
        rows={2}
      />
      <button
        type="submit"
        disabled={submitting}
        className="self-start rounded bg-black px-3 py-2 text-white disabled:opacity-50"
      >
        {submitting ? "Adding…" : "Add task"}
      </button>
    </form>
  );
}
