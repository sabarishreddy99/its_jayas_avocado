"use client";

import { useEffect } from "react";

/**
 * Canonicalize to the subdomain: if the path form is opened on the main domain
 * (jayaremala.com/vrfbricks/…), bounce to vrfbricks.jayaremala.com/… .
 *
 * Never fires on the subdomain or localhost. Runs as a client effect rather
 * than a raw <script> — React does not execute inline scripts on the client,
 * and `alternates.canonical` already advertises the canonical URL to crawlers.
 */
export default function VRFCanonicalRedirect() {
  useEffect(() => {
    const h = location.hostname;
    if (h !== "jayaremala.com" && h !== "www.jayaremala.com") return;
    const p = location.pathname.replace(/^\/vrfbricks/, "") || "/";
    location.replace(`https://vrfbricks.jayaremala.com${p}${location.search}${location.hash}`);
  }, []);

  return null;
}
