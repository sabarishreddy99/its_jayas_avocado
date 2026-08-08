import type { Metadata } from "next";
import VRFHome from "@/components/vrfbricks/VRFHome";
import VRFJsonLd from "@/components/vrfbricks/VRFJsonLd";
import { vrfUrl, VRF_TITLE, VRF_DESC, VRF_OG_CARD, faqLdFor } from "@/lib/vrfbricks/seo";

/**
 * `title.absolute` rather than a bare `title`: a plain string would be wrapped
 * by the VRF layout's "%s, VRF Bricks" template AND then by the ROOT layout's
 * "%s | Jaya Sabarish Reddy Remala", pushing it far past SERP truncation.
 */
export const metadata: Metadata = {
  title: { absolute: VRF_TITLE },
  description: VRF_DESC,
  alternates: { canonical: vrfUrl("/") },
  openGraph: {
    type: "website",
    siteName: "VRF Bricks",
    url: vrfUrl("/"),
    title: VRF_TITLE,
    description: VRF_DESC,
    locale: "en_IN",
    images: [VRF_OG_CARD],
  },
};

export default function Page() {
  return (
    <>
      <VRFJsonLd data={faqLdFor("home") ?? []} />
      <VRFHome />
    </>
  );
}
