import Link from "next/link";
import ChatInterface from "@/components/chat/ChatInterface";

export default function ChatPage() {
  return (
    <div className="flex flex-col h-[100dvh] bg-[#f8f8f6]">

      {/* Nav — open, no border */}
      <header className="shrink-0 px-6 sm:px-12 pt-5 pb-3">
        <div className="mx-auto flex w-full max-w-2xl items-center justify-between">
          <span className="text-sm font-black tracking-tight text-zinc-950">
            Jaya Sabarish Reddy Remala<span className="text-indigo-600">.</span>
          </span>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-zinc-400 hover:text-zinc-950 transition-colors tracking-wide"
          >
            View Portfolio
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </header>

      {/* Intro — centered, breathing room */}
      <div className="shrink-0 px-6 text-center pb-5 pt-3">
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-400">
            Avocado · Live
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950">
          Chat with Avocado 🥑
        </h1>
        <p className="mt-1 text-[11px] font-medium text-indigo-500 tracking-wide">
          Jaya&apos;s personal AI chatbot
        </p>
        <p className="mt-2 text-sm text-zinc-500 max-w-sm mx-auto leading-relaxed">
          Ask anything about his work, projects, skills, or background.
        </p>
        <div className="mx-auto mt-5 w-8 h-px bg-zinc-200" />
      </div>

      {/* Chat — open, fills remaining height */}
      <div className="flex-1 overflow-hidden">
        <ChatInterface />
      </div>

    </div>
  );
}
