import VRFNotFound from "../not-found";
import { vrfMetadata } from "@/lib/vrfbricks/seo";

/**
 * A static export has no server, so Next only emits the ROOT `404.html` and
 * this segment's `not-found.tsx` never reaches out/. nginx therefore serves
 * this route as the subdomain's `error_page 404` body (see
 * infra/nginx/vrfbricks.conf), which keeps the VRF shell — and the phone
 * number — instead of dropping a visitor on nginx's bare 404.
 *
 * The status code still comes from nginx (a real 404), so this is not a soft
 * 404. The route is noindexed because it also answers 200 at /404/.
 */
export const metadata = vrfMetadata({
  path: "/vrfbricks/404",
  title: "Page not found",
  description: "That page is not here. Every page on the VRF Bricks site is one tap away.",
  noindex: true,
});

export default function NotFoundRoute() {
  return <VRFNotFound />;
}
