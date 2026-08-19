import type { Metadata } from "next";
import CodebaseAtlas from "@/components/portfolio/CodebaseAtlas";

const SITE_URL = "https://jayaremala.com";

export const metadata: Metadata = {
  title: "Atlas · How this site is built | Jaya Sabarish Reddy Remala",
  description:
    "A guided read of the repository behind this site: three products shipping from one static export, a hybrid RAG backend, the two pipelines that explain the folder layout, and the conventions that fail quietly.",
  alternates: { canonical: `${SITE_URL}/atlas` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/atlas`,
    title: "Atlas | How this site is built",
    description:
      "Three sites from one static export, one FastAPI box: the architecture, the pipelines, and the decisions behind them.",
    siteName: "Jaya Sabarish Reddy Remala",
  },
};

export default function AtlasPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 py-12 sm:py-16">
      <header className="mb-10">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent mb-2">
          Codebase atlas
        </p>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-fg">
          How this site is built
        </h1>
        <p className="mt-3 text-sm text-fg-muted leading-relaxed max-w-2xl">
          Three websites ship from a single static export, and one FastAPI container serves
          everything dynamic across all of them. This is the map an engineer would want before
          opening the repository: what each layer owns, the two pipelines that explain the folder
          structure, and the handful of conventions where getting it wrong produces no error at all.
        </p>
      </header>

      <CodebaseAtlas />
    </div>
  );
}
