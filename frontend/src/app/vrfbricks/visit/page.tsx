import VRFVisitPage from "@/components/vrfbricks/VRFVisitPage";
import VRFJsonLd from "@/components/vrfbricks/VRFJsonLd";
import { vrfMetadata, breadcrumbLd } from "@/lib/vrfbricks/seo";
import { BUSINESS, fmtHours, formattedAddress } from "@/data/vrfbricks/business";

export const metadata = vrfMetadata({
  path: "/vrfbricks/visit",
  title: "Visit the Yard in Kavali",
  description: `${formattedAddress()}. Open every day ${fmtHours("en", "to")}. Call ${BUSINESS.phoneDisplay}.`,
  keywords: [
    "fly ash bricks Kavali address", "brick yard Kavali", "VRF Bricks contact",
    "brick supplier near me Nellore", "cement bricks Kavali phone number",
  ],
});

export default function Page() {
  return (
    <>
      <VRFJsonLd data={breadcrumbLd("/visit", "Visit Us")} />
      <VRFVisitPage />
    </>
  );
}
