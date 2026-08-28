"""Admin authentication for the publishing desk at /admin.

Two credentials open the admin API, and both arrive as `Authorization: Bearer …`:

1. **A Google session token** — minted by POST /admin/auth/google after Google
   proves the caller owns an email on the ADMIN_EMAILS allow-list. This is how a
   human signs in; it expires on its own.
2. **The static ADMIN_TOKEN** — a machine credential for curl, scripts and
   break-glass access when Google is unreachable. Unset = that path is closed.

Session tokens reuse the compact HMAC format from gv_auth (no pyjwt dependency)
but carry `kind: "admin"`, so a gradeVITian student token can never be replayed
here even when both are signed with the same secret.
"""
from __future__ import annotations

import hashlib
import hmac
import json
import logging
import secrets
import time

# Same compact base64url codec the gradeVITian tokens use — one implementation.
from app.core.gv_auth import _b64d, _b64e

logger = logging.getLogger(__name__)

# Short enough that a forgotten browser session dies on its own, long enough to
# cover a day of editing. The admin page also expires its copy after 4 hours.
TOKEN_TTL_SECONDS = 60 * 60 * 12

_DEV_SECRET = secrets.token_hex(32)


def _secret() -> bytes:
    from app.core.settings import settings
    sec = settings.admin_jwt_secret or settings.gv_jwt_secret
    if not sec:
        logger.warning(
            "ADMIN_JWT_SECRET and GV_JWT_SECRET are both unset — using an ephemeral "
            "dev secret; admin sessions reset on restart."
        )
        sec = _DEV_SECRET
    return sec.encode()


def admin_emails() -> set[str]:
    """The allow-list, lower-cased. Everyone else is rejected however valid their
    Google token is."""
    from app.core.settings import settings
    return {e.strip().lower() for e in settings.admin_emails.split(",") if e.strip()}


def google_sign_in_enabled() -> bool:
    """True when an allow-listed email could actually sign in — needs both a client
    ID to verify tokens against and at least one address to allow."""
    from app.core.gv_auth import google_client_id
    return bool(google_client_id()) and bool(admin_emails())


def admin_auth_configured() -> bool:
    """False when no credential can possibly open the admin API, in which case the
    endpoints report themselves disabled rather than dangling unprotected."""
    from app.core.settings import settings
    return bool(settings.admin_token) or google_sign_in_enabled()


# ── Session tokens ────────────────────────────────────────────────────────────

def create_admin_token(email: str) -> str:
    payload = {"sub": email.lower(), "kind": "admin", "exp": int(time.time()) + TOKEN_TTL_SECONDS}
    body = _b64e(json.dumps(payload, separators=(",", ":")).encode())
    sig = hmac.new(_secret(), body.encode(), hashlib.sha256).digest()
    return f"{body}.{_b64e(sig)}"


def verify_admin_token(token: str) -> str | None:
    """Return the signed-in admin's email, or None if the token is invalid, expired,
    of the wrong kind, or belongs to an address that has since left the allow-list —
    so dropping an email from ADMIN_EMAILS revokes its live sessions immediately.
    """
    try:
        body, sig = token.split(".")
        expected = hmac.new(_secret(), body.encode(), hashlib.sha256).digest()
        if not hmac.compare_digest(_b64d(sig), expected):
            return None
        payload = json.loads(_b64d(body))
        if payload.get("kind") != "admin":
            return None
        if payload.get("exp", 0) < time.time():
            return None
        email = str(payload["sub"]).lower()
        return email if email in admin_emails() else None
    except Exception:
        return None


def is_valid_admin_credential(token: str) -> bool:
    """True for either accepted credential. Compared in constant time so the static
    token can't be recovered a byte at a time."""
    from app.core.settings import settings
    if settings.admin_token and hmac.compare_digest(token, settings.admin_token):
        return True
    return verify_admin_token(token) is not None


def sign_in_with_google(credential: str) -> dict:
    """Verify a Google ID token and mint an admin session for it.

    Raises HTTPException(403) for a valid Google account that simply isn't on the
    allow-list — the common case of signing in with the wrong profile, which
    deserves a clearer message than "invalid token".
    """
    from fastapi import HTTPException
    from app.core.gv_auth import verify_google_credential

    if not google_sign_in_enabled():
        raise HTTPException(status_code=503, detail="Admin Google sign-in is not configured.")

    claims = verify_google_credential(credential)
    email = str(claims["email"]).lower()
    if email not in admin_emails():
        logger.warning("Rejected admin sign-in for non-allow-listed email: %s", email)
        raise HTTPException(status_code=403, detail=f"{email} is not an admin of this site.")

    logger.info("Admin signed in via Google: %s", email)
    return {
        "token": create_admin_token(email),
        "email": email,
        "name": claims.get("name", ""),
        "picture": claims.get("picture", ""),
        "expires_in": TOKEN_TTL_SECONDS,
    }
