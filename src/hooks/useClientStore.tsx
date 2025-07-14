import { create } from "zustand";
import { persist } from "zustand/middleware";

type Client = {
  active: boolean;
  email: string;
  name: string;
  id: number;
};

type ClientStore = {
  clients: Client[];
  setClients: (clients: Client[]) => void;
  getClientById: (id: number) => Client | undefined;
};

export const useClientStore = create<ClientStore>()(
  persist(
    (set, get) => ({
      clients: [],
      setClients: (clients) => set({ clients }),
      getClientById: (id) => get().clients.find((client) => client.id === id),
    }),
    {
      name: "clients",
    }
  )
);
