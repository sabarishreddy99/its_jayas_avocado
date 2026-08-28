"""Admin authentication: Google sign-in restricted to an email allow-list, with the
static ADMIN_TOKEN kept as a machine credential.

Deliberately avoids importing the admin router (it pulls in the RAG stack); the
shared guard is exercised end-to-end through /gv/admin/metrics instead.
"""
import pytest
from fastapi import FastAPI, HTTPException
from fastapi.testclient import TestClient
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware

from app.core import admin_auth
from app.core.limiter import limiter
from app.core.settings import settings
from app.db import gradevitian as gv
from app.routers.gradevitian import router as gv_router

ADMIN = "owner@example.com"
STRANGER = "someone-else@example.com"


@pytest.fixture(autouse=True)
def _admin_env(monkeypatch):
    """A configured desk: one allow-listed admin, Google enabled, no static token
    unless a test opts into one."""
    monkeypatch.setattr(settings, "admin_emails", ADMIN, raising=False)
    monkeypatch.setattr(settings, "admin_token", "", raising=False)
    monkeypatch.setattr(settings, "admin_jwt_secret", "admin-test-secret", raising=False)
    monkeypatch.setattr(settings, "gv_google_client_id", "test-client.apps.googleusercontent.com",
                        raising=False)


@pytest.fixture()
def client():
    gv.init_db()
    app = FastAPI()
    app.state.limiter = limiter
    app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
    app.add_middleware(SlowAPIMiddleware)
    app.include_router(gv_router)
    return TestClient(app)


@pytest.fixture()
def google(monkeypatch):
    """Stub Google's verifier so tests never hit its JWKS endpoint."""
    import app.core.gv_auth as gv_auth

    def _sign_in(email=ADMIN):
        monkeypatch.setattr(
            gv_auth, "verify_google_credential",
            lambda cred: {"sub": "1", "email": email, "email_verified": True, "name": "Owner"},
        )
        return admin_auth.sign_in_with_google("credential")

    return _sign_in


def test_allow_listed_email_gets_a_session(google):
    session = google()
    assert session["email"] == ADMIN
    assert admin_auth.verify_admin_token(session["token"]) == ADMIN
    assert admin_auth.is_valid_admin_credential(session["token"])


def test_other_google_accounts_are_refused(google):
    with pytest.raises(HTTPException) as exc:
        google(email=STRANGER)
    assert exc.value.status_code == 403


def test_admin_session_opens_admin_endpoints(client, google):
    token = google()["token"]
    r = client.get("/gv/admin/metrics", headers={"Authorization": f"Bearer {token}"})
    assert r.status_code == 200, r.text


def test_random_bearer_is_refused(client):
    r = client.get("/gv/admin/metrics", headers={"Authorization": "Bearer garbage"})
    assert r.status_code == 401


def test_static_token_still_works(client, monkeypatch):
    monkeypatch.setattr(settings, "admin_token", "sekret", raising=False)
    assert admin_auth.is_valid_admin_credential("sekret")
    r = client.get("/gv/admin/metrics", headers={"Authorization": "Bearer sekret"})
    assert r.status_code == 200


def test_dropping_an_email_revokes_its_live_sessions(google, monkeypatch):
    token = google()["token"]
    monkeypatch.setattr(settings, "admin_emails", "someone.new@example.com", raising=False)
    assert admin_auth.verify_admin_token(token) is None


def test_student_token_cannot_be_replayed_as_admin(monkeypatch):
    """gradeVITian tokens are signed with the same secret when ADMIN_JWT_SECRET is
    unset, so the `kind` claim is what keeps the two apart."""
    from app.core import gv_auth
    monkeypatch.setattr(settings, "admin_jwt_secret", "", raising=False)
    monkeypatch.setattr(settings, "gv_jwt_secret", "shared-secret", raising=False)
    assert admin_auth.verify_admin_token(gv_auth.create_token(1)) is None


def test_tampered_session_is_refused(google):
    token = google()["token"]
    body, sig = token.split(".")
    assert admin_auth.verify_admin_token(f"{body}x.{sig}") is None


def test_empty_allow_list_admits_nobody(google, monkeypatch):
    """ADMIN_EMAILS has no default, so an environment that forgets to set it must
    refuse every Google account rather than fall back to admitting someone."""
    monkeypatch.setattr(settings, "admin_emails", "", raising=False)
    monkeypatch.setattr(settings, "admin_token", "sekret", raising=False)  # endpoints live
    with pytest.raises(HTTPException) as exc:
        google()
    assert exc.value.status_code == 503


def test_endpoints_disabled_when_nothing_is_configured(client, monkeypatch):
    monkeypatch.setattr(settings, "admin_emails", "", raising=False)
    monkeypatch.setattr(settings, "gv_google_client_id", "", raising=False)
    monkeypatch.setattr(settings, "google_oauth_client_id", "", raising=False)
    r = client.get("/gv/admin/metrics", headers={"Authorization": "Bearer anything"})
    assert r.status_code == 403
