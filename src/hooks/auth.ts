"use client";

import { useQuery } from "@tanstack/react-query";

import { useAuthContext } from "#/components/auth-provider";
import { api } from "#/lib/api";
import { persistSession, readClientSession } from "#/lib/session";
import type { User } from "#/lib/types";

export type AuthData = {
  user: User;
  accessToken: string;
  refreshToken: string;
};

export function getSessionData() {
  return readClientSession();
}

export const useAuth = () => {
  const auth = useAuthContext();

  const {
    refetch: refetchUser,
    isPending: fetchingUser,
    isError: isUserError,
    error: userError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await api.get<User>("/auth/me");
      persistSession({ user: res.data });
      auth.updateUser(res.data);
      return res.data;
    },
    enabled: false,
  });

  const clientSession =
    typeof window === "undefined" ? null : readClientSession();

  return {
    user: auth.user,
    isAuthenticated: auth.isAuthenticated,
    accessToken: clientSession?.accessToken ?? null,
    refreshToken: clientSession?.refreshToken ?? null,
    clearSession: auth.clearSession,
    fetchUser: refetchUser,
    setSession: auth.setSession,
    updateUser: auth.updateUser,
    isError: isUserError,
    isPending: fetchingUser,
    error: userError,
  };
};
