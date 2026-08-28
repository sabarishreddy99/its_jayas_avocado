import Link from "next/link";
import Image from "next/image";

export default function AdminFooter({ githubReady }: { githubReady: boolean }) {
  return (
    <footer className="mt-auto border-t border-border pt-5 pb-0" aria-label="Admin workspace footer">
      <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
        <div className="max-w-xl">
          <div className="flex items-center gap-2">
            <Image
              src="/icon-192.png"
              alt="Jaya Sabarish Reddy Remala"
              width={28}
              height={28}
              className="size-7 rounded-md border border-border-strong bg-white object-cover"
            />
            <p className="text-sm font-semibold text-fg">Avocado Admin</p>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-fg-subtle">
            Edit the source, stage your changes, then publish everything in one commit. Admin access expires after four hours; credentials remain in this browser.
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-fg-muted" aria-label="Publishing workflow">
            <span className="rounded-md border border-border bg-surface px-2 py-1">Edit</span>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            <span className="rounded-md border border-border bg-surface px-2 py-1">Stage changes</span>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            <span className="rounded-md border border-border bg-surface px-2 py-1">Publish all</span>
          </div>
        </div>

        <div className="md:text-right">
          <div className="flex flex-wrap gap-x-4 gap-y-2 md:justify-end">
            <Link href="/" className="text-xs font-medium text-fg-muted underline decoration-border-strong underline-offset-4 hover:text-fg">Live site</Link>
            <Link href="/system" className="text-xs font-medium text-fg-muted underline decoration-border-strong underline-offset-4 hover:text-fg">System status</Link>
            <Link href="/mcp" className="text-xs font-medium text-fg-muted underline decoration-border-strong underline-offset-4 hover:text-fg">MCP</Link>
          </div>
          <div className="mt-4 flex items-center gap-2 md:justify-end">
            <span className={`size-1.5 rounded-full ${githubReady ? "bg-emerald-500" : "bg-amber-400"}`} />
            <span className="text-[11px] text-fg-subtle">{githubReady ? "Ready to publish" : "GitHub token required to publish"}</span>
          </div>
          <p className="mt-2 text-[10px] text-fg-faint">Press <kbd className="rounded border border-border bg-surface px-1.5 py-0.5 font-sans">⌘ K</kbd> to find any section.</p>
        </div>
      </div>
    </footer>
  );
}
