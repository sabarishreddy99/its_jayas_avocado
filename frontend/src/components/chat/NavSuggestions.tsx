import Link from "next/link";
import { profile } from "@/data/profile";

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

const SECTIONS: { href: string; label: string; icon: string; keywords: string[] }[] = [
  {
    href: "/projects",
    label: "Projects",
    icon: "◈",
    keywords: ["project", "built", "build", "snaplog", "codecollab", "gradeVITian", "genecart",
      "hackathon", "award", "winner", "github", "demo", "app", "system", "engine"],
  },
  {
    href: "/experience",
    label: "Experience",
    icon: "◎",
    keywords: ["experience", "work", "job", "role", "shell", "wipro", "nyu", "engineer",
      "intern", "company", "position", "career", "employed", "team", "led", "built at",
      "latency", "pipeline", "kafka", "langraph", "production"],
  },
  {
    href: "/education",
    label: "Education",
    icon: "◉",
    keywords: ["education", "degree", "university", "nyu", "vit", "gpa", "tandon",
      "master", "bachelor", "school", "college", "coursework", "study", "studied", "graduate"],
  },
  {
    href: "/blog",
    label: "Blog",
    icon: "◇",
    keywords: ["blog", "writing", "post", "article", "thoughts", "wrote", "publish"],
  },
  {
    href: "/portfolio",
    label: "Skills",
    icon: "◆",
    keywords: ["skill", "stack", "technology", "language", "tool", "framework", "python",
      "typescript", "react", "fastapi", "kubernetes", "aws", "redis", "proficient"],
  },
];

export function detectNavLinks(userMsg: string, assistantMsg: string): NavLink[] {
  const combined = (userMsg + " " + assistantMsg).toLowerCase();
  const links: NavLink[] = [];

  for (const s of SECTIONS) {
    if (s.keywords.some((kw) => combined.includes(kw))) {
      links.push({ label: s.label, href: s.href, icon: s.icon } as NavLink & { icon: string });
    }
  }

  // Resume link when resume/cv/download mentioned
  if (/\b(resume|cv|download|pdf)\b/.test(combined)) {
    links.push({ label: "Resume ↗", href: profile.resume, external: true });
  }

  return links.slice(0, 4); // cap at 4 to avoid clutter
}

export default function NavSuggestions({ links }: { links: NavLink[] }) {
  if (!links.length) return null;

  return (
    <div className="mt-3 flex flex-wrap gap-1.5">
      {links.map((l) =>
        l.external ? (
          <a
            key={l.href}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-[11px] font-medium text-indigo-600 hover:bg-indigo-100 hover:border-indigo-400 transition-all"
          >
            {l.label}
          </a>
        ) : (
          <Link
            key={l.href}
            href={l.href}
            className="inline-flex items-center gap-1 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-[11px] font-medium text-zinc-600 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-700 transition-all"
          >
            {(l as NavLink & { icon?: string }).icon && (
              <span className="text-zinc-400 text-[10px]">{(l as NavLink & { icon?: string }).icon}</span>
            )}
            {l.label}
          </Link>
        )
      )}
    </div>
  );
}
