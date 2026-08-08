import type { Metadata } from "next";
import { Anek_Telugu } from "next/font/google";
import { VRFLangProvider } from "@/components/vrfbricks/VRFLang";
import VRFNav from "@/components/vrfbricks/VRFNav";
import VRFFooter from "@/components/vrfbricks/VRFFooter";
import VRFContactFab from "@/components/vrfbricks/VRFContactFab";
import VRFJsonLd from "@/components/vrfbricks/VRFJsonLd";
import VRFCanonicalRedirect from "@/components/vrfbricks/VRFCanonicalRedirect";
import { localBusinessLd, webSiteLd, VRF_URL, VRF_TITLE, VRF_DESC, VRF_OG_CARD } from "@/lib/vrfbricks/seo";

/**
 * Anek Telugu is loaded because the site's own faces (Geist, Inter, Cormorant)
 * carry no Telugu glyphs at all. The `.vrf` rule in globals.css appends it to
 * the font stack so the browser falls through per glyph; without it every
 * Telugu string on this bilingual site renders as tofu boxes.
 *
 * Declared HERE rather than in the root layout so the portfolio and gradeVITian
 * do not pay for a family they never render. Everything else (body text,
 * headings, the Cormorant editorial voice) comes from the shared design system.
 */
const anekTelugu = Anek_Telugu({
  variable: "--font-vrf-telugu",
  subsets: ["telugu"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(VRF_URL),
  title: {
    // `absolute` on the home page; children get the template.
    default: VRF_TITLE,
    template: "%s, VRF Bricks",
  },
  description: VRF_DESC,
  applicationName: "VRF Bricks",
  category: "business",
  keywords: [
    "fly ash bricks", "fly ash bricks Kavali", "fly ash bricks Nellore",
    "cement bricks Kavali", "solid bricks Nellore", "bricks near me",
    "VRF Bricks", "Venkata Ramana Fly Ash Cement Bricks",
    "brick supplier Nellore district", "fly ash brick price",
    "ఫ్లై యాష్ ఇటుకలు", "కావలి ఇటుకలు",
  ],
  // Numbers like 11x5.5x7 must not become tap-to-call links on iOS.
  formatDetection: { telephone: false, address: false, email: false },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    siteName: "VRF Bricks",
    url: VRF_URL,
    title: VRF_TITLE,
    description: VRF_DESC,
    locale: "en_IN",
    alternateLocale: "te_IN",
    images: [VRF_OG_CARD],
  },
  twitter: {
    card: "summary_large_image",
    title: VRF_TITLE,
    description: VRF_DESC,
    images: [VRF_OG_CARD.url],
  },
};

export default function VRFLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`vrf ${anekTelugu.variable}`}
    >
      <VRFJsonLd data={[localBusinessLd(), webSiteLd()]} />
      <VRFCanonicalRedirect />
      <VRFLangProvider>
        <div className="flex min-h-screen flex-col">
          <VRFNav />
          <main className="flex-1">{children}</main>
          <VRFFooter />
        </div>
        <VRFContactFab />
      </VRFLangProvider>
    </div>
  );
}
