import { create } from "zustand";

type AlertState = {
  alert: { open: boolean; type: "success" | "error" | "info"; message: string };
  showAlert: (type: AlertState["alert"]["type"], message: string) => void;
  closeAlert: () => void;
};

export const useAlertStore = create<AlertState>((set) => ({
  alert: { open: false, type: "info", message: "" },
  showAlert: (type, message) => set({ alert: { open: true, type, message } }),
  closeAlert: () => set({ alert: { open: false, type: "info", message: "" } }),
}));
