import { create } from "zustand";
import { persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";

type userRole = "admin" | "client" | "admin-client";

type User = {
  id: number;
  email: string;
  name: string;
  role: userRole;
  clientId?: number | null;
};

type AuthState = {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  setUser: (user: User) => void;
  clearUser: () => void;
  setToken: (token: string) => void;
};

const isExpired = (t: string) => {
  try {
    const { exp } = jwtDecode<{ exp: number }>(t);
    return Date.now() >= exp * 1000;
  } catch (_) {
    return true;
  }
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get: any) => ({
      user: null,
      token: null,
      login: (user: User, token: string) => {
        if (isExpired(token)) {
          throw new Error("Token is expired");
        }
        set({ user, token });

        const { exp } = jwtDecode<{ exp: number }>(token);
        const expirationTime = exp * 1000 - Date.now();
        setTimeout(() => get().logout(), expirationTime);
      },
      logout: () => set({ user: null, token: null }),

      setUser: (user: User) => set({ user }),
      clearUser: () => set({ user: null }),
      setToken: (token: string) => set({ token }),
    }),
    {
      name: "auth",
      onRehydrateStorage: () => (state: any) => {
        if (state?.token && isExpired(state.token)) {
          return { user: null, token: null };
        }
      },
    }
  )
);
