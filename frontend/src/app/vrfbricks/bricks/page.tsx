import VRFBricksPage from "@/components/vrfbricks/VRFBricksPage";
import VRFJsonLd from "@/components/vrfbricks/VRFJsonLd";
import { vrfMetadata, breadcrumbLd, vrfUrl, faqLdFor } from "@/lib/vrfbricks/seo";
import { BRICKS } from "@/data/vrfbricks/business";

export const metadata = vrfMetadata({
  path: "/vrfbricks/bricks",
  title: "Fly Ash Brick Sizes and Specifications",
  description:
    "Solid fly ash cement brick sizes made in Kavali: 11x5.5x7, 11x4x7 and 11x5.5x9 inches, with dimensions in mm and cm, truck loads, and a brick quantity calculator.",
  keywords: [
    "fly ash brick size", "fly ash brick dimensions", "solid cement brick size",
    "brick calculator", "bricks per truck", "11x5.5x7 brick", "brick quantity calculator",
  ],
});

/**
 * One Product entity per brick, so a size query can surface the specific brick
 * rather than only the business. `offers` carries no price — see seo.ts.
 */
const productsLd = BRICKS.map((b) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: b.name.en,
  description: b.use.en,
  category: "Fly ash cement brick",
  material: "Fly ash, cement, stone dust, gypsum",
  url: `${vrfUrl("/bricks")}#${b.id}`,
  width: { "@type": "QuantitativeValue", value: b.inches.l, unitCode: "INH" },
  depth: { "@type": "QuantitativeValue", value: b.inches.w, unitCode: "INH" },
  height: { "@type": "QuantitativeValue", value: b.inches.h, unitCode: "INH" },
  brand: { "@type": "Brand", name: "VRF Bricks" },
  offers: {
    "@type": "Offer",
    priceCurrency: "INR",
    availability: b.madeToOrder
      ? "https://schema.org/PreOrder"
      : "https://schema.org/InStock",
    seller: { "@id": "https://vrfbricks.jayaremala.com/#business" },
  },
}));

export default function Page() {
  return (
    <>
      <VRFJsonLd data={[breadcrumbLd("/bricks", "Our Bricks"), faqLdFor("bricks") ?? {}, ...productsLd]} />
      <VRFBricksPage />
    </>
  );
}
