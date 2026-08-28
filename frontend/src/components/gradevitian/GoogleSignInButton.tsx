"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import GoogleIdentityButton from "@/components/ui/GoogleIdentityButton";
import { useGVAuth } from "@/components/gradevitian/GVAuthProvider";
import { useGvBase } from "@/lib/gradevitian/useGvBase";
import { GOOGLE_CLIENT_ID } from "@/lib/google";

/** "Continue with Google" for gradeVITian.
 *
 *  Uses Google Identity Services' ID-token flow: Google hands the browser a signed
 *  JWT, we POST it to /gv/auth/google, and the backend verifies the signature before
 *  minting a gradeVITian session. No redirect URI and no client secret, which is
 *  what makes it work on a static export with no server of its own.
 *
 *  Renders nothing when NEXT_PUBLIC_GOOGLE_CLIENT_ID is unset, so builds without
 *  Google configured simply fall back to the email/password form.
 */
export default function GoogleSignInButton({
  text = "continue_with",
  onError,
}: {
  text?: "continue_with" | "signin_with" | "signup_with";
  onError?: (message: string) => void;
}) {
  const { loginWithGoogle } = useGVAuth();
  const router = useRouter();
  const base = useGvBase();
  const [busy, setBusy] = useState(false);

  const redeem = useCallback(
    (credential: string) => {
      setBusy(true);
      void (async () => {
        try {
          await loginWithGoogle(credential);
          router.push(`${base}/account`);
        } catch (err) {
          onError?.((err as Error).message || "Google sign-in failed. Please try again.");
          setBusy(false);
        }
      })();
    },
    [loginWithGoogle, router, base, onError],
  );

  return (
    <div className="relative">
      <GoogleIdentityButton
        clientId={GOOGLE_CLIENT_ID}
        text={text}
        busy={busy}
        onCredential={redeem}
        onError={onError}
      />
      {busy ? (
        <p className="mt-2 text-center text-sm text-fg-muted" role="status">
          Signing you in…
        </p>
      ) : null}
    </div>
  );
}
