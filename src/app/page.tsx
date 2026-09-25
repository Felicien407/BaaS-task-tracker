import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] bg-[#191a2b] shadow-2xl shadow-indigo-200/40 md:grid-cols-[1.1fr_0.9fr]">
        <section className="relative flex min-h-[520px] flex-col justify-between overflow-hidden p-8 text-white sm:p-12">
          <div className="absolute -right-28 -top-28 h-72 w-72 rounded-full bg-[#5b4bdb] opacity-70 blur-3xl" />
          <div className="relative">
            <div className="mb-16 flex items-center gap-3 text-sm font-bold tracking-tight">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#ff8066] text-lg text-[#191a2b]">✓</span>
              Taskflow
            </div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-[#bcb7ff]">Make space for focus</p>
            <h1 className="max-w-lg text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl">
              The simple way to move work forward.
            </h1>
            <p className="mt-6 max-w-md text-base leading-7 text-slate-300">
              Capture what matters, keep momentum, and enjoy a calmer day at work.
            </p>
          </div>
          <p className="relative text-sm text-slate-400">A quieter workspace for busy minds.</p>
        </section>
        <section className="flex min-h-[520px] flex-col justify-center bg-white p-8 sm:p-12">
          <p className="mb-3 text-sm font-semibold text-[#5b4bdb]">Your workspace awaits</p>
          <h2 className="text-3xl font-bold tracking-tight text-[#191a2b]">Ready when you are.</h2>
          <p className="mt-4 max-w-sm leading-7 text-[#6f7182]">
            Sign in to pick up where you left off, or create an account in seconds.
          </p>
          <Link href="/tasks" className="mt-9 flex items-center justify-center rounded-xl bg-[#5b4bdb] px-5 py-3.5 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-[#4c3dc9]">
            Go to my tasks <span className="ml-2">→</span>
          </Link>
          <p className="mt-5 text-center text-xs text-[#9899a8]">Simple, focused, and yours.</p>
        </section>
      </div>
    </main>
  );
}
