import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type User = {
  id: number;
  name: string;
  email: string;
  email_verified_at?: Date;
  createdAt: Date;
  wallet: {
    id: string;
    balance: number;
    commission: number;
    status: string;
  };
};

export type AuthSession = {
  accessToken: string;
  refreshToken: string;
  user: User;
};

type AuthStore = {
  session: AuthSession | null;

  setSession: (session: AuthSession) => void;
  setUser: (user: User) => void;
  setTokens: (tokens: Omit<AuthSession, "user">) => void;
  clearSession: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      session: null,
      setSession: (session) => set(() => ({ session: session })),
      setUser: (user) =>
        set((prev) => ({
          session: prev.session ? { ...prev.session, user } : null,
        })),
      setTokens: (tokens) =>
        set((prev) => ({
          session: prev.session ? { ...prev.session, ...tokens } : null,
        })),
      clearSession: () => set({ session: null }),
    }),
    {
      name: "subsng.auth",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
