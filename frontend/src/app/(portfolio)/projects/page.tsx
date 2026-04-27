import { projects } from "@/data/projects";
import { profile } from "@/data/profile";

export const metadata = { title: "Projects — Jaya Sabarish Reddy Remala" };

export default function ProjectsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
      <header className="mb-12 sm:mb-16">
        <p className="text-[11px] font-bold uppercase tracking-widest text-fg-faint mb-2">Work</p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-fg">Projects</h1>
        {profile.page_projects && <p className="mt-2 text-sm text-fg-subtle">{profile.page_projects}</p>}
      </header>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <div
            key={i}
            className="group flex flex-col rounded-2xl border border-border bg-surface p-5 sm:p-6 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between gap-2 mb-3">
              <h2 className="font-bold text-fg text-sm leading-snug">{p.title}</h2>
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                {p.award && (
                  <span className="text-[10px] font-semibold rounded-full bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400 px-2 py-0.5 whitespace-nowrap">
                    🏆 Winner
                  </span>
                )}
                {p.featured && !p.award && (
                  <span className="text-[10px] font-semibold rounded-full bg-accent-light border border-indigo-200 dark:border-indigo-800 text-accent px-2 py-0.5">
                    Featured
                  </span>
                )}
              </div>
            </div>

            <p className="text-xs leading-5 text-fg-subtle flex-1 mb-4">{p.description}</p>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {p.tags.map((t) => (
                <span key={t} className="rounded-full bg-surface-raised border border-border px-2 py-0.5 text-[10px] font-medium text-fg-muted">
                  {t}
                </span>
              ))}
            </div>

            {/* Note */}
            {p.note && (
              <p className="text-[11px] text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 border border-amber-100 dark:border-amber-900 rounded-lg px-3 py-2 mb-3 leading-relaxed">
                {p.note}
              </p>
            )}

            {/* Source links */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-border-subtle">
              {p.sourceLinks && p.sourceLinks.length > 0 ? (
                p.sourceLinks.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-full bg-accent-light border border-indigo-200 dark:border-indigo-800 px-2.5 py-0.5 text-[10px] font-semibold text-accent hover:opacity-80 transition-opacity"
                  >
                    {link.label}
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
                  </a>
                ))
              ) : (
                <span className="text-[11px] text-fg-faint">
                  {p.note ? "" : "In progress"}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
