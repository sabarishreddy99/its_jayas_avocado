import type { Metadata } from "next";
import { GVAuthProvider } from "@/components/gradevitian/GVAuthProvider";
import GVNav from "@/components/gradevitian/GVNav";
import GVFooter from "@/components/gradevitian/GVFooter";
import GVScrollTop from "@/components/gradevitian/GVScrollTop";
import GVServiceWorker from "@/components/gradevitian/GVServiceWorker";
import GVIntroScreen from "@/components/gradevitian/GVIntroScreen";
import GVCanonicalRedirect from "@/components/gradevitian/GVCanonicalRedirect";
import GVJsonLd from "@/components/gradevitian/GVJsonLd";
import { gvSiteLd, GV_OG_CARD, GV_URL, GV_TITLE, GV_DESC } from "@/lib/gradevitian/seo";
import ScrollProgress from "@/components/ScrollProgress";

export const metadata: Metadata = {
  metadataBase: new URL(GV_URL),
  title: {
    default: GV_TITLE,
    template: "%s, gradeVITian",
  },
  description: GV_DESC,
  applicationName: "gradeVITian",
  category: "education",
  authors: [{ name: "Jaya Sabarish Reddy Remala", url: "https://jayaremala.com" }],
  creator: "Jaya Sabarish Reddy Remala",
  publisher: "gradeVITian",
  // Stops iOS Safari from turning credit counts and GPA numbers into phone links.
  formatDetection: { telephone: false, address: false, email: false },
  // Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION to the token from Search Console
  // ("HTML tag" method) to verify the property without uploading a file.
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  keywords: [
    "VIT", "VITian", "VIT Vellore", "GPA calculator", "CGPA calculator",
    "VIT GPA", "VIT CGPA", "grade predictor", "CGPA estimator",
    "attendance calculator", "VIT grading", "gradeVITian",
  ],
  manifest: "/gradevitian/manifest.webmanifest",
  // Graduation-cap icon for the browser tab and the installed/home-screen app.
  icons: {
    icon: [
      { url: "/gradevitian/gv-icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/gradevitian/gv-icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/gradevitian/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  // Ensures iOS shows "gradeVITian" (not the page title) under the home-screen icon.
  appleWebApp: { capable: true, title: "gradeVITian", statusBarStyle: "default" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    siteName: "gradeVITian",
    url: GV_URL,
    title: GV_TITLE,
    description: GV_DESC,
    locale: "en_US",
    images: [GV_OG_CARD],
  },
  twitter: {
    card: "summary_large_image",
    title: GV_TITLE,
    description: GV_DESC,
    images: [GV_OG_CARD.url],
  },
};

// Every gradeVITian page calls the API on mount (visit counter, saved calcs, stats),
// so warm the connection during HTML parse instead of after hydration.
const API_ORIGIN = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_API_BASE_URL ?? "").origin;
  } catch {
    return null;
  }
})();

export default function GradeVITianLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {API_ORIGIN && (
        <>
          <link rel="preconnect" href={API_ORIGIN} crossOrigin="" />
          <link rel="dns-prefetch" href={API_ORIGIN} />
        </>
      )}
      <GVJsonLd data={gvSiteLd()} />
      <GVCanonicalRedirect />
      <GVAuthProvider>
        <GVIntroScreen />
        <ScrollProgress />
        <div className="flex min-h-screen flex-col">
          <GVNav />
          <main className="relative flex-1">{children}</main>
          <GVFooter />
        </div>
        <GVScrollTop />
        <GVServiceWorker />
      </GVAuthProvider>
    </>
  );
}
