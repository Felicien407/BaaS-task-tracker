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
    <form onSubmit={handleSubmit} className="rounded-2xl border border-[#e7e7ef] bg-white p-5 shadow-sm">
      <div className="mb-4">
        <p className="font-bold text-[#191a2b]">Add a new task</p>
        <p className="mt-1 text-sm text-[#6f7182]">What would make today feel successful?</p>
      </div>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full rounded-xl border border-[#e7e7ef] bg-[#fafaff] px-4 py-3 outline-none transition placeholder:text-[#a2a3b0] focus:border-[#5b4bdb] focus:ring-4 focus:ring-indigo-100"
      />
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full rounded-xl border border-[#e7e7ef] bg-[#fafaff] px-4 py-3 outline-none transition placeholder:text-[#a2a3b0] focus:border-[#5b4bdb] focus:ring-4 focus:ring-indigo-100"
        rows={2}
      />
      <button
        type="submit"
        disabled={submitting}
        className="mt-2 self-start rounded-xl bg-[#191a2b] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#302f48] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {submitting ? "Adding…" : "Add task"}
      </button>
    </form>
  );
}
