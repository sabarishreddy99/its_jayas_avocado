import VRFWhyPage from "@/components/vrfbricks/VRFWhyPage";
import VRFJsonLd from "@/components/vrfbricks/VRFJsonLd";
import { vrfMetadata, breadcrumbLd, standardLd, faqLdFor } from "@/lib/vrfbricks/seo";

export const metadata = vrfMetadata({
  path: "/vrfbricks/why-fly-ash",
  title: "Fly Ash Bricks vs Red Clay Bricks",
  description:
    "An honest comparison of pressed fly ash cement bricks and kiln-fired red clay bricks: size consistency, mortar and plaster use, water absorption, and where red clay still wins.",
  keywords: [
    "fly ash bricks vs red bricks", "fly ash brick advantages", "IS 12894",
    "fly ash brick strength", "fly ash brick water absorption",
    "which brick is better", "brick comparison India",
  ],
});

export default function Page() {
  return (
    <>
      <VRFJsonLd
        data={[breadcrumbLd("/why-fly-ash", "Why Fly Ash"), standardLd(), faqLdFor("why") ?? {}]}
      />
      <VRFWhyPage />
    </>
  );
}
