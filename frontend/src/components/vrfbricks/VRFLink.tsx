"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { useVrfBase } from "@/lib/vrfbricks/useVrfBase";

/**
 * A next/link that prepends the VRF mount-point prefix to internal hrefs, so
 * the same build works on vrfbricks.jayaremala.com AND under
 * jayaremala.com/vrfbricks. External or hash links are passed through.
 *
 * Every internal href in this subtree is written CLEAN ("/bricks/") — the
 * subdomain is the canonical form and the one the sitemap lists, so that is
 * what the markup should point at by default.
 */
export default function VRFLink({ href, ...props }: ComponentProps<typeof Link>) {
  const base = useVrfBase();
  const isInternal = typeof href === "string" && href.startsWith("/");
  return <Link href={isInternal ? `${base}${href}` : href} {...props} />;
}
