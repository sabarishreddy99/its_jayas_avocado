import VRFDeliveryPage from "@/components/vrfbricks/VRFDeliveryPage";
import VRFJsonLd from "@/components/vrfbricks/VRFJsonLd";
import { vrfMetadata, breadcrumbLd, faqLdFor } from "@/lib/vrfbricks/seo";

export const metadata = vrfMetadata({
  path: "/vrfbricks/delivery",
  title: "Brick Delivery in Kavali and Nellore District",
  description:
    "Fly ash brick delivery from our yard in Kavali, usually within one to two days. About 400 or 500 bricks per truck load depending on size. Self pick-up welcome, 6 AM to 9 PM daily.",
  keywords: [
    "brick delivery Kavali", "brick delivery Nellore", "bricks per truck load",
    "fly ash brick delivery", "brick transport Nellore district",
  ],
});

export default function Page() {
  return (
    <>
      <VRFJsonLd data={[breadcrumbLd("/delivery", "Delivery"), faqLdFor("delivery") ?? {}]} />
      <VRFDeliveryPage />
    </>
  );
}
