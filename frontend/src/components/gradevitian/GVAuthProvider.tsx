"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import {
  apiGoogleAuth,
  apiLogin,
  apiMe,
  apiPing,
  apiSignup,
  clearToken,
  getToken,
  setToken,
  type GVUser,
} from "@/lib/gradevitian/auth";

interface GVAuthContextValue {
  user: GVUser | null;
  loading: boolean;
  token: string | null;
  login: (identifier: string, password: string) => Promise<void>;
  signup: (input: { name: string; email: string; username: string; password: string }) => Promise<void>;
  /** Exchange a Google ID token for a session. Resolves true when the account was
   *  just created, so the caller can greet a first-time user differently. */
  loginWithGoogle: (credential: string) => Promise<boolean>;
  logout: () => void;
}

const GVAuthContext = createContext<GVAuthContextValue | null>(null);

export function GVAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<GVUser | null>(null);
  const [token, setTokenState] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // On mount, restore the session from a stored token.
  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const stored = getToken();
      if (!stored) {
        if (!cancelled) setLoading(false);
        return;
      }
      if (!cancelled) setTokenState(stored);
      try {
        const res = await apiMe(stored);
        if (!cancelled) setUser(res.user);
      } catch {
        clearToken();
        if (!cancelled) setTokenState(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Advance the daily-visit streak whenever a session is active (best-effort,
  // idempotent within a day server-side). Powers streak badges.
  useEffect(() => {
    if (!token) return;
    apiPing(token).catch(() => {});
  }, [token]);

  const login = useCallback(async (identifier: string, password: string) => {
    const { token: t, user: u } = await apiLogin({ identifier, password });
    setToken(t);
    setTokenState(t);
    setUser(u);
  }, []);

  const signup = useCallback(
    async (input: { name: string; email: string; username: string; password: string }) => {
      const { token: t, user: u } = await apiSignup(input);
      setToken(t);
      setTokenState(t);
      setUser(u);
    },
    [],
  );

  const loginWithGoogle = useCallback(async (credential: string) => {
    const { token: t, user: u, created } = await apiGoogleAuth(credential);
    setToken(t);
    setTokenState(t);
    setUser(u);
    return created;
  }, []);

  const logout = useCallback(() => {
    clearToken();
    setTokenState(null);
    setUser(null);
  }, []);

  return (
    <GVAuthContext.Provider value={{ user, loading, token, login, signup, loginWithGoogle, logout }}>
      {children}
    </GVAuthContext.Provider>
  );
}

export function useGVAuth(): GVAuthContextValue {
  const ctx = useContext(GVAuthContext);
  if (!ctx) throw new Error("useGVAuth must be used within GVAuthProvider");
  return ctx;
}
