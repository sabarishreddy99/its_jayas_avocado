import GradeVITianNotFound from "../not-found";
import { gvMetadata } from "@/lib/gradevitian/seo";

/**
 * Static export has no server, so Next only emits the ROOT `404.html` — the
 * segment's `not-found.tsx` never reaches the export. nginx therefore serves this
 * route as the subdomain's `error_page 404` body (see infra/nginx/gradevitian.conf),
 * which keeps the gradeVITian shell and its links-to-every-tool recovery grid
 * instead of dropping visitors on nginx's bare 404 or the portfolio's.
 *
 * The status code still comes from nginx (a real 404), so this is not a soft 404.
 * The route is noindexed because it also answers 200 at /404/.
 */
export const metadata = gvMetadata({
  path: "/404",
  title: "Page not found",
  description: "That gradeVITian page wandered off. Every calculator is one tap away.",
  noindex: true,
});

export default function NotFoundRoute() {
  return <GradeVITianNotFound />;
}
