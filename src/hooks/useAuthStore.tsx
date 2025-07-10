import { create } from "zustand";
import { persist } from "zustand/middleware";

type userRole = "admin" | "client";

type user = {
  id: number;
  email: string;
  name: string;
  role: userRole;
};

export const useAuthStore = create()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: user) => set({ user }),
      clearUser: () => set({ user: null }),
      token: null,
      setToken: (token: string) => set({ token }),
      logout: () => set({ user: null, token: null }),
    }),
    { name: "auth" }
  )
);
