"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

/** Google's own "Sign in with Google" button, driven by Google Identity Services.
 *
 *  Content-free and product-agnostic: it hands the caller the ID token Google
 *  issued and takes no view on what to do with it. gradeVITian trades it for a
 *  student session; the admin desk trades it for an admin session.
 *
 *  The markup lives in a shadow root Google controls, so it can only be styled
 *  through the documented options below — not with classes from here.
 */

interface CredentialResponse {
  credential?: string;
}

interface GsiId {
  initialize(config: {
    client_id: string;
    callback: (response: CredentialResponse) => void;
    auto_select?: boolean;
    cancel_on_tap_outside?: boolean;
    itp_support?: boolean;
    ux_mode?: "popup" | "redirect";
  }): void;
  renderButton(parent: HTMLElement, options: Record<string, unknown>): void;
}

declare global {
  interface Window {
    google?: { accounts?: { id?: GsiId } };
  }
}

const GSI_SRC = "https://accounts.google.com/gsi/client";

/** One shared script load for the whole session, however many buttons mount. */
let gsiLoader: Promise<void> | null = null;

function loadGsi(): Promise<void> {
  if (window.google?.accounts?.id) return Promise.resolve();
  if (!gsiLoader) {
    gsiLoader = new Promise<void>((resolve, reject) => {
      const existing = document.querySelector<HTMLScriptElement>(`script[src="${GSI_SRC}"]`);
      const script = existing ?? document.createElement("script");
      script.addEventListener("load", () => resolve(), { once: true });
      script.addEventListener(
        "error",
        () => {
          gsiLoader = null;
          reject(new Error("Couldn't reach Google. Check your connection and try again."));
        },
        { once: true },
      );
      if (!existing) {
        script.src = GSI_SRC;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      }
    });
  }
  return gsiLoader;
}

// GIS renders a fixed-width button, so it has to be measured rather than stretched.
const MAX_BUTTON_WIDTH = 400; // Google's documented maximum.

export default function GoogleIdentityButton({
  clientId,
  text = "continue_with",
  shape = "pill",
  busy = false,
  onCredential,
  onError,
}: {
  /** OAuth 2.0 *Web application* client ID. Nothing renders when it's empty. */
  clientId: string;
  /** Google's own label options. */
  text?: "continue_with" | "signin_with" | "signup_with";
  shape?: "pill" | "rectangular";
  /** Dims and blocks the button while the caller redeems the credential. */
  busy?: boolean;
  onCredential: (credential: string) => void;
  onError?: (message: string) => void;
}) {
  const { resolvedTheme } = useTheme();
  const hostRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [failed, setFailed] = useState(false);

  // Google calls back outside React, so the handler lives in a ref and the
  // initialize() effect below never has to re-run when props change.
  const handlerRef = useRef(onCredential);
  useEffect(() => {
    handlerRef.current = onCredential;
  }, [onCredential]);

  // Track the available width so the button matches the fields around it.
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const measure = () =>
      setWidth((prev) => {
        const next = Math.min(Math.round(host.clientWidth), MAX_BUTTON_WIDTH);
        return next > 0 && Math.abs(next - prev) > 1 ? next : prev;
      });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  // (Re)render Google's button — also on theme flips, since its colours are baked
  // in at render time and a light button on a dark card looks broken.
  useEffect(() => {
    if (!clientId || !width) return;
    let cancelled = false;

    void (async () => {
      try {
        await loadGsi();
      } catch (err) {
        if (!cancelled) {
          setFailed(true);
          onError?.((err as Error).message);
        }
        return;
      }
      const id = window.google?.accounts?.id;
      const host = hostRef.current;
      if (cancelled || !id || !host) return;

      id.initialize({
        client_id: clientId,
        callback: (response) => {
          if (response.credential) handlerRef.current(response.credential);
        },
        auto_select: false,
        cancel_on_tap_outside: true,
        itp_support: true,
        ux_mode: "popup",
      });
      host.replaceChildren();
      id.renderButton(host, {
        type: "standard",
        theme: resolvedTheme === "dark" ? "filled_black" : "outline",
        size: "large",
        text,
        shape,
        logo_alignment: "left",
        width,
      });
    })();

    return () => {
      cancelled = true;
    };
  }, [clientId, width, resolvedTheme, text, shape, onError]);

  if (!clientId || failed) return null;

  return (
    // min-h reserves the button's height before Google paints into it, so the
    // surrounding card doesn't jump on load.
    <div
      ref={hostRef}
      className={`flex min-h-[40px] justify-center transition-opacity duration-200 ${
        busy ? "pointer-events-none opacity-40" : ""
      }`}
    />
  );
}
