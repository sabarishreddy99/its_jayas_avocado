"use client";

import { useGitHubStaging } from "@/lib/admin/githubStaging";

/** Fixed bottom toolbar: shows everything staged across editors and publishes it all
 *  in a single GitHub commit (→ one CI deploy). */
export default function PublishBar() {
  const ctx = useGitHubStaging();
  if (!ctx) return null;
  const { staged, count, publishAll, publishing, unstage, result, dismissResult } = ctx;

  if (count === 0 && !result) return null;

  return (
    <>
      {/* Reserve space only while the fixed publishing control is visible. */}
      <div className="h-28 sm:h-20" aria-hidden />
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border-strong bg-surface shadow-[0_-12px_32px_-20px_rgb(0_0_0/0.45)]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 pt-3.5" style={{ paddingBottom: "max(0.875rem, env(safe-area-inset-bottom))" }}>
          {count > 0 ? (
            <>
              <span className="text-sm font-semibold text-fg">
                {count} pending change{count > 1 ? "s" : ""}
              </span>
              <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5">
                {Object.keys(staged).map((path) => (
                  <span key={path} className="inline-flex items-center gap-1.5 rounded-lg border border-border-subtle bg-surface-raised px-2.5 py-1 text-[11px] text-fg-muted">
                    {path.replace(/^.*\//, "").replace(/\.json$/, "")}
                    <button onClick={() => unstage(path)} aria-label={`Discard ${path}`} className="grid size-5 place-items-center rounded text-fg-faint hover:bg-bg hover:text-rose-500">×</button>
                  </span>
                ))}
              </div>
              <button
                onClick={() => void publishAll()}
                disabled={publishing}
                className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-fg transition-colors hover:bg-accent-hover active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60"
              >
                {publishing ? "Publishing…" : `Publish all (${count})`}
              </button>
            </>
          ) : (
            <div className="flex w-full items-center justify-between gap-3">
              <span className={`text-sm font-medium ${result?.ok ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                {result?.message}
              </span>
              <button onClick={dismissResult} className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-fg hover:bg-surface-raised">
                Dismiss
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
