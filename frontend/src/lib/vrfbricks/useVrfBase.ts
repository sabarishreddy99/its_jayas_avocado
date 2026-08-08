"use client";

import { useEffect, useState } from "react";

/**
 * The VRF Bricks site is served at two mount points from the SAME static export:
 *   - subdomain  vrfbricks.jayaremala.com/…      → clean paths ("/bricks")
 *   - path form  jayaremala.com/vrfbricks/…      → prefixed paths ("/vrfbricks/bricks")
 *
 * Links therefore can't be hard-coded. This hook returns the prefix to prepend
 * to an internal href based on where the page is actually mounted. It starts as
 * "" (clean, matching the prerendered HTML so there is no hydration mismatch)
 * and, after mount, switches to "/vrfbricks" only when the browser is under
 * that path.
 *
 * Same shape as useGvBase — see lib/gradevitian/useGvBase.ts.
 */
export function useVrfBase(): string {
  const [base, setBase] = useState("");
  useEffect(() => {
    // Deferred off the synchronous effect body: the prefix only affects link
    // hrefs, so a microtask delay is invisible, and it keeps this out of the
    // set-state-in-effect cascade the linter warns about.
    let cancelled = false;
    void Promise.resolve().then(() => {
      if (!cancelled && window.location.pathname.startsWith("/vrfbricks")) {
        setBase("/vrfbricks");
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);
  return base;
}
