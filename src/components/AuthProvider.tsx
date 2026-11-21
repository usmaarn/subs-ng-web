"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  clearSessionData,
  persistSession,
  readClientSession,
  toSessionContext,
  type SessionContext,
} from "#/lib/session";
import type { User } from "#/lib/types";

type AuthData = {
  user: User;
  accessToken: string;
  refreshToken: string;
};

type AuthProviderValue = SessionContext & {
  setSession: (data: AuthData) => void;
  clearSession: () => void;
  updateUser: (user: User) => void;
  refreshSession: () => void;
};

const AuthContext = createContext<AuthProviderValue | null>(null);

export function AuthProvider({
  initialSession,
  children,
}: {
  initialSession: SessionContext;
  children: ReactNode;
}) {
  const router = useRouter();
  const [session, setSessionState] = useState(initialSession);

  const refreshSession = useCallback(() => {
    setSessionState(toSessionContext(readClientSession()));
    router.refresh();
  }, [router]);

  const value = useMemo<AuthProviderValue>(
    () => ({
      ...session,
      setSession(data) {
        persistSession(data);
        setSessionState(toSessionContext(readClientSession()));
        router.refresh();
      },
      clearSession() {
        clearSessionData();
        setSessionState({ user: null, isAuthenticated: false });
        router.refresh();
      },
      updateUser(user) {
        persistSession({ user });
        setSessionState((current) => ({ ...current, user }));
        router.refresh();
      },
      refreshSession,
    }),
    [refreshSession, router, session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used inside AuthProvider");
  }
  return context;
}
