import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/admin"],
      },
    ],
    // Every property this site owns. Each subdomain also serves its own
    // robots.txt naming its own sitemap, but listing them here too is how a
    // crawler that only ever reaches the apex still discovers them.
    sitemap: [
      "https://jayaremala.com/sitemap.xml",
      "https://gradevitian.jayaremala.com/sitemap.xml",
      "https://vrfbricks.jayaremala.com/sitemap.xml",
    ],
  };
}
