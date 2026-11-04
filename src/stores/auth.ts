import { create } from "zustand";

export type User = {
  id: number;
  name: string;
  email: string;
  emailVerifiedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
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
  clearSession: () => void;
};

export const useAuthStore = create<AuthStore>()((set) => ({
  session: null,
  setSession: (session) => set(() => ({ session: session })),
  setUser: (user) => set((prev) => ({ session: prev.session ? { ...prev.session, user } : null })),
  clearSession: () => set({ session: null })
}));