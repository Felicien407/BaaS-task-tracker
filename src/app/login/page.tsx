"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleEmailAuth(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      router.push("/tasks");
    } catch (err: any) {
      setError(err.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleAuth() {
    setError(null);
    setLoading(true);
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      router.push("/tasks");
    } catch (err: any) {
      setError(err.message ?? "Google sign-in failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-10">
      <div className="w-full max-w-md rounded-3xl border border-white/80 bg-white p-7 shadow-xl shadow-slate-200/70 sm:p-10">
      <div className="mb-9 flex items-center gap-3 text-sm font-bold tracking-tight">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#ff8066] text-lg text-[#191a2b]">✓</span>
        Taskflow
      </div>
      <p className="mb-2 text-sm font-semibold text-[#5b4bdb]">{mode === "login" ? "Welcome back" : "Start your workspace"}</p>
      <h1 className="text-3xl font-bold tracking-tight text-[#191a2b]">
        {mode === "login" ? "Log in" : "Sign up"}
      </h1>
      <p className="mt-2 text-sm text-[#6f7182]">Keep your next best actions close.</p>

      <form onSubmit={handleEmailAuth} className="mt-8 flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="rounded-xl border border-[#e7e7ef] bg-[#fafaff] px-4 py-3 outline-none transition placeholder:text-[#a2a3b0] focus:border-[#5b4bdb] focus:ring-4 focus:ring-indigo-100"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          className="rounded-xl border border-[#e7e7ef] bg-[#fafaff] px-4 py-3 outline-none transition placeholder:text-[#a2a3b0] focus:border-[#5b4bdb] focus:ring-4 focus:ring-indigo-100"
        />
        {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-[#5b4bdb] px-3 py-3 font-semibold text-white shadow-md shadow-indigo-200 transition hover:bg-[#4c3dc9] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Please wait…" : mode === "login" ? "Log in" : "Create account"}
        </button>
      </form>

      <button
        onClick={handleGoogleAuth}
        disabled={loading}
        className="mt-3 rounded-xl border border-[#e7e7ef] px-3 py-3 font-semibold text-[#454657] transition hover:bg-[#fafaff]"
      >
        Continue with Google
      </button>

      <button
        onClick={() => setMode(mode === "login" ? "signup" : "login")}
        className="mt-3 text-sm font-medium text-[#5b4bdb] transition hover:text-[#4032b8]"
      >
        {mode === "login" ? "Need an account? Sign up" : "Have an account? Log in"}
      </button>
      </div>
    </main>
  );
}
